import PageLoader from "@/components/home/PageLoader";
import SmoothScroll from "@/components/home/SmoothScroll";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      {children}
    </>
  );
}
