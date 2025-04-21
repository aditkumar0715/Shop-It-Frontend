import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard";
import PaginationControls from "../components/common/PaginationControls";
import ProductListLoader from "../components/product/ProductListLoader";
// import SectionCarousel from "../components/product/SectionCarousel";



function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const limit = 10;
      const skip = (currentPage - 1) * limit;
      const response = await getProducts({ limit, skip });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) {
    return <ProductListLoader />;
  }

  return (
    <div className="homepage bg-background text-foreground">
      <div className="product-list flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default HomePage;
