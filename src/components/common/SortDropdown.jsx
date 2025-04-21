import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setOrder } from "../../redux/searchSlice";

function SortDropdown({ onSortChange }) {
  const dispatch = useDispatch();
  const { sortBy, order } = useSelector((state) => state.search);

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    if (onSortChange) {
      onSortChange({ sortBy: newSortBy, order });
    }
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    dispatch(setOrder(newOrder));
    if (onSortChange) {
      onSortChange({ sortBy, order: newOrder });
    }
  };

  return (
    <div className="sort-dropdown-container justify-end flex flex-wrap gap-2">
      {/* Sort By Dropdown */}
      <div className="sort-option flex-1">
        <label className="block text-sm text-muted-foreground">Sort By</label>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="w-full min-w-16 p-1 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-card-foreground"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discountPercentage">Discount</option>
        </select>
      </div>

      {/* Order Dropdown */}
      <div className="sort-option flex-1">
        <label className="block text-sm text-muted-foreground">Order</label>
        <select
          value={order}
          onChange={handleOrderChange}
          className="w-full min-w-28 p-1 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card text-card-foreground"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default SortDropdown;
