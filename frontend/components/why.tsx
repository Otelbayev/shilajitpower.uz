"use client";
import { Why } from "@/types/api";
import {
  Bolt,
  BatteryCharging,
  Shield,
  Focus,
  Droplets,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const benefits = [
  <Bolt key="bolt" className="w-6 h-6 text-[#e6c65a]" />,
  <BatteryCharging key="battery" className="w-6 h-6 text-[#e6c65a]" />,
  <Shield key="shield" className="w-6 h-6 text-[#e6c65a]" />,
  <Focus key="focus" className="w-6 h-6 text-[#e6c65a]" />,
  <Droplets key="droplets" className="w-6 h-6 text-[#e6c65a]" />,
  <RefreshCw key="refresh" className="w-6 h-6 text-[#e6c65a]" />,
];

interface Props {
  data?: Why[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function BenefitsSection({ data }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <section className="container" key={i18n.language}>
      {/* 🔑 key i18n.language bilan */}
      <div className="text-center py-15 lg:py-30">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          {t("why.title1")}{" "}
          <span className="text-[#e6c65a]"> {t("why.titlespan")}</span>{" "}
          {t("why.title2")}
        </motion.h2>

        {/* Underline */}
        <motion.div
          className="w-16 h-1 bg-[#e6c65a] mx-auto mt-3 rounded"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
        />

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 mt-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          {t("why.desc")}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.1 * index + 0.4}
            >
              <div
                className="bg-white/5 w-full h-full transition-all duration-300 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm 
                relative group hover:-translate-y-2 hover:bg-white/10 hover:shadow-lg hover:shadow-[#e6c65a]/10"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                <div className="w-12 h-12 bg-[#e6c65a]/10 rounded-xl flex items-center justify-center mb-4">
                  {item.icon || benefits[index]}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.button
          className="mt-10 px-6 py-3 rounded-full bg-[#e6c65a]/10 text-[#e6c65a] font-semibold border border-[#e6c65a]/30 hover:bg-[#e6c65a] hover:text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.8}
        >
          {t("why.btn")}
        </motion.button>
      </div>
    </section>
  );
}
