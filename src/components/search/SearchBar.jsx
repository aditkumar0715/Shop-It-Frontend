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
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleInputChange}
        className="search-bar min-w-20 flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary h-10"
      />
      <button
        type="submit"
        className="search-button bg-secondary text-secondary-foreground p-2 rounded-r-md hover:bg-secondary/80 active:scale-95 transition-colors flex items-center justify-center h-10"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}

export default SearchBar;
