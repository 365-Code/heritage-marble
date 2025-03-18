import MasonryLayout from "@/components/masonry-layout";
import { getCategories } from "@/lib/actions";
import { CategoryType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const { categories } = await getCategories();

  return (
    <div className="py-20 container mx-auto px-6">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-charcoalBlack dark:text-champagneGold mb-10">
        Explore Our Collections
      </h1>
      <MasonryLayout breakpoints={{ 1500: 4, 500: 2 }}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </MasonryLayout>
    </div>
  );
};

export default Page;

function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link
      href={"/categories/" + category.id}
      key={category.id}
      className="block"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <Image
          unoptimized={true}
          src={category.imageUrl || ""}
          alt={category.name}
          width={600}
          height={400}
          className="w-full object-cover rounded-lg"
          style={{ filter: "none" }} // Prevents inversion in dark mode
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h3 className="text-lg sm:text-xl md:text-2xl text-softBeige font-bold capitalize">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
