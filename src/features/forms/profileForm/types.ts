import { TUpdateProfileData } from "../../../api/services/profile/interface";
import { TFormProps } from "../types";

export type ProfileFormValues = {
  name: string;
  about: string;
};

export type ProfileFormErrors = Record<keyof ProfileFormValues, string>;
export type ProfileFormTouched = Record<keyof ProfileFormValues, boolean>;

export type ProfileFormProps = TFormProps &
  ProfileFormValues & {
    onSubmitCb: (data: TUpdateProfileData) => void;
  };
