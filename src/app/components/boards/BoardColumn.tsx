import { RequestBasicCard } from "./RequestBasicCard";
import { RequestStatus } from "./interfaces/board.interfaces";
import { useDroppable } from "@dnd-kit/core";
import { Link, useParams } from "react-router";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { SanitizedRequestCardProps } from "@/app/components/assignments/AssignmentColumn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface BoardColumnProps {
  title: string;
  requests: SanitizedRequestCardProps[];
  status: RequestStatus;
  color: string;
  allowButton?: boolean;
  isLoading?: boolean;
}

const bgByStatus = (status: RequestStatus) => {
  switch (status) {
    case 'AWAITING':
      return 'bg-gray-100';
    case 'ATTENTION':
      return 'bg-orange-50';
    case 'IN_PROGRESS':
      return 'bg-slate-100';
    case 'PENDING':
      return 'bg-violet-50';
    case 'DONE':
      return 'bg-emerald-50';
    default:
      return 'bg-gray-400';
  }
}

export const BoardColumn = ({ title, status, requests, color, allowButton = false, isLoading }: BoardColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const { slug } = useParams();

  const skeletons = Math.floor(Math.random() * (5 - 1)) + 1;

  return (
    <div role="column" className={cn("w-[285px] max-h-[85vh] h-min pb-3 rounded-xl flex flex-col", bgByStatus(status))}>
      <div
        role="columnheader"
        className="px-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-2 h-full py-4">
          <div className={cn("w-1 h-4 rounded-full", color)}></div>
          <h1 className="text-sm font-semibold text-neutral-700">{title}</h1>
        </div>
        {allowButton && <Link to={`/tareas/crear?board=${slug}`}>
          <Button size="sm" className="text-sm font-semibold cursor-pointer bg-violet-700 hover:bg-violet-600">
            <PlusIcon className="w-4 h-4" />
            Nueva
          </Button>
        </Link>}
      </div>
      <div
        ref={setNodeRef}
        className="h-full min-h-[152px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
      >
        <div className="flex flex-col gap-2 items-center">
          {
            isLoading ? (
              Array.from({ length: skeletons }).map((_, index) => (
                <Skeleton key={index} className="w-[260px] h-[154px] rounded-md" />
              ))
            ) : (
              requests.map((request) => (
                <RequestBasicCard key={request.id} {...request}/>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};
