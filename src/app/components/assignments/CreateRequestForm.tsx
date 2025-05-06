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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader } from "lucide-react";
import queryClient from "@/lib/queryClient";
import { CustomAlert } from '../CustomAlert';
import { RequestPriority } from "@/app/components/boards/interfaces/board.interfaces";
import { UseRequest } from "@/hooks/UseRequest";
import { getPriority } from "@/app/lib/helpers";
import { UseBoards } from "@/hooks/UseBoards";
import { UseAuth } from "@/hooks/UseAuth";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface CreateRequestFormProps {
  children: React.ReactNode;
  onClose: () => void;
}

const allowedTypes = [
  '.jpg',
  '.png',
  '.pdf',
  '.jpeg',
  '.gif',
  '.webp',
  '.heic',
  '.heif',
  '.mp3',
  '.mp4',
  '.mov',
  '.avi',
  '.wmv',
  '.mkv',
  '.flv',
  '.webm',
  '.zip',
  '.wav',
  '.jfif'
];

const fileSize = 50 * 1024 * 1024; // 50MB

const getFileExtension = (fileName: string) => {
  return '.' + fileName.split('.').pop()?.toLowerCase();
}

export const CreateRequestForm = ({
  children,
  onClose,
}: CreateRequestFormProps) => {
  
  const { createRequest } = UseRequest();
  const { getUserBoards } = UseBoards();
  const { user } = UseAuth();

  const [message, setMessage] = useState<string | null>(null);

  const { data: boards } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { boards, ok, message } =  await getUserBoards(user?.role);

      if (!ok) {
        toast.error(message || "Error al obtener los tableros");
        return [];
      }

      return boards;
    },
  });

  const { mutate: createRequestMutation, isPending } = useMutation({
    mutationFn: (request: FormData) => createRequest(request, true),
    onSuccess: (data) => {
      if (!data.ok && data.message) {
        setMessage(data.message);
      } else {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["my-requests"] });
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
        message: "La descripción debe tener al menos 10 caracteres",
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
        return allowedTypes.includes(getFileExtension(file.name) || "");
      });
    }, {
      message: `Debe subir archivos de tipo ${allowedTypes.join(", ")}`,
    }),
  });

  const form = useForm<z.infer<typeof createRequestSchema>>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: '',
      description: '',
      finishDate: new Date().toISOString().slice(0, 16),
      priority: '',
      board: '',
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

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
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
                <Textarea placeholder="Descripción de la solicitud" className="resize-none" {...field} maxLength={1000}/>
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
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona el tablero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {boards?.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
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
