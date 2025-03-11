import { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs
    .map((input) => {
      if (typeof input === "string") {
        return input;
      }

      if (Array.isArray(input)) {
        return input.join(" ");
      }

      return input;
    })
    .join(" ");
}
