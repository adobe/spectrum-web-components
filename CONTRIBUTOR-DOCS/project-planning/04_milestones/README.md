<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Milestones

<!-- Document title (editable) -->

# Milestones

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Barebones](#barebones)

</details>

<!-- Document content (editable) -->

Project milestones represent significant checkpoints in our work, typically marking the completion of a major phase or the achievement of a strategic goal.

## Barebones

The Barebones milestone is the initial milestone in our 2nd-gen effort. Its purpose is to prove out and de-risk the strategy by establishing the multi-generation architecture with a small set of simple components.

The work for this milestone is being done on the `barebones` branch and includes:

- Moving virtually all previous repository contents into a new `1st-gen/` folder
- Creating the `2nd-gen/` folder structure with both the Core library and the 2nd-gen SWC library
- Migrating 5 simple components to the new multi-generation architecture
- Verifying that all existing 1st-gen tests still pass
- Confirming that 1st-gen releases continue to work as expected

The milestone will be considered complete when the `barebones` branch is merged into `main`, validating that the strategy is viable before scaling the approach to all components.
