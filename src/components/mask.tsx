import Image from "next/image";
import React from "react";

const Mask = ({ image, mask }: { image: string; mask?: string }) => {
  return (
    <Image
      unoptimized={true}
      width={1000}
      height={1000}
      src={image}
      alt="image"
      className="w-full h-auto object-cover"
      style={{
        WebkitMaskImage: `url(${mask || "/mask.svg"})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${mask || "/mask.svg"})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
};

export default Mask;
