import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE_URL", BASE_URL);

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
        console.log("etetet");
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
        console.log(2);
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.axiosClient(originalRequest);
        } else if (error.response) {
          console.log(1);
          const { data, status } = error.response;
          return Promise.reject({
            message: data.error,
            code: status,
            details: data,
          });
        }
      }
    );
  }
}
