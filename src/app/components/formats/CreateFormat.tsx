import { Button } from "@/components/ui/button"
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { CreateFormatForm } from "./CreateFormatForm"
import { useState } from "react"
import { CreateCategoryForm } from "./CreateCategoryForm"

export const CreateFormat = ({ type }: { type: 'format' | 'category' }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>    
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600" size="lg">
          <Plus/>
          <span>{type === 'format' ? 'Crear Formato' : 'Crear Categoría'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'format' ? 'Crear formato' : 'Crear categoría'}</DialogTitle>
          <DialogDescription>
            Crea un nuevo {type === 'format' ? 'formato' : 'categoría'} para el tipo de tarea.
          </DialogDescription>
        </DialogHeader>
        { type === 'format' ? (
          <CreateFormatForm onClose={() => { setOpen(false) }}>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          </CreateFormatForm>
        ) : (
          <CreateCategoryForm onClose={() => { setOpen(false) }}>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
          </CreateCategoryForm>
        )}
      </DialogContent>
    </Dialog>
  )
}
