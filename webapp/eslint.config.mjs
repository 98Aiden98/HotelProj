import tsParser from "@typescript-eslint/parser";
import eslintReactHooks from "eslint-plugin-react-hooks";
import baseConfig from "../eslint.config.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json", "tsconfig.app.json"],
      },
    },
    plugins: {
      "react-hooks": eslintReactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ не требует импортировать React
      "react-hooks/rules-of-hooks": "error", // Проверка правильного использования хуков
      "react-hooks/exhaustive-deps": "warn", // Проверка зависимостей эффектов
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@hotelproj/backend",
              message: "Импорт из бэкенда разрешен только для файлов input",
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
  },

  {
    ignores: ["dist", "node_modules", "coverage", "eslint.config.mjs"],
  },

  // 🔹 Специальные настройки для Vite-конфига
  {
    files: ["./vite.config.ts"],
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json", "tsconfig.app.json"],
      },
    },
  },
];
