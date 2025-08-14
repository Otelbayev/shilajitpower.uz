import { Star, Mountain } from "lucide-react";

export default function ShilajitHero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #fbbf24 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-900/20 border border-amber-500/40 rounded-full px-4 py-2 text-sm text-amber-400">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              Haqiqiy Himoloy tog'laridan
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                SHILAJIT
              </h1>
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-amber-400 leading-none tracking-tight">
                POWER
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-1 text-gray-300 text-lg max-w-md mx-auto lg:mx-0">
              <p>Tabiiy kuch. Energiya.</p>
              <p>Erkaklar salomatligi uchun yechim.</p>
            </div>

            {/* Mountain Text */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-400">
              <Mountain className="w-4 h-4" />
              <span className="text-sm">
                Tog'larning qudrati sizning kuchingiz uchun
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">(4.9)</span>
              <span className="text-gray-500 text-sm">
                2,218 ta izoh asosida
              </span>
            </div>

            {/* Info Box */}
            <div className="inline-block bg-amber-900/15 border border-amber-500/30 rounded-xl px-6 py-4 text-amber-400 text-sm font-medium">
              85+ mikroelement | Fulvik kislota | Gumat kislota
            </div>

            {/* CTA Button */}
            <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
              Buyurtma berish
            </button>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Badge */}
              <div className="absolute -top-3 -right-3 bg-amber-400 text-black px-4 py-2 rounded-full text-xs font-bold z-10 shadow-lg transition-transform duration-300 group-hover:scale-105">
                Premium
              </div>

              {/* Product Card */}
              <div className="bg-gray-900/80 border border-gray-700/50 rounded-3xl p-8 sm:p-12 w-80 sm:w-96 h-[450px] flex flex-col items-center justify-center space-y-8 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-amber-500/20">
                {/* Product Circle */}
                <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <span className="text-black font-bold text-3xl">50g</span>
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-amber-400 font-bold text-2xl tracking-wide">
                    SHILAJIT POWER
                  </h3>
                  <p className="text-gray-400 text-base">
                    Premium Himalayan Resin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-amber-400/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
