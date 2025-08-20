"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown } from "lucide-react";
import clsx from "clsx";
import { useModalContext } from "@/context/modal-context";
import { useTranslation } from "react-i18next";

export interface Price {
  id: number;
  massa: string;
  month: string;
  description: string;
  price: number;
  old_price: string;
  span: string;
  popular?: boolean;
}

interface Props {
  data: Price;
  index: number;
  isSubscription: boolean;
}

export const PriceCard: React.FC<Props> = ({ data, index, isSubscription }) => {
  const originalPrice = data.price;
  const discountedPrice = Math.round(originalPrice * 0.9);
  const { t } = useTranslation();
  const items = t("price.array", { returnObjects: true }) as string[];

  const { setModalOpen } = useModalContext();

  return (
    <>
      <div
        className={clsx(
          "transition-all duration-300  hover:scale-101  group rounded-2xl p-6 h-full text-white shadow-lg border border-gray-700 relative flex flex-col justify-between",
          index === 1 ? "bg-[#1a1a1a] ring-2 ring-[#e6c65a]" : "bg-[#121212]"
        )}
      >
        {index === 1 && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e6c65a] text-black text-xs px-3 py-1 rounded-full font-bold">
            <span className="flex items-center justify-center gap-2">
              <Crown /> {t("price.pop")}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

        <div>
          <div className="text-white text-2xl font-semibold mb-2">
            {data.massa}
          </div>
          <div className="text-sm text-gray-400 mb-4">{data.month}</div>
          <div className="text-gray-300 mb-6">{data.description}</div>

          <motion.div
            key={isSubscription ? "discounted" : "original"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <div className="text-3xl font-bold text-white">
              {(isSubscription
                ? `${discountedPrice}.000`
                : originalPrice
              ).toLocaleString()}{" "}
              {t("price.som")}
            </div>

            {isSubscription && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-green-400 py-2"
              >
                {t("price.sale2")}
              </motion.div>
            )}

            {data.old_price && (
              <div className="text-xl text-red-400 line-through">
                {data.old_price}
              </div>
            )}
            {data.span && (
              <div className="text-xs text-black bg-orange-400 px-2 py-1 inline-block mt-1 rounded-full">
                {data.span}
              </div>
            )}
          </motion.div>

          <ul className="space-y-3 mb-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-[#e6c65a]" />
                {item}
              </li>
            ))}

            <AnimatePresence>
              {isSubscription && (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-[#e6c65a]" />
                  {t("price.every")}
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>

        <button
          // whileTap={{ scale: 0.97 }}
          onClick={() => setModalOpen({ ...data, isSubscription })}
          className="bg-[#e6c65a] relative z-81  cursor-pointer text-black font-semibold w-full py-2 rounded-lg hover:brightness-110 transition"
        >
          {t("price.btn")}
        </button>
      </div>
    </>
  );
};
