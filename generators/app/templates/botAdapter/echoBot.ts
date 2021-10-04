// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, MessageFactory, CardFactory } from "botbuilder"
import adapter from "@retaildevcrews/adaptive-card-transformer" // Card Adapter Package
import * as pluginConfig from "../plugins/pluginConfig.json" // Generated plugin config

export class EchoBot extends ActivityHandler {
	constructor() {
		super()
		// See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
		this.onMessage(async (context, next) => {
			const replyText = `Echo: ${context.activity.text}`

			// create some payload (e.g. from an API response)
			// this is an example payload that would map directly to the text.json sample template
			const conversationPayload = {
				text: replyText,
				subtext: "This is an example using the text.json template",
				showSubtext: true,
			}

			// invoke the adapter with each response
			const adaptiveCardJson = await adapter(conversationPayload, pluginConfig)

			// utilize the adaptive card factory to generate an activity attachment to be sent to the user
			const adaptiveCard = CardFactory.adaptiveCard(adaptiveCardJson)

			// respond to the user
			await context.sendActivity({ attachments: [adaptiveCard] })

			// By calling next() you ensure that the next BotHandler is run.
			await next()
		})

		this.onMembersAdded(async (context, next) => {
			const membersAdded = context.activity.membersAdded
			const welcomeText = "Hello and welcome!"
			for (const member of membersAdded) {
				if (member.id !== context.activity.recipient.id) {
					await context.sendActivity(
						MessageFactory.text(welcomeText, welcomeText),
					)
				}
			}
			// By calling next() you ensure that the next BotHandler is run.
			await next()
		})
	}
}
