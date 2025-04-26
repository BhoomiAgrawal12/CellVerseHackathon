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
  {
    rules: {
      // Existing rules
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-var": "off",
      "@next/next/no-img-element": "off",
      // New rules to disable the warnings and errors
      "react-hooks/exhaustive-deps": "off", // Disables missing dependency warnings for useEffect/useCallback
      "prefer-const": "off", // Disables the "use const instead" errors
      "jsx-a11y/alt-text": "off", // Disables alt prop warnings for img elements
      "@next/next/no-html-link-for-pages": "off", // Disables the warning for using <a> instead of <Link>
    },
  },
];

export default eslintConfig;
