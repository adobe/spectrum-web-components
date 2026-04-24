<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Contributor guides](../../README.md) / [Style guide](../README.md) / 2nd-gen TypeScript

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

- [Base class vs concrete class](base-vs-concrete.md)
- [Class structure](class-structure.md)
- [Component types](component-types.md)
- [Composition patterns](composition-patterns.md)
- [Controller composition](controller-composition.md)
- [Debug and validation](debug-validation.md)
- [Directive composition](directive-composition.md)
- [File organization](file-organization.md)
- [Interface composition](interface-composition.md)
- [JSDoc standards](jsdoc-standards.md)
- [Lit decorators and modifiers](lit-decorators.md)
- [Method patterns](method-patterns.md)
- [Mixin composition](mixin-composition.md)
- [Naming conventions](naming-conventions.md)
- [Property patterns](property-patterns.md)
- [Rendering patterns](rendering-patterns.md)
- [TypeScript modifier keywords](typescript-modifiers.md)

</details>

<!-- Document content (editable) -->

This section covers the TypeScript coding conventions for **2nd-gen** component development. These guides explain how to organize files, structure classes, use decorators, write JSDoc, define types, and compose behavior using mixins, controllers, directives, and interfaces.

The guides are written for both human contributors and AI agents. They use simple language, clear examples, and consistent formatting so anyone can follow them.

> **Reference implementation:** The [Badge](../../../../2nd-gen/packages/core/components/badge/Badge.base.ts) component is the primary example throughout these guides. Other 2nd-gen components (Status Light, Progress Circle, Divider, Asset) are used where they show different patterns.

## Guides

- **[File organization](file-organization.md)** — Copyright headers, import grouping and order, export patterns, and where types files live.
- **[Class structure](class-structure.md)** — Base vs concrete class layout, section comments, and how to order properties and methods within sections.
- **[TypeScript modifier keywords](typescript-modifiers.md)** — When and how to use `static`, `override`, `public`, `protected`, and `private`.
- **[Lit decorators and modifiers](lit-decorators.md)** — `@property`, `@state`, `@query`, `@queryAssignedNodes`, `@eventOptions`, and other Lit decorators.
- **[Property patterns](property-patterns.md)** — Property ordering, reactive property decorators, and when to use custom getters/setters vs Lit defaults.
- **[Method patterns](method-patterns.md)** — Method ordering, lifecycle method names, event handler naming, ARIA role assignment, and the `override` keyword.
- **[JSDoc standards](jsdoc-standards.md)** — When JSDoc is required, what to include, and how to use tags like `@internal`, `@attribute`, `@slot`, `@element`, and `@example`.
- **[Component types](component-types.md)** — Patterns for `*.types.ts` files: constant arrays, type derivation, S1/S2 split, naming, and removal strategy.
- **[Rendering patterns](rendering-patterns.md)** — Helper functions, inline SVG, size transformations, and classMap patterns.
- **[Naming conventions](naming-conventions.md)** — Rules for class names, property names, method names, type names, constant names, CSS class names, and file names.
- **[Base class vs concrete class](base-vs-concrete.md)** — What belongs in core (base) vs SWC (concrete) and how to decide.
- **[Composition patterns](composition-patterns.md)** — When to use a mixin, controller, directive, or interface, and how to choose.
- **[Mixin composition](mixin-composition.md)** — How to compose mixins: order, options, depth limits, and patterns.
- **[Controller composition](controller-composition.md)** — How to create and attach Lit controllers to host components.
- **[Directive composition](directive-composition.md)** — How to use built-in Lit directives and author custom ones.
- **[Interface composition](interface-composition.md)** — When to use `interface` vs `type`, and how to define and consume interfaces.
- **[Debug and validation](debug-validation.md)** — Debug-mode validation, warning patterns, and the `window.__swc` API.

## External references

- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [Lit documentation](https://lit.dev/docs/)
- [Lit — Reactive properties](https://lit.dev/docs/components/properties/)
- [Lit — Decorators](https://lit.dev/docs/components/decorators/)
- [Lit — Controllers](https://lit.dev/docs/composition/controllers/)
- [Lit — Directives](https://lit.dev/docs/templates/directives/)
- [JSDoc reference](https://jsdoc.app/)
