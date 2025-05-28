import { AlertCircle, FolderInput, Rocket } from "lucide-react";
import { Designer as UserColumnProps } from "@/hooks/interfaces/UseUsers.interface";
import { useDroppable } from "@dnd-kit/core";

const WORK_STATUS = {
  low: {
    color: "black",
    min: 0,
  },
  medium: {
    color: "yellow-500",
    min: 6,
  },
  high: {
    color: "red-500",
    min: 11,
  },
}

const nameWith15Chars = (name: string) => {
  return name.length > 15 ? name.slice(0, 15) + "..." : name;
}

export const UserColumn = ({ id, name, avatar, requests }: UserColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });


  return (
    <div className="flex gap-4 h-full">
      <div
        role="column"
        className="w-[285px] h-max bg-black/5 rounded-md flex flex-col"
      >
        <div
          role="columnheader"
          className={`px-3.5 h-10 flex items-center gap-5 bg-black text-white rounded-t-md border-2 ${
            requests.total > WORK_STATUS.high.min ? `border-${WORK_STATUS.high.color}` :
            requests.total > WORK_STATUS.medium.min ? `border-${WORK_STATUS.medium.color}` :
            `border-${WORK_STATUS.low.color}`
          }`}
        >
          <img src={avatar} alt={name} className="size-5 rounded object-cover" />
          <h1 className="text-sm font-medium flex items-center gap-1">
            {nameWith15Chars(name)} <span className="text-xs font-normal">({ requests.total })</span>
            <AlertCircle size={16} className={`${
              requests.total > WORK_STATUS.high.min ? 'bg-red-500' :
              requests.total > WORK_STATUS.medium.min ? 'bg-yellow-500' :
              'hidden'
            } rounded-full ml-2`} />
          </h1>
          <FolderInput size={20} className="ml-auto" />
        </div>
        <div className="flex p-4 text-xs justify-between">
          <div className="flex flex-col gap-2 w-6/10">
            <span className="font-semibold text-sm">Carga de trabajo</span>
            <span className="text-xs">En espera ({requests.awaiting})</span>
            <span className="text-xs">Diseñando ({requests.inProgress})</span>
            <span className="text-xs">En Revisión ({requests.pending})</span>
          </div>
          <div className="flex flex-col gap-2 w-2/5" ref={setNodeRef}>
            <div className="border border-dashed size-full rounded-md border-black bg-neutral-300 flex flex-col items-center justify-center">
              <Rocket size={26} strokeWidth={1} />
              <p>Asignar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
