import React from "react";

const ProductLoader = () => {
  return (
    <div className="bg-card text-card-foreground animate-pulse p-4">
      <div className="bg-muted mb-4 h-64 rounded-md" />
      <div className="space-y-4">
        <div className="bg-muted h-6 w-1/2 rounded" />
        <div className="bg-muted h-4 w-3/4 rounded" />
        <div className="bg-muted h-4 w-2/3 rounded" />
        <div className="bg-muted h-4 w-1/3 rounded" />
      </div>
    </div>
  );
};

export default ProductLoader;
