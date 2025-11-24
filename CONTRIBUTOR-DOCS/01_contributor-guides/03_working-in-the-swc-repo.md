<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Working in the SWC repo

<!-- Document title (editable) -->

# Working in the SWC repo

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About this guide](#about-this-guide)
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Repository structure](#repository-structure)
- [Development workflow](#development-workflow)
    - [Developing](#developing)
    - [Testing](#testing)
    - [Linting](#linting)
    - [Building](#building)
- [Command reference](#command-reference)

</details>

<!-- Document content (editable) -->

## About this guide

This guide covers the essential information you need to work effectively in the Spectrum Web Components (SWC) repository.

## Getting started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.10.0 or higher (check with `node --version`)
- **Yarn**: Version 4.6.0 or higher (check with `yarn --version`)
- **Git**: For version control (check with `git --version`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adobe/spectrum-web-components.git
```

2. Install dependencies:

```bash
cd spectrum-web-components
yarn install
```

## Repository structure

SWC is currently in transition from its first generation (**1st-gen**) to its second generation (**2nd-gen**).

> This transition is motivated by some important strategic goals. For more information, see [Objectives and Strategy](../03_project-planning/01_objectives-and-strategy.md).

Instead of creating a separate branch or repo for 2nd-gen, we are working on the 1st-gen and 2nd-gen projects side-by-side in this repository, with some core functionality being shared between 1st- and 2nd-gen components. This strategy makes it easier for us to continue actively improving and supporting 1st-gen even as we devote much of our attention to defining and building 2nd-gen.

Reflecting the side-by-side strategy, the repository is organized into two top-level workspaces:

- **`1st-gen/`** contains all of the 1st-gen packages, tooling, and supporting materials.

    Most of what lives here will be left behind in the transition to 2nd-gen; the core component functionality we'll carry forward is gradually being moved into the `2nd-gen` workspace.

    While we'll continue doing work in `1st-gen` as needed to accomplish our goals, we expect this work to decrease steadily toward none.

- **`2nd-gen/`** is a new workspace that we're building from the ground up to serve as a clean foundation for our future work. It includes:
    - A Core library (`packages/core/`), which contains the functionality shared between 1st- and 2nd-gen

    - The 2nd-gen SWC library (`packages/swc/`).

During this transition, depending on what you're trying to accomplish, you may end up working in `[1st-gen](/1st-gen/README.md)`, `[2nd-gen](/2nd-gen/README.md)`, or both. If you have any questions, [please ask](./01_getting-involved.md#community--support)—we're happy to help.

## Development workflow

The project's top-level `package.json` file defines [several commands](#command-reference) that can be run from the repository root, covering the most important parts of the development workflow.

> By default, each command is run in both the 1st-gen and 2nd-gen workspaces, but you can add a `:1st-gen` or `:2nd-gen` suffix to any command to run it for only one workspace.

### Developing

We use Storybook to interact with and test components as we develop them, as well as to document components and demonstrate usage patterns for our customers. There are separate Storybooks for 1st- and 2nd-gen.

**To start Storybook:**

```bash
yarn start
```

This command launches Storybook for both 1st- and 2nd-gen and opens a browser tab for each.

### Testing

**To run all tests:**

```bash
yarn test
```

### Linting

The linter runs before each commit, but you can also run it manually.

**To check for linting issues:**

```bash
yarn lint
```

### Building

You should rarely need to trigger build explicitly, but you can do so as necessary.

**To build all packages:**

```bash
yarn build
```

## Command reference

Here are the most frequently used commands available from the repository root:

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `yarn start`           | Start Storybook for both 1st-gen and 2nd-gen |
| `yarn start:1st-gen`   | Start Storybook for 1st-gen only             |
| `yarn start:2nd-gen`   | Start Storybook for 2nd-gen only             |
| `yarn test`            | Run tests for both 1st-gen and 2nd-gen       |
| `yarn test:1st-gen`    | Run tests for 1st-gen only                   |
| `yarn test:2nd-gen`    | Run tests for 2nd-gen only                   |
| `yarn test:a11y`       | Run accessibility tests (both generations)   |
| `yarn test:a11y:1st`   | Run accessibility tests for 1st-gen only     |
| `yarn test:a11y:2nd`   | Run accessibility tests for 2nd-gen only     |
| `yarn test:a11y:ui`    | Interactive accessibility test UI            |
| `yarn lint`            | Check for linting issues (staged files)      |
| `yarn lint:1st-gen`    | Check for linting issues in 1st-gen only     |
| `yarn lint:2nd-gen`    | Check for linting issues in 2nd-gen only     |
| `yarn build`           | Build all packages (2nd-gen then 1st-gen)    |
| `yarn build:1st-gen`   | Build 1st-gen packages only                  |
| `yarn build:2nd-gen`   | Build 2nd-gen packages only                  |

For more specific workflows and advanced topics, refer to the other contributor guides, especially [Accessibility testing](./09_accessibility-testing.md) for detailed information about writing and running accessibility tests.
