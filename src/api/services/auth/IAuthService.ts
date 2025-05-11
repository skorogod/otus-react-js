import { AuthCredentials, AuthResponse, SignUpResponse } from "./interface";

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  signup(credentials: AuthCredentials): Promise<SignUpResponse>;
  refreshToken(): Promise<AuthResponse>;
  logout(): void;
  getProfile(): Promise<AuthResponse>;
  setUnauthorizedCallback(callback: () => void): void;
}
