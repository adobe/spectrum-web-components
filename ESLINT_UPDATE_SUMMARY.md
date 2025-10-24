# ESLint configuration comprehensive update - implementation summary

**Date:** October 24, 2025
**Status:** ✅ Complete

## Changes implemented

### Phase 1: Critical TypeScript safety rules

#### 1.1 Second-gen ESLint configuration (`second-gen/.eslintrc.json`)

**Added to extends array:**

- `require-extensions/recommended` - Enforces explicit `.ts`/`.js` extensions in imports

**Added rules:**

- `@typescript-eslint/explicit-function-return-type` - Requires explicit return types with exceptions for expressions, typed function expressions, and higher-order functions
- `@typescript-eslint/no-floating-promises` - Prevents forgotten async error handling
- `@typescript-eslint/await-thenable` - Catches unnecessary awaits
- `@typescript-eslint/consistent-type-imports` - Enforces `type` keyword for type-only imports
- `@typescript-eslint/no-unnecessary-template-expression` - Warns about unnecessary template expressions
- `@typescript-eslint/prefer-nullish-coalescing` - Encourages use of `??` over `||`
- `@typescript-eslint/prefer-optional-chain` - Encourages use of `?.` optional chaining
- `eqeqeq` - Prevents `==` usage, requires `===`
- `no-var` - Prevents `var` usage
- `prefer-const` - Requires `const` when variable is not reassigned
- `notice/notice` - Enforces copyright headers with template from `../COPYRIGHT`

**Added complexity limits (warnings):**

- `complexity` - Max cyclomatic complexity of 10
- `max-lines-per-function` - Max 50 lines per function (excluding blank lines and comments)
- `max-lines` - Max 300 lines per file (excluding blank lines and comments)
- `max-depth` - Max nesting depth of 4

**Added parser configuration:**

- `parserOptions.project` - Set to `true` to auto-discover all tsconfig.json files (root + per-package)
- `parserOptions.tsconfigRootDir` - Set to `"./"` for proper path resolution
- This enables type-aware linting for all TypeScript files in the project, including those in package-level tsconfigs

**Added override for declaration files:**

- Files matching `**/*.d.ts` have type-aware rules disabled
- Declaration files don't need type-aware linting as they only contain type declarations

### Phase 2: Configuration consistency

#### 2.1 Prettier configuration (`.prettierrc.yaml`)

**Added:**

- `htmlWhitespaceSensitivity: ignore` - Better HTML formatting
- CSS overrides section:
    - `printWidth: 500` for CSS files (prevents wrapping of CSS rules)
    - `singleQuote: false` for CSS files (CSS convention)

#### 2.2 Stylelint configuration (`.stylelintrc.json`)

**Added:**

- `stylelint-config-prettier` to extends array to disable conflicting formatting rules

**Re-evaluated disabled rules:**

- `no-duplicate-selectors` - Re-enabled with `ignore: ["keyframe-blocks"]`
- `no-descending-specificity` - Changed from disabled to warning
- `declaration-block-no-redundant-longhand-properties` - Kept disabled (intentional for design system)

#### 2.3 EditorConfig (`.editorconfig`)

**Added:**

- `trim_trailing_whitespace = true` for all files
- `insert_final_newline = true` for all files
- Override for `*.md` files with `trim_trailing_whitespace = false` (markdown needs trailing spaces)

#### 2.4 VSCode configuration (`.vscode/extensions.json` - NEW FILE)

**Created with recommended extensions:**

- `runem.lit-plugin` - Lit web component support
- `dbaeumer.vscode-eslint` - Real-time ESLint feedback
- `esbenp.prettier-vscode` - Format on save
- `editorconfig.editorconfig` - EditorConfig support
- `stylelint.vscode-stylelint` - CSS linting

#### 2.5 VSCode settings (`.vscode/settings.json` - NEW FILE)

**Created with auto-fix configuration:**

- Default formatter set to Prettier
- Format on save enabled
- ESLint auto-fix on save
- Stylelint auto-fix on save
- ESLint validation for JS/TS files
- Stylelint validation for CSS files

#### 2.6 Lint-staged configuration (`lint-staged.config.js`)

**Added second-gen support:**

- `second-gen/**/*.ts` - ESLint fix, Prettier format, lit-analyzer strict
- `second-gen/**/*.css` - Stylelint fix, Prettier format

### Phase 3: Advanced improvements

#### 3.1 Root ESLint configuration (`.eslintrc.json`)

**Added:**

- `monorepo` plugin to plugins array
- `monorepo/no-internal-import` - Prevents cross-package internal imports
- `monorepo/no-relative-import` - Enforces package name imports in monorepo

#### 3.2 TypeScript project references (`second-gen/tsconfig.json`)

**Added compiler options:**

- `composite: true` - Enables project references for incremental builds
- `declarationMap: true` - Creates source maps for declaration files (improves IDE navigation)

Note: `declaration: true` was already present.

## Dependencies installed

### Root level (`package.json`)

- `eslint-plugin-monorepo@0.3.2` - Monorepo boundary enforcement
- `stylelint-config-prettier@9.0.5` - Stylelint-Prettier integration

### Second-gen level (`second-gen/package.json`)

- `eslint-plugin-require-extensions` - Import extension enforcement

## Breaking changes and required fixes

### 1. Import extensions required

All imports in second-gen must now include explicit `.ts` or `.js` extensions:

```typescript
// ❌ Before (no extension)
import { Button } from './Button';

// ✅ After (with extension)
import { Button } from './Button.ts';
```

### 2. Explicit function return types required

All functions must have explicit return types (with reasonable exceptions):

```typescript
// ❌ Before (inferred return type)
function getData() {
    return fetch('/api/data');
}

// ✅ After (explicit return type)
function getData(): Promise<Response> {
    return fetch('/api/data');
}

// ✅ Allowed (expression)
const getData = () => fetch('/api/data');
```

### 3. Type imports must use `type` keyword

Type-only imports must be marked with `type`:

```typescript
// ❌ Before (value import)
import { ButtonVariant } from './types';

// ✅ After (type import)
import type { ButtonVariant } from './types';
```

### 4. Floating promises must be awaited

All promises must be explicitly awaited or handled:

```typescript
// ❌ Before (floating promise)
async function saveUser() {
    database.save(user); // Missing await!
}

// ✅ After (awaited)
async function saveUser(): Promise<void> {
    await database.save(user);
}
```

### 5. Copyright headers required

All TypeScript files must have the copyright header from `/COPYRIGHT`.

### 6. CSS descending specificity warnings

CSS files may now show warnings for descending specificity issues. Add inline comments where intentional:

```css
/* Design system uses cascade layers for specificity control */
/* stylelint-disable-next-line no-descending-specificity */
.spectrum-Button--emphasized {
    color: var(--spectrum-button-emphasized-color);
}
```

## Testing the configuration

### Verify ESLint configuration

```bash
cd second-gen
yarn lint
```

### Auto-fix issues

```bash
cd second-gen
yarn lint --fix
```

### Verify Stylelint configuration

```bash
yarn stylelint "**/*.css" --fix
```

### Test pre-commit hooks

```bash
git add <files>
git commit -m "test: verify lint-staged configuration"
```

### VSCode integration

1. Install recommended extensions (VSCode will prompt on opening)
2. Open a TypeScript file - should see real-time ESLint feedback
3. Save a file - should auto-format with Prettier and fix ESLint issues

## Impact assessment

### Positive impacts

- **Bug prevention**: New rules catch entire classes of bugs before they reach production
- **Type safety**: Explicit return types improve documentation and catch type errors
- **Maintainability**: Complexity limits encourage refactoring
- **Consistency**: Unified formatting and linting across all code
- **Accessibility**: Enhanced a11y rules (already in place)
- **Developer experience**: Auto-fix on save, clear IDE feedback

### Required effort

- **Import extensions**: Update all imports in second-gen (~30-60 minutes)
- **Return types**: Add explicit return types (~2-3 hours)
- **Type imports**: Convert to type keyword (~15-30 minutes, mostly auto-fixable)
- **Floating promises**: Fix any missed awaits (~30-60 minutes)
- **Copyright headers**: Add to files missing them (~30 minutes)
- **CSS warnings**: Review and document intentional violations (~1 hour)

**Total estimated effort**: 5-7 hours to fix all violations

### Long-term benefits

- Faster code reviews (automated checks)
- Fewer production bugs
- Better onboarding (clear standards)
- Improved IDE performance (project references)
- Maintainable architecture (monorepo boundaries)

## Configuration validation

All configuration files have been validated:

- ✅ No ESLint errors in config files
- ✅ No Stylelint errors in config files
- ✅ No TypeScript compilation errors
- ✅ JSON files are valid
- ✅ YAML files are valid

## Next steps

1. **Run linting on second-gen** to identify violations:

    ```bash
    cd second-gen && yarn lint
    ```

2. **Auto-fix what's possible**:

    ```bash
    cd second-gen && yarn lint --fix
    ```

3. **Manually fix remaining issues** (primarily explicit return types and floating promises)

4. **Test the configuration** with a few test commits

5. **Install VSCode extensions** for optimal developer experience

6. **Document any exceptions** where rules need to be disabled for valid reasons

7. **Communicate changes to team** and provide this summary document

## References

- Original analysis: `LINTER_PHILOSOPHY_AND_RECOMMENDATIONS.md`
- Implementation plan: `eslint-config-comprehensive-update.plan.md`
- Copyright template: `COPYRIGHT`

## Configuration files modified

1. `/second-gen/.eslintrc.json` - Enhanced TypeScript rules and complexity limits
2. `/.eslintrc.json` - Added monorepo boundary enforcement
3. `/.prettierrc.yaml` - Added CSS overrides
4. `/.stylelintrc.json` - Added prettier integration and re-enabled rules
5. `/.editorconfig` - Added trailing whitespace and newline rules
6. `/lint-staged.config.js` - Added second-gen support
7. `/second-gen/tsconfig.json` - Enabled composite builds
8. `/.vscode/extensions.json` - **NEW** - Extension recommendations
9. `/.vscode/settings.json` - **NEW** - Auto-fix configuration

## Dependencies added

- Root: `eslint-plugin-monorepo`, `stylelint-config-prettier`
- Second-gen: `eslint-plugin-require-extensions`
