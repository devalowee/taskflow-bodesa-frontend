import { api } from "@/api/api";
import {
  CreateUserAxiosError,
  CreateUserAxiosResponse,
  CreateUserResponse,
  DeleteUserAxiosError,
  DeleteUserAxiosResponse,
  DeleteUserResponse,
  GetUsersAxiosError,
  GetUsersAxiosResponse,
  GetUsersResponse,
  UserPayload,
} from "./interfaces/UseUsers.interface";

const getData = (data: GetUsersResponse | CreateUserResponse) => {
  if (!data.ok) {
    console.error(data.message);
    return {
      ...data,
    };
  }
  return data;
};

const getError = (error: GetUsersAxiosError | CreateUserAxiosError) => {
  const { response } = error as GetUsersAxiosError | CreateUserAxiosError;
  console.error(error);
  return {
    ...response.data,
  };
};

export const UseUsers = () => {
  const getUsers = async (page: number = 1): Promise<GetUsersResponse> => {
    try {
      const { data } = (await api.get(
        `/users/get/all?page=${page}`
      )) as GetUsersAxiosResponse;

      return getData(data);
    } catch (error) {
      return getError(error as GetUsersAxiosError);
    }
  };

  const createUser = async (user: UserPayload): Promise<CreateUserResponse> => {
    try {
      const { data } = (await api.post(
        "/users/create",
        user
      )) as CreateUserAxiosResponse;

      return getData(data);
    } catch (error) {
      return getError(error as CreateUserAxiosError);
    }
  };

  const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
    try {
      const { data } = (await api.patch(`/users/delete/${id}`)) as DeleteUserAxiosResponse;
      
      return {
        message: data.message,
        ok: data.ok,
      };
    } catch (error) {
      return getError(error as DeleteUserAxiosError);
    }
  };

  return {
    getUsers,
    createUser,
    deleteUser,
  };
};
