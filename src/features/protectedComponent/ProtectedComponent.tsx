import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/store/hooks/useAppDispatch";
import { initializeAuth, selectUserId } from "src/app/store/slices/auth/auth";
import { useNavigateTo } from "src/app/hooks/useNavigate";
import { authService } from "src/api/services/auth/auth";

export const ProtectedComponent = () => {
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();
  const { toLogin } = useNavigateTo();

  useEffect(() => {
    dispatch(initializeAuth());
    authService.setUnauthorizedCallback(toLogin);
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      if (location.pathname === "signup") {
        navigate("/signup");
      } else {
        navigate("/signin");
      }
    } else {
      navigate("/gods");
    }
  }, [userId]);

  return <Outlet></Outlet>;
};
