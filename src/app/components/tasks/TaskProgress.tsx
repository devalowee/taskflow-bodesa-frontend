const Progress = {
  stepOne: "bg-violet-600",
  stepTwo: "bg-violet-600",
  stepThree: "bg-violet-600",
  stepFour: "bg-violet-600",
  stepFive: "bg-violet-600",
  stepSix: "hidden"
}

export const TaskProgress = ({ step }: { step: number }) => {
  
  return (
    <div className={`items-center gap-2 w-min mx-auto mt-8 ${ step === 6 ? Progress.stepFive : 'flex' }`}>
      <span className={`rounded-full w-16 h-2 ${ step >= 1 ? Progress.stepOne : 'bg-gray-300' }`}></span>
      <span className={`rounded-full w-16 h-2 ${ step >= 2 ? Progress.stepTwo : 'bg-gray-300' }`}></span>
      <span className={`rounded-full w-16 h-2 ${ step >= 3 ? Progress.stepThree : 'bg-gray-300' }`}></span>
      <span className={`rounded-full w-16 h-2 ${ step >= 4 ? Progress.stepFour : 'bg-gray-300' }`}></span>
      <span className={`rounded-full w-16 h-2 ${ step >= 5 ? Progress.stepFive : 'bg-gray-300' }`}></span>
    </div>
  )
}
