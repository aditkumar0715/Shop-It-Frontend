import React from "react";

const ProductLoader = () => {
  return (
    <div className="p-4 animate-pulse bg-card text-card-foreground">
      <div className="h-64 bg-muted rounded-md mb-4" />
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
};

export default ProductLoader;
