import { Circle, CircleAlert, Clock, Clock2, OctagonAlert } from "lucide-react";

type Priority = 'BAJA' | 'NORMAL' | 'ALTA' | 'URGENTE' | string;

export const PriorityIcon = ({ priority }: { priority: Priority }) => {
  switch (priority) {
    case 'Baja':
      return <Clock className="size-2.5" />
    case 'Normal':
      return <Clock2 className="size-2.5" />
    case 'Alta':
      return <CircleAlert className="size-2.5" />
    case 'Urgente':
      return <OctagonAlert className="size-2.5" />
    default:
      return <Circle className="size-2.5" />
  }
}
