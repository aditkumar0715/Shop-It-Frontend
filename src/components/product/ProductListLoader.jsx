// ProductLoader.jsx
import React from "react";

const ProductListLoader = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="product-card-container bg-card text-card-foreground shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-wrap gap-4 animate-pulse"
        >
          <div className="w-full md:w-1/3 h-56 bg-muted rounded-md"></div>
          <div className="flex flex-col flex-1 gap-4">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="h-6 bg-muted rounded w-1/4 mb-1"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
              <div className="h-10 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListLoader;
