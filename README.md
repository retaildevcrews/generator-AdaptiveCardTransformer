# generator-AdaptiveCardTransformer

Yeoman generator for the [Adaptive Card Transformer](https://github.com/retaildevcrews/AdaptiveCardTransformer). This generator will let you quickly set up an echo bot and plugins for use with the `Adaptive Card Transformer`.

## About

To use the [Adaptive Card Transformer](https://github.com/retaildevcrews/AdaptiveCardTransformer), you will need a bot and plugins. If you do not already have a bot, you can create a new echo bot with `generator-AdaptiveCardTransformer`. After scaffolding the echo bot and selected plugins, the generator will prompt the user to integrate the `Adaptive Card Transformer` and plugins into the provided echo bot. If you already have a bot, you will need to manually integrate the `Adaptive Card Transformer` and plugins into your bot. For manual integration, please refer to this [documentation](https://github.com/retaildevcrews/AdaptiveCardTransformer/blob/main/docs/HowToIntegrate.md)

## Local Installation of Generator

First, clone this repository. Then from the root, run the following commands:

```bash
npm install -g yo    // installs yeoman globally - needed to run the generator
npm install          // installs generator source dependencies
npm link             // creates a local package of the generator
```

Navigate to the directory where you want to start your project:

```bash
yo AdaptiveCardTransformer    // files will be generated in your current directory
```

## Installation (once published)

First, install [Yeoman](http://yeoman.io) and generator-AdaptiveCardTransformer using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo       // installs yeoman globally - needed to run the generator
npm install -g generator-AdaptiveCardTransformer    // installs generator
```

Then generate your new project:

```bash
yo generator-AdaptiveCardTransformer    // files will be generated in your current directory
```

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License (once published)

- TODO Add npm-image and npm-url when the generator is published
