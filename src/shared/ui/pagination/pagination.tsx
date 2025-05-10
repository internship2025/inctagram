import styles from "./pagination.module.css";
import { SuperSelect } from "@/shared/ui/pagination/selectPagnation/SuperSelect";
import { PaginationLogic } from "@/shared/ui/pagination/paginationLogic";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    onItemsPerPageChange(Number(value));
    onPageChange(1);
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
        value={String(itemsPerPage)}
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
