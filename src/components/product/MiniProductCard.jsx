import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import RatingBadge from "./RatingBadge";

export default function MiniProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="flex-shrink-0">
      <motion.div
        className="bg-background text-foreground w-32 flex-shrink-0 rounded-lg p-3 shadow"
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-card text-card-foreground mb-2 h-24 overflow-hidden rounded">
          {/* image */}
          <div className="flex h-full w-full items-center justify-center">
            <img src={product?.thumbnail} loading="lazy" alt={product.title} />
          </div>
        </div>
        <h3 className="truncate font-medium">{product?.title}</h3>
        <div className="origin-left scale-75">
          <RatingBadge rating={product.rating} />
        </div>
        <div className="mt-1">
          <span className="text-primary text-sm font-semibold">
            ${product?.price}
          </span>
          {product?.discountPercentage && (
            <span className="text-muted-foreground ml-1 text-xs line-through">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
