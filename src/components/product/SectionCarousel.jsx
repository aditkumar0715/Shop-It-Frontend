import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MiniProductCard from "./MiniProductCard";
import { getProductsByCategory } from "../../services/productService";

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
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4 bg-card text-card-foreground p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">More in {title}</h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="bg-muted text-muted-foreground px-2 py-1 rounded-md shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-muted text-muted-foreground px-2 py-1 rounded-md shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar py-2"
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
