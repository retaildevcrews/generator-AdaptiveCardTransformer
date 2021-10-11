/* eslint-disable no-undef */
"use strict"
const path = require("path")
const helpers = require("yeoman-test")

describe("generator-adapter-plugins:app", () => {
	it("creates files", () => {
		return helpers
			.run(path.join(__dirname, "../generators/app"))
			.withPrompts({
				bot: "createBot",
				botname: "adapter-bot",
				description: "foo",
				language: "JavaScript",
				plugins: ["includePreProcessor", "includePostProcessor"],
			})
			.then(function (result) {
				result.assertFile([
					"adapter-bot/package.json",
					"adapter-bot/index.js",
					"adapter-bot/bot.js",
					"adapter-bot/.npmrc",
					"adapter-bot/plugins/postProcessor/index.js",
					"adapter-bot/plugins/preProcessor/index.js",
					"adapter-bot/plugins/templateSelector/index.js",
				])
			})
	})
})
