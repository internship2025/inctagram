// shared/ui/loader/Loader.tsx
"use client";

import { CSSProperties } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
}

export const Loader = ({ 
  size = "medium", 
  color = "#3498db",
  className 
}: LoaderProps) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  const loaderStyle: CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderColor: color,
    borderTopColor: "transparent"
  };

  return (
    <div 
      className={`${styles.loader} ${className || ""}`} 
      style={loaderStyle}
      aria-label="Loading..."
      role="status"
    />
  );
};