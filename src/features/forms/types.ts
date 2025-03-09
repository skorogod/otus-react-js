import { MutableRefObject } from "react";

export type TFormProps<Values = unknown> = {
  className?: string;
  disabled?: boolean;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<HTMLInputElement>;
};
