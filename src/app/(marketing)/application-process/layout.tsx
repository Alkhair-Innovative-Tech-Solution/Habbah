import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Process | Habbah Education Trust",
  description:
    "Transparent and straightforward steps to becoming a Habbah Club beneficiary — from application form to interview, assessment, and membership offer.",
};

export default function ApplicationProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
