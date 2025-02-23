import React from "react";
import { useLang } from "../../hooks/useLang";

export const LanguageSwitcher = () => {
  const langContext = useLang();

  return (
    <button onClick={() => langContext.toggleLang(langContext.i18n.resolvedLanguage === "ru" ? "en" : "ru")}>
      {langContext.i18n.resolvedLanguage === "ru" ? "EN" : "RU"}
    </button>
  );
};
