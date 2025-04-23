import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function RatingBadge({ rating }) {
  let ratingClass = "bg-destructive text-destructive-foreground";

  if (rating >= 4) {
    ratingClass = "bg-success text-success-foreground";
  } else if (rating >= 2.5) {
    ratingClass = "bg-warning text-warning-foreground";
  }

  return (
    <motion.div
      whileHover={{
        rotate: [0, -3, 3, -2, 2, 0], // little back-and-forth shake
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={`inline-flex items-center rounded px-2 py-1 text-sm font-semibold ${ratingClass}`}
    >
      {rating.toFixed(1)}
      <Star className="ml-1 h-4 w-4" fill="currentColor" strokeWidth={0} />
    </motion.div>
  );
}
