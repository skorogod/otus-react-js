import { AxiosError } from "axios";

export type TApiError = {
  name: string;
  stack: string;
  message: string;
  extensions: {
    code: string;
  };
};

export type TApiResponseError = AxiosError<{ errors: TApiError[] }>;
