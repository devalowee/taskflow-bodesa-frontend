import { api } from "@/api/api";

interface BasicResponse {
  ok: boolean;
  message?: string;
}

export interface Category {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Format extends Category {
  belongsTo: {
    id: string;
    name: string;
  };
  description: string;
}

interface FormatPromiseResponse extends BasicResponse {
  formats?: Format[];
  total?: number;
}

interface CategoryPromiseResponse extends BasicResponse {
  categories?: Category[];
  total?: number;
}

interface PromiseErrorResponse {
  response: {
    data: BasicResponse;
  };
}

export const useFormats = () => {
  const getFormats = async (page: number = 1) => {
    try {
      const { data } = await api.get<FormatPromiseResponse>(`/formats?page=${page}`);

      if (!data.ok) {
        return {
          formats: [],
          total: data.total || 0,
          ok: data.ok,
          message: data.message,
        };
      }

      return {
        formats: data.formats,
        total: data.total,
        ok: data.ok,
      };
    } catch (error) {
      const { response } = error as PromiseErrorResponse;
      return {
        ...response.data
      };
    }
  }

  const getCategories = async (page: number = 1) => {
    try {
      const { data } = await api.get<CategoryPromiseResponse>(`/formats/categories?page=${page}`);

      if (!data.ok) {
        return {
          categories: [],
          total: data.total || 0,
          ok: data.ok,
          message: data.message,
        };
      }

      return {
        categories: data.categories,
        total: data.total,
        ok: data.ok,
      };
    } catch (error) {
      const { response } = error as PromiseErrorResponse;
      return {
        ...response.data
      };
    }
  }

  const createCategory = async(category: Category) => {
    try {
      const { data } = await api.post<BasicResponse>("/formats/categories", category);
      
      return {
        ok: data.ok,
        message: data.message,
      };
    } catch (error) {
      const { response } = error as PromiseErrorResponse;
      return {
        ...response.data 
      };
    }
  }

  const createFormat = async(format: { name: string, slug: string }) => {
    try {
      const { data } = await api.post<BasicResponse>("/formats", format);
      
      return {
        ok: data.ok,
        message: data.message,
      };
    } catch (error) {
      const { response } = error as PromiseErrorResponse;
      return {
        ...response.data 
      };
    }
  }

  const searchCategories = async(value: string) => {
    try {
      const { data } = await api.get<CategoryPromiseResponse>(`/formats/categories/search?value=${value}`);

      return {
        categories: data.categories,
        ok: data.ok,
        message: data.message,
      };
    } catch (error) {
      const { response } = error as PromiseErrorResponse;
      return {
        ...response.data
      };
    }
  }

  return {
    getFormats,
    getCategories,
    createFormat,
    createCategory,
    searchCategories,
  }
}