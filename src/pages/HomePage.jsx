import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/productService";
import SectionCarousel from "../components/product/SectionCarousel";
import HomePageLoader from "../components/common/HomePageLoader";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await getAllCategories();
      setCategories(response.data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <HomePageLoader />;
  }

  return (
    <div className="homepage bg-background text-foreground grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-8">
      {categories.map((category) => (
        <SectionCarousel
          key={category.slug}
          title={category.name}
          category={category.slug}
        />
      ))}
    </div>
  );
}

export default HomePage;
