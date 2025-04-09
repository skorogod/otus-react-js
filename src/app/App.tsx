import React, { useEffect } from "react";
import { Layout } from "src/shared/layout/Layout";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "src/providers/themeProvider/ThemeProvider";
import { LanguageProvider } from "src/providers/languageProvider/LanguageProvider";
import { useAppDispatch } from "./store/hooks/useAppDispatch";
import { initializeAuth } from "./store/slices/auth/auth";
import { useNavigateTo } from "./hooks/useNavigate";
import { authService } from "../api/services/auth/auth";

function App() {
  const dispatch = useAppDispatch();
  const { toLogin } = useNavigateTo();

  useEffect(() => {
    dispatch(initializeAuth());
    authService.setUnauthorizedCallback(toLogin);
  }, [dispatch]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout>
          <Outlet />
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
