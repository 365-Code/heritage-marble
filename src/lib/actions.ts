"use server";
import { apiDefaults } from "@/lib/constant";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import type { ProductType } from "@/lib/types";
import mongoose, { SortOrder } from "mongoose";
import { Category } from "@/lib/models";
import { CategoryType } from "@/lib/types";

const limit = apiDefaults.limit;

export async function getProducts(
  categoryId?: mongoose.Types.ObjectId,
  page?: number | 1,
  sort?: string | "createdAt",
  order?: string | "asc"
): Promise<{ products: ProductType[]; totalPages: number }> {
  await connectDB();

  const sortBy = sort ? apiDefaults.sortMapping[sort] : undefined;
  const orderBy = order
    ? (Number(apiDefaults.orderMapping[order]) as SortOrder)
    : undefined;

  const products = JSON.parse(
    JSON.stringify(
      await Product.find(categoryId ? { categoryId } : {})
        .limit(limit)
        .skip(page ? (page - 1) * limit : 0)
        .sort(
          sortBy && orderBy
            ? { [sortBy]: orderBy }
            : sortBy
            ? { [sortBy]: 1 }
            : orderBy
            ? { createdAt: orderBy }
            : { createdAt: -1 }
        )
        .populate(["categoryId"], ["id", "name"])
    )
  );

  const productCount = JSON.parse(
    JSON.stringify(
      await Product.find(categoryId ? { categoryId } : {}).countDocuments()
    )
  );
  return { products, totalPages: Math.ceil(productCount / limit) };
}

export async function getCategories(
  page?: number | 1,
  order?: string | "name",
  lmt?: number
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
        .limit(lmt || limit)
        .skip(page ? (page - 1) * (lmt || limit) : 0)
        .sort(orderBy ? { name: orderBy } : { name: -1 })
    )
  );
  const categoryCount = JSON.parse(
    JSON.stringify(await Category.find().countDocuments())
  );
  return { categories, totalPages: Math.ceil(categoryCount / (lmt || limit)) };
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
