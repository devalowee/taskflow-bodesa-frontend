import { api } from "@/api/api";
import { AxiosRequestError, AxiosResponse, RequestResponse } from "./interfaces/UseRequest.Interfaces";
import { RequestCardProps } from "@/app/components/boards/interfaces/board.interfaces";

export const UseRequest = () => {
  const createRequest = async (request: FormData): Promise<RequestResponse> => {
    try {
      const { data } = await api.post("/requests/create", request, {
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
      
      console.log(data);
      
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
    updateRequestStatus
  }
};
