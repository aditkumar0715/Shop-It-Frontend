// New ProductsList component combining functionality of SearchResultsPage and CategoryPage
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  searchProducts,
  getProductsByCategory,
} from "../../services/productService";
import ProductCard from "./ProductCard";
import SortDropdown from "../common/SortDropdown";
import ProductListLoader from "./ProductListLoader";
import PaginationControls from "../common/PaginationControls";

function ProductsList() {
  const location = useLocation();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState({
    sortBy: "title",
    order: "asc",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const limit = 10; // Number of products per page
      const skip = (currentPage - 1) * limit;

      let response;
      if (category) {
        response = await getProductsByCategory(category, {
          limit,
          skip,
          sortBy: sortOption.sortBy,
          order: sortOption.order,
        });
      } else {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("q") || "";
        response = await searchProducts(query, {
          limit,
          skip,
          sortBy: sortOption.sortBy,
          order: sortOption.order,
        });
      }

      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
      setLoading(false);
    };

    fetchProducts();
  }, [location.search, category, currentPage, sortOption]);

  if (loading) {
    return <ProductListLoader />;
  }

  return (
    <div className="products-page bg-background text-foreground p-4">
      <div className="header bg-card text-card-foreground p-4 rounded-md mb-4 flex items-center justify-between">
        <p className="text-lg font-medium text-muted-foreground">
          {products.length} results found
        </p>
        <SortDropdown
          onSortChange={setSortOption}
          initialSortOption={sortOption}
        />
      </div>
      {products.length > 0 ? (
        <div className="product-list flex flex-col gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>No products found.</div>
      )}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ProductsList;
