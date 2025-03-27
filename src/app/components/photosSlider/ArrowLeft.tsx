import { useCallback } from "react";

type ArrowLeftProps = {
    size?: "small" | "large";
  };
  
  export const ArrowLeft = ({ size = "small" }: ArrowLeftProps) => {
    const dimensions = {
      small: { width: 7, height: 14 },
      large: { width: 14, height: 28 }
    };
  
    const { width, height } = dimensions[size];
  
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={size === "small" 
            ? "M5.83 14a1 1 0 0 1-.78-.37l-4.61-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L2.29 7l4.32 5.36a1 1 0 0 1-.78 1.64z"
            : "M11.66 28a2 2 0 0 1-1.56-.74l-9.22-12a2 2 0 0 1 0-2.54l10-12a2 2 0 0 1 3.08 2.56L4.58 14l8.64 10.72a2 2 0 0 1-1.56 3.28z"
          }
          fill="white"
        />
      </svg>
    );
  };
