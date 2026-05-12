<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Composition patterns

<!-- Document title (editable) -->

# Composition patterns

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [When to use each pattern](#when-to-use-each-pattern)
    - [Mixin](#mixin)
    - [Controller](#controller)
    - [Directive](#directive)
    - [Interface](#interface)
- [Decision guide](#decision-guide)
- [Detailed guides](#detailed-guides)

</details>

<!-- Document content (editable) -->

This guide explains when to use each composition pattern in 2nd-gen. There are four ways to share behavior between components: **mixins**, **controllers**, **directives**, and **interfaces**.

## Overview

| Pattern | What it does | Adds to class hierarchy? | Example in 2nd-gen |
|---------|-------------|--------------------------|---------------------|
| **Mixin** | Adds properties, methods, and lifecycle to a class | Yes | `SizedMixin`, `ObserveSlotText`, `ObserveSlotPresence` |
| **Controller** | Attaches optional behavior to a host element | No | `LanguageResolutionController` |
| **Directive** | Encapsulates rendering logic used in templates | No | `classMap`, `when`, `ifDefined`, `styleMap` |
| **Interface** | Defines a structural contract (shape of an object) | No | `SizedElementInterface`, `SlotPresenceObservingInterface` |

## When to use each pattern

### Mixin

Use a mixin when the shared behavior needs to **become part of the class**. Mixins add properties, methods, and lifecycle callbacks directly to the component. They appear in the `extends` clause of the class declaration.

**Good for:**

- Properties that many components share (e.g. `size`)
- Lifecycle behavior that runs automatically (e.g. observing slot text changes)
- Behavior that subclasses may need to override

**Examples in 2nd-gen:**

- `SizedMixin` — adds a `size` property with validation and default values
- `ObserveSlotText` — observes slotted text content and sets `slotHasContent`
- `ObserveSlotPresence` — observes whether slotted elements are present

### Controller

Use a controller when the behavior is **optional and self-contained**. Controllers are attached to a host element but do not modify the class hierarchy. They have their own lifecycle that runs alongside the component.

**Good for:**

- Behavior that only some components need
- External service integration (e.g. language/locale resolution)
- Behavior that should not affect the class's type signature

**Examples in 2nd-gen:**

- `LanguageResolutionController` — resolves the component's language from `<html lang>`, browser settings, or a provider

### Directive

Use a directive when the shared logic is **template rendering logic**. Directives transform values in `html` templates. Lit provides many built-in directives; custom directives are possible but not currently used in 2nd-gen.

**Good for:**

- Conditional rendering (`when`)
- Dynamic class names (`classMap`)
- Dynamic styles (`styleMap`)
- Handling undefined attribute values (`ifDefined`)

**Examples in 2nd-gen (all built-in Lit directives):**

- `classMap` — builds a class string from an object
- `when` — conditionally renders content
- `ifDefined` — only sets an attribute if the value is defined
- `styleMap` — builds an inline style string from an object

### Interface

Use an interface when you need to define the **shape** of an object without adding behavior. Interfaces describe what properties and methods an object has, but they do not provide implementations.

**Good for:**

- Describing the public API added by a mixin
- Defining callback signatures and config objects
- Augmenting global types (e.g. `HTMLElementTagNameMap`)

**Examples in 2nd-gen:**

- `SizedElementInterface` — describes the public API of `SizedMixin`
- `SlotTextObservingInterface` — describes the public API of `ObserveSlotText`
- `SlotPresenceObservingInterface` — describes the public API of `ObserveSlotPresence`
- `HTMLElementTagNameMap` augmentation — declares custom element tag types

## Decision guide

**Mixin depth limit:**

Components should have a maximum mixin depth of 2. If more behavior is needed, use controllers instead of additional mixins. See [Mixin composition](13_mixin-composition.md#mixin-depth-limit) for the rationale.

Use this flowchart to choose the right pattern:

```text
Does the behavior add properties or lifecycle to the component?
├── Yes → Does every component using it need these properties?
│         ├── Yes → MIXIN
│         └── No  → CONTROLLER
└── No  → Is the behavior about rendering in a template?
          ├── Yes → DIRECTIVE
          └── No  → Is it about defining a structural contract?
                    ├── Yes → INTERFACE
                    └── No  → Probably a utility function (no pattern needed)
```

| Question | Answer |
|----------|--------|
| Many components need a `size` property | **Mixin** (`SizedMixin`) |
| One component needs locale-aware formatting | **Controller** (`LanguageResolutionController`) |
| A template needs conditional class names | **Directive** (`classMap`) |
| A mixin needs to describe its public API | **Interface** (`SizedElementInterface`) |

## Detailed guides

Each composition pattern has its own detailed guide:

- **[Mixin composition](13_mixin-composition.md)** — How to compose mixins, ordering, options, and patterns
- **[Controller composition](14_controller-composition.md)** — How to create and attach controllers
- **[Directive composition](15_directive-composition.md)** — How to use built-in directives and author custom ones
- **[Interface composition](16_interface-composition.md)** — When to use interfaces and how to define them
