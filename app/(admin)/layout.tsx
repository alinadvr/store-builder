import { ReactNode } from "react";

import { ShopAdminLayout } from "@/components/layout/ShopAdminLayout";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ShopAdminLayout>{children}</ShopAdminLayout>;
}
