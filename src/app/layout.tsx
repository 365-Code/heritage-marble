import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "@/components/provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exquisite Handcrafted Marble Art – Heritage Marble Arts",
  description:
    "Discover the timeless beauty of handcrafted marble artistry at Heritage Marble Arts. From intricately carved decor to bespoke sculptures, our artisans bring tradition and elegance to life. Explore our exquisite collection or customize your own masterpiece today.",
  keywords: [
    "handcrafted marble art",
    "marble sculptures",
    "bespoke marble decor",
    "heritage marble",
    "custom marble pieces",
  ],
  openGraph: {
    title: "Exquisite Handcrafted Marble Art – Heritage Marble Arts",
    description:
      "Explore the finest handcrafted marble art and sculptures at Heritage Marble Arts. Elevate your space with timeless elegance.",
    url: "https://heritage-marble.com", // Replace with actual website URL
    type: "website",
    images: [
      {
        url: "/assets/logo.png", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Handcrafted Marble Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exquisite Handcrafted Marble Art – Heritage Marble Arts",
    description:
      "Discover timeless, handcrafted marble sculptures and decor pieces at Heritage Marble Arts.",
    images: ["/assets/logo.png"], // Replace with actual image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${poppins.className} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          {/* <div className="h-[60px]" /> */}
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
