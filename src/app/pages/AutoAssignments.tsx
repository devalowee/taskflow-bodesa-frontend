import { useCallback, useMemo, useState } from "react";
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
import { RequestCard } from "@/app/components/boards/RequestCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UseRequest } from "@/hooks/UseRequest";
import queryClient from "@/lib/queryClient";
import { toast } from "sonner";
import { AssignmentColumn, SanitizedRequestCardProps } from "../components/assignments/AssignmentColumn";
import { useSanitizeRequests } from "@/hooks/useSanitizeRequests";

export const AutoAssignments: React.FC = () => {
  const [activeCard, setActiveCard] = useState<SanitizedRequestCardProps | null>(null);
  const { getMyRequests, updateRequestStatus } = UseRequest();
  const { sanitizeRequests } = useSanitizeRequests();

  const { data: requestsQuery, isLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: async () => {
      const { ok, requests, message } = await getMyRequests();

      if (!ok) {
        toast.error(message || "Error al obtener las solicitudes");
        return [];
      }
      
      return requests;
    },
  });

  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: async (request: { id: string, status: RequestStatus, boardSlug: string }) => {
      const { ok, message } = await updateRequestStatus(request);

      if (!ok) {
        toast.error(message || "Error al actualizar el estado");
        return ok;
      }

      return ok;
    },
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: ['my-requests'] });

      const prev = queryClient.getQueryData<RequestCardProps[]>(['my-requests']);

      queryClient.setQueryData(['my-requests'], (old: RequestCardProps[] = []) => {
        return old.map(req => req.id === request.id ? { ...req, status: request.status } : req)
      });

      const queryExists = queryClient.getQueryData(['requests', request.boardSlug]);

      console.log(queryExists, request.boardSlug);
      
      if (queryExists) {
        queryClient.setQueryData(['requests', request.boardSlug], (old: RequestCardProps[] = []) => {
          return old.map(req => req.id === request.id ? { ...req, status: request.status } : req)
        });
      }

      return { prev };
    }
  });

  // 3. Filtrar y memoizar por estatus
  const awaiting   = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.AWAITING),   [requestsQuery, sanitizeRequests]);
  const attention  = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.ATTENTION),  [requestsQuery, sanitizeRequests]);
  const inProgress = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.IN_PROGRESS),[requestsQuery, sanitizeRequests]);
  const pending    = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.PENDING),    [requestsQuery, sanitizeRequests]);
  const done       = useMemo(() => sanitizeRequests(requestsQuery, RequestStatus.DONE),       [requestsQuery, sanitizeRequests]);

  // 4. Handlers memoizados para drag
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const req = requestsQuery?.find(request => request.id === event.active.id) || null;
    setActiveCard(req);
  }, [requestsQuery]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const req = requestsQuery?.find(request => {
      return request.id === active.id;
    });

    if (req && req.status !== over.id) {
      updateRequestMutation({
        id: req.id,
        status: over.id as RequestStatus,
        boardSlug: req.board.slug
      });
    }

    setActiveCard(null);
  }, [requestsQuery, updateRequestMutation]);
  
  return (
    <div className="w-full h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full">
          <AssignmentColumn
            title="Espera"
            requests={awaiting}
            status={RequestStatus.AWAITING}
            color="bg-gray-400"
            allowButton
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="Atención"
            requests={attention}
            status={RequestStatus.ATTENTION}
            color="bg-yellow-400"
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="Diseñando"
            requests={inProgress}
            status={RequestStatus.IN_PROGRESS}
            color="bg-sky-500"
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="Revisión"
            requests={pending}
            status={RequestStatus.PENDING}
            color="bg-purple-600"
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="Finalizado"
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