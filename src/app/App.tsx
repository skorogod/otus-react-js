import React from "react";
import { Layout } from "src/shared/layout/Layout";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "src/providers/themeProvider/ThemeProvider";
import { LanguageProvider } from "src/providers/languageProvider/LanguageProvider";

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
