import { useNavigate } from "react-router-dom";

export const useNavigateTo = () => {
  const navigate = useNavigate();

  return {
    toLogin: () => navigate("/login"),
    toHome: () => navigate("/"),
  };
};
