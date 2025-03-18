"use client";
import React from "react";
import Masonry from "react-masonry-css";

// Define the breakpoints for the Masonry layout
const defaultBreakpoints = { default: 3, 1100: 3, 768: 2, 500: 1 };

type LayoutType = {
  children: React.ReactNode;
  breakpoints?: { default?: number; [index: number]: number };
};

const MasonryLayout = ({ children, breakpoints }: LayoutType) => {
  return (
    <div>
      <Masonry
        breakpointCols={
          breakpoints
            ? { ...defaultBreakpoints, ...breakpoints }
            : defaultBreakpoints
        }
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {children}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
