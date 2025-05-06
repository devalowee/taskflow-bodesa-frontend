import { api } from "@/api/api";
import {
  CreateUserAxiosError,
  CreateUserAxiosResponse,
  CreateUserResponse,
  DeleteUserAxiosError,
  DeleteUserAxiosResponse,
  DeleteUserResponse,
  GetDesignersAxiosError,
  GetDesignersAxiosResponse,
  GetDesignersResponse,
  GetUsersAxiosError,
  GetUsersAxiosResponse,
  GetUsersResponse,
  UserPayload,
} from "./interfaces/UseUsers.interface";

const getData = (data: GetUsersResponse | CreateUserResponse | GetDesignersResponse) => {
  if (!data.ok) {
    console.error(data.message);
    return {
      ...data,
    };
  }
  return data;
};

const getError = (error: GetUsersAxiosError | CreateUserAxiosError | GetDesignersAxiosError) => {
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

  const getDesigners = async (): Promise<GetDesignersResponse> => {
    try {
      const { data } = (await api.get("/users/designers")) as GetDesignersAxiosResponse;
      return getData(data);
    } catch (error) {
      return getError(error as GetDesignersAxiosError);
    }
  };

  return {
    getUsers,
    createUser,
    deleteUser,
    getDesigners,
  };
};
