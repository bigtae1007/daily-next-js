import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
    // Next.js 기본 권장 설정들
    ...nextVitals,
    ...nextTs,

    // 기본 ignore 설정 (빌드 결과물 등)
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),

    prettier,
    {
        plugins: {
            import: eslintPluginImport,
            "unused-imports": eslintPluginUnusedImports,
        },
        rules: {
            // 1) 디버깅 코드 방지
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "error",

            // 2) 불필요한 import / 변수 제거
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    caughtErrors: "none",
                },
            ],
            // TS 기본 no-unused-vars는 끄고 위 플러그인으로 통일
            "@typescript-eslint/no-unused-vars": "off",

            // 3) import 순서 정리 (현업에서 많이 씀)
            "import/order": [
                "warn",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],

            // 4) 코드 스타일/안정성 기본 룰
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],
            "no-var": "error",
            "prefer-const": [
                "warn",
                {
                    destructuring: "all",
                    ignoreReadBeforeAssign: true,
                },
            ],
        },
    },
]);

export default eslintConfig;