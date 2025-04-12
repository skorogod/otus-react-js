export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
