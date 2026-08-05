import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEF — Character Education Foundation | Habbah Partners",
  description:
    "CEF — Character Education Foundation — is Habbah's partner in formation-focused initiatives, including The Better Question and the ACE Foundational Curriculum Architecture.",
};

export default function CefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
