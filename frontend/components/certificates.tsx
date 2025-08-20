import { Certificate, Statistic } from "@/types/api";
import Stats from "./stats";
import { motion } from "framer-motion";
import { CertificateCard } from "./c-card";
import { useTranslation } from "react-i18next";

interface Props {
  data?: Certificate[];
  statistics?: Statistic[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const Certificates = ({ data, statistics }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="pt-20 lg:pb-30 text-center">
        <motion.h2
          className="text-6xl md:text-8xl font-extrabold fiona"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          {t("cer.title1")}{" "}
          <span className="text-[#e6c65a]">{t("cer.titlespan")}</span>{" "}
          {t("cer.title2")}
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
          className="text-gray-400 mt-3  lg:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
        >
          {t("cer.desc")}
        </motion.p>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {data?.length &&
                data.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <CertificateCard data={cert} />
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        <Stats statistics={statistics} />
      </div>
    </div>
  );
};

export default Certificates;
