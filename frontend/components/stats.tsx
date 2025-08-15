import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Statistic } from "@/types/api";

interface Props {
  statistics?: Statistic[];
}

function parseCount(str: string) {
  // "2,218,+" => { number: 2218, suffix: ",+" }
  const num = parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
  const suffix = str.replace(/[0-9.]/g, "");
  return { number: num, suffix };
}

const Stats = ({ statistics }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statistics?.length &&
        statistics.map((s, idx) => {
          const { number, suffix } = parseCount(s.count);
          const count = useMotionValue(0);
          const rounded = useTransform(count, (latest) =>
            Math.floor(latest).toLocaleString()
          );

          return (
            <motion.div
              key={s.id}
              className="bg-[#111] rounded-xl p-6 text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              onViewportEnter={() => {
                animate(count, number, {
                  duration: 2,
                  delay: idx * 0.1,
                });
              }}
              viewport={{ once: true, amount: 0.5 }} // 50% ko‘ringanda trigger bo‘ladi
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glow hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#e6c65a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#e6c65a] flex justify-center">
                  <motion.span>{rounded}</motion.span>
                  <span>{suffix}</span>
                </h3>
                <p className="text-gray-400 text-sm mt-1">{s.description}</p>
              </div>
            </motion.div>
          );
        })}
    </div>
  );
};

export default Stats;
