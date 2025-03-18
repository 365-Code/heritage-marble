import { getCategory } from "@/lib/actions";
import { getProducts } from "@/lib/actions";
import Products from "@/components/products";
import mongoose from "mongoose";
import { Metadata } from "next";
import React from "react";

type PageProps = {
  ctg: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageProps>;
}): Promise<Metadata> => {
  const { ctg } = await params;
  // const category = await getCategory(ctg as unknown as mongoose.Types.ObjectId);
  const category = await getCategory(new mongoose.Types.ObjectId(ctg));

  const formattedCategory = category.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formattedCategory} - Buy the Best Products Online`,
    description: `Explore top-quality ${formattedCategory} at unbeatable prices. Shop now and enjoy fast delivery!`,
    keywords: [
      `${formattedCategory} online`,
      `best ${formattedCategory}`,
      `buy ${formattedCategory}`,
    ],
    openGraph: {
      title: `${formattedCategory} - Shop Now`,
      description: `Find the best deals on ${formattedCategory}. Wide selection and great prices!`,
      images: {
        url: category.imageUrl,
      },
      url: `${process.env.BASE_URL}/categories/${ctg}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategory} - Best Deals Online`,
      description: `Looking for ${formattedCategory}? Check out our latest collection at amazing prices!`,
    },
  };
};

const Page = async ({ params }: { params: Promise<PageProps> }) => {
  const { ctg } = await params;

  const { products, productCount } = JSON.parse(
    JSON.stringify(await getProducts(ctg as unknown as mongoose.Types.ObjectId))
  );

  if (!products) {
    return <div className="text-5xl text-center">404 No Products found</div>;
  }

  return (
    <Products
      categoryId={ctg}
      initialProducts={products}
      productCount={productCount}
    />
  );
};

export default Page;
