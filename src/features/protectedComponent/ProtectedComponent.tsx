import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { SignInBlock } from "src/pages/auth/signInBlock/SignInBlock";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { initializeAuth } from "src/app/store/slices/auth/auth";
import { useNavigateTo } from "src/app/hooks/useNavigate";
import { authService } from "src/api/services/auth/auth";

export const ProtectedComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("USER", user);
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();
  const { toLogin } = useNavigateTo();

  useEffect(() => {
    dispatch(initializeAuth());
    authService.setUnauthorizedCallback(toLogin);
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      if (location.pathname === "signup") {
        navigate("/signup");
      } else {
        navigate("/signin");
      }
    } else {
      console.log("Nav to goods");
      navigate("/gods");
    }
  }, [user]);

  return <Outlet></Outlet>;
};
