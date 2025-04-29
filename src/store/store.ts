import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { sessionSlice } from "./session/sessionSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    session: sessionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

