import {
  AuthCredentials,
  AuthResponse,
  SignUpResponse,
  TGetProfileResponse,
} from "./interface";

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  signup(credentials: AuthCredentials): Promise<SignUpResponse>;
  refreshToken(): Promise<AuthResponse>;
  logout(): void;
  getProfile(): Promise<TGetProfileResponse>;
  setUnauthorizedCallback(callback: () => void): void;
}
