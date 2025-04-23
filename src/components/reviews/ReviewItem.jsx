import React from "react";
import RatingBadge from "../product/RatingBadge";
import { motion } from "framer-motion";

export default function ReviewItem({ review }) {
  return (
    <motion.div
      className="bg-background space-y-4 rounded-lg p-4"
      whileHover={{ scale: 1.02 }}
    >
      {/* Top row: rating and date */}
      <div className="flex items-center justify-between">
        <RatingBadge rating={review.rating} />
        <p className="text-muted-foreground text-xs">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>

      {/* Review text + reviewer */}
      <p className="text-foreground">
        <span className="font-medium">Review:</span> {review.comment}{" "}
        <span className="text-muted-foreground text-sm">
          ({review.reviewerName})
        </span>
      </p>
    </motion.div>
  );
}
