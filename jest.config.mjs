export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  extensionsToTreatAsEsm: [".ts"],
};
