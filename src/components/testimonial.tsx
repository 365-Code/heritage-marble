"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/constant";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials to create the infinite effect
  const extendedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % testimonials.length;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        (activeIndex * 100) / extendedTestimonials.length
      }%)`;
    }
  }, [activeIndex, extendedTestimonials.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-softBeige to-marbleWhite dark:from-charcoalBlack dark:via-slateGray/10 dark:to-charcoalBlack px-4 py-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-64 w-64 rounded-full bg-champagneGold/10 blur-3xl -top-10 -left-10"></div>
        <div className="absolute h-64 w-64 rounded-full bg-champagneGold/10 blur-3xl -bottom-10 -right-10"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="mb-2 text-sm font-medium tracking-wider text-champagneGold uppercase">
            Testimonials
          </p>
          <h2 className="mb-6 text-4xl font-bold text-charcoalBlack dark:text-marbleWhite sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-slateGray dark:text-softBeige max-w-xl mx-auto">
            Discover what our customers say about our exquisite marble
            handicrafts. Their words reflect our dedication to craftsmanship and
            quality.
          </p>
        </div>

        {/* Infinite Carousel */}
        <InfiniteMovingCards items={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
