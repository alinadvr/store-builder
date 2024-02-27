import { adminNavigation } from "@/components/layout/Navbar/data";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Content({
  params,
}: {
  params: { shop: string };
}) {
  return (
    <main className="flex items-center gap-8">
      {[
        { title: "product", icon: <PlusIcon /> },
        ...adminNavigation[2].subnav!,
      ].map(({ title, icon }) => (
        <Link
          key={title}
          href={`/${params.shop}/admin/content/${title}`}
          className="flex h-20 w-72 items-center justify-center gap-5 rounded-xl bg-white text-lg text-violet-700 drop-shadow transition-transform hover:scale-105"
        >
          {title[0].toUpperCase() + title.slice(1)}
          {icon}
        </Link>
      ))}
    </main>
  );
}
