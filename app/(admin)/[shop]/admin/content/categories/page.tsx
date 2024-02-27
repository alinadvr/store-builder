import CategoriesTable from "@/features/builder/CategoriesTable";

export default function Categories() {
  return (
    <main className="flex gap-6">
      <CategoriesTable type="categories" />
      <CategoriesTable type="specialCategories" />
    </main>
  );
}
