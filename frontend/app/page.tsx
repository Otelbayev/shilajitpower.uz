"use client";

import Certificates from "@/components/certificates";
import Comments from "@/components/comments";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Price from "@/components/price";
import Questions from "@/components/questions";
import Superior from "@/components/superior";
import Whom from "@/components/whom";
import Why from "@/components/why";
import { useDataContext } from "@/context/data-context";
import { useModalContext } from "@/context/modal-context";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, X, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data, loading } = useDataContext();
  const { modalOpen, setModalOpen } = useModalContext();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading1, setLoading1] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading1(true);
    setSuccess(false);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
        name: modalOpen?.isSubscription
          ? `${name} Obuna – 10% chegirma`
          : `${name} Bir martalik xarid`,
        phone,
        type: modalOpen?.id,
      });

      setName("");
      setPhone("");
      setSuccess(true);
      setTimeout(() => {
        setModalOpen(null);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading1(false);
    }
  };

  const originalPrice = modalOpen?.price;
  const discountedPrice = originalPrice
    ? Math.round(originalPrice * 0.9)
    : null;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <main>
      <video
        autoPlay
        muted
        controls={false}
        loop
        className="rotate-180 absolute  top-[-340px]  h-full w-full left-0 z-[-10] object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      {modalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full z-85 bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setModalOpen(null);
            setSuccess(false);
          }}
        />
      )}

      <AnimatePresence>
        {modalOpen && (
          <div>
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] mx-auto md:w-[400px] z-90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div className="bg-[#1a1a1a] rounded-3xl p-6 pb-8 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Buyurtma berish
                  </h2>
                  <X
                    className="w-6 h-6 cursor-pointer text-white"
                    onClick={() => {
                      setModalOpen(null);
                      setSuccess(false);
                    }}
                  />
                </div>

                <div className="mb-4 text-gray-300">
                  <strong>{modalOpen.massa}</strong> -{" "}
                  {modalOpen?.isSubscription
                    ? `${discountedPrice}.000`
                    : originalPrice}{" "}
                  so&apos;m
                </div>

                {success ? (
                  <div className="flex items-center gap-2 text-green-500 font-semibold">
                    <Check className="w-5 h-5" /> Buyurtma muvaffaqiyatli
                    yuborildi!
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Ism"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="p-2 rounded-lg bg-gray-800 text-white"
                    />
                    <input
                      type="tel"
                      placeholder="+998XXXXXXXXX"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPhone(val);
                      }}
                      required
                      className="p-2 rounded-lg bg-gray-800 text-white"
                    />

                    <button
                      type="submit"
                      disabled={loading1}
                      className="bg-[#e6c65a] text-black py-2 rounded-lg font-semibold hover:brightness-110 transition"
                    >
                      {loading1 ? "Yuborilmoqda..." : "Yuborish"}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Hero data={data?.hero_section} />
      <Why data={data?.why} />
      <Superior data={data?.superior} />
      <Certificates
        data={data?.certificates}
        statistics={data?.statistics.slice(0, 4)}
      />
      <section id="order">
        <Price data={data?.prices} />
      </section>
      <Whom data={data?.whom} />
      <Comments
        data={data?.comments}
        statistics={data?.statistics.slice(4, 8)}
      />
      <Questions data={data?.questions} contacts={data?.contacts.slice(0, 2)} />
      <section id="contact">
        <Footer data={data?.contacts} />
      </section>
    </main>
  );
}
