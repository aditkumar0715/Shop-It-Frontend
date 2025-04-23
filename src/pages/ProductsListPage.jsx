import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router";
import {
  searchProducts,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/product/ProductCard";
import SortDropdown from "../components/common/SortDropdown";
import ProductListLoader from "../components/product/ProductListLoader";
import PaginationControls from "../components/common/PaginationControls";

import { motion } from "framer-motion";
import { Ghost } from "lucide-react";
const NoResults = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-background text-foreground flex flex-col items-center justify-center px-6 py-20 text-center sm:py-28"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-muted-foreground"
      >
        <Ghost size={72} className="stroke-primary" strokeWidth={1.5} />
      </motion.div>

      <h2 className="text-card-foreground mt-6 text-2xl font-semibold sm:text-3xl">
        Uh oh... nothing here!
      </h2>

      <p className="text-muted-foreground mt-3 max-w-md text-sm sm:text-base">
        We looked everywhere but couldn’t find your query,
        <br />
        Maybe try searching for something else.
      </p>
      <Link
        to="/"
        className="text-primary mt-2 text-sm hover:underline sm:text-base"
      >
        Find something amazing!
      </Link>
    </motion.div>
  );
};

function ProductsListPage() {
  const location = useLocation();
  const { category } = useParams();
  const [productsDetail, setProductsDetail] = useState([]);
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

      setProductsDetail(response.data);
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
      <div className="header bg-card text-card-foreground mb-4 flex items-center justify-between gap-4 rounded-md p-4">
        <p className="text-muted-foreground text-lg font-medium">
          {productsDetail.total} results found
        </p>
        <SortDropdown
          onSortChange={setSortOption}
          initialSortOption={sortOption}
        />
      </div>
      {productsDetail.total > 0 ? (
        <div className="product-list flex flex-col gap-4">
          {productsDetail.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
      {productsDetail.total > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ProductsListPage;
