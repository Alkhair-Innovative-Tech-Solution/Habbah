import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Habbah Education Trust",
  description:
    "Get in touch with Habbah Education Trust — visit our office at Generation's School South Campus in SITE, Karachi, send us a message, or ask about our programmes.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
