<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Project Planning](README.md) / Objectives and Strategy

<!-- Document title (editable) -->

# Objectives and Strategy

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Current Objectives](#current-objectives)
    - [Unify Spectrum CSS & Spectrum Web Components](#unify-spectrum-css--spectrum-web-components)
    - [Build a clean foundation for future work](#build-a-clean-foundation-for-future-work)
    - [Enable Spectrum 2 adoption](#enable-spectrum-2-adoption)
    - [Improve accessibility](#improve-accessibility)
    - [Continually improve components](#continually-improve-components)
- [Strategy](#strategy)
    - [Disruptive vs. non-disruptive change](#disruptive-vs-non-disruptive-change)
    - [Side-by-side development of 1st-gen and 2nd-gen](#side-by-side-development-of-1st-gen-and-2nd-gen)

</details>

<!-- Document content (editable) -->

## Current Objectives

The SWC project is currently focused on a relatively small set of strategic objectives:

### Unify Spectrum CSS & Spectrum Web Components

Integrate the formerly separate Spectrum CSS and SWC projects, forming a unified project with a single code base, delivering a single product that is laser-focused on the needs of our target customers.

### Build a clean foundation for future work

Improve tooling, infrastructure, and cross-cutting product layers:

- Replace old, poorly supported tool chains and custom scripts with widely adopted, modern, turnkey solutions.

- Simplify and improve our style-loading, theming, and customization capabilities.

- Integrate and improve our documentation and Storybook.

- Reduce complexity wherever possible.

### Enable Spectrum 2 adoption

Enable our customers to ship Spectrum-2-based products, working toward a full-fidelity Spectrum 2 implementation while making the path to Spectrum 2 adoption as smooth as possible for customers.

This is a two-phase process:

- **Phase 1:** Deliver a stable, production-quality Spectrum 2 implementation within our 1st-gen product, offering foundational S2 fidelity via the `spectrum-two` theme while avoiding breaking API and layout changes.

    This phase is essentially complete, although some refinement of the `spectrum-two` theme continues.

- **Phase 2:** Deliver a full-fidelity Spectrum 2 implementation as part of our 2nd-gen product.

    This will entail some breaking changes, but to facilitate incremental migration on a view-by-view or component-by-component basis, it will be possible for customers to use 1st-gen and 2nd-gen SWC components together within a single project.

### Improve accessibility

Systematically improve accessibility by expanding documentation and examples, completing a comprehensive audit to address issues, and generally striving to maximize accessibility across all components.

### Continually improve components

Make improvements of all types and sizes to our components, including bug fixes, feature enhancements, improvements to API clarity and consistency, and major refactoring or replacement as needed.

## Strategy

From a value point of view, the objectives above are largely independent of one other. We want to keep them loosely coupled so that we can advance each according to its own priority, and so that work toward one objective doesn't needlessly block work toward another—for example, full-fidelity Spectrum 2 work shouldn't block accessibility work, and vice versa.

At a high level, our strategy for efficiently pursuing our objectives in parallel is to:

- Differentiate inherently disruptive changes from non-disruptive changes.

- Channel disruptive changes into 2nd-gen, where we can take the time to get them right and the care to minimize the disruption they actually cause.

- Work on 1st-gen and 2nd-gen side-by-side, so that non-disruptive changes can easily be shared between generations and delivered continually throughout the transition.

### Disruptive vs. non-disruptive change

Our first three objectives have aspects that are inherently disruptive, or have the potential to cause significant disruption—to the project, its customers, or both:

- **Unifying Spectrum CSS and SWC** involves consolidating our work from two projects and repositories into one and making significant changes to the shape of our product offerings.

- **Building a clean foundation for the future** entails making major changes to our workflows and tooling, the packages we ship, and cross-cutting product features like style-loading, theming and customization.

- **Landing full-fidelity Spectrum 2 in SWC** will necessitate some breaking changes stemming from the design itself—changes to design tokens, and to the features, APIs and layout footprints of certain components.

Meanwhile, most of the **accessibility improvements** and general **component improvements** we want to make aren't inherently disruptive—they can delivered in a continual stream of targeted, mostly non-breaking releases.

### Side-by-side development of 1st-gen and 2nd-gen

We have decided to work on 1st-gen and 2nd-gen side-by-side—in the same repository, but in separate workspaces. This gives us two important advantages: **isolation** and **colocation**.

**Isolation** of 1st-gen and 2nd-gen in separate workspaces lets us build 2nd-gen iteratively from the ground up, leaving behind as much structural and technical debt as possible, without needing to worry about breaking 1st-gen. Disruptive changes are confined to the `2nd-gen` workspace, while the 1st-gen project continues working essentially "as-is."

**Colocation** of 1st-gen and 2nd-gen in a single branch of the same repository makes it easy to share core component functionality between generations. Here's how this works:

- We locate core component implementations in the 2nd-gen Core library as **abstract, non-rendering classes**.

    These classes define **shared API** and implement **generation-agnostic behavior and logic**.

- In both 1st-gen and 2nd-gen SWC, we implement components as **concrete, rendering classes** that extend from the abstract classes in Core.

    These classes implement **generation-specific rendering and styling**, and **override API and behavior** as needed.

This architecture delivers two key benefits:

1. **Improvements we make in shared code immediately benefit 1st-gen SWC customers,** letting us deliver value on a continual basis throughout the transition.

2. **Sharing code will help make customers' eventual migration from 1st-gen to 2nd-gen as smooth as possible.** By design, it will be difficult to introduce unnecessary or unintentional API or functional differences between 1st- and 2nd-gen components.
