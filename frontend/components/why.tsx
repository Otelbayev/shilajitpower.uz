// components/BenefitsSection.tsx
import {
  Bolt,
  BatteryCharging,
  Shield,
  Focus,
  Droplets,
  RefreshCw,
} from "lucide-react";

const benefits = [
  {
    icon: <Bolt className="w-6 h-6 text-yellow-400" />,
    title: "Testosteronni oshiradi",
    text: "Erkaklik gormonini tabiiy yo‘l bilan kuchaytiradi va jinsiy salomatlikni yaxshilaydi",
  },
  {
    icon: <BatteryCharging className="w-6 h-6 text-yellow-400" />,
    title: "Energiyani tiklaydi",
    text: "Jismoniy va mental energiyani oshiradi, kundalik faoliyat uchun kuch beradi",
  },
  {
    icon: <Shield className="w-6 h-6 text-yellow-400" />,
    title: "Charchoqni kamaytiradi",
    text: "Stress va charchoqni bartaraf etadi, qayta tiklanish jarayonini tezlashtiradi",
  },
  {
    icon: <Focus className="w-6 h-6 text-yellow-400" />,
    title: "Fokus va mental hushyorlikni kuchaytiradi",
    text: "Aqliy qobiliyat va diqqat konsentratsiyasini sezilarli darajada oshiradi",
  },
  {
    icon: <Droplets className="w-6 h-6 text-yellow-400" />,
    title: "Detoksifikatsiyani rag‘batlantiradi",
    text: "Organizmni zararli moddalardan tozalaydi va metabolizm jarayonlarini yaxshilaydi",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-yellow-400" />,
    title: "Hujayra regeneratsiyasini faollashtiradi",
    text: "To‘qimalarning yangilanishini tezlashtiradi va qarish jarayonini sekinlashtiradi",
  },
];

export default function BenefitsSection() {
  return (
    <section className="container">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Nega <span className="text-yellow-400">Shilajit POWER</span>{" "}
          tanlanadi?
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded"></div>
        <p className="text-gray-400 mt-3">
          Bilimli tadqiqotlar asosida isbotlangan 6 ta asosiy foyda
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm 
              transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-lg hover:shadow-yellow-400/10"
            >
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-10 px-6 py-3 rounded-full bg-yellow-400/10 text-yellow-400 font-semibold border border-yellow-400/30 hover:bg-yellow-400 hover:text-black transition-all">
          85+ mikroelement bir joyda
        </button>
      </div>
    </section>
  );
}
