import { CreateTaksStepOne } from "@/app/components/tasks/CreateTaksStepOne";
import { useTaskSlice } from "@/hooks/useTaskSlice";
import { ElementType, useState } from "react";

export interface Step {
  step: number;
  title: string;
  description?: string;
  component: ElementType;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Selecciona el Tipo de Solicitud",
    component: CreateTaksStepOne
  },
  {
    step: 2,
    title: "Información General",
    description: "Llena este formulario con los detalles de tu solicitud para que nuestro equipo de diseño pueda ayudarte de manera efectiva. ¡Entre más claro seas, mejor será el resultado!",
    component: CreateTaksStepOne
  },
  {
    step: 3,
    title: "Descripción y referencias",
    component: CreateTaksStepOne
  },
  {
    step: 4,
    title: "Detalles Técnicos",
    component: CreateTaksStepOne
  },
  {
    step: 5,
    title: "Confirmación",
    component: CreateTaksStepOne
  },
]

export const CreateTask = () => {
  const [step, setStep] = useState<Step>(steps[0]);
  const { task } = useTaskSlice();

  return (
    <div className="p-6 bg-gray-100 rounded-lg max-w-1/2 mx-auto min-h-3/4 flex flex-col items-center relative">
      <div className="size-7.5 rounded-full bg-violet-700 flex items-center justify-center absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="text-sm font-medium text-white">{step.step}</span>
      </div>
      <h1 className="text-2xl font-semibold my-2">{step.title}</h1>
      {step.description && <p className="text-gray-500">{step.description}</p>}

      {
        <step.component steps={steps} setStep={setStep} currentStep={task.currentStep} />
      }
    </div>
  )
}
