# Linter and VSCode settings review

**Generated:** October 24, 2025
**Scope:** Complete analysis of all linter, formatter, and IDE configurations across the Spectrum Web Components codebase

---

## Table of contents

1. [Configuration file index](#configuration-file-index)
2. [Detailed analysis by tool](#detailed-analysis-by-tool)
3. [Conflicts and inconsistencies](#conflicts-and-inconsistencies)
4. [Improvement opportunities](#improvement-opportunities)
5. [Action plan](#action-plan)

---

## Configuration file index

### ESLint configurations (5 files)

- **Root:** `.eslintrc.json` - Orchestrator config with JSON sorting
- **First-gen:** `first-gen/.eslintrc.json` - Comprehensive first-gen rules
- **Second-gen:** `second-gen/.eslintrc.json` - Second-gen specific rules
- **Tools:** `first-gen/tools/.eslintrc.json` - Tools directory overrides
- **Packages:** `first-gen/packages/.eslintrc.json` - Package directory overrides
- **Ignore:** `first-gen/.eslintignore` - Build artifacts and generated files

### Prettier configurations (2 files)

- **Root:** `.prettierrc.yaml` - Base formatting rules
- **First-gen:** `first-gen/.prettierrc.yaml` - Adds CSS-specific overrides
- **Ignore:** `first-gen/.prettierignore` - Snapshots, node_modules, templates

### Stylelint configurations (1 file)

- **Root:** `.stylelintrc.json` - CSS linting rules with copyright header enforcement

### EditorConfig (2 files)

- **Root:** `.editorconfig` - 4-space indentation, LF line endings
- **Example project:** `first-gen/projects/example-project-rollup/.editorconfig` - 2-space indentation ⚠️ **CONFLICT**

### TypeScript configurations (94 files)

- **Root configs:**
    - `first-gen/tsconfig.json` - Base first-gen TypeScript configuration
    - `second-gen/tsconfig.json` - Base second-gen TypeScript configuration
    - `first-gen/tsconfig-all.json` - Composite build for all first-gen packages
    - `first-gen/tsconfig-react-wrapper.json` - React wrapper generation
- **Per-package:** Each of the 87+ packages has its own `tsconfig.json`
- **Test configs:** Multiple test-specific TypeScript configurations

### VSCode configurations (3 files)

- `.vscode/settings.json` - Workspace settings
- `.vscode/extensions.json` - Recommended extensions
- `.vscode/launch.json` - Debug configurations

### Other linter/formatter configs

- `commitlint.config.cjs` - Conventional commits enforcement
- `lint-staged.config.js` - Pre-commit hooks configuration
- Custom ESLint plugin: `first-gen/linters/eslint/` - Two custom rules

---

## Detailed analysis by tool

### ESLint

#### Root configuration (`.eslintrc.json`)

**Purpose:** Orchestrates ESLint across the entire monorepo

**Key features:**

- Extends: `eslint:recommended`, `@typescript-eslint/recommended`, `prettier/recommended`
- JSON sorting enforcement with `jsonc/sort-keys`
- Package.json field ordering with specific export condition handling
- Delegates to first-gen and second-gen configs via overrides
- Base rules: `no-console` (error, allows warn/error), `no-debugger` (error)

**Strengths:**

- Clean delegation model
- Comprehensive package.json formatting
- Properly excludes export conditions from alphabetical sorting

**Issues:**

- Minimal base rules may allow inconsistencies

#### First-gen configuration (`first-gen/.eslintrc.json`)

**Purpose:** First-generation component linting

**Key features:**

- Plugins: `@typescript-eslint`, `notice`, `@spectrum-web-components`, `import`, `require-extensions`
- Extends: `lit-a11y/recommended`, `require-extensions/recommended`
- Custom rules:
    - `prevent-argument-names`: Prevents `e`, `ev`, `evt`, `err` as argument names
    - `document-active-element`: Prevents `document.activeElement` (shadow DOM issues)
    - `explicit-function-return-type`: Required (with expression exceptions)
    - `no-unused-vars`: Error (allows `_` prefix)
    - `sort-imports`: Enforces member sorting, ignores declaration sorting
    - `curly`: All statements must use braces
- Copyright header enforcement via `notice/notice` plugin
- Accessibility rules via `lit-a11y` plugin
- Import extension enforcement

**Overrides:**

- Scripts: `no-console` disabled
- React wrappers: `no-explicit-any` disabled
- Tests/stories: Relaxed accessibility rules
- Icon files: Import sorting disabled
- Picker.ts: Additional accessibility allowlist

**Strengths:**

- Comprehensive accessibility coverage
- Strong custom rules for common mistakes
- Well-structured overrides for different file types
- Copyright enforcement

**Issues:**

- Uses `sort-imports` with `ignoreDeclarationSort: true` (import order not enforced)
- Some duplication with root config

#### Second-gen configuration (`second-gen/.eslintrc.json`)

**Purpose:** Second-generation component linting

**Key features:**

- Similar to first-gen but uses `simple-import-sort` instead of `sort-imports`
- Import grouping strategy:
    1. Lit packages (`lit`, `@lit`)
    2. External packages (excluding SWC)
    3. SWC internal packages
    4. Type imports
    5. Relative imports
    6. Style imports
- Missing `require-extensions` plugin
- Missing `curly` rule
- No `explicit-function-return-type` enforcement
- Has `ignorePatterns: ["**/dist/**"]`

**Strengths:**

- Better import organization via `simple-import-sort`
- Clear import grouping strategy

**Issues:**

- Inconsistent with first-gen (different import sorting approach)
- Missing several first-gen rules (`curly`, return type enforcement)
- Lacks `require-extensions` plugin

#### Tools configuration (`first-gen/tools/.eslintrc.json`)

**Purpose:** Override rules for tool packages

**Key features:**

- Sets `node: false` in env
- Adds `document-active-element` rule
- Uses `prettier` instead of `plugin:prettier/recommended`

**Issues:**

- Slight inconsistency with base config (prettier vs plugin:prettier/recommended)

#### Packages configuration (`first-gen/packages/.eslintrc.json`)

**Purpose:** Package-specific overrides

**Key features:**

- Enforces `import/no-extraneous-dependencies`
- Adds `document-active-element` rule

**Strengths:**

- Prevents accidental dev dependency usage in production code

#### Custom ESLint plugin (`@spectrum-web-components/eslint-plugin`)

**Location:** `first-gen/linters/eslint/`

**Custom rules:**

1. `prevent-argument-names` - Prevents short, unclear argument names
2. `document-active-element` - Prevents shadow DOM bugs

**Strengths:**

- Addresses project-specific issues
- Well-implemented and focused

**Improvement opportunities:**

- Could be published to npm for community use
- Consider adding more SWC-specific rules

---

### Prettier

#### Root configuration (`.prettierrc.yaml`)

```yaml
printWidth: 80
tabWidth: 4
semi: true
singleQuote: true
trailingComma: es5
bracketSpacing: true
arrowParens: always
```

**Strengths:**

- Clear, consistent formatting
- 4-space tabs match EditorConfig

**Issues:**

- No CSS-specific overrides at root level

#### First-gen configuration (`first-gen/.prettierrc.yaml`)

Extends root config with:

```yaml
htmlWhitespaceSensitivity: ignore
overrides:
    - files: '*.css'
      options:
          printWidth: 500
          singleQuote: false
```

**CSS override rationale:**

- 500 character line width prevents wrapping CSS rules (maintains readability)
- Double quotes in CSS (standard convention)

**Issues:**

- These overrides should potentially be in root config
- `htmlWhitespaceSensitivity: ignore` only in first-gen

---

### Stylelint

#### Root configuration (`.stylelintrc.json`)

**Purpose:** CSS linting with copyright enforcement

**Key features:**

- Plugin: `stylelint-header`
- Extends: `stylelint-config-standard`
- Copyright header enforcement pointing to `./COPYRIGHT`
- Custom property pattern: `^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$`
- Allows custom elements in selectors
- Single colon notation for pseudo-elements (`:before` not `::before`)
- Disabled rules:
    - `no-duplicate-selectors` - Allows intentional duplicates
    - `selector-class-pattern` - No class name restrictions
    - `no-descending-specificity` - Allows specificity cascades
    - `declaration-block-no-redundant-longhand-properties` - Allows explicit longhand

**Strengths:**

- Copyright enforcement
- Custom property naming convention
- Pragmatic disabled rules

**Issues:**

- Some disabled rules (`no-duplicate-selectors`, `no-descending-specificity`) may hide real issues
- No integration with Prettier for CSS formatting consistency

---

### EditorConfig

#### Root configuration (`.editorconfig`)

```ini
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 4
charset = utf-8
```

**Strengths:**

- Consistent with Prettier (4 spaces)
- LF line endings
- UTF-8 encoding

**Issues:**

- Minimal configuration
- No trim_trailing_whitespace rule
- No insert_final_newline rule

#### Example project configuration

**Location:** `first-gen/projects/example-project-rollup/.editorconfig`

```ini
[*]
indent_size = 2  # 2 spaces instead of 4!
```

⚠️ **MAJOR CONFLICT:** Example project uses 2-space indentation while everything else uses 4 spaces.

---

### TypeScript

#### Architecture

- **Monorepo structure:** Two main TypeScript roots (first-gen, second-gen)
- **Composite builds:** TypeScript project references for incremental builds
- **Per-package configs:** Each package extends base config

#### First-gen base config (`first-gen/tsconfig.json`)

```json
{
    "compilerOptions": {
        "target": "es2018",
        "lib": ["es2018", "dom", "dom.iterable"],
        "module": "esNext",
        "moduleResolution": "node",
        "strict": true,
        "experimentalDecorators": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "sourceMap": true,
        "importHelpers": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "skipLibCheck": true,
        "isolatedModules": true,
        "types": ["mocha", "chai", "sinon", "node", "swc"]
    }
}
```

**Strengths:**

- Strict mode enabled
- Good unused code detection
- Supports decorators (Lit requirement)

**Issues:**

- `emitDeclarationOnly: true` means no JS output from tsc
- Older target (es2018)

#### Second-gen base config (`second-gen/tsconfig.json`)

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "moduleResolution": "bundler",
        "noEmit": true,
        "strict": true,
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "allowImportingTsExtensions": true,
        "noFallthroughCasesInSwitch": true
    }
}
```

**Strengths:**

- Modern target (ES2022)
- `moduleResolution: "bundler"` for modern tooling
- Additional safety checks

**Differences from first-gen:**

- Newer ECMAScript target (2022 vs 2018)
- Different module resolution strategy
- `allowImportingTsExtensions` enabled
- No type declarations in global types array

---

### VSCode

#### Settings (`.vscode/settings.json`)

```json
{
    "files.exclude": {
        "**/*.css.ts": { "when": "$(basename)" },
        "first-gen/packages/**/*.js.map": true,
        "first-gen/packages/**/*.js": { "when": "$(basename).ts" },
        "first-gen/packages/**/*.dev.js": { "when": "$(basename).js" },
        "first-gen/packages/**/*.d.ts": { "when": "$(basename).ts" },
        "first-gen/tools/**/*.js.map": true,
        "first-gen/tools/**/*.js": { "when": "$(basename).ts" },
        "first-gen/tools/**/*.dev.js": { "when": "$(basename).js" },
        "first-gen/tools/**/*.d.ts": { "when": "$(basename).ts" },
        "**/*.test-vrt.ts": true,
        "projects/**": true,
        "tools/**": true,
        "test/**": true,
        "packages/**": true
    },
    "typescript.tsdk": "node_modules/typescript/lib",
    "lit-plugin.strict": true,
    "cSpell.words": ["activedescendant", "coachmark", "valuetext"]
}
```

**Strengths:**

- Hides generated files for cleaner workspace
- Uses workspace TypeScript version
- Strict Lit plugin checking

**Issues:**

- Custom spell check dictionary is minimal

#### Extensions (`.vscode/extensions.json`)

```json
{
    "recommendations": ["runem.lit-plugin"]
}
```

**Issues:**

- Only recommends Lit plugin
- Missing recommendations for:
    - ESLint extension
    - Prettier extension
    - EditorConfig extension
    - Stylelint extension

#### Launch configurations (`.vscode/launch.json`)

- Storybook debug configuration
- Docs build configuration

**Issues:**

- Outdated (uses deprecated `start-storybook` command)

---

### Other configurations

#### Commitlint (`commitlint.config.cjs`)

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
};
```

**Strengths:**

- Enforces conventional commits
- Simple, standard configuration

**Notes:**

- Works in conjunction with branch naming rules in workspace rules

#### Lint-staged (`lint-staged.config.js`)

**Runs on pre-commit:**

1. `*.css`: Stylelint fix → Prettier write
2. `*.ts`: ESLint fix → Prettier write
3. First-gen TS files: lit-analyzer
4. `package.json`: Version update, constraints fix, lockfile refresh
5. Changesets: Escape changelog tags
6. Other files: Prettier write

**Strengths:**

- Comprehensive pre-commit validation
- Automatically fixes issues
- Handles special cases (package.json, changesets)

**Issues:**

- `lit-analyzer` only runs on first-gen, not second-gen
- Could be slow with many changed files

---

## Conflicts and inconsistencies

### Critical conflicts

#### 1. EditorConfig indentation conflict ⚠️ **CRITICAL**

- **Root:** 4-space indentation
- **Example project:** 2-space indentation
- **Impact:** Code formatting inconsistency, merge conflicts
- **Resolution:** Align example project with root or document exception

#### 2. Import sorting strategy divergence ⚠️ **MAJOR**

- **First-gen:** Uses `sort-imports` with `ignoreDeclarationSort: true`
- **Second-gen:** Uses `simple-import-sort` with grouped imports
- **Impact:** Different import organization between generations
- **Resolution:** Standardize on one approach (recommend `simple-import-sort`)

#### 3. TypeScript target divergence ⚠️ **MAJOR**

- **First-gen:** ES2018
- **Second-gen:** ES2022
- **Impact:** Different language features available
- **Resolution:** Document intentional difference or align

### Moderate conflicts

#### 4. ESLint plugin inconsistency

- **First-gen:** Has `require-extensions` plugin
- **Second-gen:** Missing `require-extensions` plugin
- **Impact:** Import extension enforcement only in first-gen
- **Resolution:** Add to second-gen or document why not needed

#### 5. ESLint rule inconsistency

- **First-gen:** Has `curly` rule (enforces braces)
- **Second-gen:** Missing `curly` rule
- **First-gen:** Enforces `explicit-function-return-type`
- **Second-gen:** Does not enforce return types
- **Impact:** Code style differences between generations
- **Resolution:** Decide on shared baseline rules

#### 6. Prettier configuration split

- **Root:** Minimal config
- **First-gen:** Has CSS overrides and HTML whitespace setting
- **Impact:** CSS formatting may differ between generations
- **Resolution:** Move CSS overrides to root config

### Minor conflicts

#### 7. ESLint prettier plugin inconsistency

- **Root/First-gen/Second-gen:** Uses `plugin:prettier/recommended`
- **Tools config:** Uses `prettier` directly
- **Impact:** Slight configuration difference
- **Resolution:** Standardize on `plugin:prettier/recommended`

#### 8. Stylelint integration gaps

- No Prettier integration for CSS
- Some important rules disabled
- **Impact:** Potential formatting inconsistencies
- **Resolution:** Enable `stylelint-config-prettier` to avoid conflicts

#### 9. Missing STYLING.md

- **Referenced in:** Workspace rules mention `../../STYLING.md`
- **Status:** File does not exist
- **Impact:** Broken reference in documentation
- **Resolution:** Create the file or remove reference

---

## Improvement opportunities

### High priority

#### 1. Unify import sorting strategy

**Current state:** First-gen and second-gen use different approaches

**Recommendation:** Migrate first-gen to `simple-import-sort`

- More maintainable than `sort-imports`
- Allows custom grouping
- Already working well in second-gen

**Implementation:**

1. Add `eslint-plugin-simple-import-sort` to first-gen devDependencies
2. Update `first-gen/.eslintrc.json` to use `simple-import-sort`
3. Run autofix across first-gen codebase
4. Update documentation

**Effort:** Medium (2-3 hours + testing)

#### 2. Fix EditorConfig conflict

**Current state:** Example project uses 2 spaces, everything else uses 4

**Recommendation:** Remove custom EditorConfig from example project

- Align with monorepo standards
- Reduce confusion

**Implementation:**

1. Delete `first-gen/projects/example-project-rollup/.editorconfig`
2. Reformat that project's files to 4 spaces
3. Test example project still works

**Effort:** Low (30 minutes)

#### 3. Consolidate Prettier configuration

**Current state:** CSS overrides only in first-gen config

**Recommendation:** Move CSS overrides to root `.prettierrc.yaml`

- Ensures consistent CSS formatting across all generations
- Single source of truth

**Implementation:**

1. Copy CSS overrides from `first-gen/.prettierrc.yaml` to root
2. Copy `htmlWhitespaceSensitivity: ignore` to root
3. Remove first-gen-specific config or make it extend root
4. Test formatting across codebase

**Effort:** Low (30 minutes)

#### 4. Expand VSCode extension recommendations

**Current state:** Only recommends Lit plugin

**Recommendation:** Add essential extensions

```json
{
    "recommendations": [
        "runem.lit-plugin",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "editorconfig.editorconfig",
        "stylelint.vscode-stylelint"
    ]
}
```

**Implementation:**

1. Update `.vscode/extensions.json`
2. Document in contributor guide

**Effort:** Low (15 minutes)

### Medium priority

#### 5. Establish shared ESLint baseline

**Current state:** First-gen and second-gen have divergent rules

**Recommendation:** Create shared config with essential rules

- Extract common rules to root config
- Keep generation-specific overrides in subdirectories
- Document intentional differences

**Shared baseline should include:**

- `curly`: Enforce braces
- `no-console`: Error (allow warn/error)
- `no-debugger`: Error
- `@typescript-eslint/no-unused-vars`: Error (allow `_` prefix)
- `@spectrum-web-components/prevent-argument-names`
- `@spectrum-web-components/document-active-element`

**Implementation:**

1. Create `eslint-config-shared.json` with common rules
2. Update first-gen and second-gen configs to extend shared
3. Run linting across codebase
4. Fix any new errors

**Effort:** Medium (3-4 hours)

#### 6. Add Stylelint-Prettier integration

**Current state:** Stylelint and Prettier may conflict on CSS formatting

**Recommendation:** Add `stylelint-config-prettier`

```json
{
    "extends": ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

**Implementation:**

1. Add `stylelint-config-prettier` to devDependencies
2. Update `.stylelintrc.json`
3. Test CSS linting

**Effort:** Low (30 minutes)

#### 7. Re-enable critical Stylelint rules

**Current state:** Some important rules disabled globally

**Recommendation:** Re-enable with targeted exceptions

- `no-duplicate-selectors`: Enable with ignore patterns for intentional duplicates
- `no-descending-specificity`: Enable with warnings instead of errors

**Implementation:**

1. Update `.stylelintrc.json` rules
2. Fix legitimate issues found
3. Add inline exceptions for intentional cases

**Effort:** High (depends on number of issues found)

#### 8. Standardize TypeScript strict mode settings

**Current state:** Both configs have strict mode but different additional checks

**Recommendation:** Align strict mode settings between generations

- Document differences if intentional
- Consider enabling additional checks in first-gen:
    - `noFallthroughCasesInSwitch`

**Implementation:**

1. Add missing checks to first-gen config
2. Fix any new errors
3. Document in TypeScript guide

**Effort:** Medium (2-3 hours depending on errors)

#### 9. Add require-extensions to second-gen

**Current state:** Second-gen missing `eslint-plugin-require-extensions`

**Recommendation:** Add plugin for consistency

- Ensures proper ES module imports
- Aligns with first-gen standards

**Implementation:**

1. Add `eslint-plugin-require-extensions` to second-gen devDependencies
2. Update `second-gen/.eslintrc.json`
3. Fix any import extension issues

**Effort:** Low-Medium (1-2 hours)

### Low priority

#### 10. Update VSCode launch configurations

**Current state:** Uses deprecated `start-storybook` command

**Recommendation:** Update to current Storybook commands

```json
{
    "type": "node",
    "request": "launch",
    "name": "Run Storybook",
    "program": "${workspaceFolder}/node_modules/.bin/storybook",
    "args": ["dev", "-p", "8080", "-c", "storybook"]
}
```

**Effort:** Low (15 minutes)

#### 11. Expand cSpell dictionary

**Current state:** Only 3 words in custom dictionary

**Recommendation:** Build comprehensive custom dictionary

- Add Spectrum-specific terms
- Add common component terms
- Add technical terms

**Implementation:**

1. Analyze common "spelling errors" that are actually correct
2. Add to `.vscode/settings.json` cSpell.words
3. Consider separate `.cspell.json` file

**Effort:** Medium (ongoing)

#### 12. Document TypeScript config architecture

**Current state:** 94 TypeScript configs with complex relationships

**Recommendation:** Create TypeScript configuration guide

- Explain composite build approach
- Document when to extend which config
- Explain first-gen vs second-gen differences

**Effort:** Medium (2-3 hours)

#### 13. Consider monorepo-specific tools

**Current state:** Standard linters for everything

**Recommendation:** Evaluate monorepo-specific tooling

- `eslint-plugin-monorepo` - Enforce workspace boundaries
- `@nrwl/nx` - Build system with caching (if not already using)
- `syncpack` - Keep package.json versions in sync

**Effort:** High (research + implementation)

#### 14. Add lint-staged optimization

**Current state:** May be slow with many files

**Recommendation:** Optimize lint-staged configuration

- Use `--max-warnings 0` for ESLint
- Add `--cache` flags where missing
- Consider parallel execution

**Implementation:**

1. Update `lint-staged.config.js` with optimizations
2. Test pre-commit performance
3. Document in contributor guide

**Effort:** Low (1 hour)

#### 15. Create STYLING.md

**Current state:** Referenced in workspace rules but doesn't exist

**Recommendation:** Create comprehensive style guide

- CSS conventions
- Import organization
- Naming conventions
- Component structure

**Effort:** High (4-8 hours)

#### 16. Publish custom ESLint plugin

**Current state:** Custom plugin only used internally

**Recommendation:** Publish to npm

- Benefits: Version management, external use
- Package name: `eslint-plugin-spectrum-web-components`
- Make rules configurable

**Effort:** Medium (2-3 hours)

---

## Action plan

### Phase 1: Critical fixes (Week 1)

**Goal:** Resolve conflicts preventing consistent development

#### Tasks

1. ✅ **Fix EditorConfig conflict** (30 min)
    - Delete `first-gen/projects/example-project-rollup/.editorconfig`
    - Reformat example project files
    - Verify no functionality changes

2. ✅ **Expand VSCode extension recommendations** (15 min)
    - Add ESLint, Prettier, EditorConfig, Stylelint extensions
    - Document in contributor guide

3. ✅ **Consolidate Prettier configuration** (30 min)
    - Move CSS overrides to root config
    - Test formatting across both generations
    - Update any CI/CD scripts

**Total effort:** 1.25 hours
**Priority:** CRITICAL
**Owner:** TBD

### Phase 2: Import and linting standardization (Week 2)

**Goal:** Establish consistent code quality standards

#### Tasks

1. 🔄 **Unify import sorting strategy** (3 hours)
    - Migrate first-gen to `simple-import-sort`
    - Define import groups matching second-gen
    - Run autofix across first-gen
    - Test builds and functionality

2. 🔄 **Establish shared ESLint baseline** (4 hours)
    - Create shared config with common rules
    - Update generation-specific configs
    - Fix linting errors found
    - Document intentional differences

3. 🔄 **Add require-extensions to second-gen** (2 hours)
    - Install plugin
    - Update configuration
    - Fix import paths

**Total effort:** 9 hours
**Priority:** HIGH
**Owner:** TBD

### Phase 3: CSS and style improvements (Week 3)

**Goal:** Consistent CSS/styling standards

#### Tasks

1. 🔄 **Add Stylelint-Prettier integration** (30 min)
    - Install `stylelint-config-prettier`
    - Update configuration
    - Test for conflicts

2. 🔄 **Review and adjust Stylelint rules** (3 hours)
    - Re-enable `no-duplicate-selectors` with exceptions
    - Change `no-descending-specificity` to warning
    - Fix issues found
    - Document patterns

3. 🔄 **Create STYLING.md** (6 hours)
    - Document CSS conventions
    - Document import organization
    - Document naming conventions
    - Add examples

**Total effort:** 9.5 hours
**Priority:** MEDIUM
**Owner:** TBD

### Phase 4: TypeScript and configuration optimization (Week 4)

**Goal:** Optimize TypeScript configurations

#### Tasks

1. 🔄 **Standardize TypeScript strict settings** (3 hours)
    - Add `noFallthroughCasesInSwitch` to first-gen
    - Fix any errors found
    - Document differences

2. 🔄 **Document TypeScript configuration architecture** (3 hours)
    - Create guide explaining composite builds
    - Document config inheritance
    - Explain first-gen vs second-gen differences

3. 🔄 **Update VSCode launch configurations** (15 min)
    - Update to current Storybook commands
    - Test debug configurations

**Total effort:** 6.25 hours
**Priority:** MEDIUM
**Owner:** TBD

### Phase 5: Long-term improvements (Ongoing)

**Goal:** Continuous improvement and optimization

#### Tasks

1. 🔄 **Expand cSpell dictionary** (ongoing)
    - Add terms as needed
    - Review false positives

2. 🔄 **Optimize lint-staged performance** (1 hour)
    - Add caching and parallel flags
    - Measure performance improvement

3. 🔄 **Research monorepo tooling** (research phase)
    - Evaluate `eslint-plugin-monorepo`
    - Consider build system improvements
    - Assess cost/benefit

4. 🔄 **Publish custom ESLint plugin** (3 hours)
    - Set up npm package
    - Add documentation
    - Publish to registry

**Total effort:** 4+ hours (excluding research)
**Priority:** LOW
**Owner:** TBD

---

## Summary

### Configuration health: **7/10**

**Strengths:**

- ✅ Comprehensive ESLint coverage with custom rules
- ✅ Good accessibility enforcement via `lit-a11y`
- ✅ Strong pre-commit hooks with lint-staged
- ✅ TypeScript strict mode enabled
- ✅ Copyright header enforcement
- ✅ Conventional commit enforcement

**Critical issues:**

- ⚠️ EditorConfig indentation conflict (4 vs 2 spaces)
- ⚠️ Import sorting divergence (first-gen vs second-gen)
- ⚠️ TypeScript target divergence (ES2018 vs ES2022)

**Moderate issues:**

- ⚠️ Inconsistent ESLint rules between generations
- ⚠️ Prettier configuration split
- ⚠️ Missing Stylelint-Prettier integration
- ⚠️ Aggressive Stylelint rule disabling

### Recommended immediate actions

1. **Fix EditorConfig conflict** - Align example project
2. **Consolidate Prettier config** - Single source of truth
3. **Expand extension recommendations** - Better DX

### Long-term goals

1. **Unified linting standards** - Consistent rules across generations
2. **Complete documentation** - Clear guides for contributors
3. **Optimized tooling** - Faster development cycle
4. **Maintained standards** - Regular reviews and updates

---

**Note:** This review is based on the current state as of October 24, 2025. Configurations should be reviewed quarterly to ensure they remain optimal as the codebase evolves.
