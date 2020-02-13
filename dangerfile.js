// import { fail, warn, message, markdown, danger } from 'danger';
// const eslint = require("danger-plugin-eslint");

const { schedule, fail, warn } = require("danger");
const { istanbulCoverage } = require("danger-plugin-istanbul-coverage");

// Check for sufficient code coverage
const fs = require("fs");
const packageJSON = "package.json";
const { jest: { 
        coverageThreshold : { global: { branches, lines, statements, functions } } } } = JSON.parse(fs.readFileSync(packageJSON));

schedule(
  istanbulCoverage({
    coveragePath: "coverage/lcov.info",
    reportMode: "fail",
    threshold: {
      statements,
      branches,
      functions,
      lines,
    }
  })
);

// Check for linting errors
const eslintFile = "eslint.json";
const { errorCount, warningCount } = JSON.parse(fs.readFileSync(eslintFile))[0];
if (errorCount && errorCount > 0) {
  fail(`ESLint has failed with ${errorCount} fails.`);
}
if (warningCount && warningCount > 0) {
  warn(`ESLint has ${warningCount} warnings.`);
}
// if (contains(linterOutput, "Failed")) {
//   markdown(`These changes failed to pass the linter:
// ${linterOutput}`);
// }

// if (!danger.github.pr.assignee) {
//   fail('This pull request needs an assignee, and optionally include any reviewers.');
// }

// // if (danger.)
// // fail(`ESLint has failed with ${fails} fails.`);

// if (pr.message === null) {
//   fail("Please assign someone to merge this PR, and optionally include people who should review.")
// }

// const hasAppChanges = modifiedAppFiles.length > 0;

// const testChanges = modifiedAppFiles.filter(filepath => filepath.includes('test'));
// const hasTestChanges = testChanges.length > 0;

// // Warn if there are library changes, but not tests
// if (hasAppChanges && !hasTestChanges) {
//   warn(
//     "There are library changes, but not tests. That's OK as long as you're refactoring existing code"
//   );
// }

// import contains from "lodash-contains"
// import fs from "fs"

// const testFile = "eslint"
// const linterOutput = JSON.parse(fs.readFileSync(testFile));

// if (contains(linterOutput, "Failed")) {
//   markdown(`These changes failed to pass the linter:
// ${linterOutput}`)


// Check for PR description
// const includes = require("lodash.includes");
const includesTestPlan =
  danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## test plan");
const includesSummary =
  danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## summary");
const includesJiraLink =
  danger.github.pr.body &&
  danger.github.pr.body.toLowerCase().includes("techtonicgroup.atlassian.net/browse/");

if (!danger.github.pr.body || !includesSummary || !includesTestPlan || !includesJiraLink) {
  fail(
    "This pull request needs a link to the Jira ticket, a Summary and a Test Plan. Add them using '## Summary and ## Test Plan'"
  );
}
if (danger.github.pr.body.length < 100) {
  fail("Add more detail to the PR description");
}

// Provides advice if a test plan is missing.

// const includesTestPlan =
//   danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## test plan");

// console.log(danger.github.pr.body);
// console.log(danger.github.pr.body.length);
// console.log(includesSummary);
// if (!includesTestPlan) {
//   const title = ":clipboard: Missing Test Plan";
//   const idea =
//     "Can you add a Test Plan? " +
//     'To do so, add a "## Test Plan" section to your PR description. ' +
//     "A Test Plan lets us know how these changes were tested.";
//   fail(`${title} - <i>${idea}</i>`);
// }

// Provides advice if a summary section is missing, or body is too short
// const includesSummary =
//   danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## summary");
// console.log(danger.github.pr.body);
// console.log(danger.github.pr.body.length);
// console.log(includesSummary);
// if (!includesSummary) {
//   const title = ":clipboard: Missing Summary";
//   const idea =
//     "Can you add a Summary? " +
//     'To do so, add a "## Summary" section to your PR description. ' +
//     "This is a good place to explain the motivation for making this change.";
//   message(`${title} - <i>${idea}</i>`);
// }

// const summaryContent = fs.readFileSync("SUMMARY.MD").toString();
