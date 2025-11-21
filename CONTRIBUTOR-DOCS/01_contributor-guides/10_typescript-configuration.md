<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / TypeScript configuration

<!-- Document title (editable) -->

# TypeScript configuration

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About this guide](#about-this-guide)
- [Unified ES2020 target](#unified-es2020-target)
    - [Why ES2020?](#why-es2020)
    - [Browser and runtime support](#browser-and-runtime-support)
- [Configuration structure](#configuration-structure)
    - [Three-tier hierarchy](#three-tier-hierarchy)
    - [Module resolution differences](#module-resolution-differences)
- [Cross-generation imports](#cross-generation-imports)
    - [How 1st-gen imports from 2nd-gen](#how-1st-gen-imports-from-2nd-gen)
    - [Path mapping](#path-mapping)
- [TypeScript version management](#typescript-version-management)
    - [Current version](#current-version)
    - [Upgrading TypeScript](#upgrading-typescript)
- [ES2020 features available](#es2020-features-available)
- [Related documentation](#related-documentation)

</details>

<!-- Document content (editable) -->

## About this guide

This guide explains the TypeScript configuration strategy for the Spectrum Web Components monorepo, including our unified ES2020 target, configuration structure, and how cross-generation imports work.

## Unified ES2020 target

As of November 2025, this monorepo uses **ES2020** as the unified JavaScript target across both 1st-gen and 2nd-gen workspaces.

### Why ES2020?

We chose ES2020 for several reasons:

- **Modern browser support**: All browsers in our target list support ES2020 (Chrome 80+, Firefox 74+, Safari 13.1+, Edge 80+)
- **No IE11 support needed**: Explicitly excluded in `.browserslistrc`
- **Native modern features**: Optional chaining (`?.`), nullish coalescing (`??`), `BigInt`, `Promise.allSettled()`
- **Smaller bundles**: No polyfills needed for modern JavaScript features
- **Better debugging**: Generated code is closer to source code
- **Already in use**: The codebase already uses ES2020 features extensively (201+ optional chaining, 158K+ nullish coalescing operations)

### Browser and runtime support

**Target browsers** (from `.browserslistrc`):

```
defaults
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 iOS versions
not IE 11
```

**Node.js requirement**: `>=20.19.0` (defined in root `package.json`)

All of these targets fully support ES2020 features.

## Configuration structure

### Three-tier hierarchy

The TypeScript configuration uses a three-tier inheritance structure:

```
tsconfig.base.json              ← Root: Shared ES2020 settings
├── 1st-gen/tsconfig.json       ← 1st-gen: Node resolution
│   └── packages/*/tsconfig.json ← Package-specific overrides
└── 2nd-gen/tsconfig.json       ← 2nd-gen: Bundler resolution
    └── packages/*/tsconfig.json ← Package-specific overrides
```

**Benefits of this structure:**

- Single source of truth for common settings
- Clear documentation of intentional differences
- Easy to update TypeScript version or shared settings
- Reduced configuration duplication

**Shared settings in `tsconfig.base.json`:**

- `target: "ES2020"` and `lib: ["ES2020", "DOM", "DOM.Iterable"]`
- Strict type checking rules (`strict`, `noImplicitReturns`, `noUnusedLocals`, etc.)
- Decorator configuration (`experimentalDecorators`, `useDefineForClassFields`)
- Common output settings (`declaration`, `sourceMap`, `skipLibCheck`)

### Module resolution differences

While both generations share the ES2020 target, they use different module resolution strategies based on their build tools:

| Workspace | Resolution | Build Tool | Purpose |
|-----------|------------|------------|---------|
| 1st-gen | `node` | TypeScript compiler | Project references, tsc incremental builds |
| 2nd-gen | `bundler` | Vite | Modern bundler optimizations, faster HMR |

Both use `module: "ESNext"` for maximum interoperability.

**Why different resolution strategies?**

- **1st-gen** uses the classic `node` resolution because it relies on TypeScript's project references and incremental compilation features
- **2nd-gen** uses `bundler` resolution to take advantage of Vite's optimized module resolution and Hot Module Replacement (HMR)

## Cross-generation imports

### How 1st-gen imports from 2nd-gen

1st-gen components can import from 2nd-gen core functionality in two ways:

**Via the base package (recommended):**

```typescript
import { SpectrumElement, html, css } from '@spectrum-web-components/base';
```

**Direct core import (advanced use cases):**

```typescript
import { SpectrumElement } from '@spectrum-web-components/core/shared/base/Base.js';
```

The base package (`@spectrum-web-components/base`) acts as a wrapper around the 2nd-gen core package, providing a stable API for 1st-gen components.

### Path mapping

The 1st-gen TypeScript configuration includes path mapping to the 2nd-gen core package:

```json
{
  "compilerOptions": {
    "paths": {
      "@spectrum-web-components/core/*": [
        "../2nd-gen/packages/core/*/dist"
      ]
    }
  }
}
```

This allows TypeScript to resolve cross-generation imports correctly during development and builds.

**Build order requirement**: When building from scratch, 2nd-gen must be built before 1st-gen:

```bash
yarn build:2nd-gen  # Build core dependency first
yarn build:1st-gen  # Can now resolve 2nd-gen imports
```

The top-level `yarn build` command handles this automatically.

## TypeScript version management

### Current version

**TypeScript version**: 5.9.2 (aligned across all workspaces as of November 7, 2025)

All three locations use the same version:

- `1st-gen/package.json`
- `1st-gen/projects/css-custom-vars-viewer/package.json`
- `1st-gen/projects/example-project-rollup/package.json`

### Upgrading TypeScript

When updating TypeScript versions, follow these steps to ensure consistency:

**1. Update all three package.json files:**

```bash
# Update version in all three locations
# 1st-gen/package.json
# 1st-gen/projects/css-custom-vars-viewer/package.json
# 1st-gen/projects/example-project-rollup/package.json
```

**2. Install the new version:**

```bash
yarn install
```

**3. Verify TypeScript version:**

```bash
cd 1st-gen && yarn tsc --version
```

**4. Clean and rebuild:**

```bash
yarn workspace @spectrum-web-components/1st-gen build:clear-cache
yarn build
```

**5. Run the test suite:**

```bash
yarn test
```

**6. Check for breaking changes:**

- Review the [TypeScript release notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
- Pay special attention to `lib.d.ts` changes (DOM types)
- Test cross-generation imports still work
- Watch for type inference changes in generic code

## ES2020 features available

With the ES2020 target, these modern JavaScript features are available without polyfills:

| Feature | Syntax | Use Case |
|---------|--------|----------|
| **Optional Chaining** | `obj?.prop?.nested` | Safe property access without verbose null checks |
| **Nullish Coalescing** | `value ?? defaultValue` | Default values (only for null/undefined, not falsy) |
| **BigInt** | `9007199254740991n` | Large integer arithmetic beyond Number.MAX_SAFE_INTEGER |
| **Dynamic Import** | `import('./module.js')` | Code splitting, lazy loading |
| **Promise.allSettled()** | `Promise.allSettled([...])` | Wait for all promises (success or failure) |
| **String.matchAll()** | `str.matchAll(/regex/g)` | Iterate over all regex matches |
| **globalThis** | `globalThis.fetch()` | Cross-platform global access |

All of these are emitted directly in the compiled JavaScript without transpilation, resulting in smaller bundles and better performance.

**Example:**

```typescript
// Source code
const value = obj?.nested?.prop ?? 'default';

// Compiled output (ES2020)
const value = obj?.nested?.prop ?? 'default'; // Preserved as-is

// Previously with ES2018 target (down-leveled)
const value = (_a = (_b = obj === null || obj === void 0 ? void 0 : obj.nested) === null || _b === void 0 ? void 0 : _b.prop) !== null && _a !== void 0 ? _a : 'default';
```

---

## Related documentation

- [Working in the SWC repo](03_working-in-the-swc-repo.md) - General development workflow
- [Repository Structure](03_working-in-the-swc-repo.md#repository-structure) - Understanding 1st-gen and 2nd-gen organization
