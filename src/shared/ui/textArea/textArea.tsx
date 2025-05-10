import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
} from "react";
import styles from './textArea.module.css'

type TextareaOwnProps = {
  autoResize?: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean | string;
  helperText?: string;
  hideRequiredIndicator?: true;
  id?: string;
  label?: string;
  minHeight?: number;
  required?: boolean;
  requiredIndicator?: ReactNode;
};

export type TextareaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  keyof TextareaOwnProps
> &
  TextareaOwnProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { autoResize, className, disabled, error, label, onChange } = props;

    const handleResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        handleResize(e);
      }
      onChange?.(e);
    };

    return (
      <div className={`${styles.textAreaWrapper} ${className}`}>
        <div>{label && <label className={styles.label}>{label}</label>}</div>
        <div>
          <textarea
            className={`${styles.textarea} ${error ? styles.error : ""} ${disabled ? styles.disabled : ""}`}
            disabled={disabled}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </div>
      </div>
    );
  },
);
