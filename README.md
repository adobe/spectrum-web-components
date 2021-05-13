# spectrum-web-components

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

It will not support older browsers and will only target modern ever-green browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible.

# Requirements

-   NodeJS >= 12.18.3
-   Typescript
-   Browsers with Custom Elements V1 and Shadow DOM support, e.g. Chrome, Firefox, Safari, Edge (79+)
    -   Or appropriate [polyfills](https://github.com/webcomponents/webcomponentsjs) in older browsers.

# Getting Started

```bash
git clone https://github.com/adobe/spectrum-web-components.git
cd spectrum-web-components
yarn
```

The call to `yarn` will subsequently trigger scripting which will ensure that your local repo is adequately prepared to develop and run the packages in this library.

Typical development will involve running `yarn storybook`, `yarn test`, and `yarn docs:start` if you're making documentation changes.

# Storybook

Testing & reviewing changes will typically involve running `yarn storybook` which will launch a browser window with the storybook pages. From there you can make changes in development and refresh the browser to pick them up.

You can run [Storybook](https://storybook.js.org) through the command:

```bash
yarn storybook
```

By default the resulting site will be available at [http://localhost:8000](http://localhost:8000), but the storybook command should launch a browser.

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

# Advanced development

There are several more commands that can be useful in specific scenarios:

-   `yarn build:clear-cache` to remove previously created artifacts of the `tsc build` process.
-   `yarn spectrum-vars` to ensure that theme files are up-to-date.
-   `yarn process-icons` to make sure that the most recent icons are included.
-   `yarn process-spectrum` to process the spectrum CSS style sources into the individual packages.
-   `yarn build` to make sure the most recent code base is represented in each package's `lib` folders. This happens automatically in the storybook command.

## Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `yarn lint`. It uses ESLint to lint the JS / TS files, and StyleLint to lint the CSS files.

### Dependency Linting

There are downstream issues that can arise from multiple packages in this mono-repo using dependencies with mismatching version strings. This is particularly an issue for dependencies below `1.0.0` but can be exacerbated in that context and others by more strict settings that can be applied in various package managers. By default, Lerna will bump version numbers of internal dependencies when the various packages are published and the depended version is pointing to the latest release, which can help to mitigate this issue. This can be further mitigated by using `^0.0.0` structured dependency versions, the `^` allowing for the highest amount of upward flexibility in satisfying the dependency. When using these version strings, `yarn lint: versions` which ensure that all instances of those strings for the same dependency match across the repo.

## Testing

### Unit Tests

Unit tests are run with Web Test Runner in Playwright using the Chai, Mocha and Sinon helper libraries. These tests can be executed with:

```
yarn test
```

During development you may wish to use `yarn test:watch` to automatically build and re-run the test suites.

### Screenshot Testing

Note: visual regression is done automatically on pull requests via CircleCI, so unless you're making larger changes it's okay to make use of that directly as opposed to doing visual regression local to your machine.

Visual regressions are tracked via screenshot testing powered by [`@web/test-runner-visual-regression`](https://github.com/modernweb-dev/web/tree/master/packages/test-runner-visual-regression). Due to the font metrics not being identical, it is difficult to rely on screenshot based testing across OSes. Because of this, the library manages its golden image cache internal to CircleCI rather than as a part of the git repository. Neither the `screenshots-baseline` nor `screenshots-actual` directory should ever be added to git. When working with visual regression tests locally to manage changes you are making, be sure to create a baseline locally before you begin development.

To create a local baseline so that you can compare your changes to it later in the development cycle, use the following commands:

```bash
yarn test:visual:clean # start with a clean slate
# yarn test:visual:clean:baseline # removes only baseline images
# yarn test:visual:clean:current # removes only images updated in the most recent test pass
yarn test:visual vrt-light-medium-ltr # vrt-${color}-${scale}-${direction} to access all theme options
# ...
yarn test:visual vrt-light-medium-ltr # repeat the same as above for a clean comparison
```

#### Screenshot coverage

Visual regression testing is done against screens derived from the exports of the `*.stories.js` files in each package. Any stories added to these files will be added to the next run of the regression testing. As you add packages or story files to existing packages, they will automatically be added to the visual regression suite and will requiring updating the cache key as outlined below.

#### Keeping CI Assets Up-to-date

If you find the `visual-*` jobs failing on CircleCI for reasons that you expect (you've updated the Spectrum CSS dependencies, you've added new tests, etc.) then you will need to update the golden images cache key before your build will pass. The first step to doing so is to review the test results available in the "Artifacts" tab in CircleCI. The first file listed therein, `test/visual/review/index.html`, will open a GUI for reviewing the new screenshot cache. Before updating the cache key, be sure that the updated caches are both complete (there are times when process errors prevent images from being correctly created) and appear as expected. If you agree with the updated cache content, update the golden images cache key as follows.

Your failing branch will have created a new cache with a key of `v1-golden-images-{{ .Revision }}-<< parameters.regression_color >>-<< parameters.regression_scale >>-{{ epoch }}`. In `.circleci/config.yml`, you will use that to update the cache that is restored at the beginning of the `run-regressions` job. Using the revision number outlined in the `Build Golden Images Revision Cache` step of your failing build, update the `current_golden_images_hash` paramater that appears as follows:

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

This will run the defined [Tachometer](https://www.npmjs.com/package/tachometer) tests and report the current runtime cost of each individual element. When not making changes to the benchmarks thy have been built on your local machine, you can stip `yarn build:tests` for later passes.

## Anatomy of a Component

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
