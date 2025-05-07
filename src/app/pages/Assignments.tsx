import { DndContext } from "@dnd-kit/core"
import { AsignmentPendingColumn } from "../components/assignments/AsignmentPendingColumn"
import { UserColumn } from "../components/assignments/UserColumn"
import { useQuery } from "@tanstack/react-query"
import { UseUsers } from "@/hooks/UseUsers"
import { toast } from "sonner"

export const Assignments = () => {
  const { getDesigners } = UseUsers()

  const { data: designers } = useQuery({
    queryKey: ["designers"],
    queryFn: async () => {
      const { designers, ok, message } = await getDesigners();

      if (!ok) {
        toast.error(message)
        return []
      };

      return designers || []
    },
  })
  
  return (
    <div className="w-full h-full">
      <DndContext>
        <div className="flex gap-4">
          <AsignmentPendingColumn />
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {designers?.map((designer) => (
              <UserColumn key={designer.id} id={designer.id} name={designer.name} avatar={designer.avatar} />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  )
}
