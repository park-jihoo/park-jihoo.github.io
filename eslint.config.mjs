import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import configPrettier from "eslint-config-prettier/flat";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  // 1. JavaScript 권장 규칙 (@eslint/js)
  js.configs.recommended,

  // 2. 프로젝트 공통: 브라우저 전역 + 파서 옵션 (JSX, ESM)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // 2b. Node 전역 (lib 등 서버/빌드 코드)
  {
    files: ["src/lib/**/*.js", "*.config.js", "*.config.mjs"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // 3. React 권장 규칙 (flat) + Next.js/React 17+ 호환
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ new JSX transform
      "react/prop-types": "off", // 프로젝트에서 PropTypes 미사용
    },
  },

  // 4. import 정렬 + 미사용 import/변수 (src만)
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-unused-vars": "off", // unused-imports/no-unused-vars로 대체
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },

  // 5. Prettier와 충돌하는 규칙 비활성화 (마지막에 두기)
  { rules: configPrettier.rules },
];
