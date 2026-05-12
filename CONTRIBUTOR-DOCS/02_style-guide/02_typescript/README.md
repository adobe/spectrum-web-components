<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / 2nd-gen TypeScript

<!-- Document title (editable) -->

# 2nd-gen TypeScript

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Guides](#guides)
- [External references](#external-references)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [File organization](01_file-organization.md)
- [Class structure](02_class-structure.md)
- [TypeScript modifier keywords](03_typescript-modifiers.md)
- [Lit decorators and modifiers](04_lit-decorators.md)
- [Property patterns](05_property-patterns.md)
- [Method patterns](06_method-patterns.md)
- [JSDoc standards](07_jsdoc-standards.md)
- [Component types](08_component-types.md)
- [Rendering patterns](09_rendering-patterns.md)
- [Naming conventions](10_naming-conventions.md)
- [Base class vs concrete class](11_base-vs-concrete.md)
- [Composition patterns](12_composition-patterns.md)
- [Mixin composition](13_mixin-composition.md)
- [Controller composition](14_controller-composition.md)
- [Directive composition](15_directive-composition.md)
- [Interface composition](16_interface-composition.md)
- [Debug and validation](17_debug-validation.md)

</details>

<!-- Document content (editable) -->

This section covers the TypeScript coding conventions for **2nd-gen** component development. These guides explain how to organize files, structure classes, use decorators, write JSDoc, define types, and compose behavior using mixins, controllers, directives, and interfaces.

The guides are written for both human contributors and AI agents. They use simple language, clear examples, and consistent formatting so anyone can follow them.

> **Reference implementation:** The [Badge](../../../2nd-gen/packages/core/components/badge/Badge.base.ts) component is the primary example throughout these guides. Other 2nd-gen components (Status Light, Progress Circle, Divider, Asset) are used where they show different patterns.

## Guides

- **[File organization](01_file-organization.md)** — Copyright headers, import grouping and order, export patterns, and where types files live.
- **[Class structure](02_class-structure.md)** — Base vs concrete class layout, section comments, and how to order properties and methods within sections.
- **[TypeScript modifier keywords](03_typescript-modifiers.md)** — When and how to use `static`, `override`, `public`, `protected`, and `private`.
- **[Lit decorators and modifiers](04_lit-decorators.md)** — `@property`, `@state`, `@query`, `@queryAssignedNodes`, `@eventOptions`, and other Lit decorators.
- **[Property patterns](05_property-patterns.md)** — Property ordering, reactive property decorators, and when to use custom getters/setters vs Lit defaults.
- **[Method patterns](06_method-patterns.md)** — Method ordering, lifecycle method names, event handler naming, ARIA role assignment, and the `override` keyword.
- **[JSDoc standards](07_jsdoc-standards.md)** — When JSDoc is required, what to include, and how to use tags like `@internal`, `@attribute`, `@slot`, `@element`, and `@example`.
- **[Component types](08_component-types.md)** — Patterns for `*.types.ts` files: constant arrays, type derivation, S1/S2 split, naming, and removal strategy.
- **[Rendering patterns](09_rendering-patterns.md)** — Helper functions, inline SVG, size transformations, and classMap patterns.
- **[Naming conventions](10_naming-conventions.md)** — Rules for class names, property names, method names, type names, constant names, CSS class names, and file names.
- **[Base class vs concrete class](11_base-vs-concrete.md)** — What belongs in core (base) vs SWC (concrete) and how to decide.
- **[Composition patterns](12_composition-patterns.md)** — When to use a mixin, controller, directive, or interface, and how to choose.
- **[Mixin composition](13_mixin-composition.md)** — How to compose mixins: order, options, depth limits, and patterns.
- **[Controller composition](14_controller-composition.md)** — How to create and attach Lit controllers to host components.
- **[Directive composition](15_directive-composition.md)** — How to use built-in Lit directives and author custom ones.
- **[Interface composition](16_interface-composition.md)** — When to use `interface` vs `type`, and how to define and consume interfaces.
- **[Debug and validation](17_debug-validation.md)** — Debug-mode validation, warning patterns, and the `window.__swc` API.

## External references

- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [Lit documentation](https://lit.dev/docs/)
- [Lit — Reactive properties](https://lit.dev/docs/components/properties/)
- [Lit — Decorators](https://lit.dev/docs/components/decorators/)
- [Lit — Controllers](https://lit.dev/docs/composition/controllers/)
- [Lit — Directives](https://lit.dev/docs/templates/directives/)
- [JSDoc reference](https://jsdoc.app/)
