import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qarz-e-Hasna — University Opportunity | Habbah Education Trust",
  description:
    "Habbah's Qarz-e-Hasna is interest-free, trust-based support for university students — since 2012, standing beside capable students whose circumstances should not decide their future.",
};

export default function QarzHasnaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
