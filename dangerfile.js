// import { fail, warn, message, markdown, danger } from 'danger';
// const eslint = require("danger-plugin-eslint");

const { schedule, fail, markdown } = require("danger");
const { istanbulCoverage } = require("danger-plugin-istanbul-coverage");

// eslint();

schedule(
  istanbulCoverage({
    coveragePath: "coverage/lcov.info",
    reportMode: "fail",
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  })
);

const fs = require("fs");
const testFile = "eslint.json";
const { errorCount, warningCount } = JSON.parse(fs.readFileSync(testFile))[0];
if (errorCount && errorCount > 0) {
  fail("Linting errors");
}
if (warningCount && warningCount > 0) {
  warn("Linting warnings");
}
// if (contains(linterOutput, "Failed")) {
//   markdown(`These changes failed to pass the linter:
// ${linterOutput}`);
// }
