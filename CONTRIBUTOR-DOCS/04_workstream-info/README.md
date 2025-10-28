<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / Workstream Info

<!-- Document title (editable) -->

# Workstream Info

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About Workstream Info](#about-workstream-info)
- [Active Workstreams](#active-workstreams)
- [Milestones](#milestones)
    - [Barebones](#barebones)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [2nd-gen Definition and Development](01_2nd-gen-definition-and-development/README.md)
- [2nd-gen Component Migration](02_2nd-gen-component-migration/README.md)
    - [Status](02_2nd-gen-component-migration/01_status.md)
    - Step By Step
- [Accessibility Improvements](03_accessibility-improvements/README.md)
- [Component Improvements](04_component-improvements/README.md)
- [1st-gen Spectrum 2 Enhancements](05_1st-gen-spectrum-2-enhancements/README.md)

</details>

<!-- Document content (editable) -->

## About Workstream Info

Workstreams represent our strategic objectives translated into actionable work. Each workstream defines a coherent body of work toward a specific goal, with its own scope, approach, and priorities.

This section of the contributor docs contains detailed information about each of our active workstreams

For more on how Workstream Info (this section) and [Component Info](../05_component-info/README.md) provide complementary views of our work, see the [main contributor docs README](../README.md#about-these-contributor-docs).

## Active Workstreams

- **[2nd-gen Definition and Development](./01_2nd-gen-definition-and-development/README.md)** - Building the 2nd-gen project from the ground up, including rendering layer, tooling, infrastructure, tests, Storybook, and documentation.

- **[2nd-gen Component Migration](./02_2nd-gen-component-migration/README.md)** - Tactical process of migrating individual components to enable core functionality sharing between 1st-gen and 2nd-gen.

- **[Accessibility Improvements](./03_accessibility-improvements/README.md)** - Systematic work to maximize accessibility through expanded documentation, comprehensive audits, and issue remediation.

- **[Component Improvements](./04_component-improvements/README.md)** - Ongoing enhancements including bug fixes, feature additions, API improvements, and refactoring.

- **[1st-gen Spectrum 2 Enhancements](./05_1st-gen-spectrum-2-enhancements/README.md)** - Ongoing refinement of the `spectrum-two` theme for 1st-gen customers.

## Milestones

### Barebones

The Barebones milestone is the initial milestone in our 2nd-gen effort. Its purpose is to prove out and de-risk the strategy by establishing the multi-generation architecture with a small set of simple components.

The work for this milestone is being done on the `barebones` branch and includes:

- Moving virtually all previous repository contents into a new `1st-gen/` folder
- Creating the `2nd-gen/` folder structure with both the Core library and the 2nd-gen SWC library
- Migrating 5 simple components to the new multi-generation architecture
- Verifying that all existing 1st-gen tests still pass
- Confirming that 1st-gen releases continue to work as expected

The milestone will be considered complete when the `barebones` branch is merged into `main`, validating that the strategy is viable before scaling the approach to all components.
