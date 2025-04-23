import React from "react";
import { motion } from "framer-motion";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <motion.div
      className="pagination-controls bg-background text-foreground mt-4 flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev-button bg-secondary text-secondary-foreground disabled:bg-muted hover:bg-secondary/80 rounded px-4 py-2 transition-colors active:scale-95 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="next-button bg-secondary text-secondary-foreground disabled:bg-muted hover:bg-secondary/80 rounded px-4 py-2 transition-colors active:scale-95 disabled:opacity-50"
      >
        Next
      </button>
    </motion.div>
  );
}

export default PaginationControls;
