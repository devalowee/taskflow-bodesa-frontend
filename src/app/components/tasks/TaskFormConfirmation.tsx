import { useTaskSlice } from "@/hooks/useTaskSlice";
import { TaskFormPreview } from "./TaskFormPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TaskPriority, TaskStep, TaskType } from "@/store/tasks/taskSlice";
import { getFormatDate, getPriority, getTaskType } from "@/app/lib/helpers";
import { Link } from "react-router";
export const TaskFormConfirmation = () => {
  const { data, setCurrentStep } = useTaskSlice();

  const handleGoToStep = (step: TaskStep) => {
    setCurrentStep(step);
  }
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border p-2 w-full rounded-lg">
        <header className="flex items-center justify-between">
            <h2 className="font-semibold">Tipo de solicitud</h2>
            <Button variant="ghost" size="icon" onClick={() => handleGoToStep(TaskStep.STEP_ONE)}>
              <ArrowRight/>
            </Button>
        </header>
        <TaskFormPreview description={getTaskType(data?.type || TaskType.DIGITAL)} />
      </div>
      <div className="border p-2 w-full rounded-lg">
        <header className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Información general</h2>
          <Button variant="ghost" size="icon" onClick={() => handleGoToStep(TaskStep.STEP_TWO)}>
            <ArrowRight/>
          </Button>
        </header>
        <div className="grid grid-cols-2 space-y-2">
          <TaskFormPreview title="Título" description={data?.title} />
          <TaskFormPreview title="Fecha de entrega" description={getFormatDate(data?.finishDate || '')} />
          <TaskFormPreview title="Prioridad" description={getPriority(data?.priority || TaskPriority.LOW)} />
        </div>
      </div>
      <div className="border p-2 w-full rounded-lg">
        <header className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Descripción y referencias</h2>
          <Button variant="ghost" size="icon" onClick={() => handleGoToStep(TaskStep.STEP_THREE)}>
            <ArrowRight/>
          </Button>
        </header>
        <div className="space-y-2">
          <TaskFormPreview title="Descripción" description={data?.description} />
          <div className="flex flex-wrap gap-2">
            {
              data?.referenceFiles?.map((file: File, index) => (
                <img key={file.name+index} src={URL.createObjectURL(file)} alt={file.name} className="w-38 object-cover rounded" />
              ))
            }
          </div>
        </div>
      </div>
      <div className="border p-2 w-full rounded-lg">
        <header className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Detalles técnicos</h2>
          <Button variant="ghost" size="icon" onClick={() => handleGoToStep(TaskStep.STEP_FOUR)}>
            <ArrowRight/>
          </Button>
        </header>
        <div className="space-y-2">
          <div className="grid grid-cols-2 space-y-2">
            <TaskFormPreview title="Medidas" description={data?.size} />
            <TaskFormPreview title="Legales" description={data?.legals} />
          </div>
          <div className="flex flex-wrap gap-2">
            {
              data?.files?.map((file: File, index) => (
                <img key={file.name+index} src={URL.createObjectURL(file)} alt={file.name} className="w-38 object-cover rounded" />
              ))
            }
          </div>
        </div>
      </div>
      <Link to="/tareas/creada" className="mx-auto mt-auto">
        <Button 
          className="bg-violet-700 text-white hover:bg-violet-600 text-xl font-bold py-7 w-67.5"
        >
          Crear
        </Button>
      </Link>
    </div>
  )
}
