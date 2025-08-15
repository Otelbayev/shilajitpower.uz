"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Question } from "@/types/api";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data?: Question[];
}

export default function Questions({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-5">
          Tez-tez <span className="text-[#e6c65a]">so&aposraladigan</span>{" "}
          savollar
        </h2>
        <p className="text-center text-gray-400 mt-3">
          Shilajit POWER haqida eng ko&aposp so&aposraladigan savollar va
          javoblar
        </p>
        <div className="w-16 h-1 bg-[#e6c65a] mx-auto mt-3 rounded mb-10" />

        {/* FAQ List */}
        <div className="space-y-3">
          {data?.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: faq.id * 0.05 }}
              className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex justify-between items-center px-5 py-4 hover:bg-neutral-800 transition"
              >
                <span className="font-medium text-left text-base sm:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-neutral-400 transition-transform duration-300 ${
                    openIndex === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#e6c65a]/10 border border-[#e6c65a]/40 rounded-xl m-4 p-4 text-neutral-300 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 bg-[#e6c65a]/10 border border-[#e6c65a]/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
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
              className="px-5 py-2 rounded-full border border-[#e6c65a] text-[#e6c65a] hover:bg-[#e6c65a] hover:text-black transition font-medium"
            >
              Telegram orqali
            </a>
            <a
              href="tel:+998901234567"
              className="px-5 py-2 rounded-full bg-[#e6c65a] text-black hover:bg-[#d4b84f] transition font-medium"
            >
              Qo&aposng&aposiroq qiling
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
