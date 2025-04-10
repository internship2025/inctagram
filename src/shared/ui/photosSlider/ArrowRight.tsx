type ArrowRightProps = {
  size?: "small" | "large";
};

export const ArrowRight = ({ size = "small" }: ArrowRightProps) => {
  const dimensions = {
    small: { width: 7, height: 14, viewBox: "0 0 7 14" },
    large: { width: 14, height: 28, viewBox: "0 0 14 28" }
  };

  const { width, height, viewBox } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={size === "small" 
          ? "M1 14a1 1 0 0 0 .78-.37l4.61-6a1 1 0 0 0 0-1.27l-5-6a1 1 0 0 0-1.54 1.28L4.71 7 .39 12.36A1 1 0 0 0 1 14z"
          : "M2 28a2 2 0 0 0 1.56-.74l9.22-12a2 2 0 0 0 0-2.54l-10-12a2 2 0 0 0-3.08 2.56L9.42 14 .78 25.28A2 2 0 0 0 2 28z"
        }
        fill="white"
      />
    </svg>
  );
};