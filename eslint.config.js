import tseslint from "@typescript-eslint/eslint-plugin";
import eslintReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import pluginJs from "eslint-plugin-js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    ignores: ["node_modules", "dist"],
  },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintReact,
      prettier: prettierPlugin,
      import: pluginImport,
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      // Отключаем проверку окончания строк
      "linebreak-style": "off",
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
            orderImportKind: "asc",
          },
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "jsx-a11y/anchor-is-valid": "off",
      curly: ["error", "all"],
      "no-irregular-whitespace": [
        "error",
        { skipTemplates: true, skipStrings: true },
      ],
      "no-console": ["error", { allow: ["info", "error", "warn"] }],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: "^@hotelproj/backend/(?!(.*/)?input$).+$",
              message: 'Импорт из бэкенда разрешен только для файлов input',
            }
          ]
        }
      ]
    },
  },
];
