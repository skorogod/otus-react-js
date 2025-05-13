export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export interface SignUpResponse {
  token: string;
  profile: {
    _id: string;
    email: string;
  };
}
