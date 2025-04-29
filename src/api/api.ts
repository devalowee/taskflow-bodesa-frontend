import axios from "axios";
import { env } from "@/lib/env";

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    // Solo rechazar la promesa para errores de servidor (500)
    if (error.response && error.response.status >= 500) {
      return Promise.reject(error);
    }
    
    // Para otros códigos de estado, devolver la respuesta para manejarla en el código
    return Promise.resolve(error.response);
  }
);

