# jest-teamcity

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/pandell/jest-teamcity/actions/workflows/node-ci.yml/badge.svg)](https://github.com/pandell/jest-teamcity/actions/workflows/node-ci.yml)

`jest-teamcity` is a modern Jest Test Result Processor for TeamCity written in TypeScript. It makes use of TeamCity [service messages](https://www.jetbrains.com/help/teamcity/service-messages.html) to pass information about the Jest test results to the TeamCity server. This makes it possible to display Jest test results in real-time and make the test information available on the `Tests` tab of the `Build Results` page.

## Contribute

To build and contribute to this project, you require [Node](https://nodejs.org/en/) and the [yarn](https://yarnpkg.com/) package manager.

```sh
# build the project
yarn build

# run tests
yarn test
```

## Create a Release

```sh
gh release create v1.2.3
```
