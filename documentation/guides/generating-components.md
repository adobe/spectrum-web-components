# Generating a new component

The fasted way to get started with creating a new component is with our command line generator. Run the following command to have you new component scaffolded for you:

```bash
yarn new-package
? component name please _
```

In response to the above, the component name should be the dashified version of the Spectrum CSS pattern that you are looking to add to the repo. In this way, the `SpectrumPattern` that you want to create will be represented as `spectrum-pattern` in your response. From here the command will generate a new package for you pattern with the following file structure in the `packages` directory:

```
> spectrum-pattern
   > src/
       index.ts
       SpectrumPattern.ts
       spectrum-pattern.css
       spectrum-config.js
   > test/
       > benchmark/
           basic-test.ts
       spectrum-pattern.test.ts
   > stories/
       spectrum-pattern.stories.ts
   sp-spectrum-pattern.ts
   README.md
   tsconfig.json
   package.json
```

From here, peek into the `package.json` file and ensure the "devDependency" of `@spectrum-css/spectrumpattern` listed there is of the most current version. Once you have confirmed that run `yarn` in your terminal to get any new packages added to the repository and have the CSS provided therein processed for use in your component using the default configuration. You'll now be able to review your component via the Storybook command `yarn storybook` or see it appear in tests via `yarn test` so that you can dive into fully preparing the patterns for use as a custom element.

From here, the next look when continuing to develop your new component pattern is in `node_modules/@spectrum-css/spectrumpattern/metadata/spectrumpattern.yml`. Here you will find complete Spectrum CSS correct HTML representation of the many states, variants, and capabilities offered by the pattern that you are working with and will support you in ensuring that you have fulfilled the features that are expected of this pattern. The HTML found here is that found in the examples of this pattern made available in the <sp-link href="https://opensource.adobe.com/spectrum-css">Spectrum CSS documentation site</sp-link>.

With this scaffold as a baseline in conjunction with these <sp-link href="guides/developing-components">instructions</sp-link> on working with the web components in general and the Spectrum Web Components repository in specific and the specification for the <sp-link href="guides/spectrum-config">`spectrum-config.js`</sp-link> outlining how to translate the Spectrum CSS source you will be working from into shadow DOM optimized CSS you are well on your way to adding a new package to the project. If you run into any issues with the instructions above of linked to across this documentation site, please feel free to raise <sp-link href="https://github.com/adobe/spectrum-web-components/issues">quesitons and issues</sp-link> on GitHub either as brand new issues when specifically related to the process of generating a component or as comments on the broader issue of adding a specific pattern when in reference to bringing a specific component to live.

Thanks for stopping by, we look forward to your contribution!
