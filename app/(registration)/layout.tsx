import "@/styles/global.css";

export const metadata = {
  title: "SHOPS.com - Registration",
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dark:bg-violet-1000">{children}</div>;
}
