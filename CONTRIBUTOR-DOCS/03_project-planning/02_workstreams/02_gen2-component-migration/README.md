<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Workstreams](../README.md) / gen2 Component Migration

<!-- Document title (editable) -->

# gen2 Component Migration

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Status](01_status.md)
- Step By Step
    - [Analyze rendering and styling](02_step-by-step/01_analyze-rendering-and-styling/README.md)
    - [Washing machine: migrating an existing 1st-gen component to gen2](02_step-by-step/01_washing-machine-workflow.md)
    - [Understand the 1st-gen component structure](02_step-by-step/02_factor-rendering-out-of-1st-gen-component.md)
    - [Create base class in gen2 core](02_step-by-step/03_move-base-class-to-gen2-core.md)
    - [Formalize Spectrum data model](02_step-by-step/04_formalize-spectrum-data-model.md)
    - [Add gen2 SWC component](02_step-by-step/05_implement-gen2-component.md)
    - [Migrate rendering & styles from Spectrum CSS](02_step-by-step/06_migrate-rendering-and-styles.md)
    - [Add stories for gen2 component](02_step-by-step/07_add-stories-for-gen2-component.md)
- [Migration project planning (Epics and tickets)](03_migration-project-planning.md)

</details>

<!-- Document content (editable) -->

The tactical process of building gen2 components, using 1st-gen as a reference:

- Studying 1st-gen implementations to understand API, behavior, and edge cases
- Creating base classes in gen2 Core (behavior and API)
- Building concrete gen2 implementations in SWC (rendering and styles)
- Migrating styles from the Spectrum CSS repository

1st-gen and gen2 are **independent** — there is no runtime dependency between them. We start from existing implementations and apply improvements incrementally. More dramatic rewrites should be informed by existing bugs, accessibility considerations, or feature disparity.

Because our 1st-gen components vary in complexity and quality — some have known issues (a11y and otherwise) that we believe will require substantial changes — we will add classes to gen2 Core incrementally, based on component-specific roadmaps.
