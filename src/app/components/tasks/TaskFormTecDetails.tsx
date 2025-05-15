import { fileSize } from "@/app/lib/helpers";
import { getFileExtension } from "@/app/lib/helpers";
import { allowedFileTypes } from "@/app/lib/helpers"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InputDropFiles } from "../InputDropFiles";
import { useTaskSlice } from "@/hooks/useTaskSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const techDetailsSchema = z.object({
  size: z.string()
    .min(1, { message: "Las medidas son requeridas" })
    .max(100, { message: "Las medidas son de 100 caracteres" }),
  legals: z.string()
    .min(1, { message: "Los legales son requeridos" })
    .max(100, { message: "Los legales son de 100 caracteres" }),
  files: z.array(z.instanceof(File)).optional()
  .refine((files) => {
    if (!files) return true;
    return Array.from(files).every((file) => {
      return file.size <= fileSize;
    });
  }, {
    message: `Los archivos deben ser menores a ${ fileSize / 1024 / 1024 } MB`,
  })
  .refine((files) => {
    if (files && files.length > 5) return false;
    return true;
  }, {
    message: "Solo se permiten 5 archivos",
  })
  .refine((files) => {
    if (!files) return true;
    return Array.from(files).every((file) => {
      return allowedFileTypes.includes(getFileExtension(file.name) || "");
    });
  }, {
    message: `Debe subir archivos de tipo ${allowedFileTypes.join(", ")}`,
  }),
})

export const TaskFormTecDetails = () => {
  const { setDataTask, data: taskData } = useTaskSlice();
  
  const form = useForm<z.infer<typeof techDetailsSchema>>({
    resolver: zodResolver(techDetailsSchema),
    defaultValues: {
      size: taskData?.size || '',
      legals: taskData?.legals || '',
      files: taskData?.files || [],
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    setDataTask(data);
  })
  
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Medidas</FormLabel>
            <FormControl>
              <Input placeholder="15x15 Centímetros, metros, pulgadas, etc..." {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="legals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Legales</FormLabel>
            <FormControl>
              <Textarea placeholder="Escribe aquí" {...field} className="w-full h-28 resize-none" />
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
              <InputDropFiles onFilesUpload={field.onChange} files={taskData?.files} />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <Button className="bg-violet-700 text-white hover:bg-violet-600 text-xl font-bold py-7 w-67.5 mx-auto mt-auto">Siguiente</Button>
      </form>
    </Form>
  )
}
