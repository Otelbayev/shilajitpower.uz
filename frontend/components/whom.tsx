// components/TargetGroups.js
import { Dumbbell, BriefcaseBusiness, UserRound } from "lucide-react";

const groups = [
  {
    id: 1,
    icon: <Dumbbell className="w-12 h-12 text-yellow-400" strokeWidth={1.5} />,
    title: "Sportchilar",
    problem: "Tez charchoq va tiklanish muammolari",
    solution: "Energiyani va kuchni oshiradi, tiklanishni tezlashtiradi",
    benefits: [
      "Jismoniy bardoshlilikni oshiradi",
      "Mushak massasini ko‘payishini qo‘llab-quvvatlaydi",
      "Mashq orasidagi tiklanish vaqtini qisqartiradi",
    ],
  },
  {
    id: 2,
    icon: (
      <BriefcaseBusiness
        className="w-12 h-12 text-yellow-400"
        strokeWidth={1.5}
      />
    ),
    title: "Ofis ishchilari",
    problem: "Mental charchoq va stress",
    solution: "Fokus va mental qobiliyatni kuchaytiradi",
    benefits: [
      "Diqqat kontsentratsiyasini yaxshilaydi",
      "Ish stressini kamaytiradi",
      "Mental energiyani oshiradi",
    ],
  },
  {
    id: 3,
    icon: <UserRound className="w-12 h-12 text-yellow-400" strokeWidth={1.5} />,
    title: "Erkaklar 30+",
    problem: "Yosh bilan bog‘liq energiya kamayishi",
    solution: "Tabiiy ravishda testosteron va vitallikni qayta tiklaydi",
    benefits: [
      "Testosteron darajasini tabiiy oshiradi",
      "Umumiy vitallik va energiyani qayta tiklaydi",
      "Yosh his qilish va faollikni oshiradi",
    ],
  },
];

export default function TargetGroups() {
  return (
    <section className="container">
      {/* Title */}
      <div className=" text-center">
        <h2 className="text-4xl font-bold">
          <span className="text-yellow-400">Kimlar uchun</span> mo‘ljallangan?
        </h2>
        <p className="mt-2 text-gray-300">
          Shilajit POWER har xil hayot tarzidagi erkaklar uchun moslashtirilgan
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {groups.map((g) => (
          <div
            key={g.id}
            className="group relative rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-black p-6 shadow-lg flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-yellow-500 overflow-hidden"
          >
            {/* Hover gold blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            {/* Icon */}
            <div className="flex justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 relative z-10">
              {g.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-center mb-6 relative z-10">
              {g.title}
            </h3>

            {/* Problem */}
            <div className="mb-4 relative z-10">
              <p className="bg-red-700 inline-block px-3 py-1 text-sm font-semibold rounded-md">
                MUAMMO
              </p>
              <p className="mt-2 text-gray-300 text-sm">{g.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-4 relative z-10">
              <p className="bg-yellow-700 inline-block px-3 py-1 text-sm font-semibold rounded-md">
                YECHIM
              </p>
              <p className="mt-2 text-gray-300 text-sm">{g.solution}</p>
            </div>

            {/* Benefits */}
            <div className="mt-auto relative z-10">
              <p className="text-yellow-400 font-semibold text-sm mb-2">
                ASOSIY FOYDALAR:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {g.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 max-w-5xl mx-auto bg-[#1a1a1a] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-800">
        <p className="text-lg font-medium text-center md:text-left">
          O‘zingizni qaysi guruhda ko‘rasiz?
          <span className="block text-gray-400 text-sm mt-1">
            Har qanday holatda ham, Shilajit POWER sizga yordam beradi
          </span>
        </p>
        <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Hozirroq boshlash
        </button>
      </div>
    </section>
  );
}
