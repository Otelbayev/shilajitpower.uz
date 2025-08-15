"use client";

import { Comment, Statistic } from "@/types/api";
import { Quote, CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Stats from "./stats";

interface Props {
  data?: Comment[];
  statistics?: Statistic[];
}

export default function Comments({ data, statistics }: Props) {
  return (
    <div className="container">
      <div className="pb-15 lg:pb-30">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
            Haqiqiy odamlar,{" "}
            <span className="text-[#e6c65a]">haqiqiy natijalar</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Minglab erkaklar Shilajit POWER bilan o‘z hayotlarini o‘zgartirdilar
          </p>
          <div className="w-16 h-1 bg-[#e6c65a] mx-auto mt-3 rounded mb-10" />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {data?.length &&
            data.map((r, i) => (
              <motion.div
                key={i}
                className="relative rounded-xl border overflow-hidden group border-transparent bg-[#111] p-5 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Glow hover effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#e6c65a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                <div className="relative z-10">
                  {/* User */}
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={
                        r.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${r.image}`
                          : "/ava.png"
                      }
                      alt={"image"}
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-neutral-200">
                        {r.fullname}
                      </h4>
                      <p className="text-sm text-gray-400">{r.job}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#e6c65a] text-[#e6c65a]"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 text-sm mb-4">{r.comment}</p>

                  {/* Verified */}
                  <p className="flex items-center gap-1 text-green-500 text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Tasdiqlangan xaridor
                  </p>

                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-5 h-5 text-[#e6c65a]" />
                </div>
              </motion.div>
            ))}
        </div>
        <Stats statistics={statistics} />
      </div>
    </div>
  );
}
