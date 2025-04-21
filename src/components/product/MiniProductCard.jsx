import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import RatingBadge from "./RatingBadge";

export default function MiniProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="flex-shrink-0">
      <motion.div
        className="w-32 flex-shrink-0 bg-background text-foreground rounded-lg shadow p-3"
        whileHover={{ scale: 1.05 }}
      >
        <div className="h-24 mb-2 bg-card text-card-foreground rounded overflow-hidden">
          {/* image */}
          <div className="h-full w-full flex items-center justify-center">
            <img src={product?.thumbnail} alt={product.title} />
          </div>
        </div>
        <h3 className="font-medium truncate">{product?.title}</h3>
        <div className="scale-75 origin-left">
        <RatingBadge rating={product.rating } />
        </div>
        <div className="mt-1">
          <span className="text-sm font-semibold text-primary">
            ${product?.price}
          </span>
          {product?.discountPercentage && (
            <span className="text-xs text-muted-foreground line-through ml-1">
              ${(
                product.price /
                (1 - product.discountPercentage / 100)
              ).toFixed(2)}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
