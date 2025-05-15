import { TaskFormDescription } from "./TaskFormDescription"
import { TaskFormGeneralInfo } from "./TaskFormGeneralInfo"
import { TaskFormTecDetails } from "./TaskFormTecDetails"
import { TaskFormConfirmation } from "./TaskFormConfirmation"


export const TaskFormSelector = ({ step }: { step: number }) => {
  return (
    <>
      {step === 2 && <TaskFormGeneralInfo />}
      {step === 3 && <TaskFormDescription />}
      {step === 4 && <TaskFormTecDetails />}
      {step === 5 && <TaskFormConfirmation />}
    </>
  )
}
