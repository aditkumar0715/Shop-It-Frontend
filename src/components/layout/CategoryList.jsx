import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../redux/searchSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../../services/productService";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  // const navigate = useNavigate();
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

  return (
    <div className="bg-muted flex items-center justify-between gap-2 p-2">
      <button
        onClick={() => handleScroll("left")}
        className="bg-card text-card-foreground hidden rounded-md px-3 py-2 shadow-md md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-2 overflow-x-auto"
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className={`cursor-pointer rounded-md px-4 py-2 whitespace-nowrap outline-none active:scale-95 ${
              activeCategory === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="bg-card text-card-foreground hidden rounded-md px-3 py-2 shadow-md md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default CategoryList;
