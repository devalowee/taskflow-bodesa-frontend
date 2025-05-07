import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  RequestCardProps,
  RequestStatus,
} from "@/app/components/boards/interfaces/board.interfaces";
import { BoardColumn } from "@/app/components/boards/BoardColumn";
import { RequestCard } from "@/app/components/boards/RequestCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UseRequest } from "@/hooks/UseRequest";
import { useNavigate, useParams } from "react-router";
import queryClient from "@/lib/queryClient";
import { toast } from "sonner";
import { useSocketContext } from "@/context/SocketContext";
import { useSanitizeRequests } from "@/hooks/useSanitizeRequests";
import { SanitizedRequestCardProps } from "@/app/components/assignments/AssignmentColumn";
export const SingleBoard: React.FC = () => {
  const { sanitizeRequests, sanitizeRequest } = useSanitizeRequests();
  const { socketEmit, socketOn, socketOff, connected } = useSocketContext();

  const [activeCard, setActiveCard] = useState<SanitizedRequestCardProps | null>(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const { getRequests, updateRequestStatus } = UseRequest();

  // 1. Petición de datos (igual que antes)
  const { data: requestsQuery, isLoading } = useQuery({
    queryKey: ["requests", slug],
    queryFn: async () => {
      const { requests, ok, message, redirect } = await getRequests(slug || '');
      if (redirect) navigate("/tableros");
      if (!ok) {
        toast.error(message);
        return [];
      }

      return requests;
    },
  });

  // 2. Mutación de estado (igual que antes)
  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: async (request: { id: string, status: RequestStatus, isAutoAssigned: boolean }) => {
      const { ok, message } = await updateRequestStatus(request);

      if (!ok) {
        toast.error(message || "Error al actualizar el estado");
        return ok;
      }

      return ok;
    },
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: ["requests", slug] });

      const prev = queryClient.getQueryData<RequestCardProps[]>(["requests", slug]);

      
      queryClient.setQueryData(["requests", slug], (old: RequestCardProps[] = []) => {
        return old.map(req => req.id === request.id ? { ...req, status: request.status } : req)
      });
      
      if (request.isAutoAssigned) {
        queryClient.setQueryData(["my-requests"], (old: RequestCardProps[] = []) => {
          return old.map(req => req.id === request.id ? { ...req, status: request.status } : req)
        });
      }
      
      return { prev };
    },
  });

  // 3. Filtrar y memoizar por estatus
  const awaiting   = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.AWAITING),   [requestsQuery, sanitizeRequests]);
  const attention  = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.ATTENTION),  [requestsQuery, sanitizeRequests]);
  const inProgress = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.IN_PROGRESS),[requestsQuery, sanitizeRequests]);
  const pending    = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.PENDING),    [requestsQuery, sanitizeRequests]);
  const done       = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.DONE),       [requestsQuery, sanitizeRequests]);

  // 4. Handlers memoizados para drag
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const req = requestsQuery?.find(req => req.id === event.active.id) || null;
    setActiveCard(req ? sanitizeRequest(req) : null);
  }, [requestsQuery, sanitizeRequest]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const req = requestsQuery?.find(r => r.id === active.id);
    if (req && req.status !== over.id) {
      updateRequestMutation({
        id: req.id,
        status: over.id as RequestStatus, 
        isAutoAssigned: req.isAutoAssigned
      });

      socketEmit('update-request-status', { id: req.id, status: over.id, boardSlug: slug! });
    }
    setActiveCard(null);

  }, [requestsQuery, updateRequestMutation, socketEmit, slug]);

  useEffect(() => {
    const handleInvalidate = () => {
      queryClient.invalidateQueries({ queryKey: ["requests", slug] });
    }
    
    socketEmit('join-board', slug!);

    socketOn<{id: string, status: string}>('request-status-updated', (data) => {
      updateRequestMutation({ id: data.id, status: data.status } as RequestCardProps);
    });

    socketOn('request-created', handleInvalidate);

    return () => {
      socketOff('request-status-updated');
      socketOff('request-created', handleInvalidate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, connected]);
  
  return (
    <div className="w-full h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full">
          <BoardColumn
            title="EN ESPERA"
            requests={awaiting}
            status={RequestStatus.AWAITING}
            color="bg-gray-400"
            allowButton
            isLoading={isLoading}
          />
          <BoardColumn
            title="REQUIERE ATENCIÓN"
            requests={attention}
            status={RequestStatus.ATTENTION}
            color="bg-yellow-400"
            isLoading={isLoading}
          />
          <BoardColumn
            title="EN PROGRESO"
            requests={inProgress}
            status={RequestStatus.IN_PROGRESS}
            color="bg-sky-500"
            isLoading={isLoading}
          />
          <BoardColumn
            title="POR AUTORIZAR"
            requests={pending}
            status={RequestStatus.PENDING}
            color="bg-purple-600"
            isLoading={isLoading}
          />
          <BoardColumn
            title="TERMINADAS"
            requests={done}
            status={RequestStatus.DONE}
            color="bg-green-500"
            isLoading={isLoading}
          />

          <DragOverlay dropAnimation={null}>
            {activeCard && (
              <RequestCard {...activeCard} />
            )}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};