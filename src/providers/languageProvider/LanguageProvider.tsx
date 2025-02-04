import * as i18next from "i18next";
import React, { ReactNode, createContext, FC } from "react";
import { useTranslation } from "react-i18next";
import type { Language } from "../../i18n";

type LanguageContextType = {
  t: i18next.TFunction;
  i18n: i18next.i18n;
  toggleLang: (lang: Language) => void;
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [t, i18n] = useTranslation();
  const toggleLang = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, i18n, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
