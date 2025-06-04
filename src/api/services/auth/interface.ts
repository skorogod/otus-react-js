import { TProfile } from "../../../app/store/slices/auth/interface";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends AuthCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  profile: {
    _id: string;
    email: string;
    signUpDate: Date;
    name: string;
    commandId: string;
  };
}

export type TGetProfileResponse = TProfile;

export interface SignUpResponse {
  token: string;
  profile: TProfile;
}

export type TChangeProfilePasswordParams = {
  password: string;
  newPassword: string;
};
