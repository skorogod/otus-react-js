import { AuthCredentials } from "../../../api/services/auth/interface";

export type TLoginFormValues = {
  password: string;
  email: string;
};

export type TLoginFormProps = {
  className?: string;
  onSubmitCb: (creds: AuthCredentials) => void;
};
