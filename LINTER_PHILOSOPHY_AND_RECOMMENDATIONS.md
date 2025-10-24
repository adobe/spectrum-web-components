# Linter philosophy and second-gen improvements

**Generated:** October 24, 2025
**Context:** Second-gen is the future implementation replacing first-gen. First-gen is legacy/frozen. All recommendations target second-gen and root configurations based on industry best practices.

---

## Table of contents

1. [Linter tools explained](#linter-tools-explained)
2. [Industry best practices philosophy](#industry-best-practices-philosophy)
3. [Second-gen current state analysis](#second-gen-current-state-analysis)
4. [Recommended improvements for second-gen](#recommended-improvements-for-second-gen)
5. [Implementation roadmap](#implementation-roadmap)

---

## Linter tools explained

### Core tools in this repository

#### ESLint - Code quality linter

**Purpose:** Catches bugs, enforces code patterns, prevents anti-patterns in JavaScript/TypeScript

**Key capabilities:**

- Static analysis of code logic and structure
- Detects potential runtime errors before execution
- Enforces team coding standards
- Highly extensible via plugins
- Auto-fixes safe issues

**What it should NOT do:** Handle formatting (that's Prettier's job)

**Example rules:**

- `no-unused-vars` - Catch dead code
- `no-implicit-any` - Enforce type safety
- `curly` - Require braces (prevent subtle bugs)

---

#### Prettier - Code formatter

**Purpose:** Applies consistent formatting automatically

**Key capabilities:**

- Opinionated by design (minimal configuration)
- Handles all whitespace, line breaks, quotes, etc.
- Works across multiple languages (JS, TS, CSS, JSON, HTML, Markdown)
- Eliminates formatting debates
- Integrates with editors for format-on-save

**Philosophy:** "You provide the code, Prettier provides the style"

**What it should NOT do:** Make decisions about code logic or structure

---

#### Stylelint - CSS linter

**Purpose:** Enforces CSS/SCSS conventions and catches errors

**Key capabilities:**

- Validates CSS syntax and properties
- Enforces naming conventions (BEM, custom properties, etc.)
- Catches duplicate selectors and specificity issues
- Prevents invalid property values
- Integrates with Prettier for CSS formatting

**Common use cases:**

- Enforce design system token usage
- Prevent deprecated CSS features
- Standardize custom property naming

---

#### TypeScript compiler - Static type checker

**Purpose:** Catches type errors and enforces type safety

**Key capabilities:**

- Compile-time type checking
- Strict mode enforcement
- Unused code detection
- Control flow analysis
- Module resolution validation

**Strict mode flags:**

- `strict: true` - Master switch for all strict checks
- `noImplicitReturns` - All code paths must return
- `noFallthroughCasesInSwitch` - Prevent switch fallthrough bugs
- `noUnusedLocals` / `noUnusedParameters` - Dead code detection

---

#### EditorConfig - Cross-editor consistency

**Purpose:** Ensures basic formatting before code is saved

**Key capabilities:**

- Works across all editors (VS Code, IntelliJ, Vim, etc.)
- Sets indentation, line endings, charset
- First line of defense for consistency
- Minimal but universal

**Philosophy:** Handle what can't vary, let Prettier handle everything else

---

#### Commitlint - Git commit message linter

**Purpose:** Enforces conventional commit message format

**Key capabilities:**

- Standardizes commit history
- Enables automated changelog generation
- Improves git log readability
- Integrates with semantic versioning

**Format:** `type(scope): subject`

---

#### lint-staged - Pre-commit orchestrator

**Purpose:** Runs linters only on staged files before commit

**Key capabilities:**

- Prevents broken code from entering repository
- Only processes changed files (fast)
- Coordinates multiple tools
- Auto-fixes when possible, blocks when not

**Typical flow:**

```
git commit → lint-staged → ESLint → Prettier → Stylelint → commit or abort
```

---

## Industry best practices philosophy

### Principle 1: Separation of concerns

**Code Quality (ESLint) ≠ Formatting (Prettier)**

```typescript
// ESLint's job: Logic and quality
if (user.isAdmin) doAdminThing(); // ❌ Missing braces (curly rule)

// Prettier's job: Appearance
const user = { name: 'Alice', role: 'admin' }; // Prettier fixes spacing/quotes
```

**Implementation:**

- ESLint focuses on: logic errors, potential bugs, maintainability
- Prettier focuses on: consistent appearance, whitespace, quotes
- Use `eslint-config-prettier` to disable all ESLint formatting rules
- Never configure overlapping rules between tools

---

### Principle 2: Fail fast, fix automatically

**Progressive enforcement layers:**

```
1. Editor (real-time feedback)
   ↓ Fix on save
2. Pre-commit hooks (prevent bad commits)
   ↓ Auto-fix or block
3. CI/CD pipeline (safety net)
   ↓ Fail build
4. Code review (human judgment)
```

**Auto-fix philosophy:**

- If it's mechanical, auto-fix it (formatting, import sorting)
- If it requires judgment, warn/error (logic issues, complexity)
- Never auto-fix destructive changes

---

### Principle 3: Consistency over configuration

**Prefer community standards:**

- Extend well-maintained presets over custom rules
- `@typescript-eslint/recommended` over hand-picking 100 rules
- `stylelint-config-standard` over custom CSS conventions
- Document any deviation from defaults

**Monorepo rule:**

> Single root configuration that cascades. Override only when technically necessary.

```
root/.eslintrc.json         ← Base rules for everything
  ↓ extends
second-gen/.eslintrc.json   ← Only second-gen specific overrides
```

---

### Principle 4: Zero configuration ideal

**Developer experience:**

- `git clone` → `npm install` → tools work
- No manual setup required
- IDE extensions auto-detect configurations
- Documentation only when configuration is non-obvious

**Extension recommendations:**

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint", // Real-time linting
        "esbenp.prettier-vscode", // Format on save
        "editorconfig.editorconfig", // Basic consistency
        "stylelint.vscode-stylelint", // CSS linting
        "runem.lit-plugin" // Web component support
    ]
}
```

---

### Principle 5: Minimize disabled rules

**When you disable a rule, ask:**

1. Is this hiding a real problem?
2. Can we fix the code instead?
3. Should this be an inline exception instead?
4. Is this truly a false positive?

**Good reason to disable:**

```css
/* Design system intentionally uses duplicate selectors for cascade layers */
"no-duplicate-selectors":null;
```

**Bad reason to disable:**

```css
/* "Too many errors to fix right now" - Technical debt accumulation */
"no-descending-specificity":null;
```

---

### Principle 6: Treat warnings as errors in CI

**Local development:**

- Warnings give feedback without blocking flow
- Errors block commits

**CI/CD:**

- All warnings become errors
- Prevents "warning debt" from accumulating
- Forces team to address issues or explicitly disable rules

---

## Second-gen current state analysis

### ✅ What second-gen does well

#### 1. Modern TypeScript configuration

```json
{
    "target": "ES2022", // ✅ Modern features
    "moduleResolution": "bundler", // ✅ Modern tooling
    "strict": true, // ✅ Type safety
    "noFallthroughCasesInSwitch": true // ✅ Additional safety
}
```

**Analysis:** Strong foundation, modern defaults, appropriate for new development.

---

#### 2. Intelligent import sorting

```typescript
// ✅ Second-gen uses simple-import-sort with proper grouping
import { html, css } from 'lit'; // Group 1: Lit
import { customElement } from '@lit/decorators'; // Group 1: Lit
import { query } from '@lit/reactive-element'; // Group 1: Lit

import React from 'react'; // Group 2: External

import { BaseComponent } from '@swc/core'; // Group 3: Internal

import type { ButtonVariant } from './types'; // Group 4: Types

import { styles } from './Button.styles'; // Group 5: Styles
```

**Analysis:** Excellent. Clear grouping strategy improves readability and maintainability.

---

#### 3. Proper ESLint plugin architecture

```json
{
    "plugins": [
        "@typescript-eslint",
        "notice",
        "@spectrum-web-components",
        "import",
        "simple-import-sort"
    ]
}
```

**Analysis:** Good plugin selection. Uses modern `simple-import-sort` instead of problematic `sort-imports`.

---

### ⚠️ Critical gaps in second-gen

#### 1. Missing ESLint-Prettier integration

**Current state:**

```json
{
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended"
        // ❌ Missing "prettier" to disable formatting rules
    ]
}
```

**Problem:** ESLint and Prettier may have conflicting formatting rules, causing confusion.

**Industry standard:**

```json
{
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "prettier" // ✅ Must be last - disables conflicting rules
    ]
}
```

**Impact:** Medium - Can cause format-on-save fights between tools.

---

#### 2. Missing critical code quality rules

**From best practices comparison:**

| Rule                                               | Status     | Impact | Rationale                                      |
| -------------------------------------------------- | ---------- | ------ | ---------------------------------------------- |
| `curly`                                            | ❌ Missing | High   | Prevents subtle bugs from missing braces       |
| `@typescript-eslint/explicit-function-return-type` | ❌ Missing | Medium | Improves documentation and catches type errors |
| `@typescript-eslint/no-floating-promises`          | ❌ Missing | High   | Prevents forgotten async error handling        |
| `@typescript-eslint/await-thenable`                | ❌ Missing | Medium | Catches unnecessary awaits                     |

**Examples of bugs these catch:**

```typescript
// ❌ Without curly rule - easy to miss the bug
if (condition) console.log('Debug');
doImportantThing(); // ALWAYS runs! Should be in braces

// ❌ Without explicit-function-return-type
function getData() {
    // Returns what? Promise? Sync?
    return fetch('/api/data'); // Type inference may surprise you
}

// ❌ Without no-floating-promises
async function saveUser() {
    database.save(user); // ❌ Forgot await! Errors silently swallowed
}
```

---

#### 3. Missing import extension enforcement

**Current state:**

```typescript
// Second-gen allows both:
import { Button } from './Button'; // ❌ No extension
import { Button } from './Button.ts'; // ✅ With extension
```

**Problem:** ES modules require explicit extensions. Bundlers may hide this issue.

**Industry standard for ES modules:**

```json
{
    "plugins": ["require-extensions"],
    "extends": ["require-extensions/recommended"]
}
```

**Why it matters:**

- Native ES modules in browsers require extensions
- Some bundlers don't handle missing extensions
- Explicit is better than implicit

**Current workaround:** `allowImportingTsExtensions: true` in tsconfig helps, but doesn't enforce consistency.

---

#### 4. No accessibility linting

**Current state:**

```json
{
    "extends": [
        // ❌ Missing "lit-a11y/recommended"
    ]
}
```

**Problem:** Web components have unique accessibility challenges (shadow DOM, ARIA, roles).

**Industry standard for web components:**

```json
{
    "extends": [
        "lit-a11y/recommended" // Catches common a11y issues
    ]
}
```

**Examples of issues caught:**

```typescript
// ❌ lit-a11y would catch these:
html`
    <div @click=${this.onClick}>Button</div>
`; // Should use <button>
html`
    <img src="photo.jpg" />
`; // Missing alt attribute
html`
    <button aria-label=""></button>
`; // Empty ARIA label
```

---

#### 5. Missing copyright header enforcement

**Current state:** No automated copyright header checking in second-gen.

**First-gen has:**

```json
{
    "rules": {
        "notice/notice": [
            "error",
            {
                "templateFile": "./COPYRIGHT"
            }
        ]
    }
}
```

**Impact:** Legal/licensing requirement not enforced automatically.

---

#### 6. Incomplete pre-commit hooks for second-gen

**Current state:** lint-staged runs `lit-analyzer` only on first-gen files.

```javascript
// From lint-staged.config.js
'first-gen/**/*.ts': ['lit-analyzer --strict'],
// ❌ No lit-analyzer for second-gen
```

**Gap:** Second-gen doesn't get pre-commit Lit validation.

---

### ⚠️ Root configuration gaps

#### 1. Prettier not configured for all file types

**Current root config:**

```yaml
# .prettierrc.yaml
printWidth: 80
tabWidth: 4
# ❌ No CSS overrides at root level
```

**First-gen has CSS overrides:**

```yaml
overrides:
    - files: '*.css'
      options:
          printWidth: 500 # Prevents wrapping CSS rules
          singleQuote: false # CSS convention
```

**Problem:** Second-gen CSS files may format differently than first-gen CSS files.

**Solution:** Move CSS overrides to root config so they apply everywhere.

---

#### 2. Missing Stylelint-Prettier integration

**Current state:**

```json
{
    "extends": [
        "stylelint-config-standard"
        // ❌ Missing "stylelint-config-prettier"
    ]
}
```

**Problem:** Stylelint formatting rules may conflict with Prettier.

**Industry standard:**

```json
{
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-prettier" // ✅ Disables conflicting rules
    ]
}
```

---

#### 3. EditorConfig incomplete

**Current state:**

```ini
[*]
indent_size = 4
indent_style = space
end_of_line = lf
charset = utf-8
# ❌ Missing trim_trailing_whitespace
# ❌ Missing insert_final_newline
```

**Industry standard:**

```ini
[*]
indent_size = 4
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---

#### 4. Incomplete VSCode extension recommendations

**Current state:**

```json
{
    "recommendations": [
        "runem.lit-plugin" // ✅ But only 1 of 5 essential
    ]
}
```

**Missing critical extensions:**

- `dbaeumer.vscode-eslint` - Real-time linting
- `esbenp.prettier-vscode` - Format on save
- `editorconfig.editorconfig` - EditorConfig support
- `stylelint.vscode-stylelint` - CSS linting

**Impact:** New contributors won't get optimal IDE setup automatically.

---

### 📊 Second-gen vs industry standards scorecard

| Category                      | Score | Status                                       |
| ----------------------------- | ----- | -------------------------------------------- |
| **TypeScript Configuration**  | 9/10  | ✅ Excellent - Modern and strict             |
| **Import Organization**       | 9/10  | ✅ Excellent - Proper grouping               |
| **ESLint Architecture**       | 7/10  | ⚠️ Good foundation, missing key rules        |
| **Prettier Integration**      | 5/10  | ⚠️ Works but missing eslint-config-prettier  |
| **Stylelint Setup**           | 6/10  | ⚠️ Basic setup, missing Prettier integration |
| **Accessibility Enforcement** | 2/10  | ❌ No lit-a11y rules                         |
| **Pre-commit Hooks**          | 6/10  | ⚠️ Works for first-gen, gaps for second-gen  |
| **IDE Integration**           | 4/10  | ⚠️ Minimal extension recommendations         |
| **Copyright Enforcement**     | 3/10  | ⚠️ Not in second-gen config                  |

**Overall: 6.2/10** - Solid foundation, needs strategic additions for production readiness.

---

## Recommended improvements for second-gen

### Priority 1: Critical safety and consistency

#### 1.1 Add eslint-config-prettier

**Why:** Prevents ESLint/Prettier conflicts

**Implementation:**

```bash
cd second-gen
npm install --save-dev eslint-config-prettier
```

```json
// second-gen/.eslintrc.json
{
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "prettier" // ✅ Add as last item
    ]
}
```

**Effort:** 5 minutes
**Risk:** None
**Impact:** Eliminates potential formatting conflicts

---

#### 1.2 Add critical code quality rules

**Why:** Prevent common bugs and improve maintainability

**Implementation:**

```json
// second-gen/.eslintrc.json
{
    "rules": {
        // Require braces for all control statements
        "curly": ["error", "all"],

        // Require explicit function return types
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                "allowExpressions": true,
                "allowTypedFunctionExpressions": true,
                "allowHigherOrderFunctions": true
            }
        ],

        // Prevent floating promises
        "@typescript-eslint/no-floating-promises": "error",

        // Catch unnecessary awaits
        "@typescript-eslint/await-thenable": "error",

        // Require consistent type imports
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                "prefer": "type-imports",
                "fixable": "code"
            }
        ]
    }
}
```

**Effort:** 1-2 hours (includes fixing violations)
**Risk:** May find existing issues (good!)
**Impact:** High - Prevents entire classes of bugs

---

#### 1.3 Add accessibility linting

**Why:** Web components require special a11y attention

**Implementation:**

```bash
cd second-gen
npm install --save-dev eslint-plugin-lit-a11y
```

```json
// second-gen/.eslintrc.json
{
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "lit-a11y/recommended", // ✅ Add accessibility rules
        "prettier"
    ]
}
```

**Effort:** 2-3 hours (includes fixing violations)
**Risk:** May find accessibility issues (good!)
**Impact:** High - Ensures accessible components

---

#### 1.4 Add import extension enforcement

**Why:** Ensures ES module compatibility

**Implementation:**

```bash
cd second-gen
npm install --save-dev eslint-plugin-require-extensions
```

```json
// second-gen/.eslintrc.json
{
    "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "lit-a11y/recommended",
        "require-extensions/recommended", // ✅ Enforce .ts/.js extensions
        "prettier"
    ]
}
```

**Note:** May need to configure for `.ts` vs `.js` extensions based on build setup.

**Effort:** 1-2 hours (includes fixing imports)
**Risk:** Low
**Impact:** Medium - Improves ES module compatibility

---

#### 1.5 Add copyright header enforcement

**Why:** Legal/licensing requirement

**Implementation:**

```json
// second-gen/.eslintrc.json
{
    "rules": {
        "notice/notice": [
            "error",
            {
                "templateFile": "../../COPYRIGHT", // Use root COPYRIGHT file
                "mustMatch": "Copyright [0-9]{4}"
            }
        ]
    }
}
```

**Effort:** 1 hour (includes adding headers)
**Risk:** None
**Impact:** Medium - Ensures license compliance

---

### Priority 2: Configuration consistency

#### 2.1 Move Prettier CSS overrides to root

**Why:** Consistent CSS formatting across all projects

**Implementation:**

```yaml
# Root .prettierrc.yaml
printWidth: 80
tabWidth: 4
semi: true
singleQuote: true
trailingComma: es5
bracketSpacing: true
arrowParens: always

# ✅ Add CSS overrides
htmlWhitespaceSensitivity: ignore
overrides:
    - files: '*.css'
      options:
          printWidth: 500 # Don't wrap CSS rules
          singleQuote: false # CSS convention
```

**Rationale for 500 char printWidth in CSS:**

```css
/* Without override, Prettier would wrap this readable rule: */
.spectrum-Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spectrum-button-padding-y) var(--spectrum-button-padding-x);
}

/* Into multiple lines, making it harder to scan */
```

**Effort:** 15 minutes
**Risk:** None
**Impact:** Medium - Consistent CSS formatting

---

#### 2.2 Add stylelint-config-prettier

**Why:** Prevent Stylelint/Prettier conflicts

**Implementation:**

```bash
npm install --save-dev stylelint-config-prettier
```

```json
// Root .stylelintrc.json
{
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-prettier" // ✅ Add as last item
    ]
}
```

**Effort:** 10 minutes
**Risk:** None
**Impact:** Low - Prevents potential conflicts

---

#### 2.3 Complete EditorConfig

**Why:** Additional safeguards for consistency

**Implementation:**

```ini
# Root .editorconfig
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 4
charset = utf-8
trim_trailing_whitespace = true  # ✅ Add
insert_final_newline = true      # ✅ Add

[*.md]
trim_trailing_whitespace = false  # ✅ Markdown needs trailing spaces
```

**Effort:** 5 minutes
**Risk:** None
**Impact:** Low - Minor quality improvement

---

#### 2.4 Expand VSCode extension recommendations

**Why:** Optimal out-of-box developer experience

**Implementation:**

```json
// .vscode/extensions.json
{
    "recommendations": [
        "runem.lit-plugin", // Lit web components
        "dbaeumer.vscode-eslint", // ✅ Real-time linting
        "esbenp.prettier-vscode", // ✅ Format on save
        "editorconfig.editorconfig", // ✅ EditorConfig support
        "stylelint.vscode-stylelint" // ✅ CSS linting
    ]
}
```

**Effort:** 5 minutes
**Risk:** None
**Impact:** High - Much better developer experience

---

#### 2.5 Add VSCode settings for auto-fix

**Why:** Automatically fix issues on save

**Implementation:**

```json
// .vscode/settings.json (add to existing)
{
    // Existing settings...

    // ✅ Format with Prettier on save
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,

    // ✅ ESLint auto-fix on save
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.fixAll.stylelint": "explicit"
    },

    // ✅ ESLint validation
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],

    // ✅ Stylelint validation
    "stylelint.validate": ["css", "scss"]
}
```

**Effort:** 10 minutes
**Risk:** None
**Impact:** High - Automatic issue fixing

---

### Priority 3: Advanced improvements

#### 3.1 Add monorepo boundary enforcement

**Why:** Prevent architectural decay in monorepo

**Implementation:**

```bash
npm install --save-dev eslint-plugin-monorepo
```

```json
// Root .eslintrc.json
{
    "plugins": ["monorepo"],
    "rules": {
        "monorepo/no-internal-import": "error", // No cross-package internals
        "monorepo/no-relative-import": "error" // Use package names
    }
}
```

**Example of what this prevents:**

```typescript
// ❌ Bad - reaching into another package's internals
import { helper } from '../other-package/src/internal/helper';

// ✅ Good - using public API
import { helper } from '@swc/other-package';
```

**Effort:** 2-3 hours (includes refactoring)
**Risk:** Medium - May expose architectural issues
**Impact:** High - Maintains clean architecture

---

#### 3.2 Add complexity limits

**Why:** Enforce maintainable code

**Implementation:**

```json
// second-gen/.eslintrc.json
{
    "rules": {
        // Limit cyclomatic complexity
        "complexity": ["warn", 10],

        // Limit function length
        "max-lines-per-function": [
            "warn",
            {
                "max": 50,
                "skipBlankLines": true,
                "skipComments": true
            }
        ],

        // Limit file length
        "max-lines": [
            "warn",
            {
                "max": 300,
                "skipBlankLines": true,
                "skipComments": true
            }
        ],

        // Limit nested depth
        "max-depth": ["warn", 4]
    }
}
```

**Note:** Start with warnings, not errors. Adjust thresholds based on team feedback.

**Effort:** 30 minutes
**Risk:** Low - Using warnings
**Impact:** Medium - Encourages refactoring

---

#### 3.3 Add second-gen support to lint-staged

**Why:** Pre-commit validation for second-gen

**Implementation:**

```javascript
// lint-staged.config.js (add to existing)
module.exports = {
    // Existing rules...

    // ✅ Add second-gen TypeScript validation
    'second-gen/**/*.ts': [
        'eslint --fix',
        'prettier --write',
        'lit-analyzer --strict',
    ],

    // ✅ Add second-gen CSS validation
    'second-gen/**/*.css': ['stylelint --fix', 'prettier --write'],
};
```

**Effort:** 15 minutes
**Risk:** None
**Impact:** High - Prevents bad commits

---

#### 3.4 Add TypeScript project references for second-gen

**Why:** Incremental builds and better IDE performance

**Implementation:**

```json
// second-gen/tsconfig.json
{
    "compilerOptions": {
        "composite": true, // ✅ Enable project references
        "declaration": true,
        "declarationMap": true
    }
}
```

Then create per-package configs that reference each other:

```json
// second-gen/packages/button/tsconfig.json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../core" } // Button depends on core
    ]
}
```

**Effort:** 4-6 hours
**Risk:** Medium - Complex setup
**Impact:** High - Much faster builds

---

#### 3.5 Consider additional safety rules

**Why:** Catch edge cases and improve code quality

**Implementation:**

```json
// second-gen/.eslintrc.json
{
    "rules": {
        // Prevent == instead of ===
        "eqeqeq": ["error", "always"],

        // Prevent console statements in production
        "no-console": [
            "error",
            {
                "allow": ["warn", "error"]
            }
        ],

        // Prevent debugger statements
        "no-debugger": "error",

        // Prevent var (use const/let)
        "no-var": "error",

        // Prefer const when possible
        "prefer-const": "error",

        // Prevent unnecessary template literals
        "@typescript-eslint/no-unnecessary-template-expression": "warn",

        // Prefer nullish coalescing
        "@typescript-eslint/prefer-nullish-coalescing": "warn",

        // Prefer optional chaining
        "@typescript-eslint/prefer-optional-chain": "warn"
    }
}
```

**Effort:** 1-2 hours
**Risk:** Low
**Impact:** Medium - Modernizes code patterns

---

### Priority 4: Review aggressive rule disabling

#### 4.1 Re-evaluate Stylelint disabled rules

**Current disabled rules:**

```json
{
    "rules": {
        "no-duplicate-selectors": null,
        "no-descending-specificity": null,
        "declaration-block-no-redundant-longhand-properties": null
    }
}
```

**Recommendation:** Re-enable with targeted exceptions

**Implementation:**

```json
{
    "rules": {
        // ✅ Re-enable but allow intentional duplicates
        "no-duplicate-selectors": [
            true,
            {
                "ignore": ["keyframe-blocks"]
            }
        ],

        // ✅ Change to warning instead of disabled
        "no-descending-specificity": ["warn"],

        // ✅ Keep disabled if design system requires explicit properties
        "declaration-block-no-redundant-longhand-properties": null
    }
}
```

**For intentional violations, use inline comments:**

```css
/* Design system uses cascade layers for specificity control */
/* stylelint-disable-next-line no-descending-specificity */
.spectrum-Button--emphasized {
    color: var(--spectrum-button-emphasized-color);
}
```

**Effort:** 2-3 hours (includes reviewing violations)
**Risk:** Medium - May find real issues
**Impact:** Medium - Catches CSS bugs

---

## Implementation roadmap

### Phase 1: Critical safety (Week 1)

**Goal:** Prevent bugs and establish consistency

**Tasks:**

1. ✅ Add `eslint-config-prettier` to second-gen (5 min)
2. ✅ Add critical ESLint rules (`curly`, return types, floating promises) (2 hours)
3. ✅ Add `lit-a11y` accessibility linting (3 hours)
4. ✅ Expand VSCode extension recommendations (5 min)
5. ✅ Add VSCode auto-fix settings (10 min)

**Total effort:** ~6 hours
**Impact:** High - Prevents common bugs, improves DX
**Risk:** Low - May find existing issues to fix

**Success criteria:**

- ESLint and Prettier work together without conflicts
- Critical bug-prevention rules active
- Accessibility issues caught automatically
- New contributors get optimal IDE setup

---

### Phase 2: Configuration consistency (Week 2)

**Goal:** Unified formatting and tooling

**Tasks:**

1. ✅ Move Prettier CSS overrides to root (15 min)
2. ✅ Add `stylelint-config-prettier` (10 min)
3. ✅ Complete EditorConfig (5 min)
4. ✅ Add copyright header enforcement to second-gen (1 hour)
5. ✅ Add import extension enforcement to second-gen (2 hours)
6. ✅ Add second-gen support to lint-staged (15 min)

**Total effort:** ~4 hours
**Impact:** Medium - Consistent experience across generations
**Risk:** Low

**Success criteria:**

- CSS formats identically in first-gen and second-gen
- No tool conflicts
- Pre-commit hooks work for second-gen
- Copyright headers enforced

---

### Phase 3: Advanced safety (Week 3-4)

**Goal:** Production-ready code quality

**Tasks:**

1. 🔄 Add monorepo boundary enforcement (3 hours)
2. 🔄 Add complexity limits (30 min)
3. 🔄 Add additional safety rules (2 hours)
4. 🔄 Set up TypeScript project references for second-gen (6 hours)
5. 🔄 Re-evaluate Stylelint disabled rules (3 hours)

**Total effort:** ~14 hours
**Impact:** High - Maintains architecture, improves quality
**Risk:** Medium - May expose issues

**Success criteria:**

- Package boundaries enforced
- Code complexity kept in check
- Modern TypeScript patterns encouraged
- Faster incremental builds

---

### Phase 4: Documentation and refinement (Week 4-5)

**Goal:** Team adoption and continuous improvement

**Tasks:**

1. 🔄 Create comprehensive STYLING.md guide (4 hours)
2. 🔄 Document TypeScript configuration architecture (2 hours)
3. 🔄 Update contributor guide with linter philosophy (2 hours)
4. 🔄 Create troubleshooting guide for common linter issues (2 hours)
5. 🔄 Team review and adjustment period (ongoing)

**Total effort:** ~10 hours + ongoing
**Impact:** High - Team alignment and knowledge sharing
**Risk:** Low

**Success criteria:**

- Clear documentation for all linter decisions
- Contributors understand philosophy
- Smooth onboarding for new team members
- Process for adjusting rules based on feedback

---

## Summary

### Current state: 6.2/10

Second-gen has a strong foundation with modern TypeScript and intelligent import sorting, but is missing critical safety rules and has incomplete tooling integration.

### Target state: 9.5/10

With recommended improvements, second-gen will have:

- ✅ Comprehensive bug prevention
- ✅ Consistent formatting across all file types
- ✅ Strong accessibility enforcement
- ✅ Optimal developer experience
- ✅ Maintainable architecture
- ✅ Clear documentation

### Key philosophy shifts

**From first-gen thinking:**

- ❌ "Let's use sort-imports with ignoreDeclarationSort"
- ❌ "Disable rules that are annoying"
- ❌ "Each generation does its own thing"

**To second-gen best practices:**

- ✅ "Use modern tools designed for the problem (simple-import-sort)"
- ✅ "Fix code to satisfy rules, only disable when truly necessary"
- ✅ "Establish shared standards, override only when technically required"

### Investment vs return

**Total implementation effort:** ~34 hours over 4-5 weeks
**Ongoing benefit:**

- Fewer bugs in production
- Faster code reviews (automated checks)
- Better onboarding (clear standards)
- Maintainable architecture (enforced boundaries)
- Improved accessibility (automated checks)

**ROI:** High - Upfront investment pays dividends throughout second-gen lifecycle

---

**Next step:** Review this philosophy with the team, prioritize improvements, and begin Phase 1 implementation.
