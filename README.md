# Who are we?

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

To this end, Spectrum Web Components only targets _modern_, evergreen browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible but documented if necessary.

# Requirements

-   NodeJS >= 14.15.3
-   Typescript
-   Browsers with Custom Elements V1 and Shadow DOM support, e.g. Chrome, Firefox, Safari, Edge (79+)
    -   Or appropriate [polyfills](https://github.com/webcomponents/webcomponentsjs) in older browsers.

# Getting started

```bash
git clone https://github.com/adobe/spectrum-web-components.git
cd spectrum-web-components
yarn
```

The call to `yarn` will install and setup everything you need for developing and running the packages in this library.

Typical development will involve running `yarn storybook`, `yarn test`, and `yarn docs:start` if you're making documentation changes (see below for additional details).

## Building a new component

Creating a new component from the command line can be done by running the following:

```bash
$ yarn new-package
```

This will scaffold your component's required architecture by prompting you for 2 data points - the desired name for your package and the name of the Spectrum CSS asset from which you will be building.

? **SWC package name (i.e. color-area)**

_Note_ that your component name should be provided in kebab case and should relate as closely as possible to the Spectrum core naming.

? **Spectrum CSS package name (i.e. colorarea)**

You can find this information in the [Spectrum CSS GitHub project](https://github.com/adobe/spectrum-css) by finding the component package.json (i.e., `components/accordion/package.json`)

For additional information, please see the [generating components documentation](https://opensource.adobe.com/spectrum-web-components/guides/generating-components) and capturing the value of the package name: `"name": "@spectrum-css/accordion"`. In this example, that name is `accordion`. _Note_ that the project scope `@spectrum-css` is stripped out of the response.

# Storybook

Testing & reviewing changes can be done using the Storybook instance. Running `yarn storybook` will spin up a local instance of Storybook, triggering the browser to open at completion. From there you can make changes to your code and the browser will automatically refresh.

You can run [Storybook](https://storybook.js.org) through the command:

```bash
yarn storybook
```

By default, the resulting site will be available at [http://localhost:8000](http://localhost:8000).

# Documentation

The Spectrum Web Components documentation site is available via the following command:

```bash
yarn docs:start
```

By default, the resulting site will be available at [http://localhost:8080](http://localhost:8080).

In the case that you'd like to serve and test a static build of the documentation from the root directory (`localhost` or otherwise), use:

```bash
yarn docs:build
```

# Advanced development

There are several commands that can be useful in specific scenarios:

-   `yarn build:clear-cache` to remove previously created artifacts of the `tsc build` process.
-   `yarn spectrum-vars` to ensure that theme files are up-to-date.
-   `yarn process-icons` to make sure that the most recent icons are included.
-   `yarn process-spectrum` to process the spectrum CSS style sources into the individual packages.
-   `yarn build` to make sure the available JS has been built from the current TS source.

## Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `yarn lint`. It uses ESLint to lint the JS / TS files, and StyleLint to lint the CSS files.

### Dependency linting

There are downstream issues that can arise from multiple packages in this mono-repo using dependencies with mismatching version strings. This is particularly an issue for dependencies below `1.0.0` but can be exacerbated in that context and others by more strict settings that can be applied in various package managers. By default, Lerna will bump version numbers of internal dependencies when the various packages are published and the depended version is pointing to the latest release, which can help to mitigate this issue. This can be further mitigated by using `^0.0.0` structured dependency versions, the `^` allowing for the highest amount of upward flexibility in satisfying the dependency. When using these version strings, `yarn lint:versions` which ensure that all instances of those strings for the same dependency match across the repo.

`yarn list:versions --fix` will reach into the `package.json` files and update all dependencies to the latest version available in the library, _a possibly dangerous operation_. If you know this is what you want to do when there are mismatched versions found by `yarn lint:versions`, this can make greatly shorten the amount of work to catch the versions up to each other.

## Testing

### Unit tests

Unit tests are run with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) in Playwright using the Chai, Mocha and Sinon helper libraries. These tests can be executed with:

```
yarn test
```

During development you may wish to use `yarn test:watch` to automatically build and re-run the test suites.

### Screenshot testing

Note: visual regression is done automatically on pull requests via CircleCI; however, the following outlines how you can run these tests local to your machine.

Visual regressions are tracked via screenshot testing powered by [`@web/test-runner-visual-regression`](https://github.com/modernweb-dev/web/tree/master/packages/test-runner-visual-regression). Due to the font metrics not being identical, it is difficult to rely on screenshot-based testing across operating systems. Because of this, the library manages its golden image cache internal to CircleCI, rather than as a part of the git repository. Neither the `screenshots-baseline` nor `screenshots-actual` directory should be added to git. When working with visual regression tests locally to manage changes you are making, be sure to create a baseline locally before you begin development (alternatively, you can pull down the main branch to generate the baselines for your in-progress work).

To create a local baseline for comparing your changes to later in the development cycle, use the following:

```bash
yarn test:visual:clean # start with a clean slate
# yarn test:visual:clean:baseline # removes only baseline images
# yarn test:visual:clean:current # removes only images updated in the most recent test pass
yarn test:visual vrt-light-medium-ltr # vrt-${color}-${scale}-${direction} to access all theme options
# ...
yarn test:visual vrt-light-medium-ltr # repeat the same as above for a clean comparison
```

#### Screenshot coverage

Visual regression testing is done against screens derived from the exports of the `*.stories.js` files in each package. As you add packages or story files to existing packages, they will automatically be added to the visual regression suite and will require updating the cache key (outlined below).

#### Keeping CI assets updated

If you find the `visual-*` jobs failing on CircleCI for reasons that you expect (you've updated the Spectrum CSS dependencies, you've added new tests, etc.) then you will need to update the golden images cache key before your build will pass. You can review and share the diffs for a test pass via a URL shaped like `vrt--spectrum-web-components.netlify.app/${branchName}`. Before updating the cache key, be sure that the updated caches are both complete (there are times when process errors prevent images from being correctly created or when certain test passes take longer than others) and appear as expected. If you agree with the updated cache content, update the golden images cache key as follows.

Your failing branch will have created a new cache with a key of `v1-golden-images-{{ .Revision }}-<< parameters.regression_color >>-<< parameters.regression_scale >>-<< parameters.dir >>-{{ epoch }}`. Here `{{ .Revision }}` outlines the git commit hash of the current CI pass. In `.circleci/config.yml`, you will use that to update the cache that is requested at the beginning of the `run-regressions` job. As part of the review site, the git commit hash will be listed in the side navigation UI for easy access, use this number to update the `current_golden_images_hash` paramater that appears as follows:

```
parameters:
    current_golden_images_hash:
        type: string
        default: ${UPDATE_REVISION_NUMBER_HERE}
```

This will ensure that tests on this branch point to this cache key for at least the next 30 days (keep-alive time of caches on CircleCI). Once the branch is merged to `main`, a cache key of `v2-golden-images-main-<< parameters.regression_color >>-<< parameters.regression_scale >>-<< parameters.regression_dir >>-{{ epoch }}` will be created on each successful build of `main` that will be long-lived and act as the "fallback" once the revision keyed cache has expired.

## Benchmarking

You can acquire current runtimes for the individual elements with:

```
yarn build:tests
yarn test:bench
```

This will run the defined [Tachometer](https://www.npmjs.com/package/tachometer) tests and report the current runtime cost of each individual element. When not making changes to the benchmarks on your local machine, you can skip `yarn build:tests` for later passes.

## Anatomy of a component

There is extended documentation on adding a new component to the library in the [documentation site](https://opensource.adobe.com/spectrum-web-components/guides/generating-components). However, at a high level, you will be building the following structure:

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

## IDE Notes

The build process compiles `.css` files using PostCSS and wraps them in the `lit-html` `css` template tag and writes out a `.css.ts` file for easy import into TypeScript files. This file should not be edited, and is ignored by `.gitignore`, but you may also wish to hide the files in your IDE.

# Contributing

We'd be very grateful if you contributed to the project! Check out our [contribution guidelines](CONTRIBUTING.md) for more information.
