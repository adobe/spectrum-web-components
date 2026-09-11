<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project planning](../../../README.md) / [Workstreams](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Understand the gen1 component structure

<!-- Document title (editable) -->

# Understand the gen1 component structure

<!-- Document content (editable) -->

> **Context:** This step is about understanding the gen1 component before building the 2nd-gen version. You do **not** need to refactor gen1 — it remains self-contained.

When studying the gen1 implementation, identify:

- The **rendering logic** — `render()` method, helper render methods, Lit directives used
- The **behavior logic** — properties, validation, lifecycle hooks, event handling
- The **styles** — CSS imports, constructable stylesheets
- The **mixins and controllers** — what shared utilities it depends on

This understanding helps you decide what goes in the 2nd-gen **base class** (behavior) vs the **concrete class** (rendering and styles). See [Step 3: Create base class in 2nd-gen core](03_move-base-class-to-2nd-gen-core.md).
