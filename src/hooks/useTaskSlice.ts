import { RootState } from "@/store/store";
import { onSetCurrentStep, TaskStep } from "@/store/tasks/taskSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useTaskSlice = () => {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => state.task);

  const setCurrentStep = (step: TaskStep) => {
    dispatch(onSetCurrentStep(step));
  }
  
  return { task, dispatch, setCurrentStep };
};
