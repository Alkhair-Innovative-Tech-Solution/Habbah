import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Habbah Education Trust",
  description:
    "Meet the brilliant minds who transformed their lives with the support of Habbah's interest-free loans, scholarships, and mentorship programmes.",
};

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
