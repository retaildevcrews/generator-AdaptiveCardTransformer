"use strict"

const fs = require("fs").promises
const path = require("path")
const config = require("./templateConfig.json")
const textTemplate = require("./templates/text.json")

/**
 * Determines which adaptive card template to use, given the dialogPayload
 *
 * @param dialogPayload Data payload which will be used to transform the adaptive card
 * @returns Adaptive Card Template
 */
async function templateSelector(dialogPayload) {
	// this is an example template selector that only returns the text template
	return textTemplate
}

module.exports = templateSelector
