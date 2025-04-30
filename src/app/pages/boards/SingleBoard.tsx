import { useState } from "react";
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

export const SingleBoard = () => {
  const [activeCard, setActiveCard] = useState<RequestCardProps | null>(null);

  const navigate = useNavigate();

  const { slug } = useParams();

  const { getRequests, updateRequestStatus } = UseRequest();

  const { data: requestsQuery } = useQuery({
    queryKey: ["requests", slug],
    queryFn: async () => {
      const { requests, ok, message, redirect } = await getRequests(
        slug as string
      );

      if (redirect) {
        navigate("/dashboard/tableros");
      }

      if (!ok && message) {
        toast.error(message);
        return [];
      }

      return requests?.map((req) => {
        req.description = resumeTo60Chars(req.description);
        req.priority = getPriority(req.priority);
        req.board.initials = getInitials(req.board.name);
        req.createdAt = formatForTooltip(req.createdAt);
        req.finishDate = formatForTooltip(req.finishDate);

        return req;
      });
    },
  });

  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: async (request: RequestCardProps) => {
      const { ok, message } = await updateRequestStatus(request);

      if (!ok) {
        throw new Error(
          message || "Error al actualizar el estado de la solicitud"
        );
      }

      return request;
    },
    onMutate: async (updatedRequest: RequestCardProps) => {
      await queryClient.cancelQueries({ queryKey: ["requests", slug] });

      const previousRequests = queryClient.getQueryData<RequestCardProps[]>([
        "requests",
        slug,
      ]);

      queryClient.setQueryData<RequestCardProps[]>(
        ["requests", slug],
        (old) => {
          return (
            old?.map((req) =>
              req.id === updatedRequest.id
                ? {
                    ...req,
                    status: updatedRequest.status,
                  }
                : req
            ) || []
          );
        }
      );

      return { previousRequests };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["requests", slug] });
    },
    onError: (error, _req, context) => {
      if (context?.previousRequests) {
        queryClient.setQueryData<RequestCardProps[]>(
          ["requests", slug],
          context.previousRequests
        );
      }

      toast.error(
        error.message || "Error al actualizar el estado de la solicitud"
      );
    },
  });

  const getRequestsByStatus = (status: RequestStatus) =>
    requestsQuery?.filter((req) => req.status === status) || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const requestId = active.id;
    const newStatus = over.id as RequestCardProps["status"];

    updateRequestMutation({
      ...(requestsQuery?.find(
        (req) => req.id === requestId
      ) as RequestCardProps),
      status: newStatus,
    });

    setActiveCard(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveCard(requestsQuery?.find((req) => {
      if (req.id === active.id) {
          return {
            title: req.title,
            description: req.description,
            author: req.author,
            assignedTo: req.assignedTo,
            priority: req.priority,
            status: req.status,
          };
        }
      }) || null
    );
  };

  return (
    <div className="w-full h-full">
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="w-full h-full">
          <div className="flex gap-4 min-w-min h-[inherit]">
            <BoardColumn
              title="EN ESPERA"
              requests={getRequestsByStatus(RequestStatus.AWAITING)}
              status={RequestStatus.AWAITING}
              color="bg-gray-400"
              allowButton={true}
            />
            <BoardColumn
              title="REQUIERE ATENCIÓN"
              requests={getRequestsByStatus(RequestStatus.ATTENTION)}
              status={RequestStatus.ATTENTION}
              color="bg-yellow-400"
            />
            <BoardColumn
              title="EN PROGRESO"
              requests={getRequestsByStatus(RequestStatus.IN_PROGRESS)}
              status={RequestStatus.IN_PROGRESS}
              color="bg-sky-500"
            />
            <BoardColumn
              title="POR AUTORIZAR"
              requests={getRequestsByStatus(RequestStatus.PENDING)}
              status={RequestStatus.PENDING}
              color="bg-purple-600"
            />
            <BoardColumn
              title="TERMINADAS"
              requests={getRequestsByStatus(RequestStatus.DONE)}
              status={RequestStatus.DONE}
              color="bg-green-500"
            />

            <DragOverlay dropAnimation={null}>
              {activeCard ? (
                <RequestCard
                  {...activeCard}
                  boardInitials={getInitials(slug as string)}
                />
              ) : null}
            </DragOverlay>
          </div>
        </div>
      </DndContext>
    </div>
  );
};
