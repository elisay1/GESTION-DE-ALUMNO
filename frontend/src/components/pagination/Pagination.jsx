import "./pagination.css";

const Pagination = ({ totalRecords, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={index + 1 === currentPage ? "isSelected" : "isNotSelected"}
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
