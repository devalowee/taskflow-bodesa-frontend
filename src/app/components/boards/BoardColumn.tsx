import { RequestBasicCard } from "./RequestBasicCard";
import { RequestCardProps, RequestStatus } from "./interfaces/board.interfaces";
import { useDroppable } from "@dnd-kit/core";
import { CreateRequest } from "./CreateRequest";
import { useParams } from "react-router";
import { getInitials } from "@/app/lib/helpers";

interface BoardColumnProps {
  title: string;
  requests: RequestCardProps[];
  status: RequestStatus;
}

export const BoardColumn = ({ title, status, requests }: BoardColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const { slug } = useParams();

  return (
    <div role="column" className="w-[285px] rounded h-[80vh] flex flex-col">
      <div
        role="columnheader"
        className="p-2 h-[10%] flex justify-between items-center"
      >
        <h1 className="text-xs font-bold text-stone-500">{title}</h1>
        <CreateRequest status={status} boardSlug={slug} />
      </div>
      <div
        ref={setNodeRef}
        className="max-h-[100%] min-h-[100%] overflow-y-auto bg-black/5 rounded-xl scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
      >
        <div className="flex flex-col gap-2 p-3">
          {requests.map((request) => (
            <RequestBasicCard key={request.id} {...request} boardInitials={getInitials(slug as string)} />
          ))}
        </div>
      </div>
    </div>
  );
};
