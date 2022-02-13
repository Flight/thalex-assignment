module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
    jest: true,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "eslint-plugin-import",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "eslint-config-airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/function-component-definition": 0,
    "newline-before-return": "error",

    // Alows callbacks typing in interfaces props
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_(?!n$).+" },
    ],

    // Preventng default exports
    // https://www.codeandchaos.com/2021/2021-09-26-JavaScriptDefaultExport/
    "import/no-default-export": "error",
    "import/prefer-default-export": 0,

    // Disabling typescript any
    "@typescript-eslint/no-explicit-any": 1,

    // Turning on the errors for the hooks problems
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    "react/jsx-filename-extension": "off",

    // Allows nesting inputs inside labels
    "jsx-a11y/label-has-associated-control": 0,

    // Dropping the file extensions
    // https://stackoverflow.com/a/59268871
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // Eslint imports fix
    // https://github.com/import-js/eslint-plugin-import/issues/422
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
