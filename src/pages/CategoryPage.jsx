import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard";
import PaginationControls from "../components/common/PaginationControls";
import ProductListLoader from "../components/product/ProductListLoader";
import SortDropdown from "../components/common/SortDropdown";

function CategoryPage() {
  const { category } = useParams();
  const [productsDetail, setProductsDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState({
    sortBy: "title",
    order: "asc",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const limit = 10; // Number of products per page
      const skip = (currentPage - 1) * limit;
      const response = await getProductsByCategory(category, {
        limit,
        skip,
        sortBy: sortOption.sortBy,
        order: sortOption.order,
      });
      setProductsDetail(response.data || response.data); // Handle cases where pagination is not needed
      setTotalPages(
        response.data.total ? Math.ceil(response.data.total / limit) : 1
      );
      setLoading(false);
    };

    fetchProducts();
  }, [category, currentPage, sortOption]);

  if (loading) {
    return <ProductListLoader />;
  }

  return (
    <div className="category-page bg-background text-foreground">
      <div className="category-header bg-card text-card-foreground p-4 rounded-md mb-4 flex items-center justify-between">
        <p className="text-lg font-medium text-muted-foreground">
          {productsDetail.total} results found
        </p>
        <SortDropdown
          onSortChange={setSortOption}
          initialSortOption={sortOption}
        />
      </div>
      <div className="product-list flex flex-col gap-4">
        {productsDetail.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default CategoryPage;
