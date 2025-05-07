import { FolderInput, Rocket } from "lucide-react";
import { Designer as UserColumnProps } from "@/hooks/interfaces/UseUsers.interface";
import { useDroppable } from "@dnd-kit/core";

export const UserColumn = ({ id, name, avatar }: UserColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });


  return (
    <div className="flex gap-4 h-full">
      <div
        role="column"
        className="w-[285px] h-max bg-black/5 rounded-xl flex flex-col"
      >
        <div
          role="columnheader"
          className="px-3.5 h-10 flex items-center gap-5 bg-black text-white rounded-t-xl border-2 border-black"
        >
          <img src={avatar} alt={name} className="size-5 rounded object-cover" />
          <h1 className="text-sm font-medium">
            {name} <span className="text-xs font-normal">(5)</span>
          </h1>
          <FolderInput size={20} className="ml-auto" />
        </div>
        <div className="flex p-4 text-xs justify-between">
          <div className="flex flex-col gap-2 w-6/10">
            <span className="font-semibold text-sm">Carga de trabajo:</span>
            <span className="text-xs">En espera</span>
            <span className="text-xs">Diseñando</span>
            <span className="text-xs">En Revisión</span>
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
