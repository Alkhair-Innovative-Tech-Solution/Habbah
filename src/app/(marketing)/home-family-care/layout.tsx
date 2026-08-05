import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home & Family Care Pathways | Habbah Education Trust",
  description:
    "Habbah's Home & Family Care Pathways prepare young people — especially women — for dignified livelihoods in home care, early childhood support, and family services. In partnership with Idara Al Khair.",
};

export default function HomeFamilyCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
