"use client";
import React from "react";
import Masonry from "react-masonry-css";

// Define the breakpoints for the Masonry layout
const defaultBreakpoints = { default: 3, 1100: 3, 768: 2, 500: 1 };

const MasonryLayout = ({
  children,
  breakpoints,
}: {
  children: React.ReactNode;
  breakpoints?: { default: number; [index: number]: number };
}) => {
  return (
      <Masonry
        breakpointCols={breakpoints ? breakpoints : defaultBreakpoints}
        className="flex gap-6"
        columnClassName="flex flex-col gap-6"
      >
        {children}
      </Masonry>
  );
};

export default MasonryLayout;
