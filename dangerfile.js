// import { fail, warn, message, markdown, danger } from 'danger';
// const eslint = require("danger-plugin-eslint");

const { schedule, fail, warn } = require("danger");
const { istanbulCoverage } = require("danger-plugin-istanbul-coverage");

// Check for sufficient code coverage
const fs = require("fs");
const packageJSON = "package.json";
const {
  jest: {
    coverageThreshold: {
      global: { branches, lines, statements, functions }
    }
  }
} = JSON.parse(fs.readFileSync(packageJSON));

schedule(
  istanbulCoverage({
    coveragePath: "coverage/lcov.info",
    reportMode: "fail",
    threshold: {
      statements,
      branches,
      functions,
      lines
    }
  })
);

// Check for linting errors
const eslintFile = "eslint.json";
const { errorCount, warningCount } = JSON.parse(fs.readFileSync(eslintFile))[0];
if (errorCount && errorCount > 0) {
  fail(`ESLint has failed with ${errorCount} fails. Please fix these before merging`);
}
if (warningCount && warningCount > 0) {
  warn(`ESLint has ${warningCount} warnings. Please fix these before merging`);
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
// const includesTestPlan =
//   danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## test plan");
// const includesSummary =
//   danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## summary");

// if (!danger.github.pr.body || !includesSummary || !includesTestPlan || !includesJiraLink) {
//   fail(
//     "This pull request needs a link to the Jira ticket, a Summary and a Test Plan. Add them using '## Summary and ## Test Plan'"
//   );
// }
// if (danger.github.pr.body.length < 100) {
//   fail("Add more detail to the PR description");
// }

const includesTestPlan =
  danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## test plan");
if (!includesTestPlan) {
  const title = ":clipboard: Missing Test Plan";
  const idea =
    "Can you add a Test Plan? " +
    'To do so, add a "## Test Plan" section to your PR description. ' +
    "A Test Plan lets us know how these changes were tested.";
  fail(`${title} - <i>${idea}</i>`);
}

const includesSummary =
  danger.github.pr.body && danger.github.pr.body.toLowerCase().includes("## summary");
if (!includesSummary) {
  const title = ":clipboard: Missing Summary";
  const idea =
    "Can you add a Summary? " + 'To do so, add a "## Summary" section to your PR description.';
  fail(`${title} - <i>${idea}</i>`);
}

const includesJiraLink =
  danger.github.pr.body &&
  danger.github.pr.body.toLowerCase().includes("techtonicgroup.atlassian.net/browse/");
if (!includesJiraLink) {
  const title = ":clipboard: Missing Link To Jira Ticket";
  const idea =
    "Can you add a Link to the Jira Ticket? " + "To do so, add a link to your PR description.";
  fail(`${title} - <i>${idea}</i>`);
}

if (danger.github.pr.body.length < 100) {
  fail("Please add more detail to the PR description");
}