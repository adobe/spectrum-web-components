<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Research / SWC-1420: Documentation vs implementation inconsistencies

<!-- Document title (editable) -->

# SWC-1420: Documentation vs implementation inconsistencies

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Category 1: Documentation-to-implementation gaps](#category-1-documentation-to-implementation-gaps)
    - [1.1 CSS class naming prefix](#11-css-class-naming-prefix)
    - [1.2 Conditional rendering directive usage](#12-conditional-rendering-directive-usage)
    - [1.3 Styles definition pattern](#13-styles-definition-pattern)
    - [1.4 CSS import naming](#14-css-import-naming)
    - [1.5 Section separator presence](#15-section-separator-presence)
- [Category 2: Implementation-to-documentation gaps](#category-2-implementation-to-documentation-gaps)
    - [2.1 Helper functions in component files](#21-helper-functions-in-component-files)
    - [2.2 Utility imports for rendering](#22-utility-imports-for-rendering)
    - [2.3 Inline SVG rendering](#23-inline-svg-rendering)
    - [2.4 Size attribute transformation](#24-size-attribute-transformation)
- [Category 3: Internal source code inconsistencies](#category-3-internal-source-code-inconsistencies)
    - [3.1 JSDoc completeness varies significantly](#31-jsdoc-completeness-varies-significantly)
    - [3.2 `classMap` key syntax varies](#32-classmap-key-syntax-varies)
    - [3.3 Section separator line length varies](#33-section-separator-line-length-varies)
    - [3.4 Base class section ordering](#34-base-class-section-ordering)
- [Category 4: Storybook documentation accuracy](#category-4-storybook-documentation-accuracy)
    - [4.1 Claims about consistent APIs](#41-claims-about-consistent-apis)
    - [4.2 Custom property namespace](#42-custom-property-namespace)
    - [4.3 Theme and scale documentation](#43-theme-and-scale-documentation)
- [Recommendations summary](#recommendations-summary)
    - [High priority (documentation-source mismatch)](#high-priority-documentation-source-mismatch)
    - [Medium priority (missing documentation)](#medium-priority-missing-documentation)
    - [Low priority (cosmetic inconsistencies)](#low-priority-cosmetic-inconsistencies)
- [Appendix: Files analyzed](#appendix-files-analyzed)
    - [Documentation files](#documentation-files)
    - [Storybook documentation files](#storybook-documentation-files)
    - [Source code files](#source-code-files)

</details>

<!-- Document content (editable) -->

This research document analyzes the accuracy of documentation in `CONTRIBUTOR-DOCS/`, `2nd-gen/packages/swc/.storybook/guides/`, and `2nd-gen/packages/swc/.storybook/learn-about-swc/` compared to actual patterns and authoring in the 2nd-gen source code.

## Summary

The documentation is largely accurate and well-structured. However, several inconsistencies exist between documented patterns and actual implementation. These fall into three categories:

1. **Documentation-to-implementation gaps**: Documentation is correct but source code doesn't follow it
2. **Implementation-to-documentation gaps**: Source code uses patterns not documented
3. **Internal inconsistencies**: Different components follow different patterns

---

## Category 1: Documentation-to-implementation gaps

### 1.1 CSS class naming prefix

**Documentation says**: The Storybook guide `component-styles.mdx` states that the custom property namespace is `swc` (not `spectrum`), and examples show `swc-Badge`, `swc-Divider`, etc.

**Actual implementation**:
- Badge, Divider, ProgressCircle, StatusLight: Use `swc-` prefix (`swc-Badge`, `swc-Divider`)
- Asset: Uses `spectrum-` prefix (`spectrum-Asset`, `spectrum-Asset-file`)

**Files affected**:
- `2nd-gen/packages/swc/components/asset/Asset.ts` (lines 82-85)

```ts
class=${classMap({
  ['spectrum-Asset']: true,
})}
```

**Recommendation**: Update `Asset.ts` to use `swc-Asset` prefix for consistency, or document the exception in the customization guide.

---

### 1.2 Conditional rendering directive usage

**Documentation says**: The TypeScript style guide (`15_directive-composition.md` referenced in the explorations) recommends using `when()` directive over ternary operators with empty strings for conditional rendering.

**Actual implementation**:
- Badge: Uses `when()` directive correctly
- Asset: Uses ternary operators

**Files affected**:
- `2nd-gen/packages/swc/components/asset/Asset.ts` (lines 87-93)

```ts
${this.variant === 'file'
  ? file(this.label)
  : this.variant === 'folder'
    ? folder(this.label)
    : html`<slot></slot>`}
```

**Recommendation**: Refactor Asset.ts to use the `when()` directive pattern:

```ts
${when(this.variant === 'file', () => file(this.label))}
${when(this.variant === 'folder', () => folder(this.label))}
${when(!this.variant, () => html`<slot></slot>`)}
```

---

### 1.3 Styles definition pattern

**Documentation says**: The class structure guide shows both getter and property patterns as valid:

```ts
public static override get styles(): CSSResultArray { return [styles]; }
// or
public static override styles: CSSResultArray = [styles];
```

**Actual implementation**:
- Badge, Asset, ProgressCircle, StatusLight: Use getter pattern
- Divider: Uses property pattern

**Files affected**:
- `2nd-gen/packages/swc/components/divider/Divider.ts` (line 29)

```ts
public static override styles: CSSResultArray = [styles];
```

**Recommendation**: Document a preference for one pattern (getter recommended for consistency with Lit conventions) and update Divider to match, or explicitly document both as acceptable alternatives.

---

### 1.4 CSS import naming

**Documentation says**: The file organization guide shows default import pattern:

```ts
import styles from './badge.css';
```

**Actual implementation**:
- Badge, Asset, Divider, StatusLight: Use `styles` as the import name
- ProgressCircle: Uses `progressCircleStyles` as the import name

**Files affected**:
- `2nd-gen/packages/swc/components/progress-circle/ProgressCircle.ts` (line 13)

```ts
import progressCircleStyles from './progress-circle.css';
```

**Recommendation**: Standardize on `styles` as the import name for consistency, or document when to use component-specific names.

---

### 1.5 Section separator presence

**Documentation says**: Components should use section separators to organize code. The guide lists when each section should be included.

**Actual implementation**:
- Divider.ts: Has only `RENDERING & STYLING` section but no `API OVERRIDES` section even though it extends a base class that could have overridable members
- Asset.ts: Has only `RENDERING & STYLING` section (correct per documentation since no overrides)

**Observation**: The implementation is technically correct since Divider inherits from DividerBase without needing to override static arrays. However, the inconsistency in whether simple components get section separators at all creates uncertainty.

**Recommendation**: Add a clearer guideline: "For simple concrete classes with only a render method, section separators are optional but recommended for consistency."

---

## Category 2: Implementation-to-documentation gaps

### 2.1 Helper functions in component files

**Not documented**: Asset.ts defines helper functions (`file()`, `folder()`) at the top of the file, outside the class.

**Actual implementation** (`Asset.ts`, lines 20-54):

```ts
const file = (label: string): TemplateResult => html`...`;
const folder = (label: string): TemplateResult => html`...`;
```

**Recommendation**: Add documentation about when and how to define helper functions within component files. Consider adding a section to the file organization guide about module-level helpers.

---

### 2.2 Utility imports for rendering

**Not documented**: Some components import utility functions from core for rendering.

**Actual implementation**:
- Divider and ProgressCircle import `capitalize` from `@spectrum-web-components/core/utils/index.js`

```ts
import { capitalize } from '@spectrum-web-components/core/utils/index.js';
```

**Recommendation**: Document the available utilities in core and when to use them in concrete classes.

---

### 2.3 Inline SVG rendering

**Not documented**: Asset.ts renders inline SVGs for file and folder icons.

**Recommendation**: Document guidelines for when to use inline SVGs vs. icon components, and the accessibility requirements (role="img", aria-label).

---

### 2.4 Size attribute transformation

**Not documented**: Components transform size values differently in CSS class generation.

**Actual implementation**:
- Divider: `this.size?.toUpperCase()` → `swc-Divider--sizeS`
- ProgressCircle: `this.size?.toUpperCase()` → `swc-ProgressCircle--sizeS`
- Badge: Direct interpolation (no transformation shown in documented render)
- StatusLight: `this.size?.toUpperCase()` → `swc-StatusLight--sizeS`

**Recommendation**: Document the size transformation pattern and ensure consistency across all components.

---

## Category 3: Internal source code inconsistencies

### 3.1 JSDoc completeness varies significantly

**Badge.base.ts**: Comprehensive JSDoc with `@attribute`, `@slot`, detailed descriptions

```ts
/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @attribute {ElementSize} size - The size of the badge.
 *
 * @slot - Text label of the badge.
 * @slot icon - Optional icon that appears to the left of the label
 */
```

**Divider.ts**: Minimal JSDoc with only `@element`

```ts
/**
 * @element swc-divider
 */
```

**Asset.ts**: Comprehensive JSDoc with examples

```ts
/**
 * @element swc-asset
 * @slot - content to be displayed when no `variant` is set (typically an `<img>` element)
 *
 * @example
 * <swc-asset>
 *   <img class="spectrum-Asset-image" src="example.png" alt="Example image" />
 * </swc-asset>
 */
```

**Recommendation**: Establish minimum JSDoc requirements for concrete classes and ensure all components meet them. All components should have:
- `@element` tag
- Description of the component
- `@slot` tags for all slots
- At least one `@example`

---

### 3.2 `classMap` key syntax varies

**Some components use**: Bracketed string keys

```ts
['swc-Badge']: true,
[`swc-Badge--${this.variant}`]: typeof this.variant !== 'undefined',
```

**All components use this pattern consistently**, but the documentation could be clearer about when to use bracketed keys vs. plain keys.

---

### 3.3 Section separator line length varies

**Documentation shows**: Variable line lengths that "roughly match the section name length"

**Actual implementation varies**:

```ts
// Badge.ts
// ────────────────────
//     API OVERRIDES
// ────────────────────

// ───────────────────
//     API ADDITIONS
// ───────────────────

// ──────────────────────────────
//     RENDERING & STYLING
// ──────────────────────────────
```

**Recommendation**: While the documentation says lengths don't need to be exact, having a standard would improve readability. Consider documenting specific lengths: 20, 25, or 30 characters depending on section name.

---

### 3.4 Base class section ordering

**Documentation shows**:
1. API TO OVERRIDE
2. SHARED API
3. IMPLEMENTATION

**Badge.base.ts follows this order correctly.**

**StatusLight.base.ts, Divider.base.ts**: Have different structures based on their complexity.

**Observation**: This is acceptable per documentation ("omit empty sections"), but creates variance.

---

## Category 4: Storybook documentation accuracy

### 4.1 Claims about consistent APIs

**first-gen-vs-second-gen.mdx claims**: "More consistent structure and APIs" in 2nd-gen.

**Reality**: While improved, there are still inconsistencies in:
- CSS class naming (spectrum- vs swc-)
- Styles definition pattern (getter vs property)
- JSDoc completeness

**Recommendation**: Acknowledge that 2nd-gen is working toward consistency, or address the remaining inconsistencies in source code.

---

### 4.2 Custom property namespace

**component-styles.mdx states**: "1st-gen: `--mod` removed, namespace changed from `spectrum` to `swc`"

**Reality**: CSS class naming in Asset.ts still uses `spectrum-` prefix, contradicting this claim.

**Recommendation**: Update Asset.ts to use `swc-` prefix or clarify that some legacy patterns may exist.

---

### 4.3 Theme and scale documentation

**theme-scales.mdx** provides comprehensive guidance on theme classes (`.swc-theme--dark`, etc.).

**Observation**: This documentation is accurate and well-structured. No inconsistencies found.

---

## Recommendations summary

### High priority (documentation-source mismatch)

| Issue | Location | Fix |
|-------|----------|-----|
| Asset uses `spectrum-` prefix | `Asset.ts` | Rename to `swc-Asset` |
| Asset uses ternary instead of `when()` | `Asset.ts` | Refactor to use `when()` |
| Inconsistent styles definition pattern | `Divider.ts` | Use getter pattern |

### Medium priority (missing documentation)

| Issue | Location | Fix |
|-------|----------|-----|
| Helper functions in components | File organization guide | Add section on module-level helpers |
| Utility imports for rendering | File organization guide | Document available utilities |
| Size transformation pattern | Class structure guide | Document toUpperCase() pattern |
| Inline SVG guidelines | New doc or existing guide | Add accessibility requirements |

### Low priority (cosmetic inconsistencies)

| Issue | Location | Fix |
|-------|----------|-----|
| CSS import naming | `ProgressCircle.ts` | Standardize to `styles` |
| Section separator lengths | Various | Consider standardizing |
| JSDoc completeness | `Divider.ts` | Add missing JSDoc |

---

## Appendix: Files analyzed

### Documentation files

- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/01_file-organization.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/02_class-structure.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/03_typescript-modifiers.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/04_lit-decorators.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/05_property-patterns.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/06_method-patterns.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/07_jsdoc-standards.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/08_component-types.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/10_naming-conventions.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/11_base-vs-concrete.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/12_composition-patterns.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/13_mixin-composition.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/14_controller-composition.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/15_directive-composition.md`

### Storybook documentation files

- `2nd-gen/packages/swc/.storybook/learn-about-swc/overview.mdx`
- `2nd-gen/packages/swc/.storybook/learn-about-swc/when-to-use-swc.mdx`
- `2nd-gen/packages/swc/.storybook/learn-about-swc/first-gen-vs-second-gen.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/component-styles.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/theme-scales.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/fonts.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/global-elements.mdx`
- `2nd-gen/packages/swc/.storybook/DocumentTemplate.mdx`

### Source code files

- `2nd-gen/packages/core/element/spectrum-element.ts`
- `2nd-gen/packages/core/element/define-element.ts`
- `2nd-gen/packages/core/mixins/sized-mixin.ts`
- `2nd-gen/packages/core/mixins/observe-slot-text.ts`
- `2nd-gen/packages/core/mixins/observe-slot-presence.ts`
- `2nd-gen/packages/core/controllers/language-resolution.ts`
- `2nd-gen/packages/core/components/badge/Badge.base.ts`
- `2nd-gen/packages/core/components/badge/Badge.types.ts`
- `2nd-gen/packages/core/components/asset/Asset.base.ts`
- `2nd-gen/packages/core/components/divider/Divider.base.ts`
- `2nd-gen/packages/core/components/progress-circle/ProgressCircle.base.ts`
- `2nd-gen/packages/core/components/status-light/StatusLight.base.ts`
- `2nd-gen/packages/swc/components/badge/Badge.ts`
- `2nd-gen/packages/swc/components/asset/Asset.ts`
- `2nd-gen/packages/swc/components/divider/Divider.ts`
- `2nd-gen/packages/swc/components/progress-circle/ProgressCircle.ts`
- `2nd-gen/packages/swc/components/status-light/StatusLight.ts`
