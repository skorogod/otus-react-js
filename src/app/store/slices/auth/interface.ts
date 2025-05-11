export interface TAuthState {
  token: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    email: string;
  } | null;
}

export type TUser = {
  email: string;
};
