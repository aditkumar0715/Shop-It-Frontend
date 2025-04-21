import React from "react";
import { Star } from "lucide-react";

export default function RatingBadge({ rating }) {
  let ratingClass = "bg-destructive text-destructive-foreground";

  if (rating >= 4) {
    ratingClass = "bg-success text-success-foreground";
  } else if (rating >= 2.5) {
    ratingClass = "bg-warning text-warning-foreground";
  }

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded text-sm font-semibold ${ratingClass}`}
    >
      {rating.toFixed(1)}
      <Star className="w-4 h-4 ml-1" fill="currentColor" strokeWidth={0} />
    </div>
  );
}
