import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UseUsers } from "@/hooks/UseUsers";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomAlert } from "../CustomAlert";
import { UseAuth } from "@/hooks/UseAuth";

export const DeleteUser = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState<string>("");

  const { deleteUser } = UseUsers();
  const { user } = UseAuth();

  const { mutate: deleteUserMutation, isPending } = useMutation({
    mutationFn: async () => {
      const { ok, message } = await deleteUser(id);
      if (!ok) {
        setMessage(message);
      } else {
        toast.success("Usuario Eliminado", {
          description: `El usuario con el ID${id} ha sido eliminado correctamente`,
        });

        queryClient.invalidateQueries({ queryKey: ["users"] });

        setOpen(false);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={user?.id === id}>
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Escribe 'eliminar'"
          onChange={handleInputChange}
          value={inputValue}
        />
        <small>
          Escribe <Badge className="bg-violet-500 text-white">eliminar</Badge>{" "}
          para confirmar la eliminación.
        </small>
        {message && !isPending && (
          <CustomAlert
            title="Error al eliminar el usuario"
            description={message}
            variant="destructive"
          />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600"
            disabled={inputValue !== "eliminar" || isPending}
            onClick={() => deleteUserMutation()}
          >
            { isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin-clockwise repeat-infinite" />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
