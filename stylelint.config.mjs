export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "alpha-value-notation": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["theme", "layer"],
      },
    ],
    "custom-property-empty-line-before": null,
    "import-notation": null,
    "media-feature-range-notation": "prefix",
    "selector-class-pattern": null,
  },
};
