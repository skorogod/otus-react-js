import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

export type Language = "ru" | "en";

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          loginLabel: "Log in",
          logoutLabel: "Log out",
          signUpLabel: "Sign up",
        },
      },
      ru: {
        translation: {
          loginLabel: "Войти",
          logoutLabel: "Выйти",
          signUpLabel: "Регистрация",
        },
      },
    },
  });

export default i18n;
