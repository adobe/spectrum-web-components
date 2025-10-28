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

- [Contributor guides](01_contributor-guides/README.md)
    - [Getting involved](01_contributor-guides/01_getting-involved.md)
    - [Using the issue tracker](01_contributor-guides/02_using-the-issue-tracker.md)
    - [Making a pull request](01_contributor-guides/03_making-a-pull-request.md)
    - [Participating in PR reviews](01_contributor-guides/04_participating-in-pr-reviews.md)
    - [Releasing SWC](01_contributor-guides/05_releasing-swc.md)
    - [Authoring contributor docs](01_contributor-guides/06_authoring-contributor-docs/README.md)
    - [Patching dependencies](01_contributor-guides/07_patching-dependencies.md)
- [Style guide](02_style-guide/README.md)
- [Project planning](03_project-planning/README.md)
    - [Objectives and strategy](03_project-planning/01_objectives-and-strategy.md)
    - [Workstreams](03_project-planning/02_workstreams/README.md)
    - [Components](03_project-planning/03_components/README.md)
    - [Milestones](03_project-planning/04_milestones/README.md)

</details>

<!-- Document content (editable) -->

## About Spectrum Web Components

Spectrum Web Components (SWC) is a library of web components that implements Adobe's Spectrum design system.

While SWC is used primarily by Adobe product teams, it is open-sourced and available for general use.

SWC is developed by a core team in Adobe Design Engineering, but we welcome contributions from inside and outside Adobe.

## About the 1st-gen-to-2nd-gen transition

Spectrum Web Components is currently in transition from its first generation (1st-gen) to its second generation (2nd-gen).

> This transition is motivated by some important strategic goals. For more information, see [Objectives and Strategy](./03_project-planning/01_objectives-and-strategy.md).

Instead of creating a separate branch or repo for 2nd-gen, we are working on the 1st-gen and 2nd-gen projects side-by-side in this repository, with some core functionality being shared between 1st- and 2nd-gen components. This strategy makes it easier for us to continue actively improving and supporting 1st-gen even as we devote much of our attention to defining and building 2nd-gen.

Reflecting the side-by-side strategy, the repository is organized into two top-level workspaces:

- **`1st-gen/`** contains all of the 1st-gen packages, tooling, and supporting materials.

    Most of what lives here will be left behind in the transition to 2nd-gen; the core component functionality we'll carry forward is gradually being moved into the `2nd-gen` workspace.

    While we'll continue doing work in `1st-gen` as needed to accomplish our goals, we expect this work to decrease steadily toward none.

- **`2nd-gen/`** is a new workspace that we're building from the ground up to serve as a clean foundation for our future work. It includes:
    - A Core library (`packages/core/`), which contains the functionality shared between 1st- and 2nd-gen

    - The 2nd-gen SWC library (`packages/swc/`).

During this transition, depending on what you're trying to accomplish, you may end up working in `1st-gen`, `2nd-gen`, or both. If you have any questions, please ask—we're happy to help.

## About these docs

These docs contain essential information about the SWC project for both maintainers (members of the core team) and contributors from outside the core team.

The docs are organized into three main sections to help you find the information you need:

**[Contributor Guides](./01_contributor-guides/README.md)** - Topical guides for working on the project. This section includes guides for getting started, understanding processes, and accomplishing specific tasks like adding new components or editing these contributor docs themselves.

**[Style Guide](./02_style-guide/README.md)** - Comprehensive style guide covering project-wide conventions and area-specific rules. This section is useful for human reference and for AI-assisted work, documenting our approaches to linting, JSDoc conventions, component structure, and other coding standards.

**[Project Planning](./03_project-planning/README.md)** - Strategic planning documentation including objectives, workstreams, component roadmaps, and milestones. This section contains:

- **[Objectives and Strategy](./03_project-planning/01_objectives-and-strategy.md)** - Strategic context for the 1st-gen-to-2nd-gen transition, including our goals and approach.

- **[Workstreams](./03_project-planning/02_workstreams/README.md)** - Workstream-centric view of cross-cutting work affecting many or all components, helping us work toward specific objectives and coordinate efforts.

- **[Components](./03_project-planning/03_components/README.md)** - Component-centric view of individual components and how they're affected by multiple workstreams, useful for understanding each component's roadmap and status.

- **[Milestones](./03_project-planning/04_milestones/README.md)** - Information about project milestones and their goals.

Together, the Workstreams and Components views help us manage the project roadmap, ensuring we make progress on strategic objectives while maintaining clarity about the state and evolution of individual components.
