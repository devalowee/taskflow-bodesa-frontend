import { TaskTypeConfirmation } from "@/app/components/tasks/TaskTypeConfirmation";
import { TaskProgress } from "@/app/components/tasks/TaskProgress";
import { useTaskSlice } from "@/hooks/useTaskSlice";
import { useEffect, useState } from "react";
import { TaskFormSelector } from "@/app/components/tasks/TaskFormSelector";

export interface Step {
  step: number;
  title: string;
  description?: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Selecciona el Tipo de Solicitud",
  },
  {
    step: 2,
    title: "Información General",
    description: "Llena este formulario con los detalles de tu solicitud para que nuestro equipo de diseño pueda ayudarte de manera efectiva. ¡Entre más claro seas, mejor será el resultado!",
  },
  {
    step: 3,
    title: "Descripción y referencias",
  },
  {
    step: 4,
    title: "Detalles Técnicos",
  },
  {
    step: 5,
    title: "Confirmación",
    description: "Revisa los detalles y confirma tu solicitud.",
  },
]

export const CreateTask = () => {
  const [step, setStep] = useState<Step>(steps[0]);
  const { currentStep } = useTaskSlice();

  useEffect(() => {
    setStep(steps[currentStep - 1]);
  }, [currentStep]);

  return (
    <div className="max-w-[650px] w-full h-full max-h-[720px] mx-auto relative">
      <div className="size-7.5 rounded-full bg-violet-700 flex items-center justify-center absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="text-sm font-medium text-white">{currentStep}</span>
      </div>
      <div className="py-6 px-16 bg-white rounded-lg w-full h-full overflow-y-auto flex flex-col items-center shadow-sm">
        <h1 className="text-2xl font-semibold my-2">{step.title}</h1>
        {step.description && <p className="text-gray-500">{step.description}</p>}

        {
          currentStep === 1 ? (
            <TaskTypeConfirmation currentStep={currentStep} />
          ) : (
            <TaskFormSelector step={currentStep} />
          )
        }
      </div>
      <TaskProgress step={currentStep} />
    </div>
  )
}
