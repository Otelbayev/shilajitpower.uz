"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Questions() {
  const faqs = [
    {
      question: "Qanday foydalaniladi?",
      answer:
        "Shilajit POWER kuniga bir marta, ertalab ovqatdan oldin ishlatiladi. Bir dona kapsula (500mg) yetarli. Iliq suv bilan qabul qiling. Eng yaxshi natija uchun kamida 2-3 oy davomida muntazam ishlatish tavsiya etiladi.",
    },
    {
      question: "Yon ta'siri bormi?",
      answer:
        "Shilajit tabiiy mahsulot bo'lib, odatda yon ta'sirlari kuzatilmaydi. Ammo individual allergik reaksiya ehtimoli mavjud.",
    },
    {
      question: "Qachon natija beradi?",
      answer:
        "Odatda muntazam foydalanilganda 2-3 hafta ichida ijobiy ta'sir seziladi.",
    },
    {
      question: "Nima uchun Shilajit POWER?",
      answer:
        "Biz yuqori sifatli, tabiiy va sinovdan o'tgan mahsulotni taqdim etamiz.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-3">
          Tez-tez <span className="text-yellow-400">so'raladigan</span> savollar
        </h2>
        <p className="text-center text-neutral-400 mb-10">
          Shilajit POWER haqida eng ko'p so'raladigan savollar va javoblar
        </p>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 bg-neutral-900 hover:bg-neutral-800 transition"
              >
                <span className="font-medium text-left text-base sm:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-neutral-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-yellow-900/10 border border-yellow-800/40 rounded-xl m-4 p-4 text-neutral-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-yellow-900/20 border border-yellow-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-white mb-1">
              Boshqa savollaringiz bormi?
            </p>
            <p className="text-neutral-400 text-sm">
              Mutaxassislarimiz sizga yordam berishga tayyor
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://t.me/ShilajitPowerUz"
              target="_blank"
              className="px-5 py-2 rounded-full bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Telegram orqali
            </a>
            <a
              href="tel:+998901234567"
              className="px-5 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition"
            >
              Qo'ng'iroq qiling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
