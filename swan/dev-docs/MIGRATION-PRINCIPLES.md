# Migration Principles and Best Practices

## Core Migration Principles

1. **Single Source of Truth**

    - Maintain definitive implementations in Swan only
    - Consolidate type definitions in a central location (`swan/src/types/global.d.ts`)
    - Avoid duplication of logic between SWC and Swan

2. **Backward Compatibility**

    - Create well-documented shim files in SWC that import from Swan
    - Preserve version information and public APIs
    - Ensure all tests continue to pass after migration

3. **Clear Documentation**

    - Add prominent warning notices in legacy files
    - Direct developers to the authoritative source in Swan
    - Document migration patterns for future reference

4. **Type Safety**
    - Configure TypeScript properly in both projects
    - Ensure types are properly shared and accessible
    - Maintain strict type checking throughout migration

## Migration Process

1. **Analysis Phase**

    - Identify dependencies and import relationships
    - Map out usage patterns across the codebase
    - Determine proper sequence for migration

2. **Implementation Phase**

    - Move core implementation to Swan first
    - Create backward-compatible shims in SWC
    - Update imports in Swan to reference local versions

3. **Verification Phase**
    - Run comprehensive tests to verify functionality
    - Check for regressions in dependent components
    - Validate type correctness across the system

## Shim Pattern

```typescript
/**
 * ⚠️ IMPORTANT: SOURCE OF TRUTH MOVED ⚠️
 *
 * The authoritative implementation is now in:
 * swan/src/[path/to/file]
 *
 * This file is maintained for backward compatibility ONLY.
 * DO NOT modify this file directly; instead make changes in Swan.
 */

// Import from Swan using package path
export * from '@spectrum-web-components/swan/src/[path/to/file].js';

// Preserve version information if needed
export const version = '[original-version]';
```

## Type Definition Pattern

```typescript
/**
 * ⚠️ IMPORTANT: SOURCE OF TRUTH MOVED ⚠️
 *
 * The authoritative source for these type definitions is now in:
 * swan/src/types/global.d.ts
 *
 * This file is maintained for backward compatibility ONLY.
 * DO NOT modify these types directly; instead make changes in Swan.
 */

// Copy of definitions from swan/src/types/global.d.ts
// [Type definitions copied from Swan]
```

## Project Configuration

### TypeScript Configuration

When migrating files from SWC to Swan, update the TypeScript configuration:

1. **Add a Reference to Swan in the Original Package**

    ```json
    {
        "references": [{ "path": "../../swan" }]
    }
    ```

    This reference is required in the tsconfig.json of the original package to enable TypeScript to resolve cross-project imports correctly.

2. **Use Package Paths in Import Statements**

    - In SWC shim files, use package paths rather than relative paths:

    ```typescript
    // Use this
    import { Component } from '@spectrum-web-components/swan/src/path/to/file.js';

    // Not this
    import { Component } from '../../../swan/src/path/to/file.js';
    ```

### Package.json Configuration

1. **Update Swan's Exports Map**

    - For each migrated file, add an entry to Swan's package.json exports:

    ```json
    "./src/[path/to/file].js": {
        "types": "./dist/[path/to/file].d.ts",
        "development": "./dist/[path/to/file].dev.js",
        "default": "./dist/[path/to/file].js"
    }
    ```

    - The structure of this export entry is critical to ensure TypeScript resolution works properly
    - Pay special attention to the paths - they must match exactly where the files are generated in the build process

2. **Build Process Considerations**

    - Always build Swan first, then build SWC
    - Swan's build process must generate declaration files (.d.ts) for all migrated files
    - Check that Swan's post-build scripts properly handle the directory structure where your files are located
    - If TypeScript declaration files aren't being generated properly, you may need to update Swan's build scripts
    - Remember that declaration files must be copied to the correct location for TypeScript to find them

3. **Handling Library Dependencies**
    - Migrating utility files (like directives or streaming-listener) may require updating multiple parts of the build chain
    - Components that depend on migrated utilities will need to update their imports
    - Watch for errors in components that consume the migrated utilities

## Practical Considerations

1. **Migration Order**

    - Start with foundational utilities and base classes
    - Progress to more specific components
    - Complete one logical unit before moving to the next

2. **Import Management**

    - Update relative imports carefully
    - Maintain proper paths between projects
    - Consider using path aliases for cleaner imports

3. **Testing Strategy**

    - Run targeted tests for modified components
    - Verify integration with dependent components
    - Ensure cross-browser compatibility

4. **Troubleshooting Build Issues**

    - If you encounter TypeScript errors about missing declaration files:
        - Check that the paths in Swan's package.json export entries are correct
        - Ensure Swan's build process generates declaration files for your migrated file
        - Verify that declaration files are being copied to the correct location
    - If you encounter TypeScript errors about paths or imports:
        - Check the `references` section in tsconfig.json
        - Ensure all import paths include the correct `.js` extension
        - Verify that the paths match the structure in the exports map
