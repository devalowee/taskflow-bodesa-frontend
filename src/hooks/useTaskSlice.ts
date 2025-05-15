import { RootState } from "@/store/store";
import { onSetCurrentStep, onSetDataTask, TaskPriority, TaskStep, TaskType } from "@/store/tasks/taskSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface TaskState {
    type?: TaskType;
    title?: string;
    finishDate?: string;
    priority?: TaskPriority;
    description?: string;
    referenceFiles?: File[];
    size?: string;
    legals?: string;
    files?: File[];
    board?: string;
}

export const useTaskSlice = () => {
  const dispatch = useDispatch();
  const { currentStep, data } = useSelector((state: RootState) => state.task);

  const setCurrentStep = (step: TaskStep) => {
    dispatch(onSetCurrentStep(step));
  }

  const setDataTask = (data: TaskState) => {
    dispatch(onSetDataTask(data));
    dispatch(onSetCurrentStep(currentStep + 1));
  }
  
  return { currentStep, data, dispatch, setCurrentStep, setDataTask };
};
