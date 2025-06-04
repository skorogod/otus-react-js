import React from "react";
import { Layout } from "../shared/layout/Layout";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../providers/themeProvider/ThemeProvider";
import { LanguageProvider } from "../providers/languageProvider/LanguageProvider";

function App() {
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
