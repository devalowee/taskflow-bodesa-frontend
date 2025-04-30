import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RequestCardProps } from "./interfaces/board.interfaces";
import {
  CalendarPlus,
  Circle,
  ListEnd,
  MessageSquare,
  Monitor,
  Repeat2,
  Rocket,
  UserRoundX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/app/lib/helpers";

export const RequestCard = ({
  title,
  description,
  author,
  assignedTo,
  priority,
  board,
  finishDate,
}: RequestCardProps) => {
  return (
    <div className="scale-105 rotate-1 cursor-grabbing font-roboto-condensed">
      <Card className="py-0 gap-0 border-2 border-transparent">
        <CardHeader className="border-b !py-0 px-3 h-9.5 flex items-center gap-2">
          <p className="text-[9px] bg-green-700 text-white p-1 px-1.5 font-bold rounded">
            {board.initials}
          </p>
          <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          <CalendarPlus className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          <Monitor className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          <span
            className={cn(
              "flex items-center gap-1 p-1 rounded ml-auto",
              getPriorityColor(priority)
            )}
          >
            <Circle className="size-2.5" />
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
          <span className="flex items-center justify-center gap-0.5 bg-[#F3F3F3] h-4.5 w-full rounded text-green-600">
            <Rocket className="size-3" />
            <p className="text-[10px]">{finishDate}</p>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
