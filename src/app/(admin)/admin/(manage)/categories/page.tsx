import { getCategories } from "@/lib/actions";
import AdminCategories from "./AdminCategories";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { page, order } = await searchParams;

  const { categories, totalPages } = await getCategories(
    typeof Number(page) == "number" ? Number(page) : 1,
    order
  );

  return (
    <AdminCategories
      page={Number(page)}
      categories={categories}
      totalPages={totalPages}
    />
  );
}
