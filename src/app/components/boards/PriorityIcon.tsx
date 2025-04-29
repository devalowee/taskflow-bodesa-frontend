import { Circle, CircleAlert, Clock, Clock2, OctagonAlert } from "lucide-react";

type Priority = 'BAJA' | 'NORMAL' | 'ALTA' | 'URGENTE' | string;

export const PriorityIcon = ({ priority }: { priority: Priority }) => {
  switch (priority) {
    case 'BAJA':
      return <Clock className="size-2.5" />
    case 'NORMAL':
      return <Clock2 className="size-2.5" />
    case 'ALTA':
      return <CircleAlert className="size-2.5" />
    case 'URGENTE':
      return <OctagonAlert className="size-2.5" />
    default:
      return <Circle className="size-2.5" />
  }
}
