import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Добавляем правило для отключения `react/no-unescaped-entities`
  {
    rules: {
      "react/no-unescaped-entities": "off", // Отключаем это правило
    },
  },
];

export default eslintConfig;
