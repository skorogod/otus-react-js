import React, { useEffect } from "react";
import { Layout } from "src/shared/layout/Layout";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "src/providers/themeProvider/ThemeProvider";
import { LanguageProvider } from "src/providers/languageProvider/LanguageProvider";
import { store } from "./store";
import { Provider } from "react-redux";
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
  }, [dispatch, toLogin]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <Layout>
            <Outlet />
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
