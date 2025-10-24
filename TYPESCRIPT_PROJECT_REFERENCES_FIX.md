# TypeScript project references and ESLint configuration fix

**Date:** October 24, 2025  
**Issue:** ESLint parsing errors for shared files and type files  
**Status:** ✅ Resolved

## Problem discovered

When implementing type-aware ESLint rules, we initially got parsing errors for certain files:

```
Error: ESLint was configured to run on `packages/core/shared/base/Base.ts`
using `parserOptions.project`: tsconfig.json
However, that TSConfig does not include this file.
```

## Initial (incorrect) solution

The first approach was to add an override to disable type-aware rules for these files:

```json
{
    "files": ["**/*.types.ts", "**/shared/**/*.ts", "**/*.d.ts"],
    "parserOptions": { "project": null },
    "rules": {
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/no-floating-promises": "off"
        // ... other type-aware rules off
    }
}
```

**Problem with this approach:** These files SHOULD have type-aware linting! They're regular TypeScript code being imported and used throughout the codebase.

## Root cause analysis

### Why the parsing errors occurred

1. **TypeScript project references in use:**

    ```json
    // second-gen/tsconfig.json
    {
        "include": ["packages/**/*.ts"],
        "references": [
            { "path": "./packages/core" },
            { "path": "./packages/swc" }
        ]
    }
    ```

2. **Per-package tsconfig files exist:**

    ```json
    // second-gen/packages/core/tsconfig.json
    {
        "extends": "../../tsconfig.json",
        "include": ["**/*.ts"],
        "compilerOptions": {
            "composite": true,
            "rootDir": "./"
        }
    }
    ```

3. **ESLint configuration was too specific:**

    ```json
    "parserOptions": {
        "project": "./tsconfig.json"  // ❌ Only points to root
    }
    ```

### The issue

When using TypeScript project references:

- The **root** tsconfig is a "solution" config that coordinates child projects
- The **per-package** tsconfigs actually own and include the files
- ESLint needs to know about ALL tsconfig files, not just the root

When we pointed ESLint to only `./tsconfig.json`, it couldn't find the files that were owned by the package-level tsconfigs.

## Correct solution

Use `project: true` to let ESLint auto-discover all tsconfig files:

```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": true, // ✅ Auto-discover all tsconfigs
        "tsconfigRootDir": "./" // ✅ Set base directory
    }
}
```

### What this does

The `project: true` setting tells TypeScript-ESLint to:

1. Start from `tsconfigRootDir` (the second-gen directory)
2. Find all `tsconfig.json` files in the workspace
3. Use the appropriate tsconfig for each file being linted

This correctly handles:

- `/second-gen/tsconfig.json` (solution config)
- `/second-gen/packages/core/tsconfig.json` (owns core package files)
- `/second-gen/packages/swc/tsconfig.json` (owns swc package files)

### Override kept for .d.ts files only

Declaration files legitimately don't need type-aware linting:

```json
{
    "files": ["**/*.d.ts"],
    "parserOptions": { "project": null },
    "rules": {
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unnecessary-template-expression": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/prefer-optional-chain": "off"
    }
}
```

**Why:** `.d.ts` files only contain type declarations, no runtime code, so runtime-behavior rules don't apply.

## Verification

### Before the fix

```bash
$ yarn eslint packages/core/shared/base/Base.ts
Error: ESLint was configured to run... However, that TSConfig does not include this file.
```

### After the fix

```bash
$ yarn eslint packages/core/shared/base/Base.ts
  13:1   error    Imports "ReactiveElement" are only used as type
  15:1   error    Relative imports must end with .js
  156:25 error    Promises must be awaited or handled
  88:21  warning  Prefer using an optional chain expression
```

✅ No parsing errors  
✅ Type-aware rules working (catching real issues!)  
✅ All files linted correctly

## Key learnings

1. **Don't disable rules to work around config issues** - If files that should be linted aren't being linted, fix the configuration, don't disable the rules.

2. **`project: true` is better for monorepos** - When you have multiple tsconfig files (especially with project references), let ESLint auto-discover them.

3. **TypeScript project references require special consideration** - The root tsconfig with `references` is a solution config, not a compilation config.

4. **Question broad overrides** - If an override applies to `**/shared/**/*.ts` (all shared files), that's a red flag that something else is wrong.

5. **Test with actual files** - We discovered the issue by testing ESLint on specific files and seeing the violations work correctly.

## References

- TypeScript-ESLint docs on project references: <https://typescript-eslint.io/linting/typed-linting/monorepos>
- TypeScript handbook on project references: <https://www.typescriptlang.org/docs/handbook/project-references.html>
- TypeScript-ESLint `project: true` documentation: <https://typescript-eslint.io/packages/parser/#project>

## Related files modified

- `/second-gen/.eslintrc.json` - Updated parserOptions and reduced override scope
- `/ESLINT_UPDATE_SUMMARY.md` - Updated parser configuration documentation
- `/ESLINT_CONFIG_IMPLEMENTATION_STATUS.md` - Updated known issues section
