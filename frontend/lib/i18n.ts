"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./messages/uz.json";
import ru from "./messages/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: "uz",
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);
  }
});

export default i18n;
