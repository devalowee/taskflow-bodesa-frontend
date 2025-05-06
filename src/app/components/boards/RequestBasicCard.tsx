import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { RequestCardProps, RequestStatus } from "./interfaces/board.interfaces";
import {
  CalendarPlus,
  ListEnd,
  MessageSquare,
  Repeat2,
  Rocket,
  SquareArrowOutUpRight,
  UserRoundX,
} from "lucide-react";
import { getPriorityColor } from "@/app/lib/helpers";
import { cn } from "@/lib/utils";
import { PriorityIcon } from "./PriorityIcon";
import { TooltipComponent } from "../TooltipComponent";
import { TypeIcon } from "./TypeIcon";
import { NavLink } from "react-router";

export const RequestBasicCard = ({
  id,
  title,
  description,
  type,
  status,
  author,
  priority,
  assignedTo,
  board,
  createdAt,
  finishDate,
}: RequestCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  
  const CardColor = cn(
    "border-2 border-transparent",
    {
      "bg-yellow-50 border-yellow-500": status === RequestStatus.ATTENTION,
      "border-sky-500": status === RequestStatus.IN_PROGRESS,
      "bg-purple-50 border-purple-500": status === RequestStatus.PENDING,
      "opacity-50": status === RequestStatus.DONE,
    }
  )

  return (
    <div
      ref={setNodeRef}
      className={`${
        transform ? "opacity-50" : "opacity-100 cursor-grab"
      } transition-opacity rounded-md p-0 font-roboto-condensed w-[260px]`}
      {...listeners}
      {...attributes}
    >
      <Card className={`${transform ? 'border-dashed border-2' : 'border-2'} py-0 gap-0 ${CardColor}`}>
        <CardHeader className="border-b !pb-0 px-3 h-9.5 flex items-center gap-2">
          <TooltipComponent text={board.name}>
            <p className="text-[9px] text-white p-1 px-1.5 font-bold rounded" style={{ backgroundColor: board.color }}>
              {board.initials}
            </p>
          </TooltipComponent>
          <TooltipComponent text={author.name}>
            <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          </TooltipComponent>
          <TooltipComponent text={`Solicitado: ${createdAt}`}>
            <CalendarPlus className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          </TooltipComponent>
          <TypeIcon type={type} />
          <span
            className={cn(
              "flex items-center gap-1 p-1 rounded ml-auto",
              getPriorityColor(priority)
            )}
          >
            <PriorityIcon priority={priority} />
            <p className="text-xs">{priority}</p>
          </span>
          <NavLink to={`/dashboard/solicitudes/${id}`} onPointerDown={(e) => e.stopPropagation()}>
            <SquareArrowOutUpRight className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          </NavLink>
        </CardHeader>
        <CardContent className="px-4 !py-0 min-h-18.5 flex items-center">
          <CardDescription className="text-slate-700">
            <p className="text-sm font-bold">{title}</p>
            <p className="text-[13px]">{description}</p>
          </CardDescription>
        </CardContent>
        <CardFooter className="px-3 !py-0 h-9.5 border-t flex items-center gap-1">
          <TooltipComponent text={assignedTo?.name || 'Sin asignar'}>
            {assignedTo ? (
              <img
                src={assignedTo?.avatar}
                alt="avatar"
                className="min-w-4 h-4 rounded"
              />
            ) : (
              <span className="bg-orange-400 p-1 rounded">
                <UserRoundX className="size-3 text-white" />
              </span>
            )}
          </TooltipComponent>
          <span className="flex items-center justify-center gap-0.5 bg-[#F3F3F3] h-4.5 min-w-9 rounded">
            <ListEnd className="size-3" />
            <p className="text-[10px]">10</p>
          </span>
          <span className="flex items-center justify-center gap-0.5 bg-[#F3F3F3] h-4.5 min-w-9 rounded">
            <MessageSquare className="size-3" />
            <p className="text-[10px]">10</p>
          </span>
          <span className="flex items-center justify-center gap-0.5 bg-[#F3F3F3] h-4.5 min-w-9 rounded">
            <Repeat2 className="size-3" />
            <p className="text-[10px]">10</p>
          </span>
          <span className="flex items-center justify-center gap-0.5 bg-[#F3F3F3] h-5 w-full rounded text-green-600">
            <Rocket className="size-3" />
            <p className="text-[10px]">{finishDate}</p>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
