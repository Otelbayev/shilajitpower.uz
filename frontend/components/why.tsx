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

// Default iconlar (#e6c65a rang bilan)
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
  return (
    <section className="container">
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
          Nega <span className="text-[#e6c65a]">Shilajit POWER</span> tanlanadi?
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
          Bilimli tadqiqotlar asosida isbotlangan 6 ta asosiy foyda
        </motion.p>

        {/* Benefit Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm 
                transition-all duration-300  ease-out hover:scale-101 relative overflow-hidden group hover:-translate-y-2 hover:bg-white/10 hover:shadow-lg hover:shadow-[#e6c65a]/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.1 * index + 0.4} // har bir kartaga biroz delay
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div className="w-12 h-12 bg-[#e6c65a]/10 rounded-xl flex items-center justify-center mb-4">
                {item.icon || benefits[index]}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.button
          className="mt-10 px-6 py-3 rounded-full bg-[#e6c65a]/10 text-[#e6c65a] font-semibold border border-[#e6c65a]/30 hover:bg-[#e6c65a] hover:text-black transition-all"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.8}
        >
          85+ mikroelement bir joyda
        </motion.button>
      </div>
    </section>
  );
}
