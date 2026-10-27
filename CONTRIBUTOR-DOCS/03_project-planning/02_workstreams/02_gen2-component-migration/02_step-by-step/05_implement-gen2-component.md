<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project planning](../../../README.md) / [Workstreams](../../README.md) / [gen2 Component Migration](../README.md) / Step By Step / Add gen2 SWC component

<!-- Document title (editable) -->

# Add gen2 SWC component

<!-- Document content (editable) -->

- Create directory structure: `gen2/packages/swc/components/[component]/`
- Create `[Component].ts` file extending from `[Component]Base`
- Import S2-specific types and constants from `[Component].types.ts`
- Add section headers: API OVERRIDES, API ADDITIONS (if needed), RENDERING & STYLING
- In API OVERRIDES section:
    - Override abstract static properties with S2-specific values
    - Override properties that need type narrowing with S2-specific types
- In API ADDITIONS section (if applicable):
    - Add any S2-only properties (e.g., `subtle`, `outline` for Badge)
- Re-export any S1-specific types and constants as needed for backward compatibility, marking them as deprecated
