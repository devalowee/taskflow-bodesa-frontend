import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { CreateUserForm } from "./CreateUserForm"
import { useState } from "react"

export const CreateUser = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>    
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600" size="lg">
          <Plus/>
          <span>Crear usuario</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogDescription>
            Crea un nuevo usuario para tu proyecto.
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm onClose={() => { setOpen(false) }}>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
        </CreateUserForm>
      </DialogContent>
    </Dialog>
  )
}
