import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Format, useFormats } from "@/hooks/useFormats";
import queryClient from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CustomAlert } from "../CustomAlert";
import { useState } from "react";
import { useParams } from "react-router";
import { SelectFormatsCategories } from "./SelectFormatsCategories";
import { Textarea } from "@/components/ui/textarea";

interface CreateFormatFormProps {
  children: React.ReactNode;
  onClose: () => void;
}

const createFormatSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es obligatorio",
  }).max(100, {
    message: "El nombre debe tener menos de 100 caracteres",
  }),
  description: z.string().min(1, {
    message: "La descripción es obligatoria",
  }).max(500, {
    message: "La descripción debe tener menos de 500 caracteres",
  }),
  belongsTo: z.string().min(1, {
    message: "La categoría es obligatoria",
  }),
  slug: z.string().min(1, {
    message: "El slug es obligatorio",
  }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "El slug no es válido",
  }).max(30, {
    message: "El slug debe tener menos de 20 caracteres",
  }),

});

export const CreateFormatForm = ({ children, onClose }: CreateFormatFormProps) => {
  const { createFormat } = useFormats();
  const [message, setMessage] = useState<string>("");

  const { page = 1 } = useParams();
  
  const form = useForm<z.infer<typeof createFormatSchema>>({
    resolver: zodResolver(createFormatSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      belongsTo: ''
    },
  });

  const { mutate: formatMutation, isPending } = useMutation({
    mutationFn: (format: { name: string, slug: string }) => createFormat(format),
    onSuccess: (response, format) => {
      if (!response.ok) {
        throw new Error(response.message || "Error al crear el formato");
      }

      queryClient.setQueryData(["formats", +page], (old: Format[] = []) => {
        const newFormat = {
          ...format,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        return [...old, newFormat];
      });

      toast.success("Formato creado correctamente");
      onClose();
    },
    onError: (error) => {
      const errorMessage = error.message || "Error al crear el formato";
      // toast.error(errorMessage);
      setMessage(errorMessage);
    }
  });

  const onSubmit = form.handleSubmit((format) => {
    formatMutation(format);
  });
  
  return (
    <Form {...form}>
      <form className="space-y-4 max-h-[60dvh] overflow-y-auto" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre del formato" />
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
                <Textarea {...field} placeholder="Descripción del formato" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="belongsTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pertenece a</FormLabel>
              <FormControl>
                <SelectFormatsCategories value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ejemplo-de-slug" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { (message && !isPending) && <CustomAlert variant="destructive" title="Ha ocurrido un error!" description={message} /> }
        <div className="flex justify-end gap-2">
          { children }
          <Button type="submit" disabled={isPending}>
            { isPending ? "Creando..." : "Crear" }
          </Button>
        </div>
      </form>
    </Form>
  )
}
