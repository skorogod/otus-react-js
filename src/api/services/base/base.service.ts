import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export class BaseService {
  axiosClient: AxiosInstance;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  protected setupInterceptors(): void {
    this.axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.axiosClient(originalRequest);
        }
        return Promise.reject(error);
        // else if (error.response) {
        //   const { data, status } = error.response;
        //   return Promise.reject({
        //     message: data.error,
        //     code: status,
        //     details: data,
        //   });
        // }
      }
    );
  }
}
