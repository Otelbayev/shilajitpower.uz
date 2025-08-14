import { Quote, CheckCircle2, Star } from "lucide-react";

const reviews = [
  {
    name: "Anvar Karimov",
    age: 34,
    job: "Sportchi",
    rating: 5,
    text: `"2 oy ichida energiyam sezilarli oshdi. Sport zaliga borish osonlashdi va ishda ham charchamayman. Juda tavsiya qilaman!"`,
    verified: true,
    avatar: "/avatars/anvar.jpg",
  },
  {
    name: "Bobur Rahmonov",
    age: 28,
    job: "IT mutaxassis",
    rating: 5,
    text: `"Shilajit POWER haqiqatan ham ishlaydi! Kuch va energiya oshdi, uyqum ham yaxshilandi. 3 oy ichida zo'r natija"`,
    verified: true,
    avatar: "/avatars/bobur.jpg",
  },
  {
    name: "Sardor Mirzaev",
    age: 40,
    job: "Biznesmen",
    rating: 4,
    text: `"40 yoshda ham yosh his qilyapman. Charchoq ketdi, ishtaha kirdi. Oila ham farqni sezdi. Rahmat Shilajit POWER!"`,
    verified: true,
    avatar: "/avatars/sardor.jpg",
  },
  {
    name: "Jasur Toshmatov",
    age: 36,
    job: "Murabbiy",
    rating: 5,
    text: `"Sport bilan shug'ullanvchiman. Shilajit POWER orqali tiklanish tezlashdi va kuch oshdi. Zo'r mahsulot!"`,
    verified: true,
    avatar: "/avatars/jasur.jpg",
  },
  {
    name: "Otabek Nazarov",
    age: 29,
    job: "Menejer",
    rating: 5,
    text: `"Ish stressidan charchamayman endi. Energiya to‘la, fokus yaxshi. Kundalik hayot osonlashdi va kayfiyat yaxshi."`,
    verified: true,
    avatar: "/avatars/otabek.jpg",
  },
  {
    name: "Rustam Ismoilov",
    age: 45,
    job: "Shifokor",
    rating: 4,
    text: `"45 yoshda shunday energiya bor edimi! Tabiyat sovg'asi bu. Pulimga arzidi. Hammaga tavsiya qilaman."`,
    verified: true,
    avatar: "/avatars/rustam.jpg",
  },
];

const statistics = [
  { value: "2,218+", label: "Mamnun mijozlar" },
  { value: "4.9", label: "O'rtacha reyting" },
  { value: "97%", label: "Ijobiy natija" },
  { value: "15+", label: "Davlatlar bo'ylab" },
];

export default function Comments() {
  return (
    <div className="container">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Haqiqiy odamlar,{" "}
          <span className="text-yellow-500">haqiqiy natijalar</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Minglab erkaklar Shilajit POWER bilan o‘z hayotlarini o‘zgartirdilar
        </p>
        <div className="w-12 h-[2px] bg-yellow-500 mx-auto mt-3"></div>
      </div>

      {/* Reviews */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`relative rounded-xl border overflow-hidden group border-transparent bg-[#111] p-5 shadow-lg transition-all duration-300 ease-out hover:scale-105`}
          >
            {/* Hover gold blur (only on hover) */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            {/* Content */}
            <div className="relative z-10">
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{r.name}</h4>
                  <p className="text-sm text-gray-400">
                    {r.age} yosh, {r.job}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm mb-4">{r.text}</p>

              {/* Verified */}
              {r.verified && (
                <p className="flex items-center gap-1 text-green-500 text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Tasdiqlangan xaridor
                </p>
              )}

              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-5 h-5 text-yellow-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statistics.map((s, i) => (
          <div
            key={i}
            className="bg-[#111] rounded-xl p-6 text-center transition-all duration-300 ease-out hover:scale-105 relative overflow-hidden group"
          >
            {/* Hover gold blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-yellow-500">{s.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
