/* eslint-disable import/no-extraneous-dependencies */
// import { fail, warn, message, markdown, danger } from 'danger';
import eslint from "danger-plugin-eslint";

// fail("This is a failure message");
// warn('This is a warning');
// message('This is a normal message');
// markdown('*Markdown* is also **supported**');

// const { additions = 0, deletions = 0 } = danger.github.pr;
// message(`:tada: The PR added ${additions} and removed ${deletions} lines.`);

// import { message, danger, markdown } from 'danger';

// const modifiedMD = danger.git.modified_files.join('- ');
// message('Changed Files in this PR: \n - ' + modifiedMD);

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

// // Provides advice if a test plan is missing.
// const includesTestPlan =
//   danger.github.pr.body &&
//   danger.github.pr.body.toLowerCase().includes('## test plan');
// if (!includesTestPlan) {
//   const title = ':clipboard: Missing Test Plan';
//   const idea =
//     'Can you add a Test Plan? ' +
//     'To do so, add a "## Test Plan" section to your PR description. ' +
//     'A Test Plan lets us know how these changes were tested.';
//   message(`${title} - <i>${idea}</i>`);
// }

// const includes = require('lodash.includes');

// // Provides advice if a summary section is missing, or body is too short
// const includesSummary =
//   danger.github.pr.body &&
//   danger.github.pr.body.toLowerCase().includes('## summary');
// if (!danger.github.pr.body || danger.github.pr.body.length < 50) {
//   fail(':grey_question: This pull request needs a description.');
// } else if (!includesSummary) {
//   const title = ':clipboard: Missing Summary';
//   const idea =
//     'Can you add a Summary? ' +
//     'To do so, add a "## Summary" section to your PR description. ' +
//     'This is a good place to explain the motivation for making this change.';
//   message(`${title} - <i>${idea}</i>`);
// }

// const summaryContent = fs.readFileSync("SUMMARY.MD").toString();

import { schedule } from "danger";
import { istanbulCoverage } from "danger-plugin-istanbul-coverage";

// eslint();

schedule(
  istanbulCoverage({
    // Set a custom success message
    customSuccessMessage: "Congrats, coverage is good",

    // Set a custom failure message
    customFailureMessage: "Coverage is a little low, take a look",

    // How to sort the entries in the table
    entrySortMethod: "alphabetical", // || "least-coverage" || "most-coverage" || "largest-file-size" ||"smallest-file-size" || "uncovered-lines"

    // Add a maximum number of entries to display
    numberOfEntries: 10,

    // The location of the istanbul coverage file.
    // coveragePath: "./coverage/coverage-final.json",
    coveragePath: "./coverage/lcov.info",
    // Alternatively, if you have multiple coverage summaries, you can merge them into one report
    // coveragePaths: ['./dir1/coverage-summary.json', './dir2/coverage-summary.json'],
    // You can also specify the format, instead of letting it be inferred from the file name
    // coveragePath: { path: "./coverage/lcov.info", type: "lcov" /* ||  "json-summary" */ },

    // Which set of files to summarise from the coverage file.
    reportFileSet: "all", // || "modified" || "created" || "createdOrModified"

    // What to do when the PR doesn't meet the minimum code coverage threshold
    reportMode: "fail", // || "warn" || "fail"

    // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
    threshold: {
      statements: 90,
      branches: 100,
      functions: 100,
      lines: 100
    }
  })
);
