<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Workstream Info](../README.md) / 2nd-gen Component Migration

<!-- Document title (editable) -->

# 2nd-gen Component Migration

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Status](01_status.md)
- Step By Step
    - [Factor rendering out of 1st-gen component](02_step-by-step/01_factor-rendering-out-of-1st-gen-component.md)
    - [Move base class to 2nd-gen core](02_step-by-step/02_move-base-class-to-2nd-gen-core.md)
    - [Formalize Spectrum data model](02_step-by-step/03_formalize-spectrum-data-model.md)
    - [Add 2nd-gen SWC component](02_step-by-step/04_implement-2nd-gen-component.md)
    - [Migrate rendering & styles from Spectrum CSS](02_step-by-step/05_migrate-rendering-and-styles.md)
    - [Add stories for 2nd-gen component](02_step-by-step/06_add-stories-for-2nd-gen-component.md)

</details>

<!-- Document content (editable) -->

The tactical process of migrating individual components to the multi-generation architecture:

- Refactoring 1st-gen components to separate core functionality from generation-specific rendering
- Moving base classes into 2nd-gen Core
- Building corresponding 2nd-gen implementations
- Migrating styles from the Spectrum CSS repository

Because our 1st-gen components vary in complexity and quality—some have known issues (a11y and otherwise) that we believe will require substantial changes or rewrites—we will add classes to 2nd-gen Core incrementally, based on component-specific roadmaps we'll build in parallel with spinning up the 2nd-gen project.
