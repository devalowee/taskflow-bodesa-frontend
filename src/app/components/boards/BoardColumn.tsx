import { RequestBasicCard } from "./RequestBasicCard";
import { RequestCardProps, RequestStatus } from "./interfaces/board.interfaces";
import { useDroppable } from "@dnd-kit/core";
import { CreateRequest } from "./CreateRequest";
import { useParams } from "react-router";
import { cn } from "@/lib/utils";

interface BoardColumnProps {
  title: string;
  requests: RequestCardProps[];
  status: RequestStatus;
  color: string;
  allowButton?: boolean;
}

export const BoardColumn = ({ title, status, requests, color, allowButton = false }: BoardColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const { slug } = useParams();

  return (
    <div role="column" className="w-[285px] h-[80vh] bg-black/5 rounded-xl flex flex-col">
      <div
        role="columnheader"
        className="px-4 h-[10%] flex justify-between items-center"
      >
        <div className="flex items-center gap-2 h-full">
          <div className={cn("w-1 h-4 rounded-full", color)}></div>
          <h1 className="text-xs font-bold text-stone-500">{title}</h1>
        </div>
        {allowButton && <CreateRequest status={status} boardSlug={slug} />}
      </div>
      <div
        ref={setNodeRef}
        className="h-[100%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
      >
        <div className="flex flex-col gap-2 items-center">
          {requests.map((request) => (
            <RequestBasicCard key={request.id} {...request}/>
          ))}
        </div>
      </div>
    </div>
  );
};
