import { apiDefaults } from "@/lib/constant";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import type { ProductType } from "@/lib/types";
import mongoose, { SortOrder } from "mongoose";

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
