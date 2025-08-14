const Certificates = () => {
  const statistics = [
    { value: "2,218+", label: "Mamnun mijozlar" },
    { value: "4.9", label: "O'rtacha reyting" },
    { value: "97%", label: "Ijobiy natija" },
    { value: "15+", label: "Davlatlar bo'ylab" },
  ];
  return (
    <div className="container">
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
};

export default Certificates;
