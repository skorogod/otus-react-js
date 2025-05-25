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

export const generateProfile: (userId: string) => TGetProfileResponse = (
  userId
) => ({
  id: userId,
  _id: userId,
  email: mockUsers.find((user) => user.id === userId)?.email || "",
  name: "test",
  commandId: "123",
  signUpDate: new Date(),
  singUpDate: Date().toString(),
});

export const generateTokens = (userId: string): AuthResponse => ({
  token: `mock_access_token_${userId}_${Date.now()}`,
  profile: generateProfile("123"),
});
