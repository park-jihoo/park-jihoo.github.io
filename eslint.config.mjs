import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    // 기본 JavaScript 규칙
    js.configs.recommended,
    
    // Next.js 설정
    ...compat.extends("next", "next/core-web-vitals"),
    
    // Prettier 설정
    ...compat.extends("prettier"),
    
    {
        files: ["**/*.{js,jsx,mjs}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2022,
                ...globals.node
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        
        plugins: {
            "simple-import-sort": simpleImportSort,
            "unused-imports": unusedImports,
        },

        rules: {
            // React 관련 규칙
            "react/react-in-jsx-scope": "off", // Next.js에서는 불필요
            "react/prop-types": "off", // shadcn/ui 컴포넌트를 위해 비활성화
            "react/jsx-uses-react": "off", // Next.js에서는 불필요
            "react/jsx-uses-vars": "error",
            "react/no-unescaped-entities": "warn",
            "react/self-closing-comp": "error",
            
            // React Hooks 규칙
            "react-hooks/rules-of-hooks": "error", // 활성화
            "react-hooks/exhaustive-deps": "warn",
            
            // Import 정렬 및 정리
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_"
                }
            ],
            
            // 일반적인 코드 품질 규칙
            "no-console": "warn",
            "no-debugger": "error",
            "no-unused-vars": "off", // unused-imports 플러그인이 처리
            "prefer-const": "error",
            "no-var": "error",
            
            // JSX 관련 규칙
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/no-static-element-interactions": "warn",
            
            // Next.js 특화 규칙
            "@next/next/no-img-element": "warn",
            "@next/next/no-html-link-for-pages": "error",
            "@next/next/no-sync-scripts": "error",
            "@next/next/no-typos": "warn"
        },
        
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    
    // 커스텀 컴포넌트에 대해서만 PropTypes 적용
    {
        files: [
            "src/components/Header.jsx",
            "src/components/Code.jsx", 
            "src/components/CodeBlock.jsx",
            "src/components/Mermaid.jsx",
            "src/components/MyTable.jsx",
            "src/components/NotionDatabaseTable.jsx",
            "src/components/NotionPage.jsx",
            "src/components/NotionRenderer.jsx",
            "src/components/Providers.jsx",
            "src/components/Skillset.jsx",
            "src/components/ToggleButton.jsx"
        ],
        rules: {
            "react/prop-types": "warn" // 커스텀 컴포넌트에만 PropTypes 적용
        }
    },
    
    // 테스트 파일에 대한 별도 설정
    {
        files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
        rules: {
            "no-console": "off",
            "@next/next/no-img-element": "off"
        }
    }
]);