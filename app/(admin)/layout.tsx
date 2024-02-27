import { Navbar } from "@/components/layout/Navbar";
import "@/styles/global.css";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 pl-72">
      <Navbar />
      {children}
    </div>
  );
}
