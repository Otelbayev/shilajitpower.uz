"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("uz"); // default doim uz

  useEffect(() => {
    // localStorage dan tilni o‘qish
    const savedLang = localStorage.getItem("lang") || "uz";
    i18n.changeLanguage(savedLang);
    setLang(savedLang);
  }, [i18n]);

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    localStorage.setItem("lang", lng); // saqlab qo‘yish
  };

  return (
    <div className="flex gap-2 relative z-90 mb-4">
      <button
        onClick={() => switchLanguage("uz")}
        className={`px-4 py-2 rounded-full flex items-center text-sm font-medium border transition ${
          lang === "uz"
            ? "bg-[#e6c65a] text-black border-[#e6c65a]"
            : "bg-transparent text-[#e6c65a] border-[#e6c65a]/50 hover:bg-[#e6c65a]/20"
        }`}
      >
        <Image src={"/uz.png"} alt="uzbekistan" width={30} height={20} /> UZ
      </button>
      <button
        onClick={() => switchLanguage("ru")}
        className={`px-4 py-2 rounded-full flex items-center text-sm font-medium border transition ${
          lang === "ru"
            ? "bg-[#e6c65a] text-black border-[#e6c65a]"
            : "bg-transparent text-[#e6c65a] border-[#e6c65a]/50 hover:bg-[#e6c65a]/20"
        }`}
      >
        <Image src={"/ru.png"} alt="russian" width={30} height={20} /> RU
      </button>
    </div>
  );
}
