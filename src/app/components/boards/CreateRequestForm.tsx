import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader } from "lucide-react";
import queryClient from "@/lib/queryClient";
import { CustomAlert } from '../CustomAlert';
import { RequestPriority } from "./interfaces/board.interfaces";
import { UseRequest } from "@/hooks/UseRequest";
import { getFileExtension, fileSize, getPriority, sanitizedSlug, allowedFileTypes } from "@/app/lib/helpers";
import { useSocketContext } from "@/context/SocketContext";

interface CreateRequestFormProps {
  children: React.ReactNode;
  onClose: () => void;
  boardSlug: string | undefined;
}

export const CreateRequestForm = ({
  children,
  onClose,
  boardSlug,
}: CreateRequestFormProps) => {
  const { socketEmit } = useSocketContext();
  
  const { createRequest } = UseRequest();

  const [message, setMessage] = useState<string | null>(null);

  const { mutate: createRequestMutation, isPending } = useMutation({
    mutationFn: createRequest,
    onSuccess: (data) => {
      if (!data.ok && data.message) {
        setMessage(data.message);
      } else {
        onClose();
        socketEmit("new-request", boardSlug);
        queryClient.invalidateQueries({ queryKey: ["requests", boardSlug] });
      }
    },
    onError: (error) => {
      console.log(error);
      setMessage(error.message);
    },
  });

  const createRequestSchema = z.object({
    title: z.string().min(5, {
        message: "El título debe tener al menos 5 caracteres",
      }).max(100, {
        message: "El título debe tener menos de 100 caracteres",
      }),
    description: z
      .string()
      .min(10, {
        message: "La descripción es obligatoria",
      })
      .max(1000, {
        message: "La descripción debe tener menos de 1000 caracteres",
      }),
    finishDate: z
    .string()
    .min(1, {
      message: "La fecha de finalización es obligatoria",
    })
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      },
      {
        message: "La fecha de finalización debe ser una fecha válida",
      }
    ),
    priority: z.enum(Object.values(RequestPriority) as [string, ...string[]], {
      message: "La prioridad es obligatoria",
    }),
    board: z.string().min(1, {
      message: "El tablero es obligatorio",
    }),
    files: z.instanceof(FileList).optional()
    .refine((files) => {
      if (!files) return true;
      return Array.from(files).every((file) => {
        return file.size <= fileSize;
      });
    }, {
      message: "Los archivos deben ser menores a 50MB",
    })
    .refine((files) => {
      if (!files) return true;
      return Array.from(files).every((file) => {
        return allowedFileTypes.includes(getFileExtension(file.name) || "");
      });
    }, {
      message: `Debe subir archivos de tipo ${allowedFileTypes.join(", ")}`,
    }),
  });

  const form = useForm<z.infer<typeof createRequestSchema>>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: '',
      description: '',
      finishDate: new Date().toISOString().slice(0, 16),
      priority: '',
      board: boardSlug || "No se pudo obtener el tablero",
    },
  });

  const onSubmit = form.handleSubmit((request) => {
    const formData = new FormData();

    formData.append("title", request.title);
    formData.append("description", request.description);
    formData.append("finishDate", request.finishDate);
    formData.append("priority", request.priority);
    formData.append("board", request.board);
    if (request.files) {
      for (const file of request.files) {
        formData.append("files", file);
      }
    }

    createRequestMutation(formData);
  });

  const checkDate = (date: string) => {
    const parsedDate = new Date(date);
    const now = new Date();
    return parsedDate <= now;
  }

  const finishDate = form.watch("finishDate");
  const isExpired = useMemo(() => checkDate(finishDate), [finishDate]);

  if (!boardSlug) {
    return <h1>No se pudo obtener el tablero</h1>;
  }


  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título de la solicitud" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción de la solicitud" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de finalización</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Fecha de finalización"
                  {...field}
                />
              </FormControl>
              { isExpired && (
                <small className="text-yellow-500 flex items-center gap-2">
                  <AlertCircle size={16}/>
                  La fecha de finalización ya pasó.
                </small>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridad</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(RequestPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {getPriority(priority)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablero</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={true}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona el tablero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={boardSlug || ""}>
                      {sanitizedSlug(
                        boardSlug || "No se pudo obtener el tablero"
                      )}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archivos</FormLabel>
              <FormControl>
                <Input type="file" multiple onChange={(e) => field.onChange(e.target.files)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {message && !isPending && (
          <CustomAlert
            title="¡Ha ocurrido un error!"
            description={message}
            variant="destructive"
            className="animate-zoom-in"
          />
        )}
        <div className="flex justify-end gap-2">
          {children}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin-clockwise repeat-infinite" />
                <span>creando...</span>
              </>
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
