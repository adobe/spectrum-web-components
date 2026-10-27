# Text field naming audit

## Summary

Audited branch `miwha/text-field-fast-follow` on October 27, 2026. This is a naming report, not a rename implementation. The worktree was clean before the audit.

Follow-up scope confirmed: leave all 1st-gen files unchanged, preserve gen2's `TextField` class filenames, and standardize gen2 plus related contributor documentation. The inventory below records the pre-cleanup state; the rendering analysis now lives under [text-field/](CONTRIBUTOR-DOCS/03_project-planning/03_components/text-field/rendering-and-styling-migration-analysis.md).

The largest difference is intentional: 1st-gen uses `textfield` and `Textfield` in its published API, while gen2 uses `text-field` and `TextField`. Gen2's text field implementation is already consistent with treating the name as two words. The remaining cleanup is primarily contributor documentation, a few shared-controller examples, and legacy human-readable copy.

Recommended convention:

| Context                                                                             | Preferred form                                                      | Example                                                                     |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Prose and UI labels                                                                 | `text field`; `Text field` at the start of a sentence or in a title | `A text field accepts user input.`                                          |
| Directories, non-class filenames, URL segments, custom-element names                | `text-field`                                                        | `text-field.css`, `swc-text-field`                                          |
| TypeScript classes, types, and class-named files                                    | `TextField`                                                         | `TextField.ts`, `TextFieldBase`, `TextFieldSize`                            |
| Constants                                                                           | `TEXT_FIELD`                                                        | `TEXT_FIELD_TYPES`                                                          |
| Gen2 component CSS classes                                                          | `swc-TextField` prefix                                              | `swc-TextField-control`                                                     |
| Gen2 component-specific CSS custom properties                                       | `--swc-text-field-*`                                                | `--swc-text-field-border-radius`                                            |
| Exact references to existing 1st-gen APIs, external selectors, and browser keywords | Preserve the actual spelling                                        | `sp-textfield`, `Textfield`, `.spectrum-Textfield`, `appearance: textfield` |

`TextField` is the PascalCase representation of two words, not the same naming choice as `Textfield`. Renaming class files to kebab-case would be a separate file-style decision, not a necessary consequence of using two words.

## Scope and measurement

The inventory covers tracked, UTF-8 text files in the current checkout. It excludes files named `CHANGELOG.md`, dependency lockfiles (`yarn.lock`, `package-lock.json`, and `pnpm-lock.yaml`), and binary/non-UTF-8 files. Local ignored build output is not counted. Searches are case-insensitive substring searches, so counts include tags, import paths, CSS selectors, identifiers such as `TextFieldBase`, and plural words such as `textfields`.

| Area             | Joined `textfield`, any case  | Hyphenated `text-field`, any case | Spaced `text field`, any case |
| ---------------- | ----------------------------- | --------------------------------- | ----------------------------- |
| 1st-gen          | 1,566 occurrences in 88 files | 17 occurrences in 13 files        | 8 occurrences in 6 files      |
| Gen2             | 241 occurrences in 22 files   | 449 occurrences in 21 files       | 30 occurrences in 17 files    |
| Contributor docs | 581 occurrences in 19 files   | 214 occurrences in 16 files       | 66 occurrences in 21 files    |

These are inventory counts, not counts of errors. A file can appear in more than one column.

The gen2 joined-word count splits into 195 `TextField` matches, 43 `textfield` matches, and 3 `Textfield` matches. Most joined matches are therefore correctly cased identifiers, not prose requiring cleanup. Gen2's spaced forms include 15 `Text field`, 14 `text field`, and 1 `Text Field` match.

## 1. Gen2's component naming is already standardized

Both implementation directories use the hyphenated name:

- [Core component](gen2/packages/core/components/text-field/)
- [Styled component](gen2/packages/swc/components/text-field/)

The class-named files use two-word PascalCase:

- [TextField.base.ts](gen2/packages/core/components/text-field/TextField.base.ts)
- [TextField.types.ts](gen2/packages/core/components/text-field/TextField.types.ts)
- [TextField.ts](gen2/packages/swc/components/text-field/TextField.ts)

The other component-named files use kebab-case: [swc-text-field.ts](gen2/packages/swc/components/text-field/swc-text-field.ts), [text-field.css](gen2/packages/swc/components/text-field/text-field.css), [text-field.mdx](gen2/packages/swc/components/text-field/text-field.mdx), [text-field.stories.ts](gen2/packages/swc/components/text-field/stories/text-field.stories.ts), and the text-field-named test/VRT files.

The public surfaces agree:

- The registered tag is `swc-text-field`.
- The classes and types use `TextField`, `TextFieldBase`, and `TextField*`.
- Constants use `TEXT_FIELD_*`.
- Core exports use `@adobe/spectrum-wc-core/components/text-field`, as declared in [the core package manifest](gen2/packages/core/package.json).
- Styled-component imports use `@adobe/spectrum-wc/text-field` or the explicit registration path `@adobe/spectrum-wc/components/text-field/swc-text-field.js`. These are different import purposes, but both use the same component spelling.
- Component CSS uses `.swc-TextField-*` and `--swc-text-field-*`.
- The Storybook title is `Text field`, and its description says “A single-line text field for entering and editing text.”

No tracked file is literally named lowercase `textfield.ts`. The legacy class file is [Textfield.ts](1st-gen/packages/textfield/src/Textfield.ts); gen2's corresponding class file is [TextField.ts](gen2/packages/swc/components/text-field/TextField.ts).

Within the core and styled text field directories, excluding the migration guide, all joined-word matches are `TextField` identifiers or class names. There are no `textfield` or `Textfield` leftovers there.

## 2. Concrete gen2 leftovers outside the component

| Location                                                                                                                                                            | Current usage                                                                              | Assessment                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| [Field association controller docs](gen2/packages/core/controllers/field-association-controller/field-association-controller.mdx)                                   | “every form-associated field (textfield, checkbox, combobox, radio)”                       | Change the prose to `text field`.                                                                                     |
| [Field association controller source](gen2/packages/core/controllers/field-association-controller/src/field-association-controller.ts)                              | Comment lists “component (textfield, checkbox, radio, combobox)”                           | Change the comment to `text field`.                                                                                   |
| [Slot attribute propagation stories](gen2/packages/core/controllers/slot-attribute-propagation-controller/stories/slot-attribute-propagation-controller.stories.ts) | Native input has `class="swc-Textfield"`                                                   | Example uses old casing. Align with `TextField` if retaining a component-style class; it is not a custom-element tag. |
| [Slot attribute propagation tests](gen2/packages/core/controllers/slot-attribute-propagation-controller/test/slot-attribute-propagation-controller.test.ts)         | Native input has `class="swc-Textfield"`                                                   | Same example-class inconsistency as the story.                                                                        |
| [Storybook translations](gen2/packages/swc/.storybook/intl/translations.json)                                                                                       | Eight locale entries use the key `textfield.value`                                         | Internal key naming differs. Rename only with a coordinated consumer search, not as prose replacement.                |
| [Status light stories](gen2/packages/swc/components/status-light/stories/status-light.stories.ts)                                                                   | Comment says it injects `textfield.value`, but the implementation reads `fieldlabel.label` | Stale comment rather than an active text field dependency. Correct it to describe the actual key used.                |

These are the relevant gen2 outliers after separating valid `TextField` identifiers, migration examples, and browser syntax.

## 3. Contributor planning docs split the same component into two directories

This is the clearest structural divergence:

| Directory                                                                                                           | Documents                                        | Displayed naming                                          |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| [text-field/](CONTRIBUTOR-DOCS/03_project-planning/03_components/text-field/)                                       | Accessibility migration analysis; migration plan | `Text field`; generated breadcrumbs also use `Text Field` |
| `textfield/` (now consolidated under [text-field/](CONTRIBUTOR-DOCS/03_project-planning/03_components/text-field/)) | Rendering and styling migration analysis         | `Textfield and Textarea migration roadmap`                |

The [component index](CONTRIBUTOR-DOCS/03_project-planning/03_components/README.md) lists both groups separately. The [project planning index](CONTRIBUTOR-DOCS/03_project-planning/README.md) also contains `Textfield`, and the [migration status table](CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_gen2-component-migration/01_status.md) labels the component `Textfield`.

Recommended cleanup: consolidate the rendering/styling analysis under the existing `text-field/` directory, normalize its human-readable title, update incoming links, and regenerate contributor-doc navigation using the repository workflow. Do not manually edit generated breadcrumbs or TOCs.

The rendering/styling analysis contains 309 joined-name matches, but many are literal Spectrum CSS selectors such as `.spectrum-Textfield-input`. Those should remain accurate even if its directory and prose change.

### Other contributor docs with joined-name references

The audit found joined-name references in 19 contributor files. In addition to the six text field/index/status files above, these are:

- [Focus management contributor guide](CONTRIBUTOR-DOCS/01_contributor-guides/14_focus-management.md)
- [Playwright accessibility testing guide](CONTRIBUTOR-DOCS/02_style-guide/04_testing/03_playwright-accessbility-testing.md)
- [Color field rendering/styling analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/color-field/rendering-and-styling-migration-analysis.md)
- [Combobox accessibility analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/combobox/accessibility-migration-analysis.md)
- [Infield button accessibility analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/infield-button/accessibility-migration-analysis.md)
- [Infield button migration plan](CONTRIBUTOR-DOCS/03_project-planning/03_components/infield-button/migration-plan.md)
- [Infield button rendering/styling analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/infield-button/rendering-and-styling-migration-analysis.md)
- [Number field rendering/styling analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/number-field/rendering-and-styling-migration-analysis.md)
- [Radio group accessibility analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/radio-group/accessibility-migration-analysis.md)
- [Search rendering/styling analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/search/rendering-and-styling-migration-analysis.md)
- [Slider rendering/styling analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/slider/rendering-and-styling-migration-analysis.md)
- [Text area accessibility analysis](CONTRIBUTOR-DOCS/03_project-planning/03_components/text-area/accessibility-migration-analysis.md)
- [Focus management strategy](CONTRIBUTOR-DOCS/03_project-planning/05_strategies/focus-management-strategy-rfc.md)

This is a review inventory, not a replacement list. Preserve literal old imports, tags, types, selectors, and historical API comparisons.

## 4. 1st-gen uses the joined name as a published contract

The [package manifest](1st-gen/packages/textfield/package.json) explicitly publishes:

- Package `@spectrum-web-components/textfield`
- Registration entry point `sp-textfield.js`
- Class-file entry point `src/Textfield.js`
- Stylesheet entry points containing `textfield`

The [implementation](1st-gen/packages/textfield/src/Textfield.ts) exports `Textfield`, `TextfieldBase`, and `TextfieldType`. Its filenames include `Textfield.ts`, `textfield.css`, `textfield-overrides.css`, and `spectrum-textfield.css`. Stories and tests use the same joined form.

This API is shared beyond the component: [Search](1st-gen/packages/search/src/Search.ts) extends `Textfield`, and [NumberField](1st-gen/packages/number-field/src/NumberField.ts) and [ColorField](1st-gen/packages/color-field/src/ColorField.ts) extend `TextfieldBase`.

Renaming those tags, packages, exports, or class names would not be a cosmetic cleanup. It requires an explicit compatibility strategy and updates to dependent components and consumers.

### Human-readable legacy copy can be cleaned separately

- The [1st-gen Storybook file](1st-gen/packages/textfield/stories/textfield.stories.ts) uses `title: 'Textfield'`, “This Textfield,” “This textfield,” and “A readonly textfield.”
- The [1st-gen README](1st-gen/packages/textfield/README.md) already says “A text field must have a label,” but its help-text example labels a tab set “Help text usage in textfields.”
- The [number field README](1st-gen/packages/number-field/README.md) says “As with textfield.”

Those human-readable strings are outside this cleanup's scope. All 1st-gen files, including prose and Storybook titles, remain unchanged.

## 5. Joined spellings that should remain

- The gen2 [consumer migration guide](gen2/packages/swc/components/text-field/migration-guide.mdx) intentionally shows `sp-textfield`, `@spectrum-web-components/textfield`, `Textfield`, and `--mod-textfield-*` as the old API. Its comparison already makes the naming transition explicit.
- Legacy and external Spectrum CSS references, including `.spectrum-Textfield-*`, must match their actual source spelling.
- The [infield button stories](gen2/packages/swc/components/infield-button/stories/infield-button.stories.ts) contain `-moz-appearance:textfield`. `textfield` is a browser CSS keyword here, not component prose.
- Correctly cased `TextField*` identifiers and `.swc-TextField-*` classes already represent the preferred two-word name.
- Generated local JavaScript, declarations, and source maps should not be renamed by hand. The tracked TypeScript/CSS sources, package exports, and build pipeline are the source of truth.

## Suggested cleanup boundary

For a focused cleanup on this branch:

1. Standardize gen2 and contributor-doc human-readable prose and titles to `text field` / `Text field`, leaving 1st-gen untouched.
2. Consolidate the split contributor-doc directories under `text-field/`, updating links and generated navigation.
3. Fix shared-controller prose and example-class casing.
4. Handle translation-key changes only after checking their consumers.
5. Preserve published 1st-gen API names, exact migration examples, external selectors, and browser keywords.
6. Keep gen2's existing `TextField` class/type/file naming.

No source files were renamed or changed by this audit. No runtime tests were run because this deliverable is documentation only; findings were verified through tracked-file inventory, exact-spelling counts, and direct source inspection.

## Follow-up cleanup

The approved gen2 cleanup is implemented:

- All 1st-gen files remain unchanged.
- Gen2 retains `TextField.ts`, `TextField.base.ts`, and `TextField.types.ts`.
- Shared-controller prose uses `text field`; example classes use `swc-TextField`.
- All eight locale keys use `text-field.value`, with their translated values preserved.
- The status light helper comment references the actual `fieldlabel.label` key it reads.
- The combined rendering analysis lives under `text-field/`; incoming links and generated contributor navigation use the canonical directory, with no separate `Textfield` navigation group.
- Related contributor prose uses `text field`; literal 1st-gen APIs, historical ticket titles, external selectors, and browser syntax remain accurate.
- The text field migration plan records the documentation consolidation in decision Q21.

Validation:

- Five naming acceptance checks pass, covering the renamed keys and preserved values, directory and navigation consolidation, retained class filenames and migration examples, and unchanged 1st-gen files.
- `yarn workspace @adobe/spectrum-wc test slot-attribute-propagation-controller field-association-controller components/status-light/stories/status-light.stories.ts`: 39 tests pass; 5 test files pass and 2 files are skipped.
- `yarn type-check:gen2`: passes.
- Targeted ESLint checks on changed gen2 TypeScript and JSON files: pass.
- Contributor navigation regeneration: completes. All 2,727 links are checked; the same 29 pre-existing link failures remain, with no newly broken link targets.
- `yarn workspace @adobe/spectrum-wc generate:contributor-docs`: regenerates 194 Storybook MDX pages.
