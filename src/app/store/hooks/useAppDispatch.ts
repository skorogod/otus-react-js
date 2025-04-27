import { useDispatch } from "react-redux";
import { AppDispatch } from "..";

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};
