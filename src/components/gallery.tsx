import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/lib/types";
import { notFound } from "next/navigation";
import MasonryLayout from "./masonry-layout";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { getCategories } from "@/lib/actions";

// const breakpoints = { default: 3, 1100: 3, 768: 2, 500: 1 };

const Gallery = async () => {
  const { categories } = await getCategories(undefined, undefined, 6);

  if (!categories) return notFound();

  return (
    <section id="gallery" className="py-20 bg-softBeige dark:bg-charcoalBlack">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoalBlack dark:text-champagneGold mb-10">
          Explore Our Collections
        </h2>
        <div className="relative">
          <MasonryLayout breakpoints={{ 500: 2 }}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </MasonryLayout>
          <div className="pointer-events-none w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/90 absolute top-0 left-0">
            <Link
              href={"/categories"}
              className="pointer-events-auto p-4 bottom-0 left-1/2 -translate-x-1/2 mb-6 absolute group"
            >
              {/* <Button size={"lg"} className=""> */}
              View All
              <ChevronDown className="mx-auto group-hover:translate-y-1 transition-all" />
              {/* </Button> */}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link
      href={"/categories/" + category.id}
      key={category.id}
      className="block"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-95">
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
