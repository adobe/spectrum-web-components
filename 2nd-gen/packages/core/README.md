# @spectrum-web-components/core

Abstract base classes for Spectrum Web Components.

This package provides shared functionality between multiple generations of implementations and is **not intended for direct external use**.

For more information, visit the [Spectrum Web Components repository](https://github.com/adobe/spectrum-web-components).

## Folder structure

The core package is private/internal, so we can organize foundational code for discoverability and incremental migration.

```
core/
  element/      # SpectrumElement, defineElement, and element infrastructure
  mixins/       # Reusable mixins that extend base classes
  controllers/  # Reactive controllers (Lit controllers, observers, etc.)
  utils/        # Utility functions (DOM, slots, platform helpers, etc.)
  types/        # Shared types and interfaces
  components/   # Component base classes (already established)
  shared/       # Current implementations (1st-gen re-exports from here)
```

### Naming

All new folders and files in `/core` should be kebab-case.

### Imports

Prefer the new top-level paths for new code:

- `@spectrum-web-components/core/element`
- `@spectrum-web-components/core/mixins`
- `@spectrum-web-components/core/controllers`
- `@spectrum-web-components/core/utils`
- `@spectrum-web-components/core/types`

The `shared/` directory contains current implementations that 1st-gen re-exports from. New code should use the top-level paths above.

### Migration notes

See `MIGRATION.md` for a living map of 1st‑gen utilities/controllers/mixins and their target locations in this structure.
