import { useState } from "react";
import { Pagination } from "@/shared/ui/pagination/Pagination";
import styles from "./pagination.module.css";
import { SuperSelect } from "@/shared/ui/pagination/SelectPagnation/SuperSelect";

export const SuperPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const totalPages = Math.ceil(100 / Number(itemsPerPage));

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevioustPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <span className={styles.text}>Show</span>
      <SuperSelect
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        options={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "30", label: "30" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
      />
      <span className={styles.text}>on page</span>
    </div>
  );
};
