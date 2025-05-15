import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { sessionSlice } from "./session/sessionSlice";
import { taskSlice } from "./tasks/taskSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    session: sessionSlice.reducer,
    task: taskSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

