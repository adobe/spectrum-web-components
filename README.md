# spectrum-web-components

[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/spectrum-web-components.svg?token=da7a46ab9a22534bdbfa457636e420177675b0e3c7018966f710e224c3b4f3fe&ts=1569000996259)](https://greenkeeper.io/)

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

It will not support older browsers and will only target modern ever-green browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible.

# Requirements

-   NodeJS >= 8.10.0
-   Typescript
-   Browsers with Custom Elements V1 and Shadow DOM support, e.g. Chrome, Firefox, Safari.

# Getting Started

```bash
git clone https://github.com/adobe/spectrum-web-components.git
cd spectrum-web-components
yarn
```

# Documentation

The Spectrum Web Components documentation site is available via the following command:

```bash
yarn docs:start
```

By default the resulting site will be available at [http://localhost:8080](http://localhost:8080).

# Storybook

You can run [Storybook](https://storybook.js.org) through the command:

```bash
yarn storybook
```

By default the resulting site will be available at [http://localhost:6006](http://localhost:6006).

## Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `yarn lint`. It uses ESLint to lint the JS / TS files, and StyleLint to lint the CSS files.

## Testing

Tests are implemented using the Karma test runner with Chai, Mocha and Sinon frameworks. These tests can be executed with:

```
yarn test
```

During development you may wish to use `yarn test:watch` to automatically build and re-run the test suites.

## Benchmarking

You can acquire current runtimes for the individual elements with:

```
yarn build:tests
yarn test:bench
```

This will run the defined [Tachometer](https://www.npmjs.com/package/tachometer) tests and report the current runtime cost of each individual element. When not making changes to the benchmarks thy have been built on your local machine, you can stip `yarn build:tests` for later passes.

## Anatomy of a Component

There is extended documentation on adding a new component to the library in the [documentation site](http://localhost:8080/guides/adding-component). However, at a high level, you will be building the following structure:

-   packages
    -   new-component-name
        -   src
            -   index.ts
            -   new-component-name.css
            -   new-component-name.ts
            -   spectrum-config.js
            -   spectrum-new-component-name.css
        -   stories
            -   new-component-name.stories.ts
        -   test
            -   benchmark
                -   test-basic.ts
            -   new-component-name.test.ts
        -   package.json
        -   README.md
        -   tsconfig.json

For a list of component waiting to be implemented, visit our [`missing components`](https://github.com/adobe/spectrum-web-components/labels/missing%20components) tag.

## Development within Adobe

Due to the internal `@adobe` npm registry served by Artifactory, when developing this module internally it is necessary to provide an `.npmrc` local to this project which forces the use of the public `@adobe` scope on public npm. Therefore if you are an Adobe employee working on this project add the following to a `.npmrc` file in this folder:

```
@adobe:registry=https://registry.npmjs.org/
registry=https://registry.npmjs.org/
```

This will ensure that when installing dependencies you do not accidentally pull from the internal repositories.

## IDE Notes

The build process compiles `.css` files using PostCSS and wraps them in the `lit-html` `css` template tag and writes out a `.css.ts` file for easy import into TypeScript files. This file should not be edited, and is ignored by `.gitignore`, but you may also wish to hide the files in your IDE.

# Contributing

We'd be very grateful if you contributed to the project! Check out our
[contribution guidelines](CONTRIBUTING.md) for more information.

## Commitlint

We use [Commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint) to help manage the semantic versions across the various packages in this library. Please be sure that you take this into concideration when submitting PRs to this repositiory. Generally, your commits should look like the following:

```
type(scope?): subject #scope is optional, but should reference the package you are updating
```
