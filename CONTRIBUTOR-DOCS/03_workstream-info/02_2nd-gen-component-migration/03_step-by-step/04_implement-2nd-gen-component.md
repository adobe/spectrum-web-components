<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Workstream Info](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Implement 2nd-gen component

<!-- Document title (editable) -->

# Implement 2nd-gen component

<!-- Document content (editable) -->

- Create directory structure: `second-gen/packages/swc/components/[component]/`
- Create `[Component].ts` file extending from `[Component]Base`
- Add section headers: API OVERRIDES, API ADDITIONS (if needed), RENDERING & STYLING
- In API OVERRIDES section:
    - Override abstract static properties with S2-specific values
    - Override properties that need type narrowing with S2-specific types
- In API ADDITIONS section (if applicable):
    - Add any S2-only properties (e.g., `subtle`, `outline` for Badge)
- In RENDERING & STYLING section:
    - Add static `styles` getter returning the S2 stylesheet
    - Implement the `render()` method with S2 rendering logic
- Import and export S2-specific types and constants
- Create the S2 stylesheet (`[component].css`)
