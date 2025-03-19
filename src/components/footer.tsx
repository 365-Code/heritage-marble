import React from "react";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-charcoalBlack text-marbleWhite py-12">
      <div className="max-w-6xl text-center md:text-left mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-champagneGold">
            Heritage Marble Arts
          </h3>
          <p className="mt-2 text-slateGray">
            Exquisite marble craftsmanship blending tradition with luxury.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-charcoalBlack dark:text-marbleWhite">
            Quick Links
          </h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/#home"
                className="text-slateGray hover:text-champagneGold transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-slateGray hover:text-champagneGold transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#gallery"
                className="text-slateGray hover:text-champagneGold transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="text-slateGray hover:text-champagneGold transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-charcoalBlack dark:text-marbleWhite">
            Follow Us
          </h4>
          <div className="mt-4 flex space-x-4 md:w-fit justify-center items-center w-full">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-slateGray hover:text-rose-400 transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-slateGray hover:text-blue-400 transition"
            >
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-slateGray text-sm">
        © {new Date().getFullYear()} Heritage Marble Arts. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
