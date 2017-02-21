module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
  ],
  "env": {
    "browser": true,
    "jasmine": true,
  },
  "rules": {
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "arrow-body-style": ["error", "always"],
  }
};