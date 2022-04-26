# jest-teamcity

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/pandell/jest-teamcity/actions/workflows/node-ci.yml/badge.svg)](https://github.com/pandell/jest-teamcity/actions/workflows/node-ci.yml)
[![npm](https://img.shields.io/npm/v/@pandell/jest-teamcity)](https://www.npmjs.com/package/@pandell/jest-teamcity)

`jest-teamcity` is a modern Jest Test Result Processor for TeamCity written in TypeScript. It makes use of TeamCity [service messages](https://www.jetbrains.com/help/teamcity/service-messages.html) to pass information about the Jest test results to the TeamCity server. This makes it possible to display Jest test results in real-time and make the test information available on the `Tests` tab of the `Build Results` page.

## How To Use

To use `@pandell/jest-teamcity`, add the package to your project and update your Jest configuration:

```sh
yarn add -D @pandell/jest-teamcity
```

Add a reporter to the Jest configuration file or the `package.json`. For details, check the [Jest documentation](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options).

```js
// `jest.config.js`
module.export = {
    ...
    reporters: process.env.TEAMCITY_VERSION ? ["@pandell/jest-teamcity"] : ["default"],
    ...
}
```

The above configuration uses the custom `@pandell/jest-teamcity` report if the `TEAMCITY_VERSION` environment variable is set (as is always the case for a TeamCity agent), and uses the default reporter otherwise, resulting in a nice local development experience.

## Jest terminology

- Test: A "single" test, declared with (`it`/`test`)
- Test Suite: A collection of individual tests (grouped with `describe`)
- Test Run: A single "run" of all test suites (as specified by the CLI, config, ...)

### Custom Jest reporters

`@pandell/jest-teamcity` is implemented as a custom Jest _reporter_.

> A custom reporter is a class that implements `onRunStart`, `onTestStart`, `onTestResult`, `onRunComplete` methods that will be called when any of those events occurs.

See the [Jest documentation](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options) for more details.

When using `@pandell/jest-teamcity`, we recommend replacing the [default reporter](https://github.com/facebook/jest/blob/main/packages/jest-reporters/src/DefaultReporter.ts) so that only TeamCity service messages are written to the standard output. The default Jest reporter is overridden automatically if only specifying `@pandell/jest-teamcity` as a custom reporter (see [#how-to-use](#how-to-use)).

### Jest Test Result Processors

Jest also has the notion of [test result processors](https://jestjs.io/docs/configuration#testresultsprocessor-string). However, `@pandell/jest-teamcity` is deliberately implemented as a custom Jest reporter to report on the test progress live, as a reporter can receive test results after individual tests and/or test suites are finished.

## Contribute

To build and contribute to this project, you require [Node](https://nodejs.org/en/) and the [yarn](https://yarnpkg.com/) package manager.

```sh
yarn

# run tests
yarn test
```

## Create a Release

To create a new release, you need to do the following steps:

```sh
# bump package version (you can also omit the arguments and follow the interactive prompt)
yarn version --new-version 1.2.3

# push tag to remote
git push origin v1.2.3

# create a new release (using GitHub CLI)
gh release create v1.2.3
```

The new release triggers a new package to be pushed to `npmjs` via GitHub Actions.

## Alternatives

- [jest-teamcity](https://github.com/itereshchenkov/jest-teamcity)
- [jest-teamcity-reporter](https://github.com/winterbe/jest-teamcity-reporter)
