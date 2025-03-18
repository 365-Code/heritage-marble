"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="aspect-[5/2.5] h-[80vh] md:h-screen w-full relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent dark:from-black/80 dark:via-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-champagneGold drop-shadow-lg">
          Timeless Elegance in Marble Craftsmanship
        </h1>
        <p className="mt-4 text-base sm:text-lg text-softBeige max-w-2xl drop-shadow-md">
          Transforming marble into masterpieces for over two decades. Discover
          our exquisite handcrafted designs.
        </p>
        <Link href={"/#gallery"}>
          <Button
            size={"lg"}
            className="mt-6 bg-emeraldGreen text-softBeige px-6 py-3 rounded-md hover:bg-champagneGold hover:text-charcoalBlack transition"
          >
            Explore Our Collection
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
