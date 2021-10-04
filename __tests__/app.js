/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const path = require("path");
const helpers = require("yeoman-test");

describe("generator-adapter-plugins:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    //assert the file exists
  });
});
