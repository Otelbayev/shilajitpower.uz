import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import DataProvider from "@/context/data-context";
import ModalProvider from "@/context/modal-context";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shilajit Power – 100% Tabiiy Kuch va Energiya Manbai",
  description:
    "Shilajit Power bilan kuch, bardamlik va sog‘lom hayotga erishing. 100% tabiiy, sertifikatlangan mahsulot. Hoziroq buyurtma bering!",
  keywords: [
    "shilajit",
    "shilajit power",
    "tabiiy shilajit",
    "erkaklar salomatligi",
    "energiya uchun shilajit",
    "shilajit foydalari",
    "shilajit uz",
    "shilajit dorisi",
  ],
  icons: {
    icon: "/icon.png",
  },
  authors: [{ name: "Shilajit Power", url: "https://dezex.uz" }],
  creator: "Shilajit Power Team",
  publisher: "Shilajit Power",
  metadataBase: new URL("https://dezex.uz"),
  alternates: {
    canonical: "https://dezex.uz",
    languages: {
      uz: "https://dezex.uz",
      ru: "https://dezex.uz",
    },
  },
  openGraph: {
    title: "Shilajit Power – Tabiiy Energiya va Salomatlik Manbai",
    description:
      "Organik tarkibli shilajit vositasi bilan sog‘ligingizni mustahkamlang. 100% tabiiy, erkaklar va ayollar uchun foydali.",
    url: "https://dezex.uz",
    siteName: "Shilajit Power",
    images: [
      {
        url: "https://dezex.uz/image.webp",
        width: 1200,
        height: 630,
        alt: "Shilajit Power – Tabiiy Kuch",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shilajit Power – Tabiiy Kuch Va Energiya Manbai",
    description: "100% tabiiy shilajit mahsuloti, kuch va bardamlik uchun.",
    images: ["https://dezex.uz/image.webp"],
    site: "@shilajitpower",
    creator: "@shilajitpower",
  },
  category: "Health & Wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <DataProvider>
          <ModalProvider>{children}</ModalProvider>
        </DataProvider>
      </body>
    </html>
  );
}
