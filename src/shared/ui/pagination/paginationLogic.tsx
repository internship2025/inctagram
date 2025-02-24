import styles from "./pagination.module.css";
import {
  NextButton,
  PageButton,
  PrevButton,
} from "@/shared/ui/pagination/buttonForPagination/buttonForPagination";

type PropsType = {
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
  currentPage: number;
};

export const PaginationLogic = ({
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
  currentPage,
}: PropsType) => {
  return (
    <div className={styles.pagination}>
      <PrevButton disabled={currentPage <= 1} callback={handlePreviousPage} />

      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <PageButton
              disabled={currentPage === index + 1}
              callback={() => handlePageClick(index + 1)}
              pageNumber={index + 1}
              key={index}
            />
          );
        })}
      </div>
      <NextButton
        disabled={currentPage >= totalPages}
        callback={handleNextPage}
      />
    </div>
  );
};
