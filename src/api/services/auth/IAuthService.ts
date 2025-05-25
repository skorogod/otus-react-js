import {
  AuthCredentials,
  AuthResponse,
  SignUpCredentials,
  SignUpResponse,
  TGetProfileResponse,
} from "./interface";

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  signup(credentials: SignUpCredentials): Promise<SignUpResponse>;
  refreshToken(): Promise<AuthResponse>;
  logout(): void;
  getProfile(): Promise<TGetProfileResponse>;
  setUnauthorizedCallback(callback: () => void): void;
}
