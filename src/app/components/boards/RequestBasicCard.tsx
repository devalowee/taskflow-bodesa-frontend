import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { RequestCardProps } from "./interfaces/board.interfaces";
import {
  CalendarPlus,
  ListEnd,
  MessageSquare,
  Monitor,
  Repeat2,
  Rocket,
  UserRoundX,
} from "lucide-react";
import { getPriorityColor } from "@/app/lib/helpers";
import { cn } from "@/lib/utils";
import { PriorityIcon } from "./PriorityIcon";
import { TooltipComponent } from "../TooltipComponent";

export const RequestBasicCard = ({
  id,
  title,
  description,
  author,
  priority,
  assignedTo,
  board,
  createdAt,
  finishDate,
}: RequestCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${
        transform ? "opacity-50" : "opacity-100 cursor-grab"
      } transition-opacity rounded-md p-0 font-roboto-condensed w-[91%]`}
    >
      <Card className={`${transform ? 'border-dashed border-2' : 'border-2 border-transparent'} py-0 gap-0`}>
        <CardHeader className="border-b !pb-0 px-3 h-9.5 flex items-center gap-2">
          <TooltipComponent text={board.name}>
            <p className="text-[9px] bg-green-700 text-white p-1 px-1.5 font-bold rounded">
              {board.initials}
            </p>
          </TooltipComponent>
          <TooltipComponent text={author.name}>
            <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          </TooltipComponent>
          <TooltipComponent text={`Solicitado: ${createdAt}`}>
            <CalendarPlus className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          </TooltipComponent>
          <TooltipComponent text="Impreso">
            <Monitor className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          </TooltipComponent>
          <span
            className={cn(
              "flex items-center gap-1 p-1 rounded ml-auto",
              getPriorityColor(priority)
            )}
          >
            <PriorityIcon priority={priority} />
            <p className="text-xs">{priority}</p>
          </span>
        </CardHeader>
        <CardContent className="px-4 !py-0 min-h-18.5 flex items-center">
          <CardDescription className="text-slate-700">
            <p className="text-sm font-bold">{title}</p>
            <p className="text-[13px]">{description}</p>
          </CardDescription>
        </CardContent>
        <CardFooter className="px-3 !py-0 h-9.5 border-t flex items-center gap-1">
          {assignedTo ? (
            <img
              src={assignedTo?.avatar}
              alt="avatar"
              className="size-4 rounded"
            />
          ) : (
            <span className="bg-orange-400 p-1 rounded">
              <UserRoundX className="size-3 text-white" />
            </span>
          )}
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
