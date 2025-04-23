// ProductLoader.jsx
import React from "react";

const ProductListLoader = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="product-card-container bg-card text-card-foreground flex animate-pulse flex-wrap gap-4 rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="bg-muted h-56 w-full rounded-md md:w-1/3"></div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="bg-muted h-6 w-3/4 rounded"></div>
            <div className="bg-muted h-4 w-1/2 rounded"></div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="bg-muted mb-1 h-6 w-1/4 rounded"></div>
                <div className="bg-muted h-4 w-1/3 rounded"></div>
              </div>
              <div className="bg-muted h-10 w-1/3 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListLoader;
