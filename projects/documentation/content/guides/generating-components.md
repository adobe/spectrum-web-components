---
layout: guide.njk
title: 'Generating a new component: Spectrum Web Components'
displayName: Generating a new component
slug: generating-a-new-component
---

# Generating a new component

The fastest way to get started with creating a new component is to generate it from the command line. Run the following command to have your new component scaffolded for you:

```bash
$ yarn new-package

? SWC package name (i.e. color-area)
? Spectrum CSS package name (i.e. colorarea)
```

In response to the prompt above, the package name should be the kebab case version of the Spectrum CSS pattern that you are looking to add to the repo. That is, the `SpectrumPattern` that you want to create should be represented as `spectrum-pattern` in your response. From here, the command generates a new package for your pattern with the following file structure in the `/packages` directory:

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

From here, peek into the `package.json` file and ensure the "devDependency" of `@spectrum-css/spectrumpattern` listed there is of the most current version. Then, run `yarn` in your terminal to grab any newly-added packages, as well as to ensure that you have the provided CSS processed for use in your component. You'll now be able to see your component in the Storybook, using the command `yarn storybook`, or test its functionality via `yarn test` so that you can dive into fully preparing the pattern for use as a custom element.

The next place to look is in `node_modules/@spectrum-css/spectrumpattern/metadata/spectrumpattern.yml`. Here, you will find complete Spectrum CSS’s HTML representation of the many states, variants, and capabilities offered by the pattern that you are working with. The content of this file is also found on the <sp-link href="https://opensource.adobe.com/spectrum-css" target="_blank">Spectrum CSS documentation site</sp-link> under the name of the pattern you’re leveraging. Following this as a guide while you implement this component ensures that you will fulfill the expected features of this pattern.

Now that you have this scaffold as a base, check out <sp-link href="guides/developing-components">these instructions</sp-link> on working with web components in general, and the <sp-link href="guides/spectrum-config">annotated `spectrum-config.js`</sp-link> file, which outlines how to translate the Spectrum CSS source into shadow DOM-optimized CSS. You are well on your way to adding a new component package to the project.

If you run into any issues with the instructions above, or the ones linked across this documentation site, please feel free to <sp-link href="https://github.com/adobe/spectrum-web-components/discussions" target="_blank">raise questions</sp-link> or <sp-link href="https://github.com/adobe/spectrum-web-components/issues" target="_blank">issues</sp-link> on GitHub. You can do this either by creating a brand new issue when it specifically relates to the process of generating a component, or by leaving a comment on an already-created issue for a specific pattern when it concerns bringing that component to life.

Thanks for stopping by. We look forward to your contribution!
