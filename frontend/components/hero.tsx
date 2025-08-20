"use client";
import { HeroSection } from "@/types/api";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";

interface HeroProps {
  data?: HeroSection;
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

export default function ShilajitHero({ data }: HeroProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative">
      <div className="absolute inset-0 w-full h-full bg-black/75 z-[-1]" />
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed bg-no-repeat z-[-2]"
        style={{ backgroundImage: "url('/bg1.png')" }}
      />
      <div className="container">
        <div
          className="relative min-h-screen py-10 lg:py-0 flex flex-col justify-center"
          key={i18n.language}
        >
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-30">
            <motion.div
              className="flex flex-col gap-5 justify-center items-center lg:items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="flex gap-2 items-center w-fit bg-[#e6c65a]/20 border border-[#e6c65a]/40 rounded-full px-4 py-2 text-xs text-[#e6c65a]"
                variants={fadeUp}
                custom={0.1}
              >
                <div className="w-2 h-2 bg-[#e6c65a] rounded-full"></div>
                {t("hero.min")}
              </motion.div>

              <motion.div variants={fadeUp} custom={0.2}>
                <h1 className="text-7xl fiona text-center lg:text-left sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                  {data?.title.split(" ")[0]}
                </h1>
                <h2 className="text-7xl fiona text-center lg:text-left sm:text-8xl lg:text-9xl font-bold text-[#e6c65a] leading-none tracking-tight">
                  {data?.title.split(" ")[1]}
                </h2>
              </motion.div>

              <motion.div
                className="text-gray-300 text-lg max-w-md lg:mx-0 text-center lg:text-left"
                variants={fadeUp}
                custom={0.3}
              >
                {data?.subtitle}
              </motion.div>

              <motion.div
                className="flex items-center justify-center text-center lg:text-left lg:justify-start gap-2 text-[#e6c65a]"
                variants={fadeUp}
                custom={0.4}
              >
                <span className="text-sm">{data?.description}</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-3"
                variants={fadeUp}
                custom={0.5}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#e6c65a] text-[#e6c65a]"
                    />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm">
                  ({data?.rating})
                </span>
                <span className="text-gray-500 text-sm">
                  {data?.reviews} {t("hero.comment")}
                </span>
              </motion.div>

              <motion.div
                className="inline-block text-center lg:text-left bg-[#e6c65a]/15 border border-[#e6c65a]/30 rounded-xl lg:px-6 lg:py-4 py-2 px-4 text-[#e6c65a] text-xs lg:text-sm font-medium"
                variants={fadeUp}
                custom={0.5}
              >
                {data?.microelements}
              </motion.div>

              <Link href="#order">
                <motion.button
                  className="w-fit relative  cursor-pointer bg-[#e6c65a] hover:bg-[#d1b350] text-black font-semibold px-8 py-4 text-lg rounded-xl hover:scale-101 hover:shadow-lg hover:shadow-[#e6c65a]/30"
                  variants={fadeUp}
                  custom={0.7}
                >
                  {t("hero.btn")}
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="hidden md:flex justify-center lg:justify-end"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="relative group"
                variants={fadeUp}
                custom={0.3}
              >
                <div className="rounded-2xl border border-[#e6c65a]/50 p-4 lg:p-8 w-75 lg:w-96 h-[350px] lg:h-[450px] backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#e6c65a]/20">
                  <div className="flex flex-col items-center rounded-2xl border border-[#e6c65a]/50 justify-center h-full gap-3 bg-[#e6c65a]/10">
                    {/* <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-br from-[#e6c65a] to-[#d1b350] rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300">
                    <span className="text-black font-bold text-3xl">
                      {data?.weight}
                    </span>
                  </div> */}
                    <div className="text-center">
                      <h3 className="text-[#e6c65a] fiona font-bold text-4xl tracking-wide">
                        {data?.title}
                      </h3>
                      <p className="text-gray-400 text-base">{data?.badge}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.9}
          >
            <div className="w-6 h-10 border-2 border-[#e6c65a]/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#e6c65a] rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
