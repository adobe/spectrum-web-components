# spectrum-web-components

[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/spectrum-web-components.svg?token=da7a46ab9a22534bdbfa457636e420177675b0e3c7018966f710e224c3b4f3fe&ts=1569000996259)](https://greenkeeper.io/)

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

It will not support older browsers and will only target modern ever-green browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible.

# Requirements

-   NodeJS >= 10.15
-   Typescript
-   Browsers with Custom Elements V1 and Shadow DOM support, e.g. Chrome, Firefox, Safari, Edge (79+)
    -   Or appropriate [polyfills](https://github.com/webcomponents/webcomponentsjs) in older browsers.

# Getting Started

```bash
git clone https://github.com/adobe/spectrum-web-components.git
cd spectrum-web-components
yarn
```

The call to `yarn` will subsequently trigger scripting which will ensure that your local repo is adequately prepared to develop and run the packages in this library. Commands therein include:

-   `yarn build:clear-cache` to remove previously created artifacts of the `tsc build` process.
-   `yarn spectrum-vars` to ensure that theme files are up-to-date.
-   `yarn process-icons` to make sure that the most recent icons are included.
-   `yarn process-spectrum` to process the spectrum CSS style sources into the individual packages.
-   `yarn build` to make sure the most recent code base is represented in each package's `lib` folders.

# Documentation

The Spectrum Web Components documentation site is available via the following command:

```bash
yarn docs:start
```

By default the resulting site will be available at [http://localhost:8080](http://localhost:8080).

In the case that you'd like to serve and test a static build of the documentation from the root director of a server (`localhost` or otherwise), use:

```bash
yarn docs:build
```

# Storybook

You can run [Storybook](https://storybook.js.org) through the command:

```bash
yarn storybook
```

By default the resulting site will be available at [http://localhost:6006](http://localhost:6006).

## Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `yarn lint`. It uses ESLint to lint the JS / TS files, and StyleLint to lint the CSS files.

### Dependency Linting

There are downstream issues that can arise from multiple packages in this mono-repo using dependencies with mismatching version strings. This is particularly an issue for dependencies below `1.0.0` but can be exacerbated in that context and others by more strict settings that can be applied in various package managers. By default, Lerna will bump version numbers of internal dependencies when the various packages are published and the depended version is pointing to the latest release, which can help to mitigate this issue. This can be further mitigated by using `^0.0.0` structured dependency versions, the `^` allowing for the highest amount of upward flexibility in satisfying the dependency. When using these version strings, `yarn lint: versions` which ensure that all instances of those strings for the same dependency match across the repo.

## Testing

### Unit Tests

Unit tests are implemented using the Karma test runner with Chai, Mocha and Sinon frameworks. These tests can be executed with:

```
yarn test
```

During development you may wish to use `yarn test:watch` to automatically build and re-run the test suites.

### Screenshot Testing

Visual regressions are tracked via screenshot testing powered by Puppeteer. There are _two_ types of visual testing built into this library: those that should only be run in CircleCI to power the continuous integreation workflow and those that can be run on your local machine. Due to the font metrics not being identical, it is difficult to rely on screenshot based testing across OSes, so if you'd like to leverage these tests to manage changes you are making, be sure to create a local baseline before you start to develop.

To create a baseline, and then later compare the current state of the repo to it, use the following commands:

```bash
yarn storybook:build # creates the test assets
yarn test:visual:baseline:local --color=light --scale=medium
# ...
yarn test:visual:local --color=light --scale=medium
```

These tests are run against the built Storybook artifacts, so be sure to run `yarn storybook:build` first.

#### Adding New Tests

Visual testing is run against the stories in Storybook, and stories added there need to be manaully added to [`test/visual/stories.js`](test/visual/stories.js). Only stories that are listed there will be included in the visual regression, so please add any new stories you create to this list so that the quality of this library can be maintained over time.

#### Keeping CI Assets Up-to-date

If you find the `visual-*` jobs failing on CircleCI for reasons that you expect (you've updated the Spectrum CSS dependencies, you've added new tests, etc.) then you will need to update the golden images cache key before your build will pass. Said update is a two-step process that allows you to update the golden images for your branch without disrupting other work going on in the repo while also preparing for the reality that CircleCI caches are only guaranteed for up to 30 days, but if you've already run a failing build, you're half way there!

Your failing branch will have created a new cache with a key of `v1-golden-images-<< parameters.regression_color >>-<< parameters.regression_scale >>-{{ .Revision }}`. In `.circleci/config.yml`, you will use that to update the cache that is restored at the beginning of the `run-regressions`, at least for the next 30 days. Using the revision number outlined in the `Build Golden Images Revision Cache` step of your failing build, update the first cache key listed in the `Restore Golden Images Cache` steps that appears as follows:

```
- restore_cache:
    name: Restore Golden Images Cache
    keys:
        - v1-golden-images-<< parameters.regression_color >>-<< parameters.regression_scale >>-${REVISION_NUMBER}
```

With this update, your branch should now be able to pass the visual regression tests by loading the golden images from the new cache. The fact that this revision based cache will expire after 30 days is overcome by the fallback key of `v1-golden-images-master-<< parameters.regression_color >>-<< parameters.regression_scale >>-` which will address the latest cache created by the `master` branch whenever the specifically requested revision cache is not available.

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
