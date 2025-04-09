import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { SignInBlock } from "src/pages/auth/signInBlock/SignInBlock";

export const ProtectedComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  });

  if (user) {
    return <Outlet></Outlet>;
  } else {
    return <SignInBlock></SignInBlock>;
  }
};
