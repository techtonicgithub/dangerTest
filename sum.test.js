import { test, expect } from "jest";

const { notStaff } = require("./src/screens/Helper/helper");

test("adds 1 + 2 to equal 3", () => {
  expect(notStaff(1, 2)).toBe(3);
});
