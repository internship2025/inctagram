import { useState } from "react";
import styles from "./pagination.module.css";
import { SuperSelect } from "@/shared/ui/pagination/selectPagnation/SuperSelect";
import { PaginationLogic } from "@/shared/ui/pagination/paginationLogic";

export const Pagination = () => {
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

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.pagination}>
      <PaginationLogic
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <span className={styles.text}>Show</span>
      <SuperSelect
        value={itemsPerPage}
        onChangeAction={handleItemsPerPageChange}
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
