import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { SelectUsers } from "./SelectUsers"
import { UserToAdd } from "@/hooks/interfaces/UseBoards.interface"
import { useMutation } from "@tanstack/react-query"
import { UseBoards } from "@/hooks/UseBoards"
import queryClient from "@/lib/queryClient"
import { CustomAlert } from "../CustomAlert"
import { toast } from "sonner"

interface AddUsersProps {
  boardSlug: string;
  page: number | null;
}

export const AddUsers = ({ boardSlug, page = null }: AddUsersProps) => {
  const { addUsersToBoard } = UseBoards();
  const [value, setValue] = useState<UserToAdd[]>([]);
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState(false)

  const { isPending, mutate: usersToAddMutation } = useMutation({
    mutationFn: async (users: UserToAdd[]) => {
      const usersToAdd = users.map(user => user.id);
      console.log(usersToAdd);
      const { ok, message } = await addUsersToBoard(boardSlug, usersToAdd);

      if (!ok) {
        setMessage(message);
        return;
      }

      setOpen(false);
      toast.success('Usuarios agregados:', {
        description: message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users', boardSlug, page] });
    }
  });

  const handleSubmit = async () => {
    if (value.length === 0) {
      setMessage('Debes seleccionar al menos un usuario');
      return;
    }

    usersToAddMutation(value);
  }

  useEffect(() => {
    setValue([]);
  }, [open])

  if (!page) return <h1>No se ha podido cargar el componente.</h1>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>    
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600" size="lg">
          <Plus/>
          <span>Agregar usuarios</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar usuarios</DialogTitle>
          <DialogDescription>
            Agrega usuarios a tu proyecto.
          </DialogDescription>
        </DialogHeader>
        <SelectUsers boardSlug={boardSlug} value={value} setValue={setValue} />
        { message && <CustomAlert title="Ha ocurrido un error" description={message} variant="destructive"/>}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending || value.length === 0} onClick={handleSubmit}>Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}