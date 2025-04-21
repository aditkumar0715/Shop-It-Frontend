import React from "react";
import { motion } from "framer-motion";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <motion.div
      className="pagination-controls flex items-center justify-between mt-4 bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev-button bg-secondary text-secondary-foreground py-2 px-4 rounded disabled:opacity-50 disabled:bg-muted hover:bg-secondary/80 active:scale-95 transition-colors"
      >
        Previous
      </button>
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="next-button bg-secondary text-secondary-foreground py-2 px-4 rounded disabled:opacity-50 disabled:bg-muted hover:bg-secondary/80 active:scale-95 transition-colors"
      >
        Next
      </button>
    </motion.div>
  );
}

export default PaginationControls;
