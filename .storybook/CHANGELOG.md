# Change Log

## 12.0.5-next.2

### Patch Changes

- Updated dependencies [[`87d7d99`](https://github.com/adobe/spectrum-css/commit/87d7d99260e758e697668cc17962b0b36d075c65)]:
    - @spectrum-css/tokens@16.1.0-next.2

## 12.0.5-next.1

### Patch Changes

- Updated dependencies [[`89a3f2b`](https://github.com/adobe/spectrum-css/commit/89a3f2bfeed257a5eefeef229efaa3cc7555980c)]:
    - @spectrum-css/tokens@16.1.0-next.1

## 12.0.5-next.0

### Patch Changes

- Updated dependencies [[`60a156d`](https://github.com/adobe/spectrum-css/commit/60a156d7c0efcc999bc440274bbbbf586beb274b)]:
    - @spectrum-css/tokens@16.1.0-next.0

## 12.0.4

### Patch Changes

- [#3527](https://github.com/adobe/spectrum-css/pull/3527) [`5f1751c`](https://github.com/adobe/spectrum-css/commit/5f1751c82a5fe55ae0d999f5f50cfeca4c8a5c75) Thanks [@castastrophe](https://github.com/castastrophe)! - Minor dependency updates to align with the larger project.

- Updated dependencies [[`5f1751c`](https://github.com/adobe/spectrum-css/commit/5f1751c82a5fe55ae0d999f5f50cfeca4c8a5c75)]:
    - @spectrum-css/bundle@1.0.1

## 12.0.3

### Patch Changes

📝 [#3564](https://github.com/adobe/spectrum-css/pull/3564) [`9753f18`](https://github.com/adobe/spectrum-css/commit/9753f180fce982cd64b4abb4ea1fae4ebe86ad37) Thanks [@castastrophe](https://github.com/castastrophe)!

- Remove the internal workspace:^ dependency syntax for the Storybook package so that it can be leveraged externally without throwing errors.

## 12.0.2

### Patch Changes

📝 [#3528](https://github.com/adobe/spectrum-css/pull/3528) [`bee70fb`](https://github.com/adobe/spectrum-css/commit/bee70fbab5f12b49ce2611366b614c75277e0aa9) Thanks [@castastrophe](https://github.com/castastrophe)!

- Update fetchToken to use the exported JSON from @spectrum-css/tokens instead of @adobe/spectrum-tokens

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

- Dependency alignment across the project.

    Set component peerDependencies as optional to reduce console warnings on downstream projects.

- Updated dependencies [[`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    - @spectrum-css/tokens@16.0.1
    - @spectrum-css/bundle@1.0.0

## 12.0.1

### Patch Changes

- Updated dependencies [[`68e0057`](https://github.com/adobe/spectrum-css/commit/68e00577156cc32b21bfa768dbd2d35d73563b4c)]:
    - @spectrum-css/table@8.0.1

## 12.0.0

### Major Changes

📝 [#2786](https://github.com/adobe/spectrum-css/pull/2786) [`6c19fcf`](https://github.com/adobe/spectrum-css/commit/6c19fcf3f0eda76987f338981ae20f9999febce6) Thanks [@pfulton](https://github.com/pfulton)!

#### 🛑 BREAKING CHANGE

This update removes the previously deprecated component documentation for **cyclebutton**, **quickaction**, **searchwithin**, and **splitbutton**.

To support the Spectrum 2 (S2) Foundations release, Storybook has been updated to toggle token packages to connect the following labels with their appropriate data sources:

- **Spectrum 1**: Flagged as the "legacy" context, this version is no longer the default for the component contexts. When selected, Storybook will load the `@spectrum-css/tokens` at release `v14.6.0` and attach the `.spectrum--legacy` class to the container.
- **Spectrum 2**: The new default context, this version represents the "S2 Foundations" release which serves as a bridge between S1 and S2. Components in this context are not fully S2 and will not exactly match specifications but they do reflect a significant move toward the S2 designs. For full details, see the token and component-level changelogs.
- **Express**: This now deprecated context is still rendered in Storybook by leveraging the `@spectrum-css/tokens` at release `v14.6.0`. Please note that Express and S1 will be removed in the next major release.

This release also includes:

- New migration documentation for S1 -> S2 updates
- Fix for the duplicate line numbers in the code preview plugin
- Updated styles to integrate Spectrum styling into the Storybook UI

#### Patch Changes

- Updated dependencies [[`6c19fcf`](https://github.com/adobe/spectrum-css/commit/6c19fcf3f0eda76987f338981ae20f9999febce6), [`3d08cea`](https://github.com/adobe/spectrum-css/commit/3d08cea0f590c8c2de7252677a6b81b8cc206b9a), [`6c19fcf`](https://github.com/adobe/spectrum-css/commit/6c19fcf3f0eda76987f338981ae20f9999febce6)]:
    - @spectrum-css/tokens@16.0.0
    - @spectrum-css/table@8.0.0

## 11.0.2

### Patch Changes

📝 [#3522](https://github.com/adobe/spectrum-css/pull/3522) [`7a47c22`](https://github.com/adobe/spectrum-css/commit/7a47c2266b6d0e8c99061fe85cba8d52684bae39) Thanks [@castastrophe](https://github.com/castastrophe)!

- Minor storybook updates and fixes including some whitespace changes.

    A bug was fixed with the HTML code preview that was displaying duplicate line numbers.

    Some key metadata was incorporated into the preview head file for better contextual information when published.

    The remark-gfm dependency was added to support tables in the `*.mdx` files for Storybook.

- Updated dependencies [[`7a47c22`](https://github.com/adobe/spectrum-css/commit/7a47c2266b6d0e8c99061fe85cba8d52684bae39), [`7a47c22`](https://github.com/adobe/spectrum-css/commit/7a47c2266b6d0e8c99061fe85cba8d52684bae39)]:
    - @spectrum-css/tokens@15.2.0
    - @spectrum-css/table@7.0.1

## 11.0.1

### Patch Changes

- Updated dependencies [[`c8194b0`](https://github.com/adobe/spectrum-css/commit/c8194b0a5b6e115d7db680f287eb8a2a9709906b)]:
    - @spectrum-css/tokens@15.1.0
    - @spectrum-css/bundle@1.0.0

## 11.0.0

### Major Changes

📝 [#3458](https://github.com/adobe/spectrum-css/pull/3458) [`e1b7102`](https://github.com/adobe/spectrum-css/commit/e1b71027f92ce18feb3a63c100d2b4871fc73b9f) Thanks [@castastrophe](https://github.com/castastrophe)!

- Update the Chromatic add-on to the currently maintained package:

    - from "@chromaui/addon-visual-tests": "^1.0.0"
    - to "@chromatic-com/storybook": "^3.2.3"

    This requires an update to the chromatic.config.json settings, removal of the generic argTypesRegex from the preview config, and a stricter import in the doc blocks.

    To support a successful build, our test command must maintain the autodocs and mdx syntax.

## 10.12.1

### Patch Changes

📝 [#3440](https://github.com/adobe/spectrum-css/pull/3440) [`6808c85`](https://github.com/adobe/spectrum-css/commit/6808c85295d472286c0a52e28d2279b2b5a16f92) Thanks [@castastrophe](https://github.com/castastrophe)!

- Fix an issue where "show code" was blocking loading in Storybook docs pages [CSS-1070]

## 10.12.0

### Minor Changes

📝 [#3477](https://github.com/adobe/spectrum-css/pull/3477) [`d52c701`](https://github.com/adobe/spectrum-css/commit/d52c70196bf2d17433c239313a82f00f75d77e79) Thanks [@castastrophe](https://github.com/castastrophe)!

- Update Storybook to leverage the new CSS bundled assets.

### Patch Changes

- Updated dependencies [[`d52c701`](https://github.com/adobe/spectrum-css/commit/d52c70196bf2d17433c239313a82f00f75d77e79)]:
    - @spectrum-css/bundle@1.0.0

## 10.11.8

### Patch Changes

- Updated dependencies [[`40c1954`](https://github.com/adobe/spectrum-css/commit/40c1954048f735a07f9edfccf3a568d38164806a)]:
    - @spectrum-css/tokens@15.0.0

## 10.11.7

### Patch Changes

- Updated dependencies [[`9c49505`](https://github.com/adobe/spectrum-css/commit/9c4950517bf0f8ca7b2e373f4323c97d068d0ceb)]:
    - @spectrum-css/typography@6.2.0
    - @spectrum-css/table@6.2.0

## 10.11.6

### Patch Changes

- Updated dependencies [[`092aac5`](https://github.com/adobe/spectrum-css/commit/092aac56953f4c02cd5227e3f61c6cb0b2b4e46a)]:
    - @spectrum-css/table@6.1.4

## 10.11.5

### Patch Changes

- Updated dependencies [[`4b818e1`](https://github.com/adobe/spectrum-css/commit/4b818e1062202e404de1350938ce2a19146aa0b0)]:
    - @spectrum-css/tokens@14.6.0

## 10.11.4

### Patch Changes

- Updated dependencies [[`47f23a7`](https://github.com/adobe/spectrum-css/commit/47f23a762a5c84ffe3c82e7e1b0c4c9d5dc60f86)]:
    - @spectrum-css/tokens@14.5.0

## 10.11.3

### Patch Changes

- Updated dependencies [[`7d41874`](https://github.com/adobe/spectrum-css/commit/7d418746362e7fe35f47e67e30682d7bf87ecfc7)]:
    - @spectrum-css/tokens@14.4.0

## 10.11.2

### Patch Changes

- Updated dependencies [[`b16a159`](https://github.com/adobe/spectrum-css/commit/b16a159bd8b1456b384f13f51ab0cdb318a692e8)]:
    - @spectrum-css/tokens@14.3.2

## 10.11.1

### Patch Changes

- Updated dependencies [[`83d5a17`](https://github.com/adobe/spectrum-css/commit/83d5a171bd850df693707611203ecce21f22e7d2)]:
    - @spectrum-css/typography@6.1.3

## 10.11.0

### Minor Changes

📝 [#3085](https://github.com/adobe/spectrum-css/pull/3085) [`11b2fc1`](https://github.com/adobe/spectrum-css/commit/11b2fc145283236a8a99c8387e805982a69813d6) Thanks [@castastrophe](https://github.com/castastrophe)!

- Adjust the way token and typography are loaded in preparation for S2.

## 10.10.0

### Minor Changes

📝 [#3067](https://github.com/adobe/spectrum-css/pull/3067) [`e1a7866`](https://github.com/adobe/spectrum-css/commit/e1a78669920f816966cc0249a7beed032e681b17) Thanks [@cdransf](https://github.com/cdransf)!

- Applies the sb-unstyled className to fix the version number alignment on Storybook docs pages.

## 10.9.1

### Patch Changes

- Updated dependencies [[`5d6e03f`](https://github.com/adobe/spectrum-css/commit/5d6e03f30891f9171f1a600b06d534ee85719277)]:
    - @spectrum-css/typography@6.1.2

## 10.9.0

### Minor Changes

📝 [#2982](https://github.com/adobe/spectrum-css/pull/2982) [`dffdefa`](https://github.com/adobe/spectrum-css/commit/dffdefaa1ffc39fbf7706e218d261da3a02695b5) Thanks [@castastrophe](https://github.com/castastrophe)!

## New features for @spectrum-css Storybook

- Migrate test functionality out of stories/template.js to `stories/*.test.js` files
- Expand test coverage for components lacking a testing grid VRT

## 10.8.0

### Minor Changes

📝 [#2924](https://github.com/adobe/spectrum-css/pull/2924) [`ce021b4`](https://github.com/adobe/spectrum-css/commit/ce021b4b932d938134a1288fd665d56d4b4d144e) Thanks [@jawinn](https://github.com/jawinn)!

- Updates the way that autodocs is configured, as documented in the [Storybook migration guide
  for 8.0.x to 8.1.x])(https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-docsautodocs-is-deprecated).
  The `docs.autodocs` setting in `main.js` was deprecated and is being removed in Storybook 9.0.

## 10.7.0

### Minor Changes

📝 [#2930](https://github.com/adobe/spectrum-css/pull/2930) [`c079b88`](https://github.com/adobe/spectrum-css/commit/c079b88db055eda3a1473cd0f1e2936ed223dddd) Thanks [@castastrophe](https://github.com/castastrophe)!

## New feature for @spectrum-css Storybook

- Additional UI styling for docs visibility/usability
- Font loading improvements to signal completion by Typekit

## 10.6.1

### Patch Changes

📝 [#2934](https://github.com/adobe/spectrum-css/pull/2934) [`8ff225f`](https://github.com/adobe/spectrum-css/commit/8ff225f5d72ef12d2eeb157b31a598f80fb3c735) Thanks [@castastrophe](https://github.com/castastrophe)!

#### Minor storybook updates

##### Storybook decorators

- Set-up for addition of the S2 context
- Flattened the style injection to make content easier to find during inspection
- New "raw" mode added to view components without tokens
- Comments added and unused functions removed from the helpers in decorators
- Relevant args added to the updateArgs function

##### General updates

- Copyrights added to index files
- Package exports include all files not just JS assets
- Remove unused fallbacks in argTypes for global args
- Flag the darkest color as deprecated in the dropdown menu
- Change string "Japanese" to "日本語" in the language dropdown to align with other items in the menu
- Correct invalid useArgs useage at the story-level
- Correct misplaced custom style definition from out of the fallbacks object (calendar)

## 10.6.0

### Minor Changes

📝 [#2867](https://github.com/adobe/spectrum-css/pull/2867) [`a0bd4eb`](https://github.com/adobe/spectrum-css/commit/a0bd4eb2ab43352c4bdedcb26f93138aacf99aee) Thanks [@castastrophe](https://github.com/castastrophe)!

- New feature: Add a look-through to the Spectrum Web Components Storybook project to create an easier connection between components that exist in CSS and those in SWC.

## 10.5.0

### Minor Changes

📝 [#2844](https://github.com/adobe/spectrum-css/pull/2844) [`7b19d63`](https://github.com/adobe/spectrum-css/commit/7b19d6352c7a4d2c03b7e9d886ec3ee91edda0bf) Thanks [@castastrophe](https://github.com/castastrophe)!

- **Feature**: enable Chromatic modes for scaled testing!

## 10.4.0

### Minor Changes

📝 [#2892](https://github.com/adobe/spectrum-css/pull/2892) [`e6fd9f6`](https://github.com/adobe/spectrum-css/commit/e6fd9f6bab4940d946e51cd396e49d3faf025565) Thanks [@jawinn](https://github.com/jawinn)!

- Adds a custom doc block to Storybook: `<ComponentDetails />`
  This displays the current version number of the component on each component's Docs page. This doc block is added to the
  default docs MDX template and to all components with custom docs templates.

## 10.3.0

### Minor Changes

📝 [#2840](https://github.com/adobe/spectrum-css/pull/2840) [`84a70bb`](https://github.com/adobe/spectrum-css/commit/84a70bb076ac7afd15122d3b53299a4f1ccd1af3) Thanks [@castastrophe](https://github.com/castastrophe)!

- Tokens update to correct the background color used in documentation for static black.

    Feature that updates storybook to move shared arg types to the global scope.

## 10.2.0

### Minor Changes

📝 [#2803](https://github.com/adobe/spectrum-css/pull/2803) [`2c5e5eb`](https://github.com/adobe/spectrum-css/commit/2c5e5ebc4d1dca38f877ad1e31f69315831c5717) Thanks [@castastrophe](https://github.com/castastrophe)!

- Feature to migrate Storybook to use Vite's builder instead of Webpack. This change reduces the configuration complexity with more built-in features that align with our needs.

## 10.1.0

### Minor Changes

📝 [#2821](https://github.com/adobe/spectrum-css/pull/2821) [`0129dca`](https://github.com/adobe/spectrum-css/commit/0129dca2e6f3eb90ff536344ba7f53249b4a0bfe) Thanks [@castastrophe](https://github.com/castastrophe)!

- Pull out decorators into their own files

## 10.0.5

### Patch Changes

📝 [#2820](https://github.com/adobe/spectrum-css/pull/2820) [`1711ef8`](https://github.com/adobe/spectrum-css/commit/1711ef8a7aa8da1858019b77ed52e1dd1b86d3bf) Thanks [@castastrophe](https://github.com/castastrophe)!

- Fixes for Storybook instance

    - Bring back testing preview global toggle to toolbar after it was accidentally removed in a previous release
    - Chromatic disable snapshot syntax corrected in multiple stories
    - Update when token assets are loaded to correct snapshot inconsistencies
    - Add the vrt-only flag to ForcedColors stories to prevent them from being included in the local Storybook view
    - Fixes to the Coach Indicator story

## 10.0.4

### Patch Changes

- Updated dependencies [[`8a123ae`](https://github.com/adobe/spectrum-css/commit/8a123ae6dbc75bcab3dfd43d856de408e7eaab1b)]:
    - @spectrum-css/tokens@14.2.0

## 10.0.3

### Patch Changes

📝 [#2775](https://github.com/adobe/spectrum-css/pull/2775) [`2452637`](https://github.com/adobe/spectrum-css/commit/2452637d1179b9b2b025dafeb5834720712413d7) Thanks [@castastrophe](https://github.com/castastrophe)!

- Dependency minor and patch updates to support new features in tools leveraged

## 10.0.2

### Patch Changes

📝 [#2677](https://github.com/adobe/spectrum-css/pull/2677) [`d83200c`](https://github.com/adobe/spectrum-css/commit/d83200ca70a959aa70329e71de0c4383de157855) Thanks [@castastrophe](https://github.com/castastrophe)!

- Leverage local workspace versioning to prevent misalignment

## 10.0.1

### Patch Changes

📝 [#2772](https://github.com/adobe/spectrum-css/pull/2772) [`344b8f4`](https://github.com/adobe/spectrum-css/commit/344b8f43d8b028c5e9ae87d1b7c10ffa257e7fa4) Thanks [@castastrophe](https://github.com/castastrophe)!

- Align versions to the latest local package version instead of fetching it externally

## 10.0.0

### Major Changes

📝 [#2671](https://github.com/adobe/spectrum-css/pull/2671) [`9130dd9`](https://github.com/adobe/spectrum-css/commit/9130dd9eee61abd4ae6a02c92a333f66bc5afdcf) Thanks [@castastrophe](https://github.com/castastrophe)!

- Support for Node v18 dropped; upgraded to Node v20

## 9.0.0

🗓 2024-04-18 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@8.0.4...@spectrum-css/preview@9.0.0)

### ✨ Features

- storybook - disable whats new notification popup ([#2628](https://github.com/adobe/spectrum-css/issues/2628))([e5391b6](https://github.com/adobe/spectrum-css/commit/e5391b6))
- use storybook v8 ([#2604](https://github.com/adobe/spectrum-css/issues/2604))([166ab23](https://github.com/adobe/spectrum-css/commit/166ab23))
- feat!: postcss config build and script; remove gulp (#2466)([b0f337b](https://github.com/adobe/spectrum-css/commit/b0f337b)), closes[#2466](https://github.com/adobe/spectrum-css/issues/2466)

- feat!: postcss config build and script; remove gulp (#2466)([b0f337b](https://github.com/adobe/spectrum-css/commit/b0f337b)), closes[#2466](https://github.com/adobe/spectrum-css/issues/2466)

### 🛑 BREAKING CHANGE

- Removes component-builder & component-builder-simple for script leveraging postcss
- Imports added to index.css and themes/express.css

## 8.0.4

🗓 2024-03-07 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@8.0.3...@spectrum-css/preview@8.0.4)

**Note:** Version bump only for package @spectrum-css/preview

## 8.0.3

🗓 2024-02-26 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@8.0.2...@spectrum-css/preview@8.0.3)

**Note:** Version bump only for package @spectrum-css/preview

## 8.0.2

🗓 2024-02-20 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@8.0.1...@spectrum-css/preview@8.0.2)

**Note:** Version bump only for package @spectrum-css/preview

## 8.0.1

🗓 2024-02-16 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@8.0.0...@spectrum-css/preview@8.0.1)

**Note:** Version bump only for package @spectrum-css/preview

## 8.0.0

🗓 2024-02-15 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.5.0...@spectrum-css/preview@8.0.0)

### ♻️ Code refactoring

- **quickaction:** deprecate component; support this in docs ([#2304](https://github.com/adobe/spectrum-css/issues/2304))([84e1ee9](https://github.com/adobe/spectrum-css/commit/84e1ee9))

### 🛑 BREAKING CHANGE

- **quickaction:** @spectrum-css/quickaction deprecated

This component has been deprecated. Use an action bar to allow users to perform actions on either a single or multiple items at the same time, instead.

## 7.5.0

🗓 2024-02-12 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.4.2...@spectrum-css/preview@7.5.0)

### ✨ Features

- **preview:** add figma support to storybook [CSS-284] ([#1680](https://github.com/adobe/spectrum-css/issues/1680))([3c6194e](https://github.com/adobe/spectrum-css/commit/3c6194e))

## 7.4.2

🗓 2024-02-06 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.4.1...@spectrum-css/preview@7.4.2)

**Note:** Version bump only for package @spectrum-css/preview

## 7.4.1

🗓 2024-02-05 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.4.0...@spectrum-css/preview@7.4.1)

**Note:** Version bump only for package @spectrum-css/preview

## 7.4.0

🗓 2024-02-05 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.3.0...@spectrum-css/preview@7.4.0)

**Note:** Version bump only for package @spectrum-css/preview

## 7.3.0

🗓 2024-01-29 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.2.1...@spectrum-css/preview@7.3.0)

### ✨ Features

- migrate build packages to postcss v8 ([#2460](https://github.com/adobe/spectrum-css/issues/2460))([bd6c40e](https://github.com/adobe/spectrum-css/commit/bd6c40e))

## 7.2.1

🗓 2024-01-16 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.2.0...@spectrum-css/preview@7.2.1)

**Note:** Version bump only for package @spectrum-css/preview

## 7.2.0

🗓 2024-01-16 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.1.0...@spectrum-css/preview@7.2.0)

### ✨ Features

- **storybook:** incorporate the new chromatic plugin ([#2376](https://github.com/adobe/spectrum-css/issues/2376))([e54ba6a](https://github.com/adobe/spectrum-css/commit/e54ba6a))

### 🐛 Bug fixes

- remove storybook-addon-pseudo-states ([#2401](https://github.com/adobe/spectrum-css/issues/2401))([4510975](https://github.com/adobe/spectrum-css/commit/4510975))

## 7.1.0

🗓 2023-12-12 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@7.0.0...@spectrum-css/preview@7.1.0)

### ✨ Features

- **ui-icons:**graduate to 1.0 release ([#2366](https://github.com/adobe/spectrum-css/issues/2366))([afd369a](https://github.com/adobe/spectrum-css/commit/afd369a))

## 7.0.0

🗓 2023-12-12 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@6.0.1...@spectrum-css/preview@7.0.0)

### 🐛 Bug fixes

- **storybook:** chromatic requires build script ([#2360](https://github.com/adobe/spectrum-css/issues/2360))([114b75b](https://github.com/adobe/spectrum-css/commit/114b75b))

- feat(icon,ui-icons)!: migrate the icon compiler to a distinct package (#2343)([d73d594](https://github.com/adobe/spectrum-css/commit/d73d594)), closes[#2343](https://github.com/adobe/spectrum-css/issues/2343)

### 🛑 BREAKING CHANGE

- @spectrum-css/icon will no longer contain SVG assets; it will be a purely CSS package with all SVG assets migrated to the new @spectrum-css/ui-icons package.
- NEW: @spectrum-css/ui-icons package for all SVG icons in the UI set.

## 6.0.1

🗓 2023-12-04 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@6.0.0...@spectrum-css/preview@6.0.1)

### 🐛 Bug fixes

- **storybook:** postcss parsing error for node_modules paths ([#2321](https://github.com/adobe/spectrum-css/issues/2321))([a6bd124](https://github.com/adobe/spectrum-css/commit/a6bd124))

## 6.0.0

🗓 2023-11-15 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.1.0...@spectrum-css/preview@6.0.0)

- feat(vars,expressvars)!: deprecate packages (#2244)([5eb391c](https://github.com/adobe/spectrum-css/commit/5eb391c)), closes[#2244](https://github.com/adobe/spectrum-css/issues/2244)

### 🛑 BREAKING CHANGE

- as no additional changes have been or are planned to be made to these legacy token packages, these assets no longer need to exist in the monorepo structure for Spectrum CSS.

## 5.1.1

🗓 2023-11-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.1.0...@spectrum-css/preview@5.1.1)

**Note:** Version bump only for package @spectrum-css/preview

## 5.1.0

🗓 2023-11-09 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.5...@spectrum-css/preview@5.1.0)

### ✨ Features

- **storybook:** move config folder to root ([#2267](https://github.com/adobe/spectrum-css/issues/2267))([5f7037d](https://github.com/adobe/spectrum-css/commit/5f7037d))

## 5.0.5

🗓 2023-10-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.4...@spectrum-css/preview@5.0.5)

**Note:** Version bump only for package @spectrum-css/preview

## 5.0.4

🗓 2023-09-26 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.3...@spectrum-css/preview@5.0.4)

**Note:** Version bump only for package @spectrum-css/preview

## 5.0.3

🗓 2023-09-18 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.2...@spectrum-css/preview@5.0.3)

**Note:** Version bump only for package @spectrum-css/preview

## 5.0.2

🗓 2023-09-14 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.1...@spectrum-css/preview@5.0.2)

**Note:** Version bump only for package @spectrum-css/preview

## 5.0.1

🗓 2023-09-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@5.0.0...@spectrum-css/preview@5.0.1)

**Note:** Version bump only for package @spectrum-css/preview

## 5.0.0

🗓 2023-09-07 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.14...@spectrum-css/preview@5.0.0)

- feat(splitview)!: migrate to spectrum tokens (#2103)([4f39c5d](https://github.com/adobe/spectrum-css/commit/4f39c5d)), closes[#2103](https://github.com/adobe/spectrum-css/issues/2103)

### 🛑 BREAKING CHANGE

- migrates SplitView to use `@adobe/spectrum-tokens`

Additionally:

- fix(splitview): remove touch-action from gripper
- refactor(splitview): combine skin.css with index.css and delete skin.css
- feat(splitview)!: updating to use core tokens
- chore(splitview): update mods
- style(splitview): add whcm styling
- chore(splitview): fix linter errors
- use two colon pseudo elements
- fix max nesting depth
- chore(splitview): working on adding focus story
- chore(splitview): add storybook interaction add-on
- chore(splitview): use latest version of tokens
- fix(splitview): use vertical gripper width for vertical gripper

## 4.1.14

🗓 2023-08-31 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.13...@spectrum-css/preview@4.1.14)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.13

🗓 2023-08-31 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.12...@spectrum-css/preview@4.1.13)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.12

🗓 2023-08-29 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.11...@spectrum-css/preview@4.1.12)

### 🔙 Reverts

- gulp and build updates ([#2121](https://github.com/adobe/spectrum-css/issues/2121))([03a37f5](https://github.com/adobe/spectrum-css/commit/03a37f5)), closes[#2099](https://github.com/adobe/spectrum-css/issues/2099)

## 4.1.11

🗓 2023-08-22 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.10...@spectrum-css/preview@4.1.11)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.10

🗓 2023-08-22 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.8...@spectrum-css/preview@4.1.10)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.9

🗓 2023-08-18 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.8...@spectrum-css/preview@4.1.9)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.8

🗓 2023-08-16 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.7...@spectrum-css/preview@4.1.8)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.7

🗓 2023-08-10 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.6...@spectrum-css/preview@4.1.7)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.6

🗓 2023-08-07 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.5...@spectrum-css/preview@4.1.6)

### 🐛 Bug fixes

- revert prettier ([#2074](https://github.com/adobe/spectrum-css/issues/2074))([ebb98df](https://github.com/adobe/spectrum-css/commit/ebb98df))

## 4.1.5

🗓 2023-08-03 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.4...@spectrum-css/preview@4.1.5)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.4

🗓 2023-07-31 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.3...@spectrum-css/preview@4.1.4)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.3

🗓 2023-07-26 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.2...@spectrum-css/preview@4.1.3)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.2

🗓 2023-07-24 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.1...@spectrum-css/preview@4.1.2)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.1

🗓 2023-07-17 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.1.0...@spectrum-css/preview@4.1.1)

**Note:** Version bump only for package @spectrum-css/preview

## 4.1.0

🗓 2023-07-14 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@4.0.0...@spectrum-css/preview@4.1.0)

### ✨ Features

- add Storybook Pseudo States addon([882a634](https://github.com/adobe/spectrum-css/commit/882a634))

### 🐛 Bug fixes

- **actionbutton:** update action button color tokens ([#1982](https://github.com/adobe/spectrum-css/issues/1982))([95e4353](https://github.com/adobe/spectrum-css/commit/95e4353))

## 4.0.0

🗓 2023-07-11 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.2.0...@spectrum-css/preview@4.0.0)

- feat(tabs)!: migrate tokens (#1902)([6d07436](https://github.com/adobe/spectrum-css/commit/6d07436)), closes[#1902](https://github.com/adobe/spectrum-css/issues/1902)

### 🛑 BREAKING CHANGE

- Migrates the Tabs component to use `@adobe/spectrum-tokens`.

## 3.2.0

🗓 2023-07-11 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.1.3...@spectrum-css/preview@3.2.0)

### ✨ Features

- allow story-level params to be passed to RTL decorator ([#1986](https://github.com/adobe/spectrum-css/issues/1986))([5fba21e](https://github.com/adobe/spectrum-css/commit/5fba21e))

### 🐛 Bug fixes

- revert prettier version bump ([#2004](https://github.com/adobe/spectrum-css/issues/2004))([29b179c](https://github.com/adobe/spectrum-css/commit/29b179c))

- 3.1.3

🗓 2023-06-29 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.1.2...@spectrum-css/preview@3.1.3)

**Note:** Version bump only for package @spectrum-css/preview

## 3.1.2

🗓 2023-06-28 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.1.1...@spectrum-css/preview@3.1.2)

**Note:** Version bump only for package @spectrum-css/preview

## 3.1.1

🗓 2023-06-21 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.1.0...@spectrum-css/preview@3.1.1)

**Note:** Version bump only for package @spectrum-css/preview

## 3.1.0

🗓 2023-06-15 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.26...@spectrum-css/preview@3.1.0)

### ✨ Features

- update to Storybook v7 ([#1935](https://github.com/adobe/spectrum-css/issues/1935))([6dcf09b](https://github.com/adobe/spectrum-css/commit/6dcf09b))

## 3.0.26

🗓 2023-06-12 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.25...@spectrum-css/preview@3.0.26)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.25

🗓 2023-06-02 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.24...@spectrum-css/preview@3.0.25)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.24

🗓 2023-06-01 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.23...@spectrum-css/preview@3.0.24)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.23

🗓 2023-05-30 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.22...@spectrum-css/preview@3.0.23)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.22

🗓 2023-05-23 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.21...@spectrum-css/preview@3.0.22)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.21

🗓 2023-05-22 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.20...@spectrum-css/preview@3.0.21)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.20

🗓 2023-05-17 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.19...@spectrum-css/preview@3.0.20)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.19

🗓 2023-05-11 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.18...@spectrum-css/preview@3.0.19)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.18

🗓 2023-05-10 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.17...@spectrum-css/preview@3.0.18)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.17

🗓 2023-05-09 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.16...@spectrum-css/preview@3.0.17)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.16

🗓 2023-05-08 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.15...@spectrum-css/preview@3.0.16)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.15

🗓 2023-05-04 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.14...@spectrum-css/preview@3.0.15)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.14

🗓 2023-05-02 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.13...@spectrum-css/preview@3.0.14)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.13

🗓 2023-04-26 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.12...@spectrum-css/preview@3.0.13)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.12

🗓 2023-04-25 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.10...@spectrum-css/preview@3.0.12)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.11

🗓 2023-04-25 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.10...@spectrum-css/preview@3.0.11)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.10

🗓 2023-04-25 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.9...@spectrum-css/preview@3.0.10)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.9

🗓 2023-04-21 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.8...@spectrum-css/preview@3.0.9)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.8

🗓 2023-04-20 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.7...@spectrum-css/preview@3.0.8)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.7

🗓 2023-04-17 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.6...@spectrum-css/preview@3.0.7)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.6

🗓 2023-04-17 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.4...@spectrum-css/preview@3.0.6)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.5

🗓 2023-04-14 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.4...@spectrum-css/preview@3.0.5)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.4

🗓 2023-04-11 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.3...@spectrum-css/preview@3.0.4)

### 🐛 Bug fixes

- **preview:** storybook precompilation task ([#1764](https://github.com/adobe/spectrum-css/issues/1764)) ([c06e0a5](https://github.com/adobe/spectrum-css/commit/c06e0a5))

## 3.0.3

🗓 2023-04-10 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.2...@spectrum-css/preview@3.0.3)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.2

🗓 2023-04-06 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.0...@spectrum-css/preview@3.0.2)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.1

🗓 2023-04-04 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@3.0.0...@spectrum-css/preview@3.0.1)

**Note:** Version bump only for package @spectrum-css/preview

## 3.0.0

🗓 2023-04-03 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.1.3...@spectrum-css/preview@3.0.0)

- fix(tokens)!: rgb transform to split out rgb values from css attributes (#1590) ([b714db4](https://github.com/adobe/spectrum-css/commit/b714db4)), closes [#1590](https://github.com/adobe/spectrum-css/issues/1590)

### 🛑 BREAKING CHANGE

- transforms color tokens to split out their `rgb` values

Co-authored-by: castastrophe <castastrophe@users.noreply.github.com>

## 2.1.3

🗓 2023-03-31 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.1.2...@spectrum-css/preview@2.1.3)

**Note:** Version bump only for package @spectrum-css/preview

## 2.1.2

🗓 2023-03-27 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.1.1...@spectrum-css/preview@2.1.2)

**Note:** Version bump only for package @spectrum-css/preview

## 2.1.1

🗓 2023-03-21 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.1.0...@spectrum-css/preview@2.1.1)

**Note:** Version bump only for package @spectrum-css/preview

## 2.1.0

🗓 2023-03-21 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.8...@spectrum-css/preview@2.1.0)

### ✨ Features

- configure local visual testing with Chromatic ([#1673](https://github.com/adobe/spectrum-css/issues/1673)) ([e62913a](https://github.com/adobe/spectrum-css/commit/e62913a))

## 2.0.8

🗓 2023-03-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.7...@spectrum-css/preview@2.0.8)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.7

🗓 2023-03-09 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.6...@spectrum-css/preview@2.0.7)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.6

🗓 2023-03-07 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.5...@spectrum-css/preview@2.0.6)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.5

🗓 2023-03-01 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.4...@spectrum-css/preview@2.0.5)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.4

🗓 2023-02-28 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.3...@spectrum-css/preview@2.0.4)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.3

🗓 2023-02-24 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.2...@spectrum-css/preview@2.0.3)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.2

🗓 2023-02-21 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.1...@spectrum-css/preview@2.0.2)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.1

🗓 2023-02-06 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@2.0.0...@spectrum-css/preview@2.0.1)

**Note:** Version bump only for package @spectrum-css/preview

## 2.0.0

🗓 2023-02-01 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.9...@spectrum-css/preview@2.0.0)

- chore(tokens)!: use latest dependency & fix build error (#1591) ([f2532e7](https://github.com/adobe/spectrum-css/commit/f2532e7)), closes [#1591](https://github.com/adobe/spectrum-css/issues/1591)

### 🛑 BREAKING CHANGE

- uses latest `@adobe/spectrum-tokens` dependency which includes token renames

## 1.0.9

🗓 2023-02-01 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.8...@spectrum-css/preview@1.0.9)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.8

🗓 2023-01-27 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.7...@spectrum-css/preview@1.0.8)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.7

🗓 2023-01-25 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.6...@spectrum-css/preview@1.0.7)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.6

🗓 2023-01-18 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.4...@spectrum-css/preview@1.0.6)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.5

🗓 2023-01-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.4...@spectrum-css/preview@1.0.5)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.4

🗓 2023-01-13 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.3...@spectrum-css/preview@1.0.4)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.3

🗓 2022-12-16 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.2...@spectrum-css/preview@1.0.3)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.2

🗓 2022-12-14 • 📝 [Commits](https://github.com/adobe/spectrum-css/compare/@spectrum-css/preview@1.0.1...@spectrum-css/preview@1.0.2)

**Note:** Version bump only for package @spectrum-css/preview

## 1.0.1

🗓 2022-12-13

**Note:** Version bump only for package @spectrum-css/preview
