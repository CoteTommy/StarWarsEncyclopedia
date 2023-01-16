module.exports = {
  extends: ["@react-native-community", "eslint-config-prettier", "import/recommended", "import/typescript"],
  plugins: ["unused-imports", "react", "@typescript-eslint", "import"],
  rules: {
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react-native/no-inline-styles": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./",
      },
    },
  },
};
