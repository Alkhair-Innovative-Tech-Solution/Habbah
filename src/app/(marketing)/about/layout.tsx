import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Habbah | Habbah Education Trust",
  description:
    "Habbah cultivates educational and human-development pathways that enable young people to grow in capability, access opportunity, discover direction, and contribute to a thriving Pakistan.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
