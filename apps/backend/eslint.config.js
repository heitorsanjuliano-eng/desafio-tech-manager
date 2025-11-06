const eslintPluginTs = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {},
  },
];