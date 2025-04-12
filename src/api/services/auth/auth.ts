import { BaseService } from "../base/base.service";
import type { AuthCredentials, AuthResponse } from "./interface";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export class AuthService extends BaseService {
  private static instance: AuthService;
  private onUnauthorized?: () => void;

  private constructor() {
    super();
    this.setupInterceptors();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public setUnauthorizedCallback(callback: () => void): void {
    this.onUnauthorized = callback;
  }

  public async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await this.axiosClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  public async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      this.handleUnauthorized();
      throw new Error("No refresh token available");
    }

    const response = await this.axiosClient.post<AuthResponse>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.handleUnauthorized();
  }

  private handleUnauthorized(): void {
    if (this.onUnauthorized) {
      this.onUnauthorized();
    }
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  protected setupInterceptors(): void {
    this.axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { token } = await this.refreshToken();
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.axiosClient(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async getProfile(): Promise<AuthResponse> {
    try {
      const response = await this.axiosClient.get("/auth/getProfile");
      if (!response.data) {
        throw new Error("response data not found");
      }
      return response.data;
    } catch (error) {
      throw new Error("Error get profile");
    }
  }
}

export const authService = AuthService.getInstance();
