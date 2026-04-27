import globals from "globals";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts"
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ["dist/", "**/tests/"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic/ts": stylisticTs
    },
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": ["off"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
      "no-console": ["warn", { "allow": ["info", "error"] }],
      "no-warning-comments": "warn",
      "eol-last": "error",
      "no-useless-escape": "off",
      "@stylistic/ts/indent": ["warn", 4],
      "no-useless-catch": "off",
      "no-empty": "warn",
      "@typescript-eslint/no-unused-vars": "warn"
    },
  },
)
