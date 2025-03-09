import About from "@/components/about";
import ContactUs from "@/components/contact-us";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Testimonials />
      <ContactUs />
    </>
  );
}
