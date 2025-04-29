// ? Para los tableros del usuario
export interface GetUserBoardsResponse {
  data: GetUserBoardsData
}

export interface GetBoardAxiosError {
  response: {
    data: {
      message: string
      ok: boolean
    }
  }
}

export interface Board {
  id: string
  name: string
  slug: string
  createdAt: string
}

export interface GetUserBoardsData {
  message?: string
  ok: boolean
  boards?: Board[]
}

// ? Para los usuarios del tablero
type Role = 'ADMIN' | 'SUPER_ADMIN' | 'ADMIN_DESIGN' | 'DESIGNER' | 'ADMIN_PUBLISHER' | 'PUBLISHER';

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface GetBoardUsersData {
  message?: string
  ok: boolean
  users?: User[]
  board?: Board
  total?: number
  page?: number
}

export interface GetBoardUsersResponse {
  data: GetBoardUsersData
}

// ? Para eliminar un usuario de un tablero
export interface RemoveUserFromBoardResponse {
  data: RemoveUserFromBoardData
}

export interface RemoveUserFromBoardAxiosError {
  response: {
    data: RemoveUserFromBoardData
  }
}

export interface RemoveUserFromBoardData {
  message: string
  ok: boolean
}

// ? Para obtener los usuarios para agregar a un tablero
export interface GetUsersToAddData {
  message?: string
  ok: boolean
  users?: UserToAdd[]
}

export interface UserToAdd {
  id: string
  name: string
}

export interface GetUsersToAddResponse {
  data: GetUsersToAddData
}

export interface GetUsersToAddAxiosError {
  response: {
    data: {
      message: string
      ok: boolean
    }
  }
}

// ? Para agregar usuarios a un tablero
export interface AddUsersToBoardResponse {
  data: AddUsersToBoardData
}

export interface AddUsersToBoardData {
  message: string
  ok: boolean
  users?: User[]
}

export interface AddUsersToBoardAxiosError {
  response: {
    data: {
      message: string
      ok: boolean
    }
  }
}


