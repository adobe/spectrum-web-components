# Spectrum Web Components

## Who are we?

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

To this end, Spectrum Web Components only targets _modern_, evergreen browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible but documented if necessary.

## Requirements

- NodeJS >= 20.0.0
- Yarn >= 4.6.0
- Typescript
- Supported desktop browsers:
    - Last 2 versions of Chrome
    - Last 2 versions of Firefox
    - Last 2 versions of Safari
    - Last 2 versions of Edge
- Or appropriate [polyfills](https://github.com/webcomponents/webcomponentsjs) in older browsers.
- We support all viewport sizes across supported desktop browsers.
- While our components are designed to be responsive and mobile-friendly, we do not yet fully support mobile browsers due to limited testing in mobile hardware. We advise testing updates on mobile devices before updating and are happy to address any reported issues.

## Getting started

```bash
git clone https://github.com/adobe/spectrum-web-components.git
cd spectrum-web-components
yarn
```

The call to `yarn` will install and setup everything you need for developing and running the packages in this library.

Typical development will involve running `yarn storybook`, `yarn test`, and `yarn docs:start` if you're making documentation changes (see below for additional details).

### Building a new component

Creating a new component from the command line can be done by running the following:

```bash
yarn new-package
```

This will scaffold your component's required architecture by prompting you for the desired name for your package.

```bash
? **SWC package name (i.e. color-area)**
```

_Note_ that your component name should be provided in kebab case and should relate as closely as possible to the Spectrum core naming.

For additional information, please see the [generating components documentation](https://opensource.adobe.com/spectrum-web-components/guides/generating-components).

## Storybook

Testing & reviewing changes can be done using the Storybook instance. Running `yarn storybook` will spin up a local instance of Storybook, triggering the browser to open at completion. From there you can make changes to your code and the browser will automatically refresh.

You can run [Storybook](https://storybook.js.org) through the command:

```bash
yarn storybook
```

By default, the resulting site will be available at [http://localhost:8000](http://localhost:8000).

## Documentation

The Spectrum Web Components documentation site is available via the following command:

```bash
yarn docs:start
```

By default, the resulting site will be available at [http://localhost:8080](http://localhost:8080).

The documentation site provides comprehensive guides, API references, and examples to help you understand and use Spectrum Web Components effectively. It includes:

- Component API documentation
- Usage guidelines
- Accessibility information
- Code examples
- Design system principles

In the case that you'd like to serve and test a static build of the documentation from the root directory (`localhost` or otherwise), use:

```bash
yarn docs:build
```

## Using Stackblitz for reproductions

We provide Stackblitz demos for all our components to help you quickly test, experiment, and create reproductions. These interactive environments are perfect for:

- **Bug reports**: Create a minimal reproduction of issues you encounter
- **Experiment**: Test and experiment with components in a live environment to understand their features and behavior

### Finding component demos

Each component's README includes a "Try it on Stackblitz" badge that links to a pre-configured demo environment. You can also find links to all component demos in our [documentation site](https://opensource.adobe.com/spectrum-web-components/).

### Creating reproductions

When reporting bugs or requesting features:

1. **Start with the component demo**: Click the Stackblitz badge in the relevant component's README
2. **Fork the demo**: Click "Fork" in Stackblitz to create your own copy
3. **Reproduce the issue**: Modify the code to demonstrate the problem or desired behavior
4. **Share the link**: Include the Stackblitz URL in your GitHub issue

## Spectrum CSS and Icons

While we've moved away from using Spectrum CSS for component styling, we still maintain a dependency on Spectrum CSS for icons. We aim to keep the icon packages as current as possible to track the Spectrum design system closely.

## Testing

### Unit tests

Unit tests are run with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) in Playwright using the Chai, Mocha and Sinon helper libraries. These tests can be executed with:

```bash
yarn test
```

During development you may wish to use `yarn test:watch` to automatically build and re-run the test suites.

### Visual regression testing

Visual regressions are tracked via screenshot testing. To run visual regression tests:

```bash
yarn test:visual
```

For testing specific components:

```bash
yarn test:visual vrt-${component name}
# Example: yarn test:visual vrt-accordion
```

For more details about visual regression testing, see the README section on Screenshot Testing.

### Benchmarking

You can measure the performance of individual elements with:

```bash
yarn build:tests
yarn test:bench
```

This will run the defined [Tachometer](https://www.npmjs.com/package/tachometer) tests and report the current runtime cost of each individual element.

## Contributing

We'd be very grateful if you contributed to the project! Check out our [contribution guidelines](CONTRIBUTING.md) and [pull request best practices](PULL_REQUESTS.md) for more information.

### Writing changesets

Spectrum Web Components uses [changesets](https://opensource.adobe.com/spectrum-web-components/guides/writing-changesets/) to manage versioning and changelogs. When making changes that impact users, you should include a changeset file that describes the change and indicates the type of version bump needed (patch, minor, or major).

To create a changeset:

```bash
yarn changeset
```

## Release process

For information about our release process, including publishing to NPM, please see our [Release Process documentation](RELEASE_PROCESS.md).

## Advanced development

There are several commands that can be useful in specific scenarios:

- `yarn build:clear-cache` to remove previously created artifacts of the `tsc build` process.
- `yarn process-icons` to make sure that the most recent icons are included.
- `yarn build` to make sure the available JS has been built from the current TS source.

### Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `yarn lint`. It uses ESLint to lint the JS / TS files, and StyleLint to lint the CSS files.

#### Dependency linting

There are downstream issues that can arise from multiple packages in this mono-repo using dependencies with mismatched version strings. By default, [changesets](https://opensource.adobe.com/spectrum-web-components/guides/writing-changesets/) will bump version numbers of internal dependencies when the various packages are published and the depended version is pointing to the latest release, which can help to mitigate this issue. Running `yarn constraints` will check that all version strings for each dependency match across the repo.

`yarn constraints --fix` will modify the `package.json` files, updating all dependencies to the latest version available in the library — _a potentially dangerous operation_. If this is what you want to do when `yarn constraints` discovers mismatched versions, this step can greatly reduce the amount of work to achieve matching version numbers.

### Anatomy of a component

There is extended documentation on adding a new component to the library in the [documentation site](https://opensource.adobe.com/spectrum-web-components/guides/generating-components). However, at a high level, you will be building the following structure:

```json
- packages
    - [new-component-name]
        - src
            - index.ts
            - spectrum-[new-component-name].css
            - [new-component-name]-overrides.css
            - [new-component-name].css
            - [NewComponentName].ts
        - stories
            - [new-component-name].stories.ts
            - args.ts
            - template.ts
        - test
            - benchmark
                - basic-test.ts
            - [new-component-name].test.ts
        - .npmrc
        - CHANGELOG.md
        - custom-elements.json
        - package.json
        - README.md
        - sp-[new-component-name].ts
        - tsconfig.json
```

For a list of component waiting to be implemented, visit our [`missing components`](https://github.com/adobe/spectrum-web-components/labels/missing%20components) tag.

### IDE Notes

The build process compiles `.css` files using PostCSS and wraps them in the `lit-html` `css` template tag and writes out a `.css.ts` file for easy import into TypeScript files. This file should not be edited, and is ignored by `.gitignore`, but you may also wish to hide the files in your IDE.
