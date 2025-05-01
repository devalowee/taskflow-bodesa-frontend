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
import { getInitials, getPriority, resumeTo60Chars } from "@/app/lib/helpers";
import { formatForTooltip } from "@/lib/formatDate";
import { useSocketContext } from "@/context/SocketContext";

export const SingleBoard: React.FC = () => {
  const { socketEmit, socketOn, socketOff, connected } = useSocketContext();

  const [activeCard, setActiveCard] = useState<RequestCardProps | null>(null);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { getRequests, updateRequestStatus } = UseRequest();

  // 1. Petición de datos (igual que antes)
  const { data: requestsQuery = [], isLoading } = useQuery<RequestCardProps[]>({
    queryKey: ["requests", slug],
    queryFn: async () => {
      const { requests, ok, message, redirect } = await getRequests(slug!);
      if (redirect) navigate("/dashboard/tableros");
      if (!ok) {
        toast.error(message);
        return [];
      }

      return requests!.map(req => ({
        ...req,
        description: resumeTo60Chars(req.description),
        priority: getPriority(req.priority),
        board: {
          ...req.board,
          initials: getInitials(req.board.name),
        },
        createdAt: formatForTooltip(req.createdAt),
        finishDate: formatForTooltip(req.finishDate),
      }));
    },
  });

  // 2. Mutación de estado (igual que antes)
  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: (request: RequestCardProps) => updateRequestStatus(request),
    onMutate: async updatedRequest => {
      await queryClient.cancelQueries({ queryKey: ["requests", slug] });
      const prev = queryClient.getQueryData<RequestCardProps[]>(["requests", slug]);
      queryClient.setQueryData<RequestCardProps[]>(
        ["requests", slug],
        old =>
          old?.map(r =>
            r.id === updatedRequest.id ? { ...r, status: updatedRequest.status } : r
          ) || []
      );
      return { prev };
    },
    onError: (err: Error, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(["requests", slug], context.prev);
      }
      toast.error(err.message || "Error al actualizar el estado");
    },
  });

  // 3. Filtrar y memoizar por estatus
  const awaiting   = useMemo(() => requestsQuery.filter(r => r.status === RequestStatus.AWAITING),   [requestsQuery]);
  const attention  = useMemo(() => requestsQuery.filter(r => r.status === RequestStatus.ATTENTION),  [requestsQuery]);
  const inProgress = useMemo(() => requestsQuery.filter(r => r.status === RequestStatus.IN_PROGRESS),[requestsQuery]);
  const pending    = useMemo(() => requestsQuery.filter(r => r.status === RequestStatus.PENDING),    [requestsQuery]);
  const done       = useMemo(() => requestsQuery.filter(r => r.status === RequestStatus.DONE),       [requestsQuery]);

  // 4. Handlers memoizados para drag
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const req = requestsQuery.find(r => r.id === event.active.id) || null;
    setActiveCard(req);
  }, [requestsQuery]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const req = requestsQuery.find(r => r.id === active.id);
    if (req && req.status !== over.id) {
      updateRequestMutation({ ...req, status: over.id as RequestStatus });
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
      console.log(data)
      updateRequestMutation({ id: data.id, status: data.status } as RequestCardProps);
    });

    socketOn('request-created', handleInvalidate);

    return () => {
      console.log('me voy a desmontar')
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