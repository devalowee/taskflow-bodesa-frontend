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
import {
  getPriorityColor,
} from "@/app/lib/helpers";
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
}: RequestCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${
        transform ? "opacity-50" : "opacity-100 cursor-grab"
      } transition-opacity rounded-md p-0`}
    >
      <Card className={`${transform && "border-dashed border-2"} py-2 gap-2`}>
        <CardHeader className="border-b !pb-[11px] px-4 flex items-center gap-2">
          <TooltipComponent text={board.name}>
            <p className="text-[9px] bg-green-700 text-white p-1 font-bold rounded">
              {board.initials}
            </p>
          </TooltipComponent>
          <TooltipComponent text={author.name}>
            <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          </TooltipComponent>
          <CalendarPlus className="size-5 bg-gray-100 p-1 rounded" />
          <Monitor className="size-5 bg-gray-100 p-1 rounded" />
          <span
            className={cn(
              "flex items-center gap-1 p-1 rounded ml-auto",
              getPriorityColor(priority)
            )}
          >
            <PriorityIcon priority={priority} />
            <p className="text-[9px]">{priority}</p>
          </span>
        </CardHeader>
        <CardContent className="px-4 min-h-16">
          <CardDescription className="text-slate-700">
            <p className="text-sm font-bold">{title}</p>
            <p className="text-sm">{description}</p>
          </CardDescription>
        </CardContent>
        <CardFooter className="px-4 !pt-2 border-t flex items-center gap-2">
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
          <span className="text-[10px] flex items-center gap-1 bg-gray-100 p-1 rounded">
            <ListEnd className="size-2.5" />
            10
          </span>
          <span className="text-[10px] flex items-center gap-1 bg-gray-100 p-1 rounded">
            <MessageSquare className="size-2.5" />
            10
          </span>
          <span className="text-[10px] flex items-center gap-1 bg-gray-100 p-1 rounded">
            <Repeat2 className="size-2.5" />
            10
          </span>
          <span className="text-[10px] flex items-center gap-1 bg-gray-100 p-1 rounded w-full justify-center">
            <Rocket className="size-2.5" />
            20/04 1:00
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
