module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy"
    }
  };
  