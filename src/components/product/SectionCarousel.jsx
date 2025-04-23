import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MiniProductCard from "./MiniProductCard";
import { getProductsByCategory } from "../../services/productService";
import { Link } from "react-router";

export default function SectionCarousel({ title, category }) {
  const scrollRef = useRef(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductsByCategory(category);
      setProducts(response.data.products);
      // console.log(response.data);
    };
    fetchProducts();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -144 : 144,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-card text-card-foreground space-y-4 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between">
        <Link
          to={`/category/${category}`}
          // onClick={() => navigate(`/category/${category}`)}
          className="text-primary text-xl font-semibold"
        >
          {title}
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="bg-muted text-muted-foreground cursor-pointer rounded-md px-2 py-1 shadow active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-muted text-muted-foreground cursor-pointer rounded-md px-2 py-1 shadow active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto py-2"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <MiniProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No more products in this category.</div>
        )}
      </div>
    </div>
  );
}
