import { api } from "@/api/api";
import { RootState } from "@/store/store";
import { onClearDataTask, onSetCurrentStep, onSetDataTask, TaskPriority, TaskStep, TaskType } from "@/store/tasks/taskSlice";
import { AxiosResponse } from "axios";
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

interface AxiosTask {
  taskId?: string;
  ok: boolean;
  message: string;
}

interface TaskResponse {
  data: AxiosTask;
}

interface TaskAxiosResponse extends AxiosResponse {
  response: {
    data: AxiosTask;
  }
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

  const onClearTask = () => {
    dispatch(onClearDataTask());
  }
  
  const startCreateTask = async (): Promise<AxiosTask> => {
    // Crear un nuevo FormData para enviar los datos incluyendo archivos
    const formData = new FormData();
    
    // Recorrer todas las propiedades del objeto data
    Object.entries(data).forEach(([key, value]) => {
      // Manejar arrays de archivos (referenceFiles y files)
      if (key === 'referenceFiles' || key === 'files') {
        if (value && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append(`${key}`, file);
          });
        }
      } 
      // Manejar el resto de propiedades
      else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    try {
      const { data:taskRes } = await api.post('/requests/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }) as TaskResponse;

      if (taskRes.ok) {
        onClearTask();
      }

      return {
        ...taskRes
      }
    } catch (error) {
      const { response } = error as TaskAxiosResponse;
      
      console.error(error);
      return {
        ...response.data
      }
    }
  }
  
  return { 
    currentStep,
    data,
    dispatch, 
    setCurrentStep,
    setDataTask,
    onClearTask,
    startCreateTask 
  };
};
