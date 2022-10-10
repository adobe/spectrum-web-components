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

From here, peek into the `package.json` file and ensure the "devDependency" of `@spectrum-css/spectrumpattern` (replacing "spectrumpattern" with the pattern you're implementing, such as "badge" or "tooltip") listed there is of the most current version.

Outside of your new package, you will need to manually add information about your new package to both the `tsconfig-all.json` file and the `bundle` package:

Open `tsconfig-all.json`, find "references", and add an entry for your package (`{ "path": "packages/spectrum-pattern" }`) alphabetically (replacing "spectrum-pattern" with the pattern you're implementing, such as "action-button" or "progress-bar"). The `tsconfig-all.json` config is used to build types for the project in parallel with the JS build that is handled outside of `tsc`. This will ensure that the types for your new package are available throughout the library, include at demonstration and test time.

Include a listing for your package in `bundle/elements.ts` and `bundle/src/index.js`. Then, confirm that your new package is already listed in `packages/bundle/package.json`. The `bundle` package makes it possible to build demo projects with _all_ of the components from the library registered in a single place, and is also leveraged for ease of component consumption in the documentation site build.

-   In `bundle/elements.ts`, please add any, and all (if your package registers more than one element), element registration files to the imports there in, e.g. `import '@spectrum-web-components/spectrum-pattern/sp-spectrum-pattern.js';`.
-   In `bundle/src/index.js`, please add an export for your new packages default entry, e.g. `export * from '@spectrum-web-components/spectrum-pattern';`, so that any classes exported from your package can be imported from this location.

Finally, run `yarn` in your terminal. This will grab any newly-added packages, as well as to ensure that you have the provided CSS processed for use in your component. You can now see your component in the Storybook, using the command `yarn storybook`, or test its functionality via `yarn test`.

The next place to look is in `node_modules/@spectrum-css/spectrumpattern/metadata/spectrumpattern.yml`. Here, you will find complete Spectrum CSS’s HTML representation of the many states, variants, and capabilities offered by the pattern that you are working with. The content of this file is also found on the <sp-link href="https://opensource.adobe.com/spectrum-css" target="_blank">Spectrum CSS documentation site</sp-link> under the name of the pattern you’re leveraging. Following this as a guide while you implement this component ensures that you will fulfill the expected features of this pattern.

Now that you have this scaffold as a base, check out <sp-link href="guides/developing-components">these instructions</sp-link> on working with web components in general, and the <sp-link href="guides/spectrum-config">annotated `spectrum-config.js`</sp-link> file, which outlines how to translate the Spectrum CSS source into shadow DOM-optimized CSS. You are well on your way to adding a new component package to the project.

If you run into any issues with the instructions above, or the ones linked across this documentation site, please feel free to <sp-link href="https://github.com/adobe/spectrum-web-components/discussions" target="_blank">raise questions</sp-link> or <sp-link href="https://github.com/adobe/spectrum-web-components/issues" target="_blank">issues</sp-link> on GitHub. You can do this either by creating a brand new issue when it specifically relates to the process of generating a component, or by leaving a comment on an already-created issue for a specific pattern when it concerns bringing that component to life.

Thanks for stopping by. We look forward to your contribution!
