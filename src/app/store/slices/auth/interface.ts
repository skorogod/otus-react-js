export interface TAuthState {
  token: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
}

export type TUser = {
  username: string;
  email: string;
};
