import { TChangeProfilePasswordParams } from "@/api/services/auth/interface";
import { TFormProps } from "../types";

export type ChangePasswordFormValues = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};

export type ChangePasswordFormErrors = Record<
  keyof ChangePasswordFormValues,
  string
>;

export type ChangePasswordFormProps = TFormProps & {
  onSubmitCb: (data: TChangeProfilePasswordParams) => void;
};
