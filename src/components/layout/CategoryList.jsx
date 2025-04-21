import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../redux/searchSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../../services/productService";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category: urlCategory } = useParams();
  const activeCategory = useSelector((state) => state.search.category);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (urlCategory) {
      dispatch(setCategory(urlCategory));
    } else {
      dispatch(setCategory(""));
    }
  }, [urlCategory, dispatch]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.slug}`);
  };

  return (
    <div className="bg-muted p-2 flex justify-between items-center gap-2">
      <button
        onClick={() => handleScroll("left")}
        className="bg-card text-card-foreground px-3 py-2 rounded-md shadow-md hidden md:block"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 hide-scrollbar"
      >
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-md whitespace-nowrap outline-none ${
              activeCategory === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="bg-card text-card-foreground px-3 py-2 rounded-md shadow-md hidden md:block"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CategoryList;
