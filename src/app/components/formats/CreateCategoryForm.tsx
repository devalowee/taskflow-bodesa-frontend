import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Category, useFormats } from "@/hooks/useFormats";
import queryClient from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CustomAlert } from "../CustomAlert";
import { useState } from "react";
import { useParams } from "react-router";

interface CreateCategoryFormProps {
  children: React.ReactNode;
  onClose: () => void;
}

const createCategorySchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es obligatorio",
  }).max(100, {
    message: "El nombre debe tener menos de 100 caracteres",
  }),
  slug: z.string().min(1, {
    message: "El slug es obligatorio",
  }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "El slug no es válido",
  }).max(30, {
    message: "El slug debe tener menos de 20 caracteres",
  }),

});

export const CreateCategoryForm = ({ children, onClose }: CreateCategoryFormProps) => {
  const { createCategory } = useFormats();
  const [message, setMessage] = useState<string>("");

  const { page = 1 } = useParams();
  
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const { mutate: categoryMutation, isPending } = useMutation({
    mutationFn: (category: Category) => createCategory(category),
    onSuccess: (response, category) => {
      if (!response.ok) {
        throw new Error(response.message || "Error al crear la categoría");
      }

      queryClient.setQueryData(["categories", +page], (old: Category[] = []) => {
        const newCategory = {
          ...category,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        return [...old, newCategory];
      });

      toast.success("Categoría creada correctamente");
      onClose();
    },
    onError: (error) => {
      const errorMessage = error.message || "Error al crear la categoría";
      // toast.error(errorMessage);
      setMessage(errorMessage);
    }
  });

  const onSubmit = form.handleSubmit((category) => {
    const dates = new Date();
    categoryMutation({
      ...category,
      createdAt: dates.toISOString(),
      updatedAt: dates.toISOString(),
    });
  });
  
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
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
