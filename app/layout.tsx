import { poppins } from "@/styles/fonts";

import { Providers } from "@/components/layout/Providers";

import "@/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="dark:bg-violet-1000">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
