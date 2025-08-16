"use client";

import { Whom } from "@/types/api";
import { Dumbbell, LucideIcon, Briefcase, User } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // 🔥 qo‘shildi

interface Props {
  data?: Whom[];
}

const iconMap: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  briefcase: Briefcase,
  user: User,
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const descVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom?: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (custom || 0) * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function TargetGroups({ data }: Props) {
  const { t } = useTranslation(); // 🔥 qo‘shildi

  return (
    <section className="container">
      <div className="pb-15 lg:pb-30">
        {/* Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-5"
        >
          <span className="text-[#e6c65a]">{t("whom.titlespan")}</span>{" "}
          {t("whom.title")}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-16 h-1 bg-[#e6c65a] mx-auto mt-3 rounded"
          initial={{ scaleX: 0 }}
          whileInView={{
            scaleX: 1,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          viewport={{ once: true }}
        />

        {/* Description */}
        <motion.div
          variants={descVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-sm sm:text-base text-gray-400 mt-3"
        >
          {t("whom.desc")}
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4 lg:flex-row justify-center pt-10 px-5">
          {data?.length &&
            data.map((item, index) => {
              const Icon = iconMap[item.icon];

              const ben: string[] = [];
              if (item.benefits) {
                try {
                  const parsed =
                    typeof item.benefits === "string"
                      ? JSON.parse(item.benefits)
                      : item.benefits;
                  if (Array.isArray(parsed)) ben.push(...(parsed as string[]));
                } catch (err) {
                  console.warn("Benefits parse error:", err);
                }
              }

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="transition-all duration-300 hover:scale-101 group bg-white/5 w-full h-full text-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto border border-neutral-800 flex flex-col items-center gap-4 ">
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                    <div className="relative">
                      <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-2 border-neutral-700">
                        <Image
                          src={item.image || "/ava.png"}
                          alt={item.who}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="absolute -bottom-2 -right-2 bg-[#e6c65a] w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                        <Icon className="text-black w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-center">
                      {item.who}
                    </h2>

                    <div className="w-full flex flex-col gap-3">
                      <div className="bg-red-900 rounded-lg p-4">
                        <p className="text-red-300 text-xs sm:text-sm font-semibold uppercase">
                          {t("whom.problem")}
                        </p>
                        <p className="text-white text-sm sm:text-base">
                          {item.problem}
                        </p>
                      </div>

                      <div className="bg-[#3e3b1d] rounded-lg p-4">
                        <p className="text-[#e6c65a] text-xs sm:text-sm font-semibold uppercase">
                          {t("whom.solution")}
                        </p>
                        <p className="text-white text-sm sm:text-base">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <p className="text-xs sm:text-sm font-semibold uppercase mb-2 text-white">
                        {t("whom.benefits")}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                        {ben.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          className="mt-12 max-w-5xl mx-auto bg-[#1a1a1a] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-800"
        >
          <p className="text-base sm:text-lg font-medium text-center md:text-left">
            {t("whom.footerTitle")}
            <span className="block text-gray-400 text-xs sm:text-sm mt-1">
              {t("whom.footerSubtitle")}
            </span>
          </p>
          <Link href={"#contact"}>
            <button className="bg-[#e6c65a] relative z-80 cursor-pointer text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#d4b84f] transition text-sm sm:text-base">
              {t("whom.cta")}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
