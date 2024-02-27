"use client";

import classNames from "@/utils/classNames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export function ProductImages({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  function handlePrevImage() {
    if (currentImage === 0) setCurrentImage(images.length - 1);
    else setCurrentImage((prevState) => prevState - 1);
  }

  function handleNextImage() {
    if (images.length - 1 > currentImage)
      setCurrentImage((prevState) => prevState + 1);
    else setCurrentImage(0);
  }

  const buttonStyle =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white p-1 text-slate-300 opacity-60 drop-shadow transition-opacity hover:opacity-100";

  return (
    <div className="flex h-[40rem] gap-2">
      <div className="custom-scrollbar flex flex-col gap-2 overflow-y-auto">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={alt}
            width={200}
            height={350}
            className={classNames(
              "h-1/6 w-full object-cover",
              currentImage === index ? "border border-black p-2" : ""
            )}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
      <div className="relative">
        <button
          type="button"
          className={classNames(buttonStyle, "left-3")}
          onClick={handlePrevImage}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
        <Image
          src={images[currentImage]}
          alt={alt}
          width={300}
          height={450}
          quality={100}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          className={classNames(buttonStyle, "right-3")}
          onClick={handleNextImage}
        >
          <ChevronRightIcon className="w-4" />
        </button>
      </div>
    </div>
  );
}
