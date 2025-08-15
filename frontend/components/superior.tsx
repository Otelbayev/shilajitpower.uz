"use client";

import { JSX, useState } from "react";
import { Droplet, Star, Shield, RefreshCw } from "lucide-react";
import { Superior } from "@/types/api";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data?: Superior[];
}

const iconsMap: Record<string, JSX.Element> = {
  Fulvik: <Droplet className="w-5 h-5 text-[#e6c65a]" />,
  Gumat: <Star className="w-5 h-5 text-[#e6c65a]" />,
  Smola: <Shield className="w-5 h-5 text-[#e6c65a]" />,
  Himalay: <RefreshCw className="w-5 h-5 text-[#e6c65a]" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function ShilajitSection({ data }: Props) {
  const [activeTab, setActiveTab] = useState(data?.[0]?.subTitle || "");

  const tabs =
    data?.map((item) => ({
      key: item.subTitle,
      label: item.subTitle,
      icon: iconsMap[item.subTitle] || null,
      title: item.title,
      percentage: item.minTitle,
      description: item.description,
      benefits: item.fields,
    })) || [];

  const activeContent = tabs.find((tab) => tab.key === activeTab);

  const jsonData: string[] = Array.isArray(activeContent?.benefits)
    ? activeContent.benefits
    : activeContent?.benefits
    ? JSON.parse(activeContent.benefits)
    : [];

  return (
    <section className="container">
      <div className="pb-15 lg:pb-30">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-center pb-15"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          Nega <span className="text-[#e6c65a]">Shilajit POWER</span>{" "}
          boshqalardan ustun?
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Card */}
          <motion.div
            className="bg-[#1A1A1A] rounded-2xl  flex-1 shadow-lg border border-[#2A2A2A] "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            <div className="hover:scale-101 p-6 relative group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <h3 className="text-center text-lg font-semibold mb-4">
                Mahsulot tarkibi
              </h3>
              <div className="text-center text-5xl font-bold text-[#e6c65a]">
                500mg
              </div>
              <p className="text-center text-gray-400 mb-6">
                Tozalangan shilajit
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#3A3A3A] rounded-lg py-3 text-center">
                  <span className="text-[#e6c65a] font-semibold">1x</span>
                  <p className="text-sm text-gray-300">Kunlik doza</p>
                </div>
                <div className="bg-[#3A3A3A] rounded-lg py-3 text-center">
                  <span className="text-[#e6c65a] font-semibold">50g</span>
                  <p className="text-sm text-gray-300">Umumiy miqdor</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-1">Tozalik darajasi</p>
                <div className="w-full bg-[#3A3A3A] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#e6c65a] h-3"
                    style={{ width: "99.5%" }}
                  ></div>
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">99.5%</p>
              </div>
            </div>
          </motion.div>

          {/* Right Card */}
          <div className="flex-1">
            {/* Tabs */}
            <motion.div
              className="flex gap-3 mb-4 overflow-x-auto pb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.3}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-[#e6c65a] text-black border-[#e6c65a]"
                      : "bg-transparent text-white border-[#2A2A2A] hover:border-[#e6c65a]"
                  }`}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Active Content */}
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={activeTab}
                  className="bg-[#1A1A1A] rounded-2xl shadow-lg border border-[#2A2A2A] "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="p-6 transition-all duration-300  hover:scale-101 relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#2A2A2A] p-2 rounded-lg">
                        {activeContent.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">
                          {activeContent.title}
                        </h4>
                        <p className="text-[#e6c65a] font-medium">
                          {activeContent.percentage}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {activeContent.description}
                    </p>
                    <h5 className="font-semibold mb-2">Asosiy foydalar:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {jsonData.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
