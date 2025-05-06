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
import { getPriority, resumeTo60Chars } from "@/app/lib/helpers";
import { formatForTooltip } from "@/lib/formatDate";
import { AssignmentColumn } from "../components/assignments/AssignmentColumn";

export const AutoAssigments: React.FC = () => {
  const [activeCard, setActiveCard] = useState<RequestCardProps | null>(null);
  const { getMyRequests, updateRequestStatus } = UseRequest();

  // 1. Petición de datos (igual que antes)
  const { data: requestsQuery = [], isLoading } = useQuery<RequestCardProps[]>({
    queryKey: ["my-requests"],
    queryFn: async () => {
      const { requests, ok, message } = await getMyRequests();
      if (!ok) {
        toast.error(message || "Error al obtener las solicitudes");
        return [];
      }

      console.log(requests);

      return requests!.map(req => ({
        ...req,
        description: resumeTo60Chars(req.description),
        priority: getPriority(req.priority),
        createdAt: formatForTooltip(req.createdAt),
        finishDate: formatForTooltip(req.finishDate),
      }));
    },
  });

  // 2. Mutación de estado (igual que antes)
  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: (request: RequestCardProps) => updateRequestStatus(request),
    onMutate: async updatedRequest => {
      await queryClient.cancelQueries({ queryKey: ["my-requests"] });
      const prev = queryClient.getQueryData<RequestCardProps[]>(["my-requests"]);
      queryClient.setQueryData<RequestCardProps[]>(
        ["my-requests"],
        old =>
          old?.map(r =>
            r.id === updatedRequest.id ? { ...r, status: updatedRequest.status } : r
          ) || []
      );
      return { prev };
    },
    onError: (err: Error, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(["my-requests"], context.prev);
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
    }
    setActiveCard(null);

  }, [requestsQuery, updateRequestMutation]);
  
  return (
    <div className="w-full h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 h-full">
          <AssignmentColumn
            title="EN ESPERA"
            requests={awaiting}
            status={RequestStatus.AWAITING}
            color="bg-gray-400"
            allowButton
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="REQUIERE ATENCIÓN"
            requests={attention}
            status={RequestStatus.ATTENTION}
            color="bg-yellow-400"
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="EN PROGRESO"
            requests={inProgress}
            status={RequestStatus.IN_PROGRESS}
            color="bg-sky-500"
            isLoading={isLoading}
          />
          <AssignmentColumn
            title="POR AUTORIZAR"
            requests={pending}
            status={RequestStatus.PENDING}
            color="bg-purple-600"
            isLoading={isLoading}
          />
          <AssignmentColumn
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