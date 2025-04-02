# Swan Build Process Design

This document outlines the build process for the Swan package, including key architectural decisions and implementation details.

## Overview

The Swan build system uses [esbuild](https://esbuild.github.io/) to produce both production and development builds of all components. The system processes TypeScript files from the `src/` directory and outputs JavaScript files to the `dist/` directory while preserving the directory structure.

## Build Artifacts

The build process produces two sets of artifacts:

1. **Production build**: Standard `.js` files that are minified with all debugging features disabled
2. **Development build**: `.dev.js` files that include additional developer warnings and debugging capabilities

## Key Build Features

### Component Discovery

The build system automatically discovers components by:

1. Scanning the `src/base` directory for base classes
2. Walking through the component directories in `src/components/{component-name}`
3. Identifying all `.ts` files (excluding `.d.ts` and `index.ts` files)

This approach allows for a clean separation of components and automatic inclusion of new components without manual configuration.

### Bundle Strategy

Each component file is bundled individually with the following characteristics:

-   Uses ES modules format (`format: 'esm'`)
-   Preserves sourcemaps for debugging
-   Externalizes all dependencies from `node_modules`
-   Maintains the same directory structure from `src/` to `dist/`

This approach ensures that consumers can tree-shake effectively and only load the components they need.

### Environment-Specific Builds

The build process defines environment-specific constants:

**Production Build**:

```javascript
{
  'process.env.NODE_ENV': '"production"',
  'window.__swc.DEBUG': 'false'
}
```

**Development Build**:

```javascript
{
  'process.env.NODE_ENV': '"development"',
  'window.__swc.DEBUG': 'true'
}
```

This approach enables warnings and developer tools in development builds while keeping production builds optimized.

## Extension Rewrite Plugin

A critical component of the build process is the extension rewrite plugin, which ensures consistent file extensions within builds.

### Purpose

The extension rewrite plugin addresses a specific issue: when building separate development and production files from the same source, relative imports should reference files from the same build type. For example:

-   A development build (`.dev.js`) should only import other development builds (`.dev.js`)
-   A production build (`.js`) should only import other production builds (`.js`)

Without this plugin, mixed imports can lead to inconsistent behavior, especially related to debug flags and warning systems.

### Implementation

The plugin works by:

1. Processing all JavaScript and TypeScript files during the build phase
2. Identifying relative imports and exports that reference files within the same package
3. Modifying the path to use the appropriate extension (`.js` or `.dev.js`)
4. Preserving external imports/exports and inter-package imports/exports

The plugin handles three types of module references:

-   Static imports: `import { Component } from './Component.js'`
-   Dynamic imports: `import('./Component.js')`
-   Re-exports: `export { Component } from './Component.js'`

For each reference type, the plugin uses a heuristic to determine if two files are in the same package by looking at their paths:

-   Files in the same component directory (e.g., both in `src/components/slider/`) are considered part of the same package
-   Files in the base directory (`src/base/`) are treated similarly

### Benefits

This approach ensures:

1. **Consistency**: All code within a build uses the same debug settings and configuration
2. **Isolation**: Development and production code don't accidentally mix
3. **Predictability**: Warnings and developer tools either all work or all don't work, avoiding mixed states
4. **Completeness**: Handles all module reference types, including re-exports, preventing any potential mixed modes

## Comparison with SWC Build Process

The main Spectrum Web Components (SWC) build process also addresses the issue of ensuring consistent file extensions in development and production builds, but uses a slightly different approach:

### SWC Approach

SWC uses a plugin called `makeDev` that employs regular expressions to transform import statements:

```javascript
const makeDev = {
    name: 'make-dev',
    setup(build) {
        build.onLoad({ filter: /\.ts$/ }, async (args) => {
            const js = await fs.promises.readFile(args.path, 'utf8');
            const relativeImportsProcessed = js.replace(
                relativeImportRegex,
                "import$1'$2.dev.js'"
            );
            const relativeDynamicImportsProcessed =
                relativeImportsProcessed.replace(
                    relativeDynamicImportRegex,
                    "import('$1.dev.js')"
                );
            const contents = relativeDynamicImportsProcessed.replace(
                relativeExportRegex,
                "export$1'$2.dev.js'"
            );
            return {
                contents,
                loader: 'ts',
            };
        });
    },
};
```

This plugin:

1. Uses regular expressions to find all relative imports and exports
2. Transforms the paths to use `.dev.js` extensions
3. Is only applied to the development build, while the production build keeps `.js` extensions

### Contrasting Approaches

| Feature               | Swan Approach                                           | SWC Approach                                             |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| **Plugin Activation** | Applied to both development and production builds       | Only applied to development builds                       |
| **Path Detection**    | Uses path analysis to identify package boundaries       | Uses simple regular expressions for all relative imports |
| **Discrimination**    | Only modifies intra-package references                  | Modifies all relative references indiscriminately        |
| **Reference Types**   | Handles static imports, dynamic imports, and re-exports | Handles static imports, dynamic imports, and exports     |

### Strengths of Swan's Approach

1. **More targeted**: Only modifies references within the same package, avoiding potential issues with external relative imports
2. **Contextual awareness**: Understands the component structure and avoids unintended transformations
3. **Consistent application**: Applied uniformly to both development and production builds, ensuring symmetrical behavior

### Strengths of SWC's Approach

1. **Simplicity**: Using regular expressions makes the implementation straightforward
2. **Comprehensive pattern matching**: May catch edge cases through broader pattern matching
3. **Performance**: Potentially faster due to simpler string replacement

## Build Command

To run the build process:

```bash
node swan/scripts/build.js
```

This will produce both production and development builds in the `dist/` directory.

## Extending the Build Process

To add new functionality to the build process:

1. For new plugins, create them in the `swan/scripts/` directory
2. Import and add them to the `plugins` array in the `buildFiles` function in `build.js`
3. For one-off customizations, you can pass additional options through the `buildFiles` function
