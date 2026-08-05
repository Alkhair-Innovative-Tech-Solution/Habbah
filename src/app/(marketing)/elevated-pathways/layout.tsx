import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevated Pathways at Hunar | Habbah Education Trust",
  description:
    "Habbah's Elevated Pathways programme adds the sha'oor layer to Hunar Foundation's vocational training — the awareness, confidence, and life readiness that convert a skill into a livelihood.",
};

export default function ElevatedPathwaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
