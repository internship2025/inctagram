import styles from "./../pagination.module.css";
import arrowNext from "./../../../../../public//icons/arrowRight.svg";
import Image from "next/image";

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
      <Image src={arrowNext} alt={"NextButton"} />
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
