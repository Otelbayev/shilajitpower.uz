"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image as ImageType } from "@/types/api";
import { useTranslation } from "react-i18next";

interface Prop {
  data?: ImageType;
}

export default function Images({ data }: Prop) {
  const { i18n, t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const images = data?.images ? (JSON.parse(data?.images) as string[]) : [];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container">
      <div
        key={i18n.language}
        className="w-full pt-10 px-1 md:px-0 md:pt-20 md:mb-10 grid md:grid-cols-2 gap-6 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full flex flex-col relative items-center"
        >
          <div className="absolute -top-3 z-90 right-0 2xl:right-30 bg-[#e6c65a] text-black px-2 py-1 md:px-4 md:py-2 rounded-full text-xs font-bold shadow-lg transition-transform duration-300 group-hover:scale-105">
            {t("hero.premium")}
          </div>
          <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${images[current]}`}
                  alt="Slider Image"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  current === i ? "border-[#e6c65a]" : "border-transparent"
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left px-4 md:px-0"
        >
          <h2 className="text-6xl fiona md:text-8xl font-bold mb-4 text-[#e6c65a]">
            {data?.title}
          </h2>
          <p className="text-gray-100 leading-relaxed">{data?.description}</p>
        </motion.div>
      </div>
    </div>
  );
}
