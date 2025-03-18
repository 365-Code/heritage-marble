"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();

  const sections = ["home", "about", "gallery", "contact"];

  // Track scroll position to toggle fixed header
  useEffect(() => {
    if (typeof window !== undefined) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Intersection Observer to track sections in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="header"
      className={`w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed bg-marbleWhite/90 dark:bg-charcoalBlack/90 shadow-md backdrop-blur-lg"
          : "absolute bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="rounded-full aspect-square w-[42px]"
            src="/assets/logo.png"
            alt="Heritage Marble Arts"
            width={150}
            height={50}
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8">
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section}`}
              className={`dark:hover:text-champagneGold hover:text-champagneGold transition font-medium 
                ${!isScrolled && pathname == "/" ? "text-white" : ""}
                ${
                  activeSection === section && pathname === "/"
                    ? "dark:text-champagneGold text-champagneGold font-semibold"
                    : "text-charcoalBlack dark:text-marbleWhite"
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Actions (Dark Mode + Mobile Menu) */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
            className="p-2 relative"
          >
            <Sun
              size={22}
              color="orange"
              className={
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all rotate-0 opacity-100 dark:opacity-0 dark:-rotate-90"
              }
            />
            <Moon
              size={22}
              color="silver"
              className={
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all dark:rotate-0 dark:opacity-100 opacity-0 rotate-90"
              }
            />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-marbleWhite dark:bg-charcoalBlack absolute w-full top-16 left-0 shadow-md h-screen">
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section}`}
              className="block px-6 py-3 text-charcoalBlack dark:text-marbleWhite hover:bg-champagneGold transition"
              onClick={() => setMenuOpen(false)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
