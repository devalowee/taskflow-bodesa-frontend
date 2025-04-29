import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isSubmitting: 'idle' | 'submitting';
  message: string | null;
}

const initialState: UiState = {
  isSubmitting: 'idle',
  message: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onSubmit: (state) => {
      state.isSubmitting = 'submitting';
    },

    onIdle: (state, { payload }) => {
      state.isSubmitting = 'idle';
      state.message = payload.message;
    },

    onError: (state, { payload }) => {
      state.isSubmitting = 'idle';
      state.message = payload.message;
    },
  },
});

export const { onSubmit, onIdle, onError } = uiSlice.actions;