"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      // style={{ backgroundImage: "url('/assets/hero.png') no-repeat" }}
      className="aspect-[5/2.5] h-[80vh] md:h-screen w-full relative"
    >
      {/* <div className="absolute inset-0 bg-black/50 dark:bg-black/60"/> */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoalBlack/70 via-black/40 to-transparent dark:from-black/80 dark:via-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl font-bold text-champagneGold drop-shadow-lg">
          Timeless Elegance in Marble Craftsmanship
        </h1>
        <p className="mt-4 text-lg text-softBeige max-w-2xl drop-shadow-md">
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
      {/* <div className="text-softBeige absolute top-0 left-0 w-full h-full backdrop-blur-sm">
      <div className="container mx-auto flex flex-col justify-center h-full">
        <div className="max-w-[60%]">
          <h2 className="text-4xl font-bold text-champagneGold">
            Timeless Elegance in Marble Craftsmanship
          </h2>
          <p className="mt-4 text-lg">
            At Heritage Marble Arts, we transform marble into masterpieces.
            With over two decades of expertise, our artisans blend tradition
            with modern artistry to create exquisite handcrafted pieces.
            Explore our collection and experience the luxury of fine marble
            craftsmanship.
          </p>
          <Button className="mt-6 bg-burntUmber text-softBeige px-6 py-3 rounded-md hover:bg-champagneGold transition">
            Explore Our Collection
          </Button>
        </div>
      </div>
    </div> */}
    </section>
  );
};

export default Hero;
