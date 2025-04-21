import React from "react";
import ReviewItem from "./ReviewItem";


export default function ReviewsList({ reviews }) {
  return (
    <div className="bg-card p-4 rounded-lg space-y-6">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>
      {reviews.map((r, i) => (
        <ReviewItem key={i} review={r} />
      ))}
    </div>
  );
}
