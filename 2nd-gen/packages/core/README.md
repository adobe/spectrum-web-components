# @spectrum-web-components/core

Abstract base classes for Spectrum Web Components.

This package provides shared functionality between multiple generations of implementations and is **not intended for direct external use**.

For more information, visit the [Spectrum Web Components repository](https://github.com/adobe/spectrum-web-components).

## Folder structure

The core package is private/internal, so we can organize foundational code for discoverability and incremental migration.

```
core/
  base/         # Core base classes and element registration helpers
  mixins/       # Reusable mixins that extend base classes
  controllers/  # Reactive controllers (Lit controllers, observers, etc.)
  utils/        # Utility functions (DOM, slots, platform helpers, etc.)
  types/        # Shared types and interfaces
  components/   # Component base classes (already established)
  shared/       # Legacy compatibility layer (existing exports during migration)
```

### Naming

All new folders and files in `/core` should be kebab-case.

### Imports

Prefer the new top-level paths for new code:

- `@spectrum-web-components/core/base`
- `@spectrum-web-components/core/mixins`
- `@spectrum-web-components/core/controllers`
- `@spectrum-web-components/core/utils`
- `@spectrum-web-components/core/types`

The existing `shared/` paths remain as a compatibility layer during migration and will be deprecated once the move is complete.

### Migration notes

See `MIGRATION.md` for a living map of 1st‑gen utilities/controllers/mixins and their target locations in this structure.
