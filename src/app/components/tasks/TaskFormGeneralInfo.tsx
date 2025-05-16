import { useForm } from "react-hook-form"
import { z } from "zod"
import { TaskPriority } from "@/store/tasks/taskSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormMessage } from "@/components/ui/form"
import { FormControl, FormItem } from "@/components/ui/form"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCallback, useMemo } from "react"
import { AlertCircle } from "lucide-react"
import { useTaskSlice } from "@/hooks/useTaskSlice"
import { Board } from "@/hooks/interfaces/UseBoards.interface"
import queryClient from "@/lib/queryClient"
import { useSearchParams } from "react-router"

const getPriority = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.LOW:
      return "Baja"
    case TaskPriority.NORMAL:
      return "Normal"
    case TaskPriority.HIGH:
      return "Alta"
    case TaskPriority.URGENT:
      return "Urgente"
    default:
      return "Baja"
  }
}

const checkDate = (date: string) => {
  const now = new Date();
  const parsedDate = new Date(date);
  return parsedDate <= now;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido" }).max(100, { message: "El título debe tener menos de 100 caracteres" }),
  finishDate: z.string().min(1, { message: "La fecha de finalización es requerida" }),
  priority: z.nativeEnum(TaskPriority),
  board: z.string({
    required_error: "El tablero es requerido",
  }),
})

export const TaskFormGeneralInfo = () => {
  const { setDataTask, data: taskData } = useTaskSlice();

  const [searchParams] = useSearchParams();

  const board = useMemo(() => {
    return searchParams.get("board");
  }, [searchParams]);

  const boards = useMemo(() => {
    return queryClient.getQueryData<Board[]>(["boards"]);
  }, []);
  
  
  const checkForExistingBoard = useCallback((board: string) => {
    if (boards) {
      console.log(boards.find((b) => b.slug === board)?.slug, board);
      return boards.find((b) => b.slug === board)?.slug;
    }
    return undefined;
  }, [boards]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: taskData?.title || '',
      finishDate: taskData?.finishDate,
      priority: taskData?.priority || TaskPriority.LOW,
      board: checkForExistingBoard(taskData?.board || board || ''),
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setDataTask(data);
  })
  
  const finishDate = form.watch("finishDate");
  const isExpired = useMemo(() => checkDate(finishDate), [finishDate]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-full mt-10 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del proyecto o campaña* (?)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="Nombre del proyecto o campaña" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="finishDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Fecha de finalización</FormLabel>    
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Fecha de finalización"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {isExpired && <article className="flex items-center gap-1.5 text-yellow-500">
                  <AlertCircle size={16} />
                  <small>La fecha de finalización ya pasó.</small>
                </article>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="w-1/2">
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
                      {Object.values(TaskPriority).map((priority) => (
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
        </div>
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablero</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona el tablero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {boards?.map((board) => (
                      <SelectItem key={board.slug} value={board.slug}>
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
        <Button className="bg-violet-700 text-white hover:bg-violet-600 text-xl font-bold py-7 w-67.5 mx-auto mt-auto">Siguiente</Button>
      </form>
    </Form>
  )
}
