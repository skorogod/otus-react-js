import { IAuthService } from "./IAuthService";
import { AuthCredentials, AuthResponse, SignUpResponse } from "./interface";
import { mockUsers, generateTokens } from "./mockData";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export class MockAuthService implements IAuthService {
  private static instance: MockAuthService;
  private onUnauthorized?: () => void;

  private constructor() {}

  public static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService();
    }
    return MockAuthService.instance;
  }

  public setUnauthorizedCallback(callback: () => void): void {
    this.onUnauthorized = callback;
  }

  public async signup(credentials: AuthCredentials): Promise<SignUpResponse> {
    console.log(credentials);
    return {} as SignUpResponse;
  }

  public async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error("Неверные учетные данные");
    }

    const response = generateTokens(user.id);
    this.setTokens(response.token, response.refreshToken || "");
    return response;
  }

  public async refreshToken(): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      this.handleUnauthorized();
      throw new Error("No refresh token available");
    }

    // Для мока просто генерируем новые токены
    const userId = refreshToken.split("_")[3];
    const response = generateTokens(userId);
    this.setTokens(response.token, response.refreshToken || "");
    return response;
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

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public async getProfile(): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    const token = this.getToken();
    if (!token) {
      throw new Error("No token available");
    }

    // Для мока извлекаем userId из токена и генерируем ответ
    const userId = token.split("_")[3];
    return generateTokens(userId);
  }
}
