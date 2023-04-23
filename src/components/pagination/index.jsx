import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculate the start and end indices of the page numbers to display
  const startIndex = Math.max(currentPage - 5, 0);
  const endIndex = Math.min(startIndex + 9, totalPages - 1);

  // Create a new array of page numbers to display
  const visiblePages = pages.slice(startIndex, endIndex + 1);

  return (
    <nav className="flex items-center justify-between mt-8">
      <ul className="flex">
        {startIndex > 0 && (
          <li>
            <button
              className="text-blue-500 hover:bg-blue-100 font-medium py-2 px-4 rounded-full"
              onClick={() => onPageChange(startIndex)}
            >
              {"<<"}
            </button>
          </li>
        )}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "text-blue-500 hover:bg-blue-100"
              } font-medium py-2 px-4 rounded-full`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {endIndex < totalPages - 1 && (
          <li>
            <button
              className="text-blue-500 hover:bg-blue-100 font-medium py-2 px-4 rounded-full"
              onClick={() => onPageChange(endIndex + 1)}
            >
               {">>"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
