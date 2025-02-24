import styles from "./../pagination.module.css";

type ButtonsPropsType = {
  callback: () => void;
  disabled: boolean;
  pageNumber?: number;
};

export const PrevButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled} className={styles.button}>
      {"<"}
    </button>
  );
};

export const NextButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled} className={styles.button}>
      {">"}
    </button>
  );
};

export const PageButton = ({
  callback,
  disabled,
  pageNumber,
}: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled} className={styles.button}>
      {pageNumber}
    </button>
  );
};
