import { createSlice } from "@reduxjs/toolkit";

interface SessionState {
  user: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  } | null;
  isAuthenticated: 'pending' | 'authenticated' | 'unauthenticated';
}

const initialState: SessionState = {
  user: null,
  isAuthenticated: 'pending',
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = 'authenticated';
    },

    onLogout: (state) => {
      state.user = null;
      state.isAuthenticated = 'unauthenticated';
    },

    onValidateSession: (state) => {
      state.isAuthenticated = 'pending';
    }
  },
});

export const { onLogin, onLogout, onValidateSession } = sessionSlice.actions;