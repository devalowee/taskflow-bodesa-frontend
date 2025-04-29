import { RequestPriority } from "@/app/components/boards/interfaces/board.interfaces";

export const priorities = {
  'LOW': 'Baja',
  'MEDIUM': 'Media',
  'HIGH': 'Alta',
}

export interface RequestPayload {
  title: string;
  description: string;
  priority: RequestPriority;
  finishDate: string;
  board: string;
  files?: FileList;
}

export interface RequestResponse {
  ok: boolean;
  message: string;
}

export interface AxiosResponse {
  data: RequestResponse;
}

export interface AxiosRequestError {
  response: {
    data: RequestResponse;
  };
}