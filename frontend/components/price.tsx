"use client";

import { useState } from "react";
import { Price } from "@/types/api";
import { motion } from "framer-motion";
import { PriceCard } from "./price-plan";
import { useTranslation } from "react-i18next";

interface Props {
  data?: Price[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function PricingPlans({ data }: Props) {
  const [isSubscription, setIsSubscription] = useState(false);

  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  return (
    <section className="container">
      <div className="py-15 lg:pb-30">
        <motion.h2
          className="text-center text-3xl md:text-5xl font-extrabold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          {t("price.title1")}{" "}
          <span className="text-[#e6c65a]">{t("price.titlespan")}</span>{" "}
          {t("price.title2")}
        </motion.h2>

        <div className="flex items-center flex-col justify-between m-8 ">
          <div className="flex items-center gap-3 text-sm border border-gray-400 bg-yellow-100/10 py-2 px-4 rounded-lg w-fit">
            <span className="text-gray-400">{t("price.buy")}</span>
            <div
              className={`relative inline-block w-10 h-5 ${
                isSubscription ? " bg-green-600" : " bg-gray-600"
              } bg-gray-600 rounded-full cursor-pointer`}
              onClick={() => setIsSubscription((prev) => !prev)}
            >
              <div
                className={`absolute top-0 w-5 h-5 bg-[#e6c65a] rounded-full transition-all duration-300 ${
                  isSubscription ? "left-5 bg-white" : "bg-[#e6c65a] left-0"
                }`}
              ></div>
            </div>
            <span className="text-gray-400">{t("price.sale")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <PriceCard
                data={item}
                index={index}
                isSubscription={isSubscription}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-10">
          🔒 {t("price.f1")} • 🚚 {t("price.f2")} • 💯 {t("price.f3")}
        </div>
      </div>
    </section>
  );
}
