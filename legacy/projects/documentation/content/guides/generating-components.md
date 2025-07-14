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
```

_Note_ that your component name should be provided in kebab case and should relate as closely as possible to the Spectrum core naming.

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

Outside of your new package, you will need to manually add information about your new package to the `tsconfig-all.json` and `tsconfig-react-wrapper.json` files, as well as the `bundle` package:

Open `tsconfig-all.json`, find "references", and add an entry for your package (`{ "path": "packages/package-name" }`), alphabetically (replacing "package-name" with the pattern you're implementing, such as "action-button" or "progress-bar"). The `tsconfig-all.json` config is used to build types for the project in parallel with the JS build that is handled outside of `tsc`. This will ensure that the types for your new package are available throughout the library, including at demonstration and test time.

Open `tsconfig-react-wrapper.json`, find "references", and add an entry for your package (`{ "path": "react/package-name" }`), alphabetically (replacing "package-name" with the pattern you're implementing, such as "action-button" or "progress-bar"). The `tsconfig-react-wrapper.json` config is used to build types for the `@swc-react` project, so that consumers can benefit from type definitions for SWC components even when using the React wrapper.

Include a listing for your package in `bundle/elements.ts` and `bundle/src/index.js`. Then, confirm that your new package is already listed in `tools/bundle/package.json`. The `bundle` package makes it possible to build demo projects with _all_ of the components from the library registered in a single place, and is also leveraged for ease of component consumption in the documentation site build.

- In `bundle/tsconfig.json`, please add a listing for your new package to the `"references"` field, e.g. `{ "path": "../../packages/package-name" },`. This will ensure the types of your new package are built before the `bundle` package is built.
- In `bundle/elements.ts`, please add any, and all (if your package registers more than one element), element registration files to the imports there in, e.g. `import '@spectrum-web-components/package-name/sp-package-name.js';`.
- In `bundle/src/index.js`, please add an export for your new packages default entry, e.g. `export * from '@spectrum-web-components/package-name';`, so that any classes exported from your package can be imported from this location.

Finally, run `yarn` in your terminal. This will grab any newly-added packages, as well as to ensure that you have the provided CSS processed for use in your component. You can now see your component in the Storybook, using the command `yarn storybook`, or test its functionality via `yarn test`.

If you run into any issues with the instructions above, or the ones linked across this documentation site, please feel free to <sp-link href="https://github.com/adobe/spectrum-web-components/discussions" target="_blank">raise questions</sp-link> or <sp-link href="https://github.com/adobe/spectrum-web-components/issues" target="_blank">issues</sp-link> on GitHub. You can do this either by creating a brand new issue when it specifically relates to the process of generating a component, or by leaving a comment on an already-created issue for a specific pattern when it concerns bringing that component to life.

Thanks for stopping by. We look forward to your contribution!
