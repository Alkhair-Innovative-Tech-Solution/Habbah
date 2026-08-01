import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, DM_Sans, Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Habbah Education Trust — Small seeds. Lasting growth.",
  description: "Helping young people stand with dignity, rise with purpose, and serve with responsibility.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorantGaramond.variable} ${dmSans.variable} ${amiri.variable} ${notoNastaliqUrdu.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans text-gray flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
