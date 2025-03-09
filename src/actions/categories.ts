import { apiDefaults } from "@/lib/constant";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models";
import { CategoryType } from "@/lib/types";
import mongoose, { SortOrder } from "mongoose";

const limit = apiDefaults.limit;

export async function getCategories(
  page?: number | 1,
  order?: string | "name"
): Promise<{
  categories: CategoryType[];
  totalPages: number;
}> {
  await connectDB();
  const orderBy = order
    ? (apiDefaults.orderMapping[order] as SortOrder)
    : undefined;
  const categories = JSON.parse(
    JSON.stringify(
      await Category.find()
        .limit(limit)
        .skip(page ? (page - 1) * limit : 0)
        .sort(orderBy ? { name: orderBy } : { name: -1 })
    )
  );
  const categoryCount = JSON.parse(
    JSON.stringify(await Category.find().countDocuments())
  );
  return { categories, totalPages: Math.ceil(categoryCount / limit) };
}

export async function getCategory(
  categoryId: mongoose.Types.ObjectId
): Promise<CategoryType> {
  await connectDB();
  const category = JSON.parse(
    JSON.stringify(await Category.findById(categoryId))
  );
  return category;
}
