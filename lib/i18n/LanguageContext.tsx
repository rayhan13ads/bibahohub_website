'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type LangCode, type Translations } from './translations';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'EN',
  setLang: () => {},
  t: translations.EN,
});

const STORAGE_KEY = 'bibaho-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('EN');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  const setLang = (next: LangCode) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
