import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories of Growth | Habbah Education Trust",
  description:
    "Stories of growth from across the Habbah community — university students, vocational trainees, families, and alumni. Real journeys of capability, trust, and contribution.",
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
