import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { RequestPriority, RequestStatus } from "../boards/interfaces/board.interfaces";
import { getPriority, getStatus } from "@/app/lib/helpers";
import { AvatarTask } from "./AvatarTask";
import { UserX } from "lucide-react";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  finishDate: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar: string;
  };
  priority: RequestPriority;
  type: string;
  board: {
    name: string;
    color: string;
  };
}

interface TaskCardProps {
  task: TaskProps;
}

export const Task = ({ task }: TaskCardProps) => {
  return (
    <section className="w-full">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{task.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-semibold bg-gray-200">{ getStatus(task.status) }</Badge>
            <p className="text-sm text-gray-500">Creada: { format(task.createdAt, 'dd/MM/yyyy, HH:mm', { locale: es }) }</p>
          </div>
        </div>
        <Button>
          Marcar como completada
        </Button>
      </header>
      <div className="mt-6 border border-gray-300 p-6 rounded-lg flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-2">Detalles de la solicitud</h2>
          <div className="flex items-center gap-2">
            <small className="font-semibold text-gray-500">Prioridad:</small>
            <Badge className="font-semibold">{ getPriority(task.priority) }</Badge>
          </div>
        </div>
        <div>
          <small className="font-semibold text-gray-500">Descripción</small>
          <p>{task.description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <small className="font-semibold text-gray-500">Fecha de entrega</small>
            <p className="font-medium">{ format(task.finishDate, 'dd/MM/yyyy, HH:mm', { locale: es }) }</p>
          </div>
          <div className="flex flex-col gap-1">
            <small className="font-semibold text-gray-500">Autor</small>
            <AvatarTask name={task.author.name} avatar={task.author.avatar} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <small className="font-semibold text-gray-500">Responsable</small>
          { task.assignedTo ? 
            <AvatarTask name={task.assignedTo.name} avatar={task.assignedTo.avatar} /> : 
            <div className="flex items-center gap-2">
              <UserX size={24} className="bg-orange-400 rounded p-1" />
              <p>Sin asignar</p>
            </div>
          }
        </div>
      </div>
    </section>
  )
}
