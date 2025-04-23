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
    <div className="sort-dropdown-container flex flex-wrap justify-end gap-2">
      {/* Sort By Dropdown */}
      <div className="sort-option flex-1">
        <label className="text-muted-foreground block text-sm">Sort By</label>
        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="border-muted focus:ring-primary bg-card text-card-foreground w-full min-w-16 rounded-md border p-1 focus:ring-2 focus:outline-none"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discountPercentage">Discount</option>
        </select>
      </div>

      {/* Order Dropdown */}
      <div className="sort-option flex-1">
        <label className="text-muted-foreground block text-sm">Order</label>
        <select
          value={order}
          onChange={handleOrderChange}
          className="border-muted focus:ring-primary bg-card text-card-foreground w-full min-w-28 rounded-md border p-1 focus:ring-2 focus:outline-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default SortDropdown;
