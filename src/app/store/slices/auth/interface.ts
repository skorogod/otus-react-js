import { TStatus } from "../types";

export interface TAuthState {
  token: string | null;
  refreshToken: string | null;
  user: TProfile | null;
  error: string;
  status: TStatus;
}

export type TProfile = {
  id: string;
  _id: string;
  name: string;
  email: string;
  signUpDate: Date;
  commandId: string;
};
