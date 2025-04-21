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
    <div className="relative overflow-hidden bg-card text-card-foreground">
      <motion.div
        ref={carousel}
        className="flex space-x-4 overflow-x-scroll hide-scrollbar"
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
              className="w-full h-64 object-contain rounded-lg shadow"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        ))}
      </motion.div>
      <button
        onClick={() => scroll(-300)}
        disabled={!canScrollLeft}
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded bg-muted text-muted-foreground shadow ${
          !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/80"
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll(300)}
        disabled={!canScrollRight}
        className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded bg-muted text-muted-foreground shadow ${
          !canScrollRight
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-muted/80"
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
