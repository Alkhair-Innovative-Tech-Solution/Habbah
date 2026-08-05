import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hunar Foundation | Habbah Partners",
  description:
    "Habbah's partnership with Hunar Foundation adds the sha'oor layer to vocational training — the awareness, confidence, and life readiness that convert a skill into a livelihood.",
};

export default function HunarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
