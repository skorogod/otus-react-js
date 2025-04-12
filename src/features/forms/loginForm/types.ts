import { AuthCredentials } from "src/api/services/auth/interface";

export type TLoginFormValues = {
  password: string;
  username: string;
};

export type TLoginFormProps = {
  className?: string;
  onSubmitCb: (creds: AuthCredentials) => void;
};
