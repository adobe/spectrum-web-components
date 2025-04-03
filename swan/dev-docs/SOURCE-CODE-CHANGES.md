# Source-Level Changes During Migration

While our migration strategy aims to avoid non-mechanical changes to source code, in some cases modifications are necessary. This document tracks substantive changes made to source code during the migration process that were not strictly mechanical import path updates.

Each entry includes:

-   **File**: Path to the modified file
-   **Issue**: Description of the problem that required modification
-   **Change**: Description of the change made
-   **Justification**: Why the change was necessary and why this approach was chosen over alternatives

## Documented Changes

### 1. Async Promise Executor in Focusable Component

**File**: `swan/src/shared/focusable.ts`

**Issue**: ESLint rule `no-async-promise-executor` was being triggered in Swan but not in original location. This occurred because the Swan directory uses the root ESLint configuration which includes `eslint:recommended`, while the tools directory has its own configuration that doesn't include this rule.

**Change**: Refactored from using an async Promise executor to an immediately invoked async function expression:

```javascript
// Original
this.autofocusReady = new Promise(async (res) => {
    await nextFrame();
    await nextFrame();
    res();
});

// Refactored
this.autofocusReady = (async () => {
    await nextFrame();
    await nextFrame();
    return;
})();
```

**Justification**:
We considered three options to address this issue:

1. **Create a Swan-specific ESLint configuration** that mirrors the tools configuration
2. **Add an ESLint rule override** specifically for this file/rule
3. **Refactor the code** to address the underlying issue

We chose option 3 (refactoring) for the following reasons:

-   **Simplicity**: Making a targeted change to the specific problematic code was simpler than replicating or extending the complex ESLint configuration hierarchy
-   **Technical correctness**: The `no-async-promise-executor` rule exists for good reason - async Promise executors can lead to unhandled rejections and unexpected behavior
-   **Future compatibility**: Adding ESLint overrides or custom configurations would introduce technical debt that future maintainers would need to understand and maintain
-   **Minimal scope**: The change is very localized and maintains identical functionality while eliminating the problematic pattern
-   **Better code quality**: This change improves the code quality without changing behavior, making it a clear win

While we generally avoid non-mechanical changes, in this case, the alternative approaches would have introduced unnecessary complexity to the codebase configuration. The selected approach represents the minimal change needed to address the issue while actually improving code quality.
