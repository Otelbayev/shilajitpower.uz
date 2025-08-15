"use client";

import { Certificate } from "@/types/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Leaf, X } from "lucide-react";
import { useState } from "react";

export const CertificateCard = ({ data }: { data: Certificate }) => {
  const isIconCard = !data.image;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-neutral-900 to-black rounded-2xl p-6 text-center shadow-md border border-neutral-800 flex flex-col items-center gap-4 transition-all duration-300 ease-out relative group"
      >
        {/* Hover Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e6c65a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

        {/* Image or Icon */}
        <div className="w-28 h-36 flex items-center justify-center bg-neutral-800 rounded-xl overflow-hidden">
          {isIconCard ? (
            <div className="bg-[#3e3b1d] p-4 rounded-xl">
              <Leaf className="text-[#e6c65a] w-10 h-10" />
            </div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`}
                alt={data.title}
                width={100}
                height={130}
                className="object-contain max-h-32 z-2"
              />
            </motion.div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-white text-lg font-semibold">{data.title}</h3>
          <p className="text-[#e6c65a] text-sm font-semibold">
            {data.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm">{data.description}</p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
              onClick={(e) => e.stopPropagation()} // stop modal close on inner click
            >
              <button
                onClick={() => setIsOpen(false)}
                className="fixed -top-10 right-0 text-white hover:text-[#e6c65a]"
              >
                <X size={28} />
              </button>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`}
                alt={data.title}
                width={500}
                height={650}
                className="rounded-lg object-contain max-h-[80vh] w-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
