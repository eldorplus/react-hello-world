module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jest",
  ],
  "env": {
    "browser": true,
    "jasmine": true,
    "jest/globals": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "arrow-body-style": ["error", "always"],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
  }
};