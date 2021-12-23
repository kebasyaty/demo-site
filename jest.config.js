module.exports = {
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2|svg)(\\?inline|\\?data|\\?raw|\\?sprite)?$":
      "jest-transform-stub",
    "^~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "^~~/(.*)$": "<rootDir>/$1",
    "^@@/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["js", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2|svg)(\\?inline|\\?data|\\?raw|\\?sprite)?$":
      "jest-transform-stub",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
  ],
  testEnvironment: "jsdom",
};
