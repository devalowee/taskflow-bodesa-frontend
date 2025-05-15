import { createSlice } from "@reduxjs/toolkit";

export enum TaskPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskType {
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
  };
  currentStep: TaskStep;
}

const initialState: TaskState = {
  data: {
    type: TaskType.DIGITAL,
    title: '',
    finishDate: new Date().toISOString(),
    priority: TaskPriority.NORMAL,
    description: '',
    referenceFiles: [],
    legals: '',
    size: '',
    files: [],
    board: '',
  },
  currentStep: TaskStep.STEP_ONE,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    onSetDataTask: (state, { payload }: { payload: TaskState['data'] }) => {
      const prevTask = state;
      state.data = {
        ...prevTask.data,
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