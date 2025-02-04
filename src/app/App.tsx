import React from "react";
import "./App.css";
import "../i18n";
import { LanguageSwitcher } from "../shared/languageSwitcher/laguageSwitcher";
import { Header } from "../shared/header/Header";
import { ThemeProvider } from "src/providers/themeProvider/ThemeProvider";
import { LanguageProvider } from "src/providers/languageProvider/LanguageProvider";

function App() {
  return (
    <>
      <LanguageProvider>
        <ThemeProvider>
          <div className="App">
            <Header
              onLogin={() => {
                console.log("login");
              }}
              onCreateAccount={() => {
                console.log("create");
              }}
              onLogout={() => {
                console.log("logout");
              }}
            ></Header>
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
