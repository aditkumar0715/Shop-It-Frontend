import React from "react";
import RatingBadge from "../product/RatingBadge";
import { motion } from "framer-motion";

export default function ReviewItem({ review }) {
  return (
    <motion.div className="bg-background p-4 rounded-lg space-y-4" whileHover={{ scale: 1.02 }}>
      {/* Top row: rating and date */}
      <div className="flex justify-between items-center">
        <RatingBadge rating={review.rating} />
        <p className="text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>

      {/* Review text + reviewer */}
      <p className="text-foreground">
        <span className="font-medium">Review:</span> {review.comment}{" "}
        <span className="text-sm text-muted-foreground">
          ({review.reviewerName})
        </span>
      </p>
    </motion.div>
  );
}
