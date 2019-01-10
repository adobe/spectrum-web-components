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
npm run serve
```

Browse to http://localhost:3000/dist/ to explore the distributed components, for example http://localhost:3000/dist/components/banner/demo/index.html contains the demo for the banner component.

# IDE Notes

Due to the inplace compilation of typescript and sourcemaps your IDE may show many untracked files `.js` and `.d.ts` files which are produced by the compilation of the typescript sourcecode. You may wish to hide these files from your IDE to reduce noise since they should never require manual editing and should remain untracked in this project (they are excluded by `.gitignore`).

## Visual Studio Code

In Visual Studio Code you can hide the untracked files by adding the following to your `.vscode/settings.json` in this project folder:

```json
{
    "files.exclude": {
        "src/**/*.js": true,
        "src/**/*.d.ts": true,
        "src/**/*.js.map": true,
        "src/**/*.d.ts.map": true,
        "src/**/*.css.js": true,
        ".chrome": true
    }
}
```

# Contributing

We'd be very grateful if you contributed to the project! Check out our
[contribution guidelines](CONTRIBUTING.md) for more information.
