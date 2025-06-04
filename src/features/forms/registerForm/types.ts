import { SignUpCredentials } from "@/api/services/auth/interface";

export type TRegisterFormValues = {
  email: string;
  password: string;
  username: string;
  repeatPassword: string;
};

export type TRegisterFormProps = {
  className?: string;
  onSubmitCb: (creds: SignUpCredentials) => void;
};
