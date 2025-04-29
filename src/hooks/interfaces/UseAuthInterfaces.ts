import { AxiosResponse } from "axios";

export interface LoginResponse extends AxiosResponse{
  user?: User
  message?: string
  ok: boolean,
  errors?: []
}

type Role = 'ADMIN' | 'ADMIN_DESIGN' | 'ADMIN_PUBLISHER' | 'DESIGNER' | 'PUBLISHER' | 'SUPER_ADMIN';

export interface User {
  id: string
  name: string
  role: Role
  avatar: string
}

