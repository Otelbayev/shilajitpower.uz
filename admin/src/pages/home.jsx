import { Bolt, Leaf, ShieldCheck, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br  flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-4">
        SHILAJIT <span className="text-orange-600">POWER</span>
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">
        Tabiiy energiya, kuch va immunitetni oshirish uchun 100% tabiiy
        Shilajit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <FeatureCard
          icon={<Bolt className="text-orange-500 w-10 h-10" />}
          title="Cheksiz Energiya"
          desc="Kundalik faoliyatingizda kuchliroq va faol bo‘ling."
        />
        <FeatureCard
          icon={<Leaf className="text-green-500 w-10 h-10" />}
          title="100% Tabiiy"
          desc="Faqat tabiiy tarkibiy qismlar, zararli qo‘shimchalarsiz."
        />
        <FeatureCard
          icon={<ShieldCheck className="text-blue-500 w-10 h-10" />}
          title="Immunitetni Mustahkamlash"
          desc="Organizmni kasalliklardan himoya qilishga yordam beradi."
        />
        <FeatureCard
          icon={<Flame className="text-red-500 w-10 h-10" />}
          title="Kuch va Qiziqishni Oshirish"
          desc="Sportchilar va faol odamlar uchun mukammal qo‘shimcha."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
      {icon}
      <h3 className="mt-4 font-bold text-lg text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
