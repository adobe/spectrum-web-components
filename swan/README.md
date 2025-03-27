# Swan Package

Base component implementations for Spectrum Web Components.

## Usage

Swan is designed for modern ESM with explicit file paths. Each component is exported individually from its own path:

```js
import { AccordionBase } from '@spectrum-web-components/swan/accordion/AccordionBase.js';
import { AccordionItemBase } from '@spectrum-web-components/swan/accordion/AccordionItemBase.js';
import { ProgressBarBase } from '@spectrum-web-components/swan/progress-bar/ProgressBarBase.js';
```

## Implementation Details

The Swan package follows modern ESM best practices:

1. Each component is exported individually from its own file
2. All imports use explicit `.js` extensions
3. No barrel files or global exports
4. Direct dependency paths for better tree-shaking

This design provides:

-   Optimized bundling with clear dependency boundaries
-   Better tree-shaking opportunities
-   Explicit import paths for clarity
-   Forward-compatible with modern JS tooling

## TypeScript Notes

When working with Swan in a TypeScript project, you might need specific configuration to handle the explicit `.js` extensions in import paths.

### For Development in This Repository

The root `tsconfig.json` includes path mappings to help TypeScript locate the Swan components during development:

```json
"paths": {
  "@spectrum-web-components/swan/accordion/AccordionBase.js": ["../swan/src/components/accordion/AccordionBase.ts"],
  "@spectrum-web-components/swan/accordion/AccordionItemBase.js": ["../swan/src/components/accordion/AccordionItemBase.ts"],
  "@spectrum-web-components/swan/progress-bar/ProgressBarBase.js": ["../swan/src/components/progress-bar/ProgressBarBase.ts"]
}
```

Also, any package that imports from Swan should include a reference to the Swan package in its `tsconfig.json`:

```json
"references": [
  { "path": "../../swan" }
]
```

### For Projects Using Swan

If you're using Swan in your own project, consider updating your TypeScript configuration to better handle imports with `.js` extensions:

```json
// tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node16" // or "nodeNext" or "bundler"
    }
}
```

## Development

To build the package:

```
npm run build
```

To watch for changes during development:

```
npm run build:watch
```
