import { Roles } from "@/app/lib/helpers";
import { AxiosResponse } from "axios";

export interface LoginResponse extends AxiosResponse{
  user?: User
  message?: string
  ok: boolean,
  errors?: []
}


export interface User {
  id: string
  name: string
  role: Roles
  avatar: string
}

