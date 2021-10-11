# generator-adaptive-card-transformer

> Utilize Yeoman to create a bot and plugins for use with the [AdaptiveCardTransformer]

## Related Projects

There are three related repositories for the Adaptive Card Transformer:

- [AdaptiveCardTransformer] - The easy-to-use adapter enabling back-end NLU responses to be rendered through Adaptive Card functionality with an extendable plugin pattern
- [AdaptiveCardTransformerExampleBot] - The Teams bot example implementation that uses the `adaptive-card-transformer`
- [generator-AdaptiveCardTransformer] - The Yeoman generator for scaffolding plugins using the `adaptive-card-transoformer`

[adaptivecardtransformer]: https://github.com/retaildevcrews/AdaptiveCardTransformer
[adaptivecardtransformerexamplebot]: https://github.com/retaildevcrews/AdaptiveCardTransformerExampleBot
[generator-adaptivecardtransformer]: https://github.com/retaildevcrews/generator-AdaptiveCardTransformer

## Installation

First, install [Yeoman](http://yeoman.io) and generator-adaptive-card-transformer using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @retaildevcrews/generator-adaptive-card-transformer
```

Then generate your new project:

```bash
yo @retaildevcrews/adaptive-card-transformer
```

## Local Installation (for development)

To run build and run the generator locally, you have to be in the generator-adaptive-card-transformer directory. From the root run the following commands:

```bash
npm install -g yo    // installs yeoman globally - needed to run the generator
npm install          // installs generator source dependencies
npm link             // creates a local package of the adaptive-card-transformer generator
```

Navigate to the directory where you want to use the adaptive-card-transformer and run:

```bash
yo adaptive-card-transformer     // files will be generated in your current directory
```

## How to file issues and get help

This project uses GitHub Issues to track bugs and feature requests. Please search the existing issues before filing new issues to avoid duplicates. For new issues, file your bug or feature request as a new issue.
For help and questions about using this project, please open a GitHub issue.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>
When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.
This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services.
Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
