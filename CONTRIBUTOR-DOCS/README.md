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

- [For consumers](for-consumers/README.md)
    - [Using the issue tracker](for-consumers/using-the-issue-tracker.md)
- [Contributor guides](for-contributors/README.md)
    - [Authoring contributor docs](for-contributors/authoring-contributor-docs/README.md)
    - [Focus management](for-contributors/focus-management.md)
    - [Getting involved](for-contributors/getting-involved.md)
    - [Maintaining StackBlitz examples for Spectrum Web Components](for-contributors/maintaining-stackblitz-examples.md)
    - [Making a pull request](for-contributors/making-a-pull-request.md)
    - [Patching dependencies](for-contributors/patching-dependencies.md)
    - [Participating in PR reviews](for-contributors/reviewing-pull-requests.md)
    - [Accessibility testing](for-contributors/running-accessibility-tests.md)
    - [Style guide](for-contributors/style-guide/README.md)
    - [Tools vs packages: where code lives](for-contributors/tools-vs-packages.md)
    - [Working in the SWC repo](for-contributors/working-in-the-swc-repo.md)
- For Maintainers
    - [Releasing SWC](for-maintainers/releasing-swc.md)
- [Project planning](project-planning/README.md)
    - [Objectives and strategy](project-planning/01_objectives-and-strategy.md)
    - [Workstreams](project-planning/02_workstreams/README.md)
    - [Components](project-planning/03_components/README.md)
    - [Milestones](project-planning/04_milestones/README.md)
    - Strategies

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

These docs contain essential information about the SWC project for everyone who interacts with it. Content is organized by **audience**: pick the folder that matches who you are right now, and you'll find what you need.

**For consumers** — `for-consumers/` — Application developers using SWC in a product. Start here if you need to install the library, configure customization, or file a bug.

- [Using the issue tracker](./for-consumers/using-the-issue-tracker.md) — How to file bugs and request features.

**For contributors** — `for-contributors/` — Anyone contributing code, tests, or docs to the SWC repo. Start here if you're opening a PR, writing a component, or editing these docs.

- See [`for-contributors/README.md`](./for-contributors/README.md) for the full list of contributor guides.
- The [Style guide](./for-contributors/style-guide/README.md) sub-tree covers project-wide CSS, TypeScript, and testing standards used during code review.
- The [Authoring contributor docs](./for-contributors/authoring-contributor-docs/README.md) sub-tree covers how to write *these* docs — including the nav script you must run when you change doc structure or headings.

**For maintainers** — `for-maintainers/` — Members of the core team performing maintainer-only operations.

- [Releasing SWC](./for-maintainers/releasing-swc.md) — Release process, approval steps, and troubleshooting.

**Project planning** — `project-planning/` — Strategic context for the 1st-gen-to-2nd-gen transition. Cross-audience; primarily used by maintainers and contributors coordinating cross-cutting work.

- [Objectives and strategy](./project-planning/01_objectives-and-strategy.md) — Why the transition exists and what it's trying to achieve.
- [Workstreams](./project-planning/02_workstreams/README.md) — Workstream-centric view of cross-cutting work in flight.
- [Components](./project-planning/03_components/README.md) — Per-component migration analyses and plans.
- [Milestones](./project-planning/04_milestones/README.md) — Project milestones and their goals.
- [Strategies](./project-planning/05_strategies/audience-based-docs-reorganization-plan.md) — RFCs and strategic plans (e.g. focus management, docs reorganization).
