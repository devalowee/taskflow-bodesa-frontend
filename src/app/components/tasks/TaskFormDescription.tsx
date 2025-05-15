import { getFileExtension, fileSize, allowedFileTypes } from "@/app/lib/helpers";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage  } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputDropFiles } from "../InputDropFiles";
import { useTaskSlice } from "@/hooks/useTaskSlice";

const descriptionSchema = z.object({
  description: z.string()
    .min(1, { message: "La descripción es requerida" })
    .max(1000, { message: "La descripción debe tener menos de 1000 caracteres" }),
  referenceFiles: z.array(z.instanceof(File)).optional()
  .refine((files) => {
    if (!files) return true;
    return Array.from(files).every((file) => {
      return file.size <= fileSize;
    });
  }, {
    message: `Los archivos deben ser menores a ${ fileSize / 1024 / 1024 }MB`,
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
});

export const TaskFormDescription = () => {
  const { data: taskData, setDataTask } = useTaskSlice();

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: taskData?.description || '',
      referenceFiles: taskData?.referenceFiles || [],
    },
  });

  const onSubmit = form.handleSubmit((dataa) => {
    setDataTask(dataa)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>¿Qué necesitas? Describe tu idea y sube lo que creas útil como referencia.</FormLabel>
              <FormControl>
                <Textarea placeholder="Escribe aquí" {...field} className="h-56 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referenceFiles"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Archivos de referencia</FormLabel>
              <FormControl>
                <InputDropFiles onFilesUpload={field.onChange} files={taskData?.referenceFiles}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-violet-700 text-white hover:bg-violet-600 text-xl font-bold py-7 w-67.5 mx-auto mt-auto">Siguiente</Button>
      </form>
    </Form>
  );
};
