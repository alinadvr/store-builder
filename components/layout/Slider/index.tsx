"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function Slider({
  elementsPerRow,
  children,
  defaultCurrentSlide = 0,
}: {
  elementsPerRow: number;
  children: JSX.Element[];
  defaultCurrentSlide?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(defaultCurrentSlide);
  const sliderRef = useRef<HTMLDivElement>(null);
  const maxSlide = Math.ceil(children.length / elementsPerRow);

  function renderRowChildren(rowIndex: number) {
    const rowElements: JSX.Element[] = [];
    for (
      let i = rowIndex * elementsPerRow;
      i < elementsPerRow * (rowIndex + 1);
      i++
    ) {
      rowElements.push(children[i]);
    }
    return rowElements;
  }

  useEffect(() => {
    if (!sliderRef.current) return;

    sliderRef.current.style.left =
      currentSlide < maxSlide
        ? `${-sliderRef.current.offsetWidth * currentSlide}px`
        : "0";
  }, [currentSlide]);

  return (
    <div className="w-full overflow-hidden relative">
      {currentSlide !== 0 && (
        <button
          type="button"
          className="bg-green-200 absolute top-1/2 -translate-y-1/2 left-0 z-10 rounded-full p-2 box-border"
          onClick={() => setCurrentSlide((prevState) => prevState - 1)}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}
      <div
        ref={sliderRef}
        className="w-full h-full flex absolute left-0 transition-all duration-500"
      >
        {Array.from({ length: maxSlide }, () => null).map((_, index) => (
          <div
            key={`slide ${index}`}
            className={`shrink-0 grid grid-cols-${elementsPerRow > children.length ? children.length : elementsPerRow} gap-x-4 w-full`}
          >
            {renderRowChildren(index)}
          </div>
        ))}
      </div>
      {currentSlide < maxSlide - 1 && (
        <button
          type="button"
          className="bg-green-200 absolute top-1/2 -translate-y-1/2 right-0 rounded-full p-2 box-border"
          onClick={() => setCurrentSlide((prevState) => prevState + 1)}
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
}
