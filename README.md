# spectrum-web-components

Spectrum Web Components is a future-looking project to develop Adobe Spectrum design language based around web components, ES-Modules, and modern browser standards.

It will not support older browsers and will only target modern ever-green browsers that fully implement the Custom Elements V1 specification, e.g. Chrome, Firefox, Safari. Polyfills will be avoided as much as possible.

# Requirements

-   NodeJS >= 8.10.0
-   Typescript
-   Browsers with Custom Elements V1 and Shadow DOM support, e.g. Chrome, Firefox, Safari.

# Installation

```bash
npm install
```

# Usage

```bash
npm run serve:watch
```

Browse to http://localhost:4000/lib/ to explore components, for example http://localhost:4000/lib/banner/demo/index.html contains the demo for the banner component.

# Development

The following command will build and run a development server allowing you to develop your components using BrowserSync reloading.

```bash
npm run serve:watch
```

## Linting

The project will be linted on a pre-commit hook, but you can also run the lint suite with `npm run lint`. It uses ESLint to lint the JS files in the `tasks` and `scripts` folder, TSLint to lint the Typescript, and StyleLint to lint the CSS files.

## Testing

Tests are implemented using the Karma test runner with Chai, Mocha and Sinon frameworks. These tests can be executed with:

```
npm run test
```

During development you may wish to use `npm run test:watch` to automatically build and re-run the test suites.

## Development within Adobe

Due to the internal `@adobe` npm registry served by Artifactory, when developing this module internally it is necessary to provide an `.npmrc` local to this project which forces the use of the public `@adobe` scope on public npm. Therefore if you are an Adobe employee working on this project add the following to a `.npmrc` file in this folder:

```
@adobe:registry=https://registry.npmjs.org/
registry=https://registry.npmjs.org/
```

This will ensure that when installing dependencies you do not accidentally pull from the internal repositories.

## IDE Notes

Due to the in-place compilation of typescript and sourcemaps your IDE may show many untracked files for the compiled output in the form of `.js` and `.d.ts`. You may wish to hide these files from your IDE to reduce noise since they should never require manual editing and should remain untracked in this project (they are excluded by `.gitignore`).

### Visual Studio Code

In Visual Studio Code you can hide the untracked files by adding the following to your `.vscode/settings.json` in this project folder:

```json
{
    "files.exclude": {
        "lib/**/*.js": true,
        "styles/**/*.js": true,
        "lib/**/*.d.ts": true,
        "lib/**/*.js.map": true,
        "lib/**/*.d.ts.map": true,
        "lib/**/*.css.js": true,
        "styles/**/*.css.js": true,
        ".chrome": true,
        ".firefox": true
    }
}
```

# Contributing

We'd be very grateful if you contributed to the project! Check out our
[contribution guidelines](CONTRIBUTING.md) for more information.
