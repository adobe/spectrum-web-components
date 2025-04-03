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

2. **Path Mappings in Root tsconfig.json**

    - When adding new module categories to Swan (e.g., `base`, `shared`, `reactive-controllers`), you must update the path mappings in the root tsconfig.json:

    ```json
    "paths": {
        "@spectrum-web-components/swan/base/*": ["../swan/src/base/*"],
        "@spectrum-web-components/swan/shared/*": ["../swan/src/shared/*"],
        "@spectrum-web-components/swan/reactive-controllers/*": ["../swan/src/reactive-controllers/*"],
        "@spectrum-web-components/swan/*": ["../swan/src/components/*"]
    }
    ```

    - Always add more specific paths before more general ones
    - The catch-all path (`@spectrum-web-components/swan/*`) should always be last
    - Without these mappings, TypeScript won't be able to resolve imports from SWC to Swan

3. **Use Package Paths in Import Statements**

    - In SWC shim files, use package paths rather than relative paths:

    ```typescript
    // Use this
    import { Component } from '@spectrum-web-components/swan/[path/to/file].js';

    // Not this
    import { Component } from '../../../swan/src/path/to/file.js';
    ```

### Package.json Configuration

1. **Update Swan's Exports Map**

    - For each migrated file, add an entry to Swan's package.json exports:

    ```json
    "./[path/to/file].js": {
        "types": "./dist/[path/to/file].d.ts",
        "development": "./dist/[path/to/file].dev.js",
        "default": "./dist/[path/to/file].js"
    }
    ```

    - Keep [path/to/file] short and logical. In particular:
        - Don't include 'src' in the path
        - Don't include 'components' in the path
    - The structure of this export entry is critical to ensure TypeScript resolution works properly
    - Pay special attention to the paths - they must match exactly where the files are generated in the build process
    - Failing to add the exports entry will cause resolution errors during testing and runtime
    - Always rebuild Swan and SWC after modifying the exports configuration
    - Test the exports configuration by running tests on components that depend on the migrated file

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
    - If you see "Could not resolve import" errors during testing:
        - Verify the export path in Swan's package.json matches exactly what's being imported
        - Check that both development and production builds include the correct export paths
        - Rebuild both Swan and SWC to ensure all generated files are up-to-date
        - Try running tests on a specific component that uses the migrated file to isolate the issue

## Import Path Transition Plan

As part of improving the Swan package structure, we're moving toward shorter, cleaner import paths by removing the `/src` segment from import paths. The package now supports both formats for backward compatibility:

```typescript
// Original import format (with /src) - STILL SUPPORTED
import { Component } from '@spectrum-web-components/swan/src/path/to/file.js';

// New import format (without /src) - PREFERRED
import { Component } from '@spectrum-web-components/swan/path/to/file.js';
```

The package.json exports configuration supports both formats to ensure a smooth transition. New code should use the shorter paths without `/src`, while existing code will continue to work with the current paths. Future updates will eventually deprecate the longer `/src` paths.

## File Structure Conventions

1. **No Barrel Files**

    - Swan does not use barrel files (index.ts) for re-exporting modules
    - Each utility or component should be imported directly from its own file
    - Example:

    ```typescript
    // DO NOT use barrel imports like this:
    import {
        firstFocusableIn,
        getFocusableElements,
    } from '@spectrum-web-components/swan/shared';

    // Instead, import directly from specific files:
    import { firstFocusableIn } from '@spectrum-web-components/swan/shared/first-focusable-in.js';
    import { getFocusableElements } from '@spectrum-web-components/swan/shared/focusable.js';
    ```

2. **Use Package Paths in Import Statements**

## Dependency Management

1. **Version Consistency**

    - Swan must use the same version ranges for shared dependencies as the main SWC project
    - This is especially important for core libraries like Lit
    - Example for Lit dependency in Swan's package.json:

    ```json
    "dependencies": {
        "lit": "^2.5.0 || ^3.1.3"  // Match the version range used in SWC
    }
    ```

    - This prevents TypeScript errors due to multiple versions of the same library being used
    - Always check with `yarn why <package-name>` before adding a dependency to Swan

2. **Workspace Dependencies**

    - Use workspace references when depending on other SWC packages
    - Example:

    ```json
    "dependencies": {
        "@spectrum-web-components/base": "workspace:*"
    }
    ```

    - This ensures Swan uses the local version of the package rather than a published version
