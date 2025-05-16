import { Button } from "@/components/ui/button";
import { useTaskSlice } from "@/hooks/useTaskSlice";
import { useQuery } from "@tanstack/react-query";
import { FileInput, Rocket } from "lucide-react";
import { Link } from "react-router";

export const TaskDone = () => {
  const { startCreateTask } = useTaskSlice();
  
  const { data: taskQuery } = useQuery({
    queryKey: ['created-task'],
    queryFn: async () => {
      const { taskId, ok, message } = await startCreateTask();

      return {
        taskId,
        ok,
        message
      };
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96 shadow-sm rounded-xl px-16 py-10 bg-white text-center m-auto flex flex-col gap-2">
        <Rocket className="mx-auto" size={200} strokeWidth={.70} />
        <h1 className="text-xl font-bold">{ taskQuery && taskQuery.message }</h1>
        <Link to="/tareas">
          <Button className="">
            Ver mis solicitudes
            <FileInput className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
