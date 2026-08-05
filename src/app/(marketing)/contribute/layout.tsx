import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute | Habbah Education Trust",
  description:
    "Contribute to Habbah — sponsor a student, fund a programme, partner as an institution, or refer a young person whose talent deserves a pathway.",
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
