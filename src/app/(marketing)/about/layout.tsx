import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Habbah Education Trust",
  description:
    "Habbah Educational Trust is dedicated to assisting deserving students in Pakistan by providing financial support for their bachelor's degree programmes.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
