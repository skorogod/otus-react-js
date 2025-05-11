import { IAuthService } from "./IAuthService";
import { AuthService } from "./auth";
import { MockAuthService } from "./MockAuthService";

// Флаг для переключения между реальным и моковым сервисом
const USE_MOCK_AUTH = false;
export const getAuthService = (): IAuthService =>
  USE_MOCK_AUTH ? MockAuthService.getInstance() : AuthService.getInstance();

// Экспортируем экземпляр сервиса для удобства использования
export const authService = getAuthService();
