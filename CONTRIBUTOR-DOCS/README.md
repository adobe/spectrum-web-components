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

- For Consumers
    - [Customization cheatsheet](for-consumers/customization-cheatsheet.md)
    - [Get started (for consumers)](for-consumers/get-started.md)
- [Contributor guides](for-contributors/README.md)
    - [2nd gen testing](for-contributors/2ndgen-testing.md)
    - [Accessibility testing](for-contributors/accessibility-testing.md)
    - [Authoring contributor docs](for-contributors/authoring-contributor-docs/README.md)
    - [Focus management](for-contributors/focus-management.md)
    - [Getting involved](for-contributors/getting-involved.md)
    - [Making a pull request](for-contributors/making-a-pull-request.md)
    - [Participating in PR reviews](for-contributors/participating-in-pr-reviews.md)
    - [Patching dependencies](for-contributors/patching-dependencies.md)
    - [Releasing SWC](for-contributors/releasing-swc.md)
    - [Style guide](for-contributors/style-guide/README.md)
    - [Tools vs packages: where code lives](for-contributors/tools-vs-packages.md)
    - [Maintaining StackBlitz examples for Spectrum Web Components](for-contributors/using-stackblitz.md)
    - [Using the issue tracker](for-contributors/using-the-issue-tracker.md)
    - [Working in the SWC repo](for-contributors/working-in-the-swc-repo.md)
- [Project planning](project-planning/README.md)
    - [Objectives and strategy](project-planning/01_objectives-and-strategy.md)
    - [Workstreams](project-planning/02_workstreams/README.md)
    - [Components](project-planning/03_components/README.md)
    - [Milestones](project-planning/04_milestones/README.md)
- Reference
    - [Component status](reference/component-status.md)
- [RFCs](rfcs/README.md)
    - Accepted
    - Proposed
    - Superseded
    - [[RFC title]](rfcs/template.md)

</details>

<!-- Document content (editable) -->

## About Spectrum Web Components

Spectrum Web Components (SWC) is a library of web components that implements Adobe's Spectrum design system.

While SWC is used primarily by Adobe product teams, it is open-sourced and available for general use.

SWC is developed by a core team in Adobe Design Engineering, but we welcome contributions from inside and outside Adobe.

## About the 1st-gen-to-2nd-gen transition

Spectrum Web Components is currently in transition from its first generation (1st-gen) to its second generation (2nd-gen).

- To understand how this transition affects the SWC code base, see [Repository Structure](./for-contributors/working-in-the-swc-repo.md#repository-structure).
- To understand the motivation for this transition, see [Objectives and Strategy](./project-planning/01_objectives-and-strategy.md).

## About these docs

These docs contain essential information about the SWC project for both maintainers (members of the core team) and contributors from outside the core team.

The docs are organized into sections to help you find the information you need:

**[Get started](./for-consumers/get-started.md)** - Quick-start guide for people new to SWC. Start here if you're a consumer installing SWC in your application; the same content renders interactively under **Get started** in Storybook.

**[Contributor Guides](./for-contributors/README.md)** - Topical guides for working on the project. This section includes guides for getting started, understanding processes, and accomplishing specific tasks like adding new components or editing these contributor docs themselves. When you change doc structure or headings, see [Authoring contributor docs](./for-contributors/authoring-contributor-docs/README.md) to regenerate navigation and verify links.

**[Style Guide](./for-contributors/style-guide/README.md)** - Comprehensive style guide covering project-wide conventions and area-specific rules. This section is useful for human reference and for AI-assisted work, documenting our approaches to linting, JSDoc conventions, component structure, and other coding standards.

**[Accessibility testing](./for-contributors/accessibility-testing.md)** - Automated accessibility testing, snapshots, and manual testing expectations for pull requests.

**[Project Planning](./project-planning/README.md)** - Strategic planning documentation including objectives, workstreams, component roadmaps, and milestones. This section contains:

- **[Objectives and Strategy](./project-planning/01_objectives-and-strategy.md)** - Strategic context for the 1st-gen-to-2nd-gen transition, including our goals and approach.

- **[Workstreams](./project-planning/02_workstreams/README.md)** - Workstream-centric view of cross-cutting work affecting many or all components, helping us work toward specific objectives and coordinate efforts.

- **[Components](./project-planning/03_components/README.md)** - Component-centric view of individual components and how they're affected by multiple workstreams, useful for understanding each component's roadmap and status.

- **[Milestones](./project-planning/04_milestones/README.md)** - Information about project milestones and their goals.

Together, the Workstreams and Components views help us manage the project roadmap, ensuring we make progress on strategic objectives while maintaining clarity about the state and evolution of individual components.
