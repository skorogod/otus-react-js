import { AuthCredentials, AuthResponse } from "./interface";

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  refreshToken(): Promise<AuthResponse>;
  logout(): void;
  getProfile(): Promise<AuthResponse>;
  setUnauthorizedCallback(callback: () => void): void;
}
