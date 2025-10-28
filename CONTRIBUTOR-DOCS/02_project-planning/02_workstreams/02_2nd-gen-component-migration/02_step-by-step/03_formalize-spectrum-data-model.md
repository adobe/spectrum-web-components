<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project Planning](../../../README.md) / [Workstreams](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Formalize Spectrum data model

<!-- Document title (editable) -->

# Formalize Spectrum data model

<!-- Document content (editable) -->

- Create a `[Component].types.ts` file in the `core/components/[component]` directory
- Define shared constants (e.g., semantic variants, size values)
- Define S1-specific constants and type unions
- Define S2-specific constants and type unions
- Define the union type that combines S1 and S2 values
- Export all types and constants from the types file
- Update the base class to:
    - Import the union types
    - Create section headers for API TO OVERRIDE, SHARED API, and IMPLEMENTATION
    - Declare abstract static properties for generation-specific arrays (e.g., `VARIANTS_COLOR`, `STATIC_COLORS`)
    - Declare properties with union types that need narrowing in concrete implementations
    - Move shared static properties and standard API properties to SHARED API section
    - Move helper methods and lifecycle methods to IMPLEMENTATION section
