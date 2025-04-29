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
import { Loader, UserX } from "lucide-react";
import { toast } from "sonner";
import { CustomAlert } from "../CustomAlert";
import { useCallback, useState } from "react";
import { UseAuth } from "@/hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import { UseBoards } from "@/hooks/UseBoards";
import queryClient from "@/lib/queryClient";

interface RemoveUserProps {
  userId: string;
  boardSlug: string;
  page: number;
}

export const RemoveUser = ({ userId, boardSlug, page }: RemoveUserProps) => {
  const [open, setOpen] = useState(false);

  const { user } = UseAuth();
  const { removeUserFromBoard } = UseBoards();

  const queryKey = ["users", boardSlug, page];

  const { mutate: removeUser, isPending, error } = useMutation({
    mutationFn: async () => {
      const response = await removeUserFromBoard(boardSlug, userId);
      if (!response.ok) {
        throw new Error(response.message || "Error al remover el usuario");
      }
      return response;
    },
    onSuccess: ({ message }) => {
      toast.success("Usuario removido del tablero", {
        description: message || "El usuario ha sido removido del tablero correctamente",
      });
      queryClient.invalidateQueries({ queryKey });
      setOpen(false);
    },
    // Actualización optimista
    onMutate: async () => {
      // Cancelar consultas en curso para evitar sobrescribir la actualización optimista
      await queryClient.cancelQueries({ queryKey });
      
      // Guardar el estado anterior
      const previousBoards = queryClient.getQueryData(queryKey);
      
      // Opcional: actualizar optimistamente la UI si se tiene acceso a la estructura de datos
      // Este es un ejemplo genérico, se debe adaptar a la estructura real de los datos
      /* 
      queryClient.setQueryData(["boards", 1], (old) => {
        // Lógica para actualizar el estado de manera optimista
        // Ejemplo: filtrar el usuario del tablero específico
        return old;
      });
      */
      
      return { previousBoards };
    },
    onSettled: () => {
      // Siempre revalidar después de error o éxito
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleRemoveUser = useCallback(() => {
    removeUser();
  }, [removeUser]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={user?.id === userId}>
          <UserX className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover Usuario</DialogTitle>
          <DialogDescription>
            ¿Estás seguro? El usuario será removido del tablero, pero podrá ser agregado nuevamente.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <CustomAlert
            title="Error al eliminar el usuario"
            description={error.message}
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
            disabled={isPending}
            onClick={handleRemoveUser}
          >
            {isPending ? (
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
  )
}
