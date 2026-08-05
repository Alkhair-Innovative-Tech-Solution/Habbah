import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Idara Al Khair | Habbah Partners",
  description:
    "Habbah's community programmes run through Idara Al Khair, a trusted institution serving underserved communities in Karachi.",
};

export default function AlKhairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
