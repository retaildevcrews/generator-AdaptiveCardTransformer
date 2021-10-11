/* eslint-disable @typescript-eslint/no-var-requires */
"use strict"
const Generator = require("yeoman-generator")
const chalk = require("chalk")
const yosay = require("yosay")
//const botbuilder = require('generator-botbuilder')

module.exports = class extends Generator {
	initializing() {
		this.log(
			yosay(
				`Welcome to the ${chalk.red("Adaptive Card Transformer")} generator!`,
			),
		)
		this.log(
			"For detailed documentation on using the Adaptive Card Transformer, please refer to: https://github.com/retaildevcrews/AdaptiveCardTransformer/blob/main/README.md",
		)
		this.log("-------")
	}

	async prompting() {
		await this._promptingBot()

		if (this.answersAdapter.bot == "createBot") {
			await this._promptingBotbuilder()
		}

		await this._promptingPlugins()
	}

	async _promptingBot() {
		// prompt if we want to use this bot, and prompts to pass to botbuilder
		const prompts = [
			{
				type: "list",
				name: "bot",
				message:
					"To use the Adaptive Card Transformer, you will first need a bot. Do you have an existing bot?",
				choices: [
					{
						name: "No, I would like to create a new echo bot",
						value: "createBot",
					},
					{
						name: "Yes, I have an existing bot",
						value: "existingBot",
					},
				],
			},
		]

		this.answersAdapter = await this.prompt(prompts)
	}

	async _promptingBotbuilder() {
		const promptsBot = [
			{
				type: "input",
				name: "botname",
				message: "What would you like your bot name to be?",
				default: "adapter-bot",
			},
			{
				type: "input",
				name: "description",
				message: "What will your bot do?",
				default:
					"Demonstrate the core capabilities of the Adaptive Card Transformer and Microsoft Bot Framework",
			},
			{
				type: "list",
				name: "language",
				message: "What programming language do you want to use?",
				choices: [
					{
						name: "JavaScript",
						value: "JavaScript",
					},
					{
						name: "TypeScript",
						value: "TypeScript",
					},
				],
			},
		]
		this.answersBot = await this.prompt(promptsBot)
	}

	generateBotbuilder() {
		if (this.answersAdapter.bot == "createBot") {
			// Running botbuilder generator as sub generator
			// Do not let the botbuilder generator prompt user, rather pass in user responses from the adapter generator
			this.composeWith(require.resolve("generator-botbuilder/generators/app"), {
				"skip-install": true,
				noprompt: true,
				botname: this.answersBot.botname,
				description: this.answersBot.description,
				language: this.answersBot.language,
				template: "echo",
			})
		} else {
			this.log(
				"We are not generating a new echo bot -- you will have to manually integrate the Adaptive Card Transformer into your bot",
			)
		}
	}

	async _promptingPlugins() {
		// prompt for which plugins to move over
		const promptsPlugin = [
			{
				type: "checkbox",
				name: "plugins",
				message:
					"In additon to the template-selector, what optional plugins would you like to use with the Adaptive Card Transformer?",
				choices: [
					{
						name: "pre-processor",
						value: "includePreProcessor",
					},
					{
						name: "post-processor",
						value: "includePostProcessor",
					},
				],
			},
		]
		this.answersPlugin = await this.prompt(promptsPlugin)
	}

	writing() {
		// we will always copy over the templateSelector because it is required for use with  the adapter
		var pluginsPath = "."
		if (this.answersAdapter.bot == "createBot") {
			pluginsPath = this.answersBot.botname
		}

		this.log("Creating template-selector plugin...")
		this.fs.copy(
			this.templatePath(`templateSelector`),
			this.destinationPath(pluginsPath + "/plugins/templateSelector"),
		)

		// adding additional plugins based on user response
		if (
			this.answersPlugin.plugins == "includePreProcessor,includePostProcessor"
		) {
			this.log("Creating pre-processor and post-processor plugins...")
			this.fs.copy(
				this.templatePath(`preProcessor`),
				this.destinationPath(pluginsPath + "/plugins/preProcessor"),
			)

			this.fs.copy(
				this.templatePath(`postProcessor`),
				this.destinationPath(pluginsPath + "/plugins/postProcessor"),
			)

			this.fs.copy(
				this.templatePath(`pluginConfigs/pluginConfigAll.json`),
				this.destinationPath(pluginsPath + "/plugins/pluginConfig.json"),
			)
		} else if (this.answersPlugin.plugins == "includePreProcessor") {
			this.log("Creating pre-processor plugin...")
			this.fs.copy(
				this.templatePath(`preProcessor`),
				this.destinationPath(pluginsPath + "/plugins/preProcessor"),
				this.fs.copy(
					this.templatePath(`pluginConfigs/pluginConfigPre.json`),
					this.destinationPath(pluginsPath + "/plugins/pluginConfig.json"),
				),
			)
		} else if (this.answersPlugin.plugins == "includePostProcessor") {
			this.log("Creating post-processor plugin...")
			this.fs.copy(
				this.templatePath(`postProcessor`),
				this.destinationPath(pluginsPath + "/plugins/postProcessor"),
				this.fs.copy(
					this.templatePath(`pluginConfigs/pluginConfigPost.json`),
					this.destinationPath(pluginsPath + "/plugins/pluginConfig.json"),
				),
			)
		} else {
			this.log("User did not select any additional plugins")
			this.fs.copy(
				this.templatePath(`pluginConfigs/pluginConfigTemplateSelector.json`),
				this.destinationPath(pluginsPath + "/plugins/pluginConfig.json"),
			)
		}
	}

	_overwriteBot() {
		// overwrite package.json to add dependency on adapter - this assumes we consume the adapter via github package, not npm registry
		this.log(
			"Integrating the Adaptive Card Transformer into your bot...you will next be prompted to overwrite conflict files.",
		)
		this.log("To integrate, overwrite the below files by replying 'Y'")

		const pkgJsonTypeScript = {
			main: "./lib/src/index.js",
			scripts: {
				start: "tsc --build && node ./lib/src/index.js",
			},
			dependencies: {
				"@retaildevcrews/adaptive-card-transformer": "^0.2.4",
			},
			devDependencies: {
				"@types/node": "^10.17.27",
			},
		}

		const pkgJsonJavaScript = {
			dependencies: {
				"@retaildevcrews/adaptive-card-transformer": "^0.2.4",
			},
			devDependencies: {
				"@types/node": "^10.17.27",
			},
		}

		// adds GitHub registry for adapter - this assumes the adapter is a public repo
		this.fs.copy(
			this.templatePath(`botAdapter/.npmrc.example`),
			this.destinationPath(".npmrc"),
		)

		// overwrite bot files to import the adapter and pluginConfig
		if (this.answersBot.language == "TypeScript") {
			// extend package.json file in destination path
			this.fs.extendJSON(
				this.destinationPath("package.json"),
				pkgJsonTypeScript,
			)

			// overwrite bot file
			this.fs.copy(
				this.templatePath(`botAdapter/echoBot.ts`),
				this.destinationPath("src/bot.ts"),
			)
			// change root directory to contain both src and plugins
			const tsconfig = {
				compilerOptions: {
					rootDir: ".",
					resolveJsonModule: true,
				},
			}

			// extend tsconfig.json file in destination path
			this.fs.extendJSON(this.destinationPath("tsconfig.json"), tsconfig)
		} else if (this.answersBot.language == "JavaScript") {
			this.fs.extendJSON(
				this.destinationPath("package.json"),
				pkgJsonJavaScript,
			)

			this.fs.copy(
				this.templatePath(`botAdapter/echoBot.js`),
				this.destinationPath("bot.js"),
			)
		}
	}

	install() {
		if (this.answersAdapter.bot == "createBot") {
			// integrate adapter into bot by overwriting package.json, tsconfig and bot.ts/bot.js files
			this._overwriteBot()
		} else {
			this.log(
				"To manually integrate the Adaptive Card Transformer into your bot, please refer to steps found in https://github.com/retaildevcrews/AdaptiveCardTransformer/blob/main/docs/HowToIntegrate.md",
			)
		}
		this.npmInstall()
	}

	end() {
		this.log(
			"Thanks for using the Adaptive Card Transformer generator. Go add logic to your plugins!",
		)
	}
}
