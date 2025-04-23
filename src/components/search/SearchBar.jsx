import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/searchSlice";
import { useNavigate, useLocation } from "react-router";

function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    if (query) {
      setInputValue(query);
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!inputValue.trim()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
    navigate(`/search?q=${encodeURIComponent(inputValue)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleInputChange}
        className="search-bar focus:ring-primary h-10 min-w-20 flex-1 rounded-l-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
      />
      <button
        type="submit"
        className="search-button bg-secondary text-secondary-foreground hover:bg-secondary/80 flex h-10 items-center justify-center rounded-r-md p-2 transition-colors active:scale-95"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}

export default SearchBar;
