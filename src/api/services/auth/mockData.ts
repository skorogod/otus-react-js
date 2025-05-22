import { AuthResponse, TGetProfileResponse } from "./interface";

export const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    email: "admin@example.com",
  },
  {
    id: "2",
    username: "user",
    password: "user123",
    email: "user@example.com",
  },
];

export const generateTokens = (userId: string): AuthResponse => ({
  token: `mock_access_token_${userId}_${Date.now()}`,
  profile: {
    _id: userId,
    email: mockUsers.find((user) => user.id === userId)?.email || "",
  },
});

export const generateProfile: (userId: string) => TGetProfileResponse = (
  userId
) => ({
  id: userId,
  email: mockUsers.find((user) => user.id === userId)?.email || "",
  singUpDate: Date().toString(),
});
