"use client";

import { useState } from "react";
import { Droplet, Star, Shield, RefreshCw } from "lucide-react";

const tabs = [
  {
    key: "fulvik",
    label: "Fulvik",
    icon: <Droplet className="w-5 h-5 text-[#F5C84C]" />,
    title: "Fulvik kislotasi",
    percentage: "15-20%",
    description:
      "Tabiiy mineral tashuvchi, hujayra membranalaridan o‘tishni osonlashtiradi",
    benefits: [
      "Mineral so‘rilishini yaxshilaydi",
      "Antioksidant xossalari",
      "Detoksifikatsiya jarayonini kuchaytiradi",
    ],
  },
  {
    key: "gumat",
    label: "Gumat",
    icon: <Star className="w-5 h-5 text-[#F5C84C]" />,
    title: "Gumat moddalari",
    percentage: "10-15%",
    description:
      "O‘sish va metabolizmni rag‘batlantiradi, immun tizimni qo‘llab-quvvatlaydi",
    benefits: [
      "Energiya darajasini oshiradi",
      "Organizmni mustahkamlaydi",
      "Oqsil sintezini yaxshilaydi",
    ],
  },
  {
    key: "smola",
    label: "Smola",
    icon: <Shield className="w-5 h-5 text-[#F5C84C]" />,
    title: "Smola",
    percentage: "5-8%",
    description:
      "Tabiiy antibakterial va yallig‘lanishga qarshi vosita sifatida ishlaydi",
    benefits: [
      "Yallig‘lanishni kamaytiradi",
      "Infeksiyalarga qarshi kurashadi",
      "To‘qimalarni tiklaydi",
    ],
  },
  {
    key: "himalay",
    label: "Himalay",
    icon: <RefreshCw className="w-5 h-5 text-[#F5C84C]" />,
    title: "Himalay shilajiti",
    percentage: "100%",
    description:
      "Eng yuqori sifatli shilajit, tozalangan va foydali moddalarga boy",
    benefits: [
      "Organizmni to‘liq qo‘llab-quvvatlaydi",
      "Qon aylanishini yaxshilaydi",
      "Immun tizimni mustahkamlaydi",
    ],
  },
];

export default function ShilajitSection() {
  const [activeTab, setActiveTab] = useState("fulvik");

  const activeContent = tabs.find((tab) => tab.key === activeTab);

  return (
    <section className="bg-gradient-to-b from-[#0E0E0E] to-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Nega <span className="text-[#F5C84C]">Shilajit POWER</span>{" "}
          boshqalardan ustun?
        </h2>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Card */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 flex-1 shadow-lg border border-[#2A2A2A]">
            <h3 className="text-center text-lg font-semibold mb-4">
              Mahsulot tarkibi
            </h3>
            <div className="text-center text-5xl font-bold text-[#F5C84C]">
              500mg
            </div>
            <p className="text-center text-gray-400 mb-6">
              Tozalangan shilajit
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#3A3A3A] rounded-lg py-3 text-center">
                <span className="text-[#F5C84C] font-semibold">1x</span>
                <p className="text-sm text-gray-300">Kunlik doza</p>
              </div>
              <div className="bg-[#3A3A3A] rounded-lg py-3 text-center">
                <span className="text-[#F5C84C] font-semibold">50g</span>
                <p className="text-sm text-gray-300">Umumiy miqdor</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-300 mb-1">Tozalik darajasi</p>
              <div className="w-full bg-[#3A3A3A] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#F5C84C] h-3"
                  style={{ width: "99.5%" }}
                ></div>
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">99.5%</p>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-[#F5C84C] text-black border-[#F5C84C]"
                      : "bg-transparent text-white border-[#2A2A2A] hover:border-[#F5C84C]"
                  }`}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content with smooth transition */}
            <div
              key={activeTab}
              className="bg-[#1A1A1A] rounded-2xl p-6 shadow-lg border border-[#2A2A2A] transition-all duration-500 ease-in-out animate-fadeIn"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#2A2A2A] p-2 rounded-lg">
                  {activeContent?.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    {activeContent?.title}
                  </h4>
                  <p className="text-[#F5C84C] font-medium">
                    {activeContent?.percentage}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{activeContent?.description}</p>
              <h5 className="font-semibold mb-2">Asosiy foydalar:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {activeContent?.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}
