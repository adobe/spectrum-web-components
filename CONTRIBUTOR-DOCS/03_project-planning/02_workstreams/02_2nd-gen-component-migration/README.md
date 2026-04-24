<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Workstreams](../README.md) / 2nd-gen Component Migration

<!-- Document title (editable) -->

# 2nd-gen Component Migration

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Status](01_status.md)
- Step By Step
    - [Analyze rendering and styling](02_step-by-step/01_analyze-rendering-and-styling/README.md)
    - [Washing machine: migrating an existing 1st-gen component to 2nd-gen](02_step-by-step/01_washing-machine-workflow.md)
    - [Understand the 1st-gen component structure](02_step-by-step/02_factor-rendering-out-of-1st-gen-component.md)
    - [Create base class in 2nd-gen core](02_step-by-step/03_move-base-class-to-2nd-gen-core.md)
    - [Formalize Spectrum data model](02_step-by-step/04_formalize-spectrum-data-model.md)
    - [Add 2nd-gen SWC component](02_step-by-step/05_implement-2nd-gen-component.md)
    - [Migrate rendering & styles from Spectrum CSS](02_step-by-step/06_migrate-rendering-and-styles.md)
    - [Add stories for 2nd-gen component](02_step-by-step/07_add-stories-for-2nd-gen-component.md)
- [Migration project planning (Epics and tickets)](03_migration-project-planning.md)

</details>

<!-- Document content (editable) -->

The tactical process of building 2nd-gen components, using 1st-gen as a reference:

- Studying 1st-gen implementations to understand API, behavior, and edge cases
- Creating base classes in 2nd-gen Core (behavior and API)
- Building concrete 2nd-gen implementations in SWC (rendering and styles)
- Migrating styles from the Spectrum CSS repository

1st-gen and 2nd-gen are **independent** — there is no runtime dependency between them. We start from existing implementations and apply improvements incrementally. More dramatic rewrites should be informed by existing bugs, accessibility considerations, or feature disparity.

Because our 1st-gen components vary in complexity and quality — some have known issues (a11y and otherwise) that we believe will require substantial changes — we will add classes to 2nd-gen Core incrementally, based on component-specific roadmaps.
