import { api } from "@/api/api";
import { LoginResponse, User } from "./interfaces/UseAuthInterfaces";
import { useDispatch } from "react-redux";
import { onSubmit, onIdle, onError } from "@/store/ui/uiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { onLogin, onLogout, onValidateSession } from "@/store/session/sessionSlice";
import queryClient from "@/lib/queryClient";

export const UseAuth = () => {
  const dispatch = useDispatch();

  const { isSubmitting, message } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.session);
  
  const session: string | null = localStorage.getItem('session');

  const startLogin = async (email: string, password: string): Promise<void> => {
    dispatch(onSubmit());

    try {
      const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
      
      if (!data.ok) {
        dispatch(onError({ message: data.message }));
        return;
      }

      if (data.errors) {
        dispatch(onError({ message: data.errors }));
        return;
      }

      localStorage.setItem('session', 'true');

      dispatch(onIdle({ message: null }));
      dispatch(onLogin({ user: data.user }));
    } catch (error) {
      console.error(error);
      dispatch(onError({ message: 'Ha ocurrido un error desconocido. Intente nuevamente.' }));
    }
  }

  const startLogout = async (): Promise<void> => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('session');
      queryClient.clear()
      dispatch(onLogout());
    } catch (error) {
      console.error(error);
      dispatch(onError({ message: 'Ha ocurrido un error desconocido. Intente nuevamente.' }));
    }
  }

  const startValidateSession = async (): Promise<void> => {
    if (!localStorage.getItem('session')) {
      dispatch(onLogout());
      return;
    }
    
    dispatch(onValidateSession());
    try {
      const { data } = await api.get('/auth/renew');

      if (!data.ok) {
        console.error(data.message);
        localStorage.removeItem('session');
        queryClient.clear();
        dispatch(onLogout());
        return;
      }

      localStorage.setItem('session', 'true');
      dispatch(onLogin({ user: data.user }));
    } catch (error) {
      console.error(error);
      localStorage.removeItem('session');
      queryClient.clear();
      dispatch(onLogout());
    }
  }

  return {
    // ? Métodos
    startLogin,
    startLogout,
    startValidateSession,

    // ? States
    isSubmitting,
    message,
    isAuthenticated,
    user: user as User,
    session,
  }
}