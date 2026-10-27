<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project planning](../../../README.md) / [Workstreams](../../README.md) / [gen2 Component Migration](../README.md) / Step By Step / Create base class in gen2 core

<!-- Document title (editable) -->

# Create base class in gen2 core

<!-- Document content (editable) -->

> **Note:** 1st-gen and gen2 are independent — there is no runtime dependency between them. The base class is created in core for gen2 use only. 1st-gen retains its own implementation.

- Create a directory for the component under `core/components`
- Create `[Component].base.ts` using the 1st-gen implementation as a reference
- Apply incremental improvements where justified (bugs, accessibility, feature gaps) — avoid speculative rewrites
- Add `[Component].types.ts` for shared constants and types
- Add `index.ts` barrel file
- Confirm the base class compiles and is exported correctly from core
