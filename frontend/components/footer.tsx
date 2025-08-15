"use client";

import { Contact } from "@/types/api";
import { Phone, Send, Instagram, Mail, Diamond } from "lucide-react";
import { motion } from "framer-motion";
import { JSX } from "react";

interface Props {
  data?: Contact[];
}

export default function Footer({ data }: Props) {
  const mock = [
    { icon: <Phone className="h-5 w-5" />, tone: "emerald" },
    { icon: <Send className="h-5 w-5" />, tone: "sky" },
    { icon: <Instagram className="h-5 w-5" />, tone: "fuchsia" },
    { icon: <Mail className="h-5 w-5" />, tone: "yellow" },
  ];

  return (
    <footer className="container">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-[#e6c65a]">
              SHILAJIT POWER
            </h2>
            <div className="w-16 h-1 bg-[#e6c65a] rounded mt-3 mb-6" />

            <p className="text-neutral-300 leading-relaxed max-w-2xl">
              Biz tabiatning eng qudratli sovg&aposasi bo&aposlgan Shilajitni
              yuqori sifat va samaradorlik bilan taqdim etamiz. Himalay
              tog&aposlarining qudrati va ming yillik tabiat kuchi – har bir
              erkakka yangi energiya, kuch va ishonch berish bizning
              missiyamizdir.
            </p>

            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                99.5% tozalik
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#e6c65a]" />
                Premium sifat
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
                30 kun kafolat
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                5000m+ balandlik
              </li>
            </ul>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-neutral-200 mb-4">
              Bog&aposlanish
            </h3>
            <div className="flex flex-col gap-4">
              {data?.length &&
                data.map((item, index) => (
                  <ContactCard
                    key={index}
                    href={item.link}
                    label={item.name}
                    value={item.icon}
                    index={index}
                    mock={mock}
                  />
                ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-6 my-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="h-px w-40 bg-neutral-800" />
          <Diamond className="h-5 w-5 text-[#e6c65a]" />
          <span className="h-px w-40 bg-neutral-800" />
        </motion.div>

        {/* Warning */}
        <motion.div
          className="border border-[#e6c65a]/60 rounded-2xl p-5 sm:p-6 bg-[#e6c65a]/5 text-neutral-300 text-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="font-semibold text-[#e6c65a] mb-1">Muhim eslatma:</p>
          <p>
            Bu mahsulot kasalliklarni davolash oldini olish yoki tashxis
            qo&aposyish uchun mo'ljallanmagan...
          </p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-8 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#e6c65a] text-black font-bold">
              SP
            </span>
            <span>© 2025 Shilajit POWER – Barcha huquqlar himoyalangan</span>
          </div>
          <nav className="flex items-center gap-6">
            <a className="hover:text-[#e6c65a] transition" href="#">
              Maxfiylik siyosati
            </a>
            <a className="hover:text-[#e6c65a] transition" href="#">
              Foydalanish shartlari
            </a>
            <a className="hover:text-[#e6c65a] transition" href="#">
              Qaytarish siyosati
            </a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}

function ContactCard({
  href,
  label,
  value,
  index,
  mock,
}: {
  href: string;
  label: string;
  value: string;
  index: number;
  mock: { icon: JSX.Element; tone: string }[];
}) {
  const toneMap: Record<string, string> = {
    emerald:
      "bg-emerald-950 ring-emerald-700/30 text-emerald-400 group-hover:ring-emerald-600/40",
    sky: "bg-sky-950 ring-sky-700/30 text-sky-400 group-hover:ring-sky-600/40",
    fuchsia:
      "bg-fuchsia-950 ring-fuchsia-700/30 text-fuchsia-400 group-hover:ring-fuchsia-600/40",
    yellow:
      "bg-yellow-950 ring-yellow-700/30 text-yellow-400 group-hover:ring-yellow-600/40",
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900/60 transition"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <span
        className={`grid place-items-center h-11 w-11 rounded-xl ring-1 ${
          toneMap[mock[index].tone]
        }`}
      >
        {mock[index].icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs text-neutral-400">{label}</span>
        <span className="text-base text-neutral-100">{value}</span>
      </span>
    </motion.a>
  );
}
