<!-- Document title (editable) -->

# Contributor Documentation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About Spectrum Web Components](#about-spectrum-web-components)
- [About the 1st-gen-to-2nd-gen transition](#about-the-1st-gen-to-2nd-gen-transition)
- [About these docs](#about-these-docs)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Objectives and Strategy](01_objectives-and-strategy.md)
- [Contributor Guides](02_contributor-guides/README.md)
    - [Adobe Code of Conduct](02_contributor-guides/01_code-of-conduct.md)
    - [Authoring contributor docs](02_contributor-guides/authoring-contributor-docs/README.md)
- [Style Guide](03_style-guide/README.md)
- [Workstream Info](04_workstream-info/README.md)
    - [2nd-gen Definition and Development](04_workstream-info/01_2nd-gen-definition-and-development/README.md)
    - [2nd-gen Component Migration](04_workstream-info/02_2nd-gen-component-migration/README.md)
    - [Accessibility Improvements](04_workstream-info/03_accessibility-improvements/README.md)
    - [Component Improvements](04_workstream-info/04_component-improvements/README.md)
    - [1st-gen Spectrum 2 Enhancements](04_workstream-info/05_1st-gen-spectrum-2-enhancements/README.md)
- [Component Info](05_component-info/README.md)
    - Badge
    - Progress Circle

</details>

<!-- Document content (editable) -->

## About Spectrum Web Components

Spectrum Web Components (SWC) is a library of web components that implements Adobe's Spectrum design system.

While SWC is used primarily by Adobe product teams, it is open-sourced and available for general use.

SWC is developed by a core team in Adobe Design Engineering, but we welcome contributions from inside and outside Adobe.

## About the 1st-gen-to-2nd-gen transition

Spectrum Web Components is currently in transition from its first generation (1st-gen) to its second generation (2nd-gen).

> This transition is motivated by some important strategic goals. For more information, see [Objectives and Strategy](./01_objectives-and-strategy.md).

Instead of creating a separate branch or repo for 2nd-gen, we are working on the 1st-gen and 2nd-gen projects side-by-side in this repository, with some core functionality being shared between 1st- and 2nd-gen components. This strategy makes it easier for us to continue actively improving and supporting 1st-gen even as we devote much of our attention to defining and building 2nd-gen.

Reflecting the side-by-side strategy, the repository is organized into two top-level workspaces:

- **`first-gen/`** contains all of the 1st-gen packages, tooling, and supporting materials.

    Most of what lives here will be left behind in the transition to 2nd-gen; the core component functionality we'll carry forward is gradually being moved into the `second-gen` workspace.

    While we'll continue doing work in `first-gen` as needed to accomplish our goals, we expect this work to decrease steadily toward none.

- **`second-gen/`** is a new workspace that we're building from the ground up to serve as a clean foundation for our future work. It includes:
    - A Core library (`packages/core/`), which contains the functionality shared between 1st- and 2nd-gen

    - The 2nd-gen SWC library (`packages/swc/`).

During this transition, depending on what you're trying to accomplish, you may end up working in `first-gen`, `second-gen`, or both. If you have any questions, please ask—we're happy to help.

## About these docs

These docs contain essential information about the SWC project for both maintainers (members of the core team) and contributors from outside the core team.

The docs are organized into several sections to help you find the information you need:

**[Objectives and Strategy](./01_objectives-and-strategy.md)** - Strategic context for the 1st-gen-to-2nd-gen transition, including our goals and approach. This explains why we're making this transition and how we're managing the work to advance multiple objectives in parallel while continuing to deliver value to customers.

**[Contributor Guides](./02_contributor-guides/README.md)** - Topical guides for working on the project. This section includes guides for getting started, understanding processes, and accomplishing specific tasks like adding new components or editing these contributor docs themselves.

**[Style Guide](./03_style-guide/README.md)** - Comprehensive style guide covering project-wide conventions and area-specific rules. This section is useful for human reference and for AI-assisted work, documenting our approaches to linting, JSDoc conventions, component structure, and other coding standards.

**[Workstream Info](./04_workstream-info/README.md) and [Component Info](./05_component-info/README.md)** - These two sections contain detailed information about our work, for planning, execution and tracking purposes:

- **Workstream Info** offers a workstream-centric view that focuses on cross-cutting work affecting many or all components. This docs in this section help us work toward specific objectives, understand how different types of work relate to each other, and coordinate efforts that span multiple components.

- **Component Info** offers a component-centric view that focuses on individual components and how they're affected by multiple workstreams. The docs in this section are useful for understanding and managing a component's overall roadmap and status, taking into account the various workstreams that affect it.

Together, these two views help us manage the project roadmap, ensuring we make progress on strategic objectives while maintaining clarity about the state and evolution of individual components.
