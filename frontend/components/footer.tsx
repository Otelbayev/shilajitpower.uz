import { Phone, Send, Instagram, Mail, Diamond } from "lucide-react";

export default function Footer() {
  return (
    <footer className="container">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide text-yellow-400 font-serif">
              SHILAJIT POWER
            </h2>
            <div className="w-16 h-1 bg-yellow-500 rounded mt-3 mb-6" />

            <p className="text-neutral-300 leading-relaxed max-w-2xl">
              Biz tabiatning eng qudratli sovg'asi bo'lgan Shilajitni yuqori
              sifat va samaradorlik bilan taqdim etamiz. Himalay tog'larining
              qudrati va ming yillik tabiat kuchi – har bir erkakka yangi
              energiya, kuch va ishonch berish bizning missiyamizdir.
            </p>

            {/* badges */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                99.5% tozalik
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" />
                Premium sifat
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
                30 kun kafolat
              </li>
              <li className="inline-flex items-center gap-2 text-neutral-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                5000m+ balandlik
              </li>
            </ul>
          </div>

          {/* Right: contact cards */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-200 mb-4">
              Bog'lanish
            </h3>
            <div className="flex flex-col gap-4">
              <ContactCard
                href="tel:+998901234567"
                icon={<Phone className="h-5 w-5" />}
                tone="emerald"
                label="Telefon"
                value="+998 (90) 123-45-67"
              />
              <ContactCard
                href="https://t.me/ShilajitPowerUz"
                icon={<Send className="h-5 w-5" />}
                tone="sky"
                label="Telegram"
                value="@ShilajitPowerUz"
              />
              <ContactCard
                href="https://instagram.com/shilajit_power_uz"
                icon={<Instagram className="h-5 w-5" />}
                tone="fuchsia"
                label="Instagram"
                value="@shilajit_power_uz"
              />
              <ContactCard
                href="mailto:info@shilajitpower.uz"
                icon={<Mail className="h-5 w-5" />}
                tone="yellow"
                label="Email"
                value="info@shilajitpower.uz"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 my-12">
          <span className="h-px w-40 bg-neutral-800" />
          <Diamond className="h-5 w-5 text-yellow-500" />
          <span className="h-px w-40 bg-neutral-800" />
        </div>

        {/* Important note */}
        <div className="border border-yellow-700/60 rounded-2xl p-5 sm:p-6 bg-yellow-900/10 text-neutral-300 text-sm">
          <p className="font-semibold text-yellow-400 mb-1">Muhim eslatma:</p>
          <p>
            Bu mahsulot kasalliklarni davolash, oldini olish yoki tashxis
            qo'yish uchun mo'ljallanmagan. Sog'liq muammolaringiz bo'lsa,
            shifokor bilan maslahatlashishingizni tavsiya etamiz. 18 yoshdan
            kichik, homilador va emizikli ayollar uchun tavsiya etilmaydi.
            Shilajit tog'lardan olinadigan tabiiy mahsulot bo'lib, uning sifati
            joy va qazib olish usullariga bog'liq.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-bold">
              SP
            </span>
            <span>© 2025 Shilajit POWER – Barcha huquqlar himoyalangan</span>
          </div>
          <nav className="flex items-center gap-6">
            <a className="hover:text-yellow-400 transition" href="#">
              Maxfiylik siyosati
            </a>
            <a className="hover:text-yellow-400 transition" href="#">
              Foydalanish shartlari
            </a>
            <a className="hover:text-yellow-400 transition" href="#">
              Qaytarish siyosati
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
  tone = "emerald",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "emerald" | "sky" | "fuchsia" | "yellow";
}) {
  const toneMap: Record<string, string> = {
    emerald:
      "bg-emerald-950 ring-emerald-700/30 text-emerald-400 group-hover:ring-emerald-600/40",
    sky: "bg-sky-950 ring-sky-700/30 text-sky-400 group-hover:ring-sky-600/40",
    fuchsia:
      "bg-fuchsia-950 ring-fuchsia-700/30 text-fuchsia-400 group-hover:ring-fuchsia-600/40",
    yellow:
      "bg-yellow-950 ring-yellow-700/30 text-yellow-400 group-hover:ring-yellow-600/40",
  };

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900/60 transition"
    >
      <span
        className={`grid place-items-center h-11 w-11 rounded-xl ring-1 ${toneMap[tone]}`}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs text-neutral-400">{label}</span>
        <span className="text-base text-neutral-100">{value}</span>
      </span>
    </a>
  );
}
