import { api } from "@/api/api";
import { AxiosRequestError, AxiosResponse, RequestResponse } from "./interfaces/UseRequest.Interfaces";
import { RequestCardProps } from "@/app/components/boards/interfaces/board.interfaces";

export const UseRequest = () => {
  const createRequest = async (request: FormData, isAuto?: boolean): Promise<RequestResponse> => {
    try {
      const { data } = await api.post(`/requests/create${isAuto ? '?isAuto=true' : ''}`, request, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }) as AxiosResponse;

      if (!data.ok) {
        console.error(data);
        return {
          ok: false,
          message: data.message,
        }
      }
      
      return data;
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosRequestError;
      return {
        ...response.data
      }
    }
  };

  const getRequests = async (slug: string): Promise<{requests?: RequestCardProps[], ok: boolean, message?: string, redirect?: boolean}> => {
    try {
      const { data } = await api.get(`/requests/${slug}`);
      return data;
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosRequestError;
      return {
        ...response.data
      }
    }
  }

  const getMyRequests = async (): Promise<{requests?: RequestCardProps[], ok: boolean, message?: string }> => {
    try {
      const { data } = await api.get("/requests/get-my-requests");
      return data;
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosRequestError;
      return {
        ...response.data
      }
    }
  }

  const updateRequestStatus = async (request: RequestCardProps): Promise<RequestResponse> => {
    try {
      const { data } = await api.patch(`/requests/${request.id}`, {
        status: request.status
      }) as AxiosResponse;

      if (!data.ok) {
        console.error(data);
        return {
          ok: false,
          message: data.message,
        }
      }
      
      return data;
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosRequestError;
      return {
        ...response.data
      }
    }
  }

  return {
    createRequest,
    getRequests,
    getMyRequests,
    updateRequestStatus
  }
};
