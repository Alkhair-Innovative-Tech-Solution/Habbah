import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | Habbah Education Trust",
  description:
    "Habbah works through trusted partners — Idara Al Khair, Hunar Foundation, Generations School, and CEF — to grow capability, access opportunity, and strengthen communities.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
