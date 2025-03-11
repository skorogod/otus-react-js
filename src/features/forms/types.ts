import { MutableRefObject } from "react";

export type TFormProps = {
  className?: string;
  disabled?: boolean;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<HTMLInputElement>;
};
