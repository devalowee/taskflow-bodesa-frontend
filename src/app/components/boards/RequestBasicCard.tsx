import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import {
  CalendarCheck,
  CalendarPlus,
  Flag,
  ListEnd,
  SquareArrowOutUpRight,
  UserRoundX,
} from "lucide-react";
import { getPriorityColor } from "@/app/lib/helpers";
import { cn } from "@/lib/utils";
import { TooltipComponent } from "../TooltipComponent";
import { TypeIcon } from "./TypeIcon";
import { NavLink } from "react-router";
import { SanitizedRequestCardProps } from "../assignments/AssignmentColumn";

export const RequestBasicCard = ({
  id,
  title,
  description,
  type,
  author,
  priority,
  assignedTo,
  board,
  createdAt,
  finishDate,
}: SanitizedRequestCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${
        transform ? "opacity-50" : "opacity-100 cursor-grab"
      } transition-opacity rounded-md p-0 w-[260px]`}
      {...listeners}
      {...attributes}
    >
      <Card className={`${transform ? 'border-dashed border-violet-700' : 'border-1'} py-0 gap-0`}>
        <CardHeader className="border-b !pb-0 px-3 h-9.5 flex items-center gap-2">
          <TooltipComponent text={board.name}>
            <p className="text-xs text-white size-5 font-semibold rounded flex items-center justify-center" style={{ backgroundColor: board.color }}>
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
          <span className="flex items-center gap-1 p-1 ml-auto">
            <Flag className={cn(
              "size-3",
              getPriorityColor(priority)
            )} />
            <p className="text-xs">{priority}</p>
          </span>
          <NavLink to={`/solicitudes/${id}`} onPointerDown={(e) => e.stopPropagation()}>
            <SquareArrowOutUpRight className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          </NavLink>
        </CardHeader>
        <CardContent className="px-4 !py-0 min-h-18.5 flex items-center">
          <CardDescription className="text-slate-700">
            <p className="text-xs font-semibold">{title}</p>
            <p className="text-xs">{description}</p>
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
          <span className="flex items-center justify-center bg-[#F3F3F3] p-0.5 rounded">
            <ListEnd className="size-4" strokeWidth={1.75} />
            <p className="text-xs">10</p>
          </span>
          <span className="flex items-center justify-center gap-0.5 ml-auto">
            <CalendarCheck className="size-4" strokeWidth={1.75} />
            <p className="text-xs">{finishDate}</p>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
