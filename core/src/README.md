# Spectrum Web Components - Core Package

This package contains the core base classes, controllers, mixins, and utilities that are used by both SWC 1.X and Swan components.

## Purpose

The core package serves as the common dependency layer in our architecture:

```
┌─────────────────┐    ┌─────────────────┐
│   SWC 1.X       │    │      Swan       │
│   Components    │    │   Components    │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
           ┌─────────▼───────┐
           │      Core       │
           │    Package      │
           └─────────────────┘
```

This design allows us to:

- Extract core component logic from SWC 1.X into reusable abstract base classes
- Share common utilities and controllers between SWC 1.X and Swan
- Maintain clean separation between rendering/styling (in concrete components) and behavior/logic (in shared bases)
- Support the transition strategy where customers can use SWC 1.X and Swan components together

## Structure

### `/src/base/`

Core base classes and mixins:

- `Base.ts` - Main SpectrumElement base class
- `sizedMixin.ts` - Mixin for size-aware components
- `decorators.ts` - Lit decorators
- `directives.ts` - Lit directives and utilities
- Other foundational classes

### `/src/utilities/`

Shared utilities used across components:

- `focusable.ts` - Focus management utilities
- `platform.ts` - Platform detection utilities
- `random-id.ts` - ID generation utilities
- Other utility functions

### `/src/reactive-controllers/`

Reactive controllers for common component behaviors:

- `FocusGroup.ts` - Keyboard navigation controller
- `MatchMedia.ts` - Media query controller
- `ColorController.ts` - Color management controller
- Other behavioral controllers

### `/src/types/`

Common type definitions used across the ecosystem.

## Usage

### Import Base Classes

```js
import { SpectrumElement } from '@spectrum-web-components/core/base/Base.js';
import { SizedMixin } from '@spectrum-web-components/core/base/sizedMixin.js';
```

### Import Utilities

```js
import { focusSelectorElements } from '@spectrum-web-components/core/utils/focusable.js';
import { randomID } from '@spectrum-web-components/core/utils/random-id.js';
```

### Import Controllers

```js
import { FocusGroupController } from '@spectrum-web-components/core/reactive-controllers/FocusGroup.js';
```

## Migration Strategy

This package is part of the larger Swan transition strategy:

1. **Phase 1** (Current): Extract shared functionality from SWC 1.X into this package
2. **Phase 2**: Update SWC 1.X components to depend on this package
3. **Phase 3**: Swan components use the same shared infrastructure
4. **Ongoing**: Continue extracting component base classes as needed

## Development

To build the package:

```bash
npm run build
```

To watch for changes during development:

```bash
npm run build:watch
```

## TypeScript Configuration

Projects using this package should include it as a TypeScript reference:

```json
{
    "references": [{ "path": "../path/to/core" }]
}
```
