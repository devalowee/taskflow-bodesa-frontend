import { api } from "@/api/api";
import {
  AddUsersToBoardAxiosError,
  AddUsersToBoardData,
  AddUsersToBoardResponse,
  GetBoardAxiosError,
  GetBoardUsersData,
  GetBoardUsersResponse,
  GetUserBoardsData,
  GetUserBoardsResponse,
  GetUsersToAddAxiosError,
  GetUsersToAddData,
  GetUsersToAddResponse,
  RemoveUserFromBoardAxiosError,
  RemoveUserFromBoardData,
  RemoveUserFromBoardResponse,
} from "./interfaces/UseBoards.interface";

const getData = (data: GetUserBoardsData | GetBoardUsersData) => {
  if (!data.ok) {
    console.error(data.message);
    return {
      ...data,
    };
  }
  return data;
};

const getError = (error: GetBoardAxiosError) => {
  const { response } = error;
  console.error(error);
  return {
    ...response.data,
  };
};

export const UseBoards = () => {
  const getBoards = async (): Promise<GetUserBoardsData> => {
    try {
      const { data } = (await api.get(
        "/boards/get/all"
      )) as GetUserBoardsResponse;
      return getData(data);
    } catch (error) {
      return getError(error as GetBoardAxiosError);
    }
  };

  const getBoardUsers = async (
    boardSlug?: string,
    page: number = 1
  ): Promise<GetBoardUsersData> => {
    if (!boardSlug) {
      return {
        ok: false,
        message: "No se ha proporcionado el slug del tablero",
      };
    }
    try {
      const { data } = (await api.get(
        `/boards/get-board-users/${boardSlug}?page=${page}`
      )) as GetBoardUsersResponse;
      return getData(data);
    } catch (error) {
      return getError(error as GetBoardAxiosError);
    }
  };

  const getUserBoards = async (role: string): Promise<GetUserBoardsData> => {
    try {
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        const { data } = (await api.get(
          "/boards/get/all"
        )) as GetUserBoardsResponse;
        return getData(data);
      } else {
        const { data } = (await api.get(
          "/boards/get-user-boards"
        )) as GetUserBoardsResponse;
        return getData(data);
      }
    } catch (error) {
      return getError(error as GetBoardAxiosError);
    }
  };

  const removeUserFromBoard = async (
    boardSlug: string,
    userId: string
  ): Promise<RemoveUserFromBoardData> => {
    try {
      const { data } = (await api.patch(
        `/boards/remove/${userId}/from/${boardSlug}`
      )) as RemoveUserFromBoardResponse;

      if (!data.ok) {
        return {
          ok: false,
          message: data.message,
        };
      }

      return {
        ok: true,
        message: data.message,
      };
    } catch (error) {
      return getError(error as RemoveUserFromBoardAxiosError);
    }
  };

  const getUsersToAdd = async (boardSlug: string): Promise<GetUsersToAddData> => {
    try {
      const { data } = (await api.get(`/boards/${boardSlug}/available-users`)) as GetUsersToAddResponse;

      if (!data.ok) {
        return {
          ok: data.ok,
          message: data.message,
        };
      }

      return {
        ok: data.ok,
        users: data.users,
      };
    } catch (error) {
      return getError(error as GetUsersToAddAxiosError);
    }
  };

  const addUsersToBoard = async (boardSlug: string, users: string[]): Promise<AddUsersToBoardData> => {
    try {
      const { data } = (await api.post(`/boards/${boardSlug}/add-users`, { users })) as AddUsersToBoardResponse;

      if (!data.ok) {
        return {
          ok: data.ok,
          message: data.message,
        };
      }

      return {
        ok: data.ok,
        message: data.message,
        users: data.users,
      };
      
    } catch (error) {
      return getError(error as AddUsersToBoardAxiosError);
    }
  }
  
  return {
    getUserBoards,
    getBoards,
    getBoardUsers,
    removeUserFromBoard,
    getUsersToAdd,
    addUsersToBoard,
  };
};
