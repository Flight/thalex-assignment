module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  rules: {
    // Components className should start with capital letter
    "selector-class-pattern": null,
    "color-function-notation": "legacy",
  },
};
