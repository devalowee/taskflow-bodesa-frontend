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
}: RequestCardProps) => {
  return (
    <div className="scale-105 rotate-1 cursor-grabbing">
      <Card className="py-2 gap-2">
        <CardHeader className="border-b !pb-[11px] px-4 flex items-center gap-2">
          <p className="text-[9px] bg-green-700 text-white p-1 font-bold rounded">
            {board.initials}
          </p>
          <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          <CalendarPlus className="size-5 bg-gray-100 p-1 rounded" />
          <Monitor className="size-5 bg-gray-100 p-1 rounded" />
          <span
            className={cn(
              "flex items-center gap-1 p-1 rounded ml-auto",
              getPriorityColor(priority)
            )}
          >
            <Circle className="size-2.5" />
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
