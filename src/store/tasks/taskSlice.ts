import { createSlice } from "@reduxjs/toolkit";

enum TaskPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

enum TaskType {
  DIGITAL = 'DIGITAL',
  PRINTED = 'PRINTED',
  ECOMMERCE = 'ECOMMERCE',
  SPECIAL = 'SPECIAL',
}

export enum TaskStep {
  STEP_ONE = 1,
  STEP_TWO = 2,
  STEP_THREE = 3,
  STEP_FOUR = 4,
  STEP_FIVE = 5,
}

interface TaskState {
  data: {
    title: string;
    description: string;
    priority: TaskPriority;
    board: string;
    type: TaskType;
    finishDate: Date;
    legals: string;
    referenceFiles: string[];
    files: string[];
  };
  currentStep: TaskStep;
}

const initialState: TaskState = {
  data: {
    title: '',
    description: '',
    priority: TaskPriority.NORMAL,
    board: '',
    type: TaskType.DIGITAL,
    finishDate: new Date(),
    legals: '',
    referenceFiles: [],
    files: [],
  },
  currentStep: TaskStep.STEP_ONE,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    onSetDataTask: (state, { payload }: { payload: TaskState }) => {
      const prevTask = state;
      state = {
        ...prevTask,
        ...payload,
      }
    },

    onSetCurrentStep: (state, { payload }: { payload: TaskStep }) => {
      state.currentStep = payload;
    },

    onClearDataTask: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { onSetDataTask, onClearDataTask, onSetCurrentStep } = taskSlice.actions;