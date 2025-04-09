import { AuthResponse } from "./interface";

export const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@example.com",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@example.com",
  },
];

export const generateTokens = (userId: number): AuthResponse => ({
  token: `mock_access_token_${userId}_${Date.now()}`,
  refreshToken: `mock_refresh_token_${userId}_${Date.now()}`,
  user: {
    id: userId,
    username: mockUsers.find((user) => user.id === userId)?.username || "",
    email: mockUsers.find((user) => user.id === userId)?.email || "",
  },
});
