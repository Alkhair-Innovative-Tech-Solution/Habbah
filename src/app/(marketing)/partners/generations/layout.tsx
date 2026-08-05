import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generations School | Habbah Partners",
  description:
    "Habbah operates from Generation's School's South Campus in SITE, Karachi — the founding home of Habbah since the trust's inception.",
};

export default function GenerationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
