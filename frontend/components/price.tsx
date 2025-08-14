// components/PricingPlans.js
import { Crown, Check } from "lucide-react";

const plans = [
  {
    id: 1,
    grams: "20g",
    duration: "1 oy",
    label: "Sinab ko‘rish uchun",
    price: "198,000",
    oldPrice: null,
    badge: null,
    popular: false,
    features: [
      "Premium Himalayan shilajit",
      "99.5% tozalık kafolati",
      "Tez yetkazib berish",
      "30 kunlik pulni qaytarish",
    ],
  },
  {
    id: 2,
    grams: "40g",
    duration: "2 oy",
    label: "Eng mashhur tanlov",
    price: "298,000",
    oldPrice: "396,000",
    badge: "24% tejam",
    popular: true,
    features: [
      "Premium Himalayan shilajit",
      "99.5% tozalık kafolati",
      "Tez yetkazib berish",
      "30 kunlik pulni qaytarish",
    ],
  },
  {
    id: 3,
    grams: "60g",
    duration: "3 oy",
    label: "To‘liq kurs uchun",
    price: "398,000",
    oldPrice: "594,000",
    badge: "Premium paket",
    popular: false,
    features: [
      "Premium Himalayan shilajit",
      "99.5% tozalık kafolati",
      "Tez yetkazib berish",
      "30 kunlik pulni qaytarish",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section className="container">
      {/* Title */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          O‘zingizga{" "}
          <span className="text-yellow-400 underline underline-offset-4">
            mos paketni
          </span>{" "}
          tanlang
        </h2>

        {/* Toggle */}
        <div className="mt-6 flex justify-center gap-2 bg-[#1a1a1a] rounded-full p-1 w-fit mx-auto">
          <button className="px-4 py-1 bg-gray-800 rounded-full text-sm font-medium">
            Bir martalik xarid
          </button>
          <button className="px-4 py-1 rounded-full text-sm font-medium text-gray-400 hover:text-white transition">
            Obuna – 10% chegirma
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 bg-[#1a1a1a]/90 backdrop-blur-md border border-transparent transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] ${
              plan.popular
                ? "border-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                : ""
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full">
                <Crown size={16} /> Eng mashhur
              </div>
            )}

            {/* Title */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold">{plan.grams}</span>
              <span className="text-gray-400">– {plan.duration}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{plan.label}</p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-bold text-white">
                {plan.price}
              </span>
              <span className="text-gray-400 text-sm">so‘m</span>
            </div>

            {/* Old Price + Badge */}
            {(plan.oldPrice || plan.badge) && (
              <div className="flex items-center gap-2 mb-4">
                {plan.oldPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    {plan.oldPrice} so‘m
                  </span>
                )}
                {plan.badge && (
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      plan.popular
                        ? "bg-orange-500 text-white"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>
            )}

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check size={16} className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Order Button */}
            {plan.popular && (
              <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Buyurtma berish
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <span className="mx-2">🔒 Xavfsiz to‘lov</span>•
        <span className="mx-2">⏱ 24-48 soat yetkazib berish</span>•
        <span className="mx-2">💯 Kafolat</span>
      </div>
    </section>
  );
}
