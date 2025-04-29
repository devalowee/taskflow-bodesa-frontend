import { AxiosResponse } from "axios";

// ! Get Users
export interface GetUsersAxiosResponse extends AxiosResponse {
  data: GetUsersResponse
}

export interface GetUsersAxiosError {
  response: {
    data: {
      message: string
      ok: boolean
    }
  }
}

export interface GetUsersResponse {
  response?: {
    users: User[]
    page: number
    total: number
  }
  message?: string
  ok: boolean
}

// ! Create User
export interface CreateUserAxiosResponse extends AxiosResponse {
  data: CreateUserResponse
}

export interface CreateUserResponse {
  message?: string
  ok: boolean
  user?: User
}

export interface CreateUserAxiosError {
  response: {
    data: {
      message: string
      ok: boolean
    }
  }
}

// ! Delete User
export interface DeleteUserAxiosResponse extends AxiosResponse {
  data: DeleteUserResponse
}

export interface DeleteUserResponse {
  message: string
  ok: boolean
}

export interface DeleteUserAxiosError {
  response: {
    data: DeleteUserResponse
  }
}

// ! User
type Role = 'ADMIN' | 'ADMIN_DESIGN' | 'ADMIN_PUBLISHER' | 'DESIGNER' | 'PUBLISHER' | 'SUPER_ADMIN';

export interface User {
  id: string
  name: string
  email: string
  role: Role
  active: boolean
  boards: string[]
  createdAt: string
}

export interface UserPayload {
  name: string
  email: string
  role: Role
  password: string
  boards?: string[]
}
