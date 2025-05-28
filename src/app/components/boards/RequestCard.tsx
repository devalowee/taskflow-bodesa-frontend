import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CalendarCheck,
  CalendarPlus,
  Flag,
  ListEnd,
  SquareArrowOutUpRight,
  UserRoundX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/app/lib/helpers";
import { SanitizedRequestCardProps } from "../assignments/AssignmentColumn";
import { TypeIcon } from "./TypeIcon";
export const RequestCard = ({
  title,
  description,
  author,
  assignedTo,
  priority,
  type,
  board,
  finishDate,
}: SanitizedRequestCardProps) => {
  return (
    <div className="scale-105 rotate-1 cursor-grabbing">
      <Card className="py-0 gap-0 border-2 border-violet-400">
        <CardHeader className="border-b !py-0 px-3 h-9.5 flex items-center gap-2">
          <p className="text-xs text-white size-5 font-semibold rounded flex items-center justify-center" style={{ backgroundColor: board.color }}>
            {board.initials}
          </p>
          <img src={author.avatar} alt="avatar" className="size-5 rounded" />
          <CalendarPlus className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
          <TypeIcon type={type} />
          <span
            className="flex items-center gap-1 p-1 ml-auto">
            <Flag className={cn(
              "size-3",
              getPriorityColor(priority)
            )} />
            <p className="text-xs">{priority}</p>
          </span>
          <SquareArrowOutUpRight className="size-5 bg-[#F3F3F3] p-0.5 rounded" />
        </CardHeader>
        <CardContent className="px-4 !py-0 min-h-18.5 flex items-center">
          <CardDescription className="text-slate-700">
            <p className="text-xs font-semibold">{title}</p>
            <p className="text-xs">{description}</p>
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
