import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/lib/types";
import { getCategories } from "@/lib/actions";
import { notFound } from "next/navigation";
import MasonryLayout from "./masonry-layout";

// const breakpoints = { default: 3, 1100: 3, 768: 2, 500: 1 };

const Gallery = async () => {
  const { categories } = await getCategories();

  if (!categories) return notFound();

  return (
    <section id="gallery" className="py-20 bg-softBeige dark:bg-charcoalBlack">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-charcoalBlack dark:text-champagneGold mb-10">
          Explore Our Collections
        </h2>
        <MasonryLayout>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </MasonryLayout>
      </div>
    </section>
  );
};

export default Gallery;

async function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link
      href={"/categories/" + category.id}
      key={category.id}
      className="block"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <Image
          src={category.imageUrl || ""}
          alt={category.name}
          width={600}
          height={400}
          className="w-full object-cover rounded-lg"
          style={{ filter: "none" }} // Prevents inversion in dark mode
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h3 className="text-2xl text-softBeige font-bold capitalize">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
