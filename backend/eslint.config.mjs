import tsParser from "@typescript-eslint/parser";
import baseConfig from "../eslint.config.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      parser: tsParser, // Используем импортированный модуль напрямую
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    ignores: ["dist", "node_modules", "coverage", "eslint.config.mjs"],
  },
];
