import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import "@/styles/marketplace.css";

export const metadata = {
  title: "SHOPS.com - Marketplace",
  description: "Create your own shop",
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
