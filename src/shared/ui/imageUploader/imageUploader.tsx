import { DragEvent, ReactNode, RefObject } from "react";
import styles from "./imageUploader.module.css";

type Props = {
  children: ReactNode;
  fileInputRef: RefObject<HTMLInputElement>;
  maxSizeMb?: number;
  setError: (error: string) => void;
  setPhotoUpload: (file: File) => void;
};

export const ImageUploader = ({
  children,
  fileInputRef,
  maxSizeMb,
  setError,
  setPhotoUpload,
}: Props) => {
  const onFileSelected = (files: FileList | null) => {
    setError("");

    if (maxSizeMb === undefined) {
      setError("Max size is not defined");
      return;
    }

    const validFormats = ["image/jpeg", "image/png"];
    const maxSizeByte = maxSizeMb * 1024 * 1024;

    if (files) {
      if (files[0].size < maxSizeByte) {
        if (validFormats.includes(files[0].type)) {
          setPhotoUpload(files[0]);
        } else {
          setError("format error");
        }
      } else {
        setError("size error");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; //Очищаем значение файлового input, чтобы пользователь мог загрузить тот же файл повторно.
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    onFileSelected(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${styles.relative} ${styles.dropArea}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        accept={"."}
        className={styles.hidden}
        onChange={(e) => onFileSelected(e.currentTarget.files)}
        ref={fileInputRef}
        type={"file"}
      />
      {children}
    </div>
  );
};
