import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSwiper({ images }) {
  const carousel = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (carousel.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carousel.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    updateScrollState();
    carousel.current?.addEventListener("scroll", updateScrollState);

    return () => {
      carousel.current?.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scroll = (offset) => {
    if (carousel.current) {
      carousel.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100; // Minimum swipe distance to trigger a scroll
    if (info.offset.x < -threshold) {
      scroll(300); // Swipe left to move to the next image
    } else if (info.offset.x > threshold) {
      scroll(-300); // Swipe right to move to the previous image
    }
  };

  return (
    <div className="bg-background text-foreground relative overflow-hidden rounded-md">
      <motion.div
        ref={carousel}
        className="hide-scrollbar flex space-x-4 overflow-x-scroll"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={handleDragEnd}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className="w-full flex-shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <motion.img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="h-64 w-full rounded-lg object-contain shadow"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        ))}
      </motion.div>
      {images.length > 1 && (
        <button
          onClick={() => scroll(-300)}
          disabled={!canScrollLeft}
          className={`bg-muted text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 transform rounded p-2 shadow ${
            !canScrollLeft
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-muted/80"
          }`}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={() => scroll(300)}
          disabled={!canScrollRight}
          className={`bg-muted text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform rounded p-2 shadow ${
            !canScrollRight
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-muted/80"
          }`}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
