import React from "react";

export default function PricingInfo({ price, discountPercentage }) {
  const originalPrice = (price / (1 - discountPercentage)).toFixed(2);
  return (
    <div className="flex items-baseline space-x-4 bg-card text-card-foreground">
      <span className="text-2xl font-bold text-primary">
        ${price.toFixed(2)}
      </span>
      <span className="text-sm line-through text-muted-foreground">
        ${originalPrice}
      </span>
      <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
        {Math.round(discountPercentage * 100)}% off
      </span>
    </div>
  );
}
