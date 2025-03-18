import React from "react";
import Mask from "./mask";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section id="about" className="py-20 bg-softBeige dark:bg-charcoalBlack">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoalBlack dark:text-champagneGold">
              Crafting Luxury Since 2000
            </h2>
            <p className="mt-4 text-base md:text-lg text-slateGray dark:text-softBeige leading-relaxed">
              For more than two decades, Heritage Marble Arts has been dedicated
              to transforming marble into timeless masterpieces. Our artisans
              blend **traditional techniques** with **modern innovation**,
              ensuring each piece is a work of art.
            </p>
            <p className="mt-4 text-base md:text-lg text-slateGray dark:text-softBeige leading-relaxed">
              From intricate **inlays** to breathtaking **sculptures**, we take
              pride in our craftsmanship, attention to detail, and commitment to
              quality.
            </p>

            <Link href={"/categories"}>
              <Button
                size={"lg"}
                className="mt-6 bg-emeraldGreen text-softBeige hover:bg-champagneGold hover:text-charcoalBlack"
              >
                Explore Our Creations
              </Button>
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2">
            <Image
              width={600}
              height={600}
              src="/assets/about.jpg"
              alt="Marble Handicraft"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="sm:py-20 bg-softBeige dark:bg-charcoalBlack">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left Side: Image with Brush Effect */}
          <div className="w-[90%] md:w-1/2">
            <Mask image="/assets/founder.png" mask="/msk.svg" />
          </div>

          {/* Right Side: Founder Info */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoalBlack dark:text-champagneGold">
              Meet the Visionary Behind Heritage Marble Arts
            </h2>
            <p className="mt-4 text-base md:text-lg text-slateGray dark:text-softBeige leading-relaxed">
              <strong>Dilshad Choudhry</strong> is the driving force behind
              **Heritage Marble Arts**, blending a passion for fine
              craftsmanship with an eye for detail. With over two decades of
              expertise, he has transformed marble artistry into a symbol of
              luxury and timeless elegance.
            </p>
            <p className="mt-4 text-base md:text-lg text-slateGray dark:text-softBeige leading-relaxed">
              His dedication to quality and innovation has made Heritage Marble
              Arts a renowned name in the industry, celebrated for **masterful
              inlays, sculptures, and custom designs**.
            </p>

            {/* Call-to-Action Button */}
            <Button
              size={"lg"}
              className="mt-6 bg-emeraldGreen text-softBeige hover:bg-champagneGold hover:text-charcoalBlack"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
