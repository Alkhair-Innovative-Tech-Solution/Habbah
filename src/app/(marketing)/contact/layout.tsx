import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Habbah Education Trust",
  description:
    "Get in touch with Habbah Education Trust — visit our office in Karachi, send us a message, or ask about our interest-free loan programmes.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
