"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import { useEffect } from "react";

export default function Providers({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang && savedLang !== params.locale) {
      i18n.changeLanguage(savedLang);
    } else {
      localStorage.setItem("lang", params.locale);
      i18n.changeLanguage(params.locale);
    }
  }, [params.locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
