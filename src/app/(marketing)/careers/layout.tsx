import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Habbah Education Trust",
  description:
    "Be part of a mission-driven team transforming lives through quality education and community support. Explore open positions and volunteer opportunities at Habbah.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
