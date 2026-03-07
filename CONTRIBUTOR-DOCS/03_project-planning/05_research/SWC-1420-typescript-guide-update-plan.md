<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Research / TypeScript guide update plan

<!-- Document title (editable) -->

# TypeScript guide update plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TypeScript guide update plan](#typescript-guide-update-plan)
  - [Summary](#summary)
  - [Source analysis](#source-analysis)
    - [Key findings from SWC-1419](#key-findings-from-swc-1419)
    - [Key findings from SWC-1420](#key-findings-from-swc-1420)
  - [Update plan by guide](#update-plan-by-guide)
    - [01\_file-organization.md](#01_file-organizationmd)
    - [10\_naming-conventions.md](#10_naming-conventionsmd)
    - [13\_mixin-composition.md](#13_mixin-compositionmd)
    - [15\_directive-composition.md](#15_directive-compositionmd)
  - [New guides to create](#new-guides-to-create)
    - [09\_rendering-patterns.md (new)](#09_rendering-patternsmd-new)
    - [firstUpdated() — One-time setup validation](#firstupdated--one-time-setup-validation)
    - [updated() — Post-render validation](#updated--post-render-validation)
    - [connectedCallback() — Environment validation](#connectedcallback--environment-validation)
  - [Priority order](#priority-order)
    - [High priority (documentation-source mismatch)](#high-priority-documentation-source-mismatch)
    - [Medium priority (missing documentation)](#medium-priority-missing-documentation)
    - [Low priority (clarifications and minor updates)](#low-priority-clarifications-and-minor-updates)
  - [Implementation checklist](#implementation-checklist)
    - [Phase 1: High priority updates](#phase-1-high-priority-updates)
    - [Phase 2: Medium priority updates](#phase-2-medium-priority-updates)
    - [Phase 3: Low priority updates](#phase-3-low-priority-updates)
    - [Phase 4: README and cross-references](#phase-4-readme-and-cross-references)
    - [Phase 5: Code fixes (separate from guide updates)](#phase-5-code-fixes-separate-from-guide-updates)

</details>

<!-- Document content (editable) -->

This document outlines the plan to update the TypeScript style guides in `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/` based on findings from the research documents, that should be deeply understood:

- [SWC-1419: Full pattern research](SWC-1419_research-full-patterns.md)
- [SWC-1420: Documentation vs implementation inconsistencies](SWC-1420-research-inconsistencies.md)

## Summary

The research documents identified three categories of issues requiring guide updates:

1. **Standards to formalize** — Patterns that exist in the codebase but need explicit documentation
2. **Documentation-to-implementation gaps** — Documentation that is correct but source code doesn't follow
3. **Implementation-to-documentation gaps** — Source code patterns not yet documented

This plan maps each finding to specific guide sections and provides concrete content recommendations.

---

## Source analysis

### Key findings from SWC-1419

The [full pattern research](SWC-1419_research-full-patterns.md) identified these standards to formalize:

| Standard | Current state | Guide to update |
|----------|--------------|-----------------|
| Mixin depth limit (max 2) | Not documented | 13_mixin-composition.md |
| Lifecycle usage patterns | Partially documented | 06_method-patterns.md |
| Styles getter pattern | Both patterns shown as valid | 02_class-structure.md |
| Type prefix naming (underscores) | Documented in 08 | 08_component-types.md, 10_naming-conventions.md |
| Property decorator completeness | Not explicit | 04_lit-decorators.md |
| Class-level JSDoc requirements | Partially documented | 07_jsdoc-standards.md |
| Role assignment (unconditional) | Not documented | 06_method-patterns.md (new section) |
| CSS class prefix (`swc-*`) | Documented elsewhere | 10_naming-conventions.md |
| Debug validation patterns | Not documented | New guide needed |

### Key findings from SWC-1420

The [inconsistencies research](SWC-1420-research-inconsistencies.md) identified these gaps:

**Documentation-to-implementation gaps (code fixes needed):**

| Issue | Affected file | Fix type |
|-------|--------------|----------|
| Asset uses `spectrum-` prefix | `Asset.ts` | Code fix |
| Asset uses ternary instead of `when()` | `Asset.ts` | Code fix |
| Divider uses property instead of getter | `Divider.ts` | Code fix |
| ProgressCircle uses `progressCircleStyles` | `ProgressCircle.ts` | Code fix |

**Implementation-to-documentation gaps (guide updates needed):**

| Pattern | Current state | Guide to update |
|---------|--------------|-----------------|
| Helper functions in component files | Not documented | New: 09_rendering-patterns.md |
| Utility imports for rendering | Not documented | 01_file-organization.md |
| Inline SVG rendering | Not documented | New: 09_rendering-patterns.md |
| Size attribute transformation | Not documented | New: 09_rendering-patterns.md |

**Internal inconsistencies (guidance clarification needed):**

| Issue | Resolution | Guide to update |
|-------|-----------|-----------------|
| JSDoc completeness varies | Define minimum requirements | 07_jsdoc-standards.md |
| Section separator line length | Standardize lengths | 02_class-structure.md |
| Styles getter vs property | Pick one pattern | 02_class-structure.md |

---

## Update plan by guide

### 01_file-organization.md

**Updates needed:**

1. **Add utility imports section** — Document the available utilities in core and when to import them:

   ```markdown
   ## Core utilities

   The core package provides utility functions that concrete classes may import for rendering:

   | Utility | Import path | Purpose |
   |---------|------------|---------|
   | `capitalize` | `@spectrum-web-components/core/utils/index.js` | Capitalize a string for CSS class generation |

   **Example from Divider.ts:**

   ```ts
   import { capitalize } from '@spectrum-web-components/core/utils/index.js';

   // Used in render
   [`swc-Divider--static${capitalize(this.staticColor)}`]: this.staticColor != null,
   ```
   ```

2. **Standardize CSS import naming** — Add explicit guidance that CSS imports should use `styles`:

   ```markdown
   ### Style imports

   CSS imports always use `styles` as the import name:

   ```ts
   // ✅ Good
   import styles from './badge.css';

   // ❌ Bad — component-specific name
   import progressCircleStyles from './progress-circle.css';
   ```
   ```

**Source:** SWC-1420 §2.2, §1.4

---

### 02_class-structure.md

**Updates needed:**

1. **Standardize on getter pattern for styles** — Update the RENDERING & STYLING section to recommend the getter pattern only:

   ```markdown
   ### Section: RENDERING and STYLING

   This section holds the component's styles and `render()` method.

   **Styles declaration:**

   Always use the getter pattern for styles. This provides consistency with Lit conventions and allows for easier extension:

   ```ts
   // ✅ Good — getter pattern
   public static override get styles(): CSSResultArray {
     return [styles];
   }

   // ❌ Bad — property pattern (inconsistent)
   public static override styles: CSSResultArray = [styles];
   ```
   ```

2. **Standardize section separator lengths** — Add concrete character counts:

   ```markdown
   ## Section comment format

   Section comments use ASCII box-drawing characters with consistent line widths:

   | Section | Line width (chars) |
   |---------|-------------------|
   | `API TO OVERRIDE` | 25 |
   | `SHARED API` | 18 |
   | `IMPLEMENTATION` | 22 |
   | `API OVERRIDES` | 20 |
   | `API ADDITIONS` | 19 |
   | `RENDERING & STYLING` | 30 |

   **Standard formats:**

   ```ts
   // ─────────────────────────
   //     API TO OVERRIDE
   // ─────────────────────────

   // ──────────────────
   //     SHARED API
   // ──────────────────

   // ──────────────────────
   //     IMPLEMENTATION
   // ──────────────────────

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
   ```

3. **Add guidance for simple components** — Clarify when section separators are optional:

   ```markdown
   ## When to omit sections

   ...existing content...

   **Guidance for simple concrete classes:**

   For concrete classes with only a `render()` method and styles (no overrides or additions), section separators are optional but recommended for consistency. If omitted, the class should still follow the property/method ordering rules.

   **Example — simple component without separators (acceptable):**

   ```ts
   export class Divider extends DividerBase {
     public static override get styles(): CSSResultArray {
       return [styles];
     }

     protected override render(): TemplateResult {
       return html`...`;
     }
   }
   ```
   ```

**Source:** SWC-1420 §1.3, §3.3, §1.5

---

### 03_typescript-modifiers.md

**Updates needed:**

No significant changes needed. The guide is comprehensive.

---

### 04_lit-decorators.md

**Updates needed:**

1. **Emphasize type option requirement** — Add explicit guidance that `type` is always required:

   ```markdown
   ## @property()

   ...existing content...

   **Required options:**

   Always specify the `type` option, even for string properties. This ensures correct attribute conversion and makes the property's type explicit:

   ```ts
   // ✅ Good — type is explicit
   @property({ type: String, reflect: true })
   public variant: BadgeVariant = 'informative';

   // ❌ Bad — missing type option
   @property({ reflect: true })
   public variant: BadgeVariant = 'informative';
   ```

   While Lit defaults to `String`, omitting `type` makes it unclear whether the omission was intentional.
   ```

**Source:** SWC-1419 §Standards to formalize (property decorator completeness)

---

### 05_property-patterns.md

**Updates needed:**

No significant changes needed. The guide is comprehensive.

---

### 06_method-patterns.md

**Updates needed:**

1. **Clarify lifecycle method usage** — Add a decision guide for `update()` vs `updated()`:

   ```markdown
   ## Lifecycle method selection

   Choose the correct lifecycle method based on what you need to do:

   | Task | Method | Reason |
   |------|--------|--------|
   | Validate property values | `update()` | Runs before render; can log warnings before DOM changes |
   | Set ARIA attributes based on properties | `updated()` | Runs after render; DOM is available |
   | One-time ARIA role setup | `firstUpdated()` | Only runs once; role should not change |
   | Pre-render state preparation | `update()` | Prepare state before template is evaluated |

   **Validation in update():**

   Debug-mode validation should run in `update()` so warnings appear before the render:

   ```ts
   protected override update(changedProperties: PropertyValues): void {
     super.update(changedProperties);
     if (window.__swc?.DEBUG) {
       // Validate variant, size, etc.
     }
   }
   ```

   **ARIA in updated():**

   ARIA attribute changes that depend on property values should run in `updated()`:

   ```ts
   protected override updated(changed: PropertyValues<this>): void {
     super.updated(changed);
     if (changed.has('vertical')) {
       if (this.vertical) {
         this.setAttribute('aria-orientation', 'vertical');
       } else {
         this.removeAttribute('aria-orientation');
       }
     }
   }
   ```
   ```

2. **Add role assignment guidance** — Add a new section on ARIA role assignment:

   ```markdown
   ## ARIA role assignment

   Components should be opinionated about their semantic role. Set the role unconditionally in `firstUpdated()` — do not check for an existing role attribute:

   ```ts
   // ✅ Good — unconditional role assignment
   protected override firstUpdated(changed: PropertyValues): void {
     super.firstUpdated(changed);
     this.setAttribute('role', 'separator');
   }

   // ❌ Bad — conditional role assignment
   protected override firstUpdated(changed: PropertyValues): void {
     super.firstUpdated(changed);
     if (!this.hasAttribute('role')) {
       this.setAttribute('role', 'separator');
     }
   }
   ```

   **Rationale:** Components should express their semantic purpose clearly. If a consumer needs a different role, they can override it in their own code after the component renders. Checking for an existing role adds complexity and can mask misuse.
   ```

**Source:** SWC-1419 §Standards to formalize, SWC-1420 §3.4

---

### 07_jsdoc-standards.md

**Updates needed:**

1. **Define minimum JSDoc requirements for concrete classes** — Add concrete requirements:

   ```markdown
   ## Minimum JSDoc requirements

   **Base classes must have:**

   - Component description
   - `@slot` tags for all slots
   - `@attribute` tags for mixin-provided attributes (e.g., `size` from `SizedMixin`)

   **Concrete classes must have:**

   - `@element` tag with the custom element tag name
   - At least one `@example` showing basic usage
   - `@slot` tags for any concrete-only slots

   **Example — minimum concrete class JSDoc:**

   ```ts
   /**
    * @element swc-divider
    *
    * @example
    * <swc-divider></swc-divider>
    *
    * @example
    * <swc-divider vertical></swc-divider>
    */
   export class Divider extends DividerBase {
   ```

   **Example — comprehensive concrete class JSDoc:**

   ```ts
   /**
    * @element swc-badge
    *
    * @property {string} variant - The visual variant of the badge.
    * @property {boolean} subtle - Whether the badge uses subtle styling.
    *
    * @example
    * <swc-badge variant="positive">New</swc-badge>
    *
    * @example
    * <swc-badge variant="neutral" fixed="fill">
    *   <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    *   Verified
    * </swc-badge>
    */
   export class Badge extends BadgeBase {
   ```
   ```

2. **Add @fires documentation** — Expand the `@fires` section with when to use it:

   ```markdown
   ### @fires

   Declares custom events the component dispatches. This tag is consumed by CEM and should be used when a component dispatches any custom event.

   **When to use:**

   - The component dispatches a `CustomEvent` with `dispatchEvent()`
   - The event is part of the component's public API (consumers listen for it)

   **Format:** `@fires event-name - Description`

   **Example:**

   ```ts
   /**
    * @element swc-alert-banner
    *
    * @fires close - Dispatched when the banner is dismissed.
    */
   export class AlertBanner extends AlertBannerBase {
   ```

   **Event naming conventions:**

   - Use lowercase, kebab-case event names: `close`, `value-change`, `selection-change`
   - Match standard DOM event names where applicable: `change`, `input`
   - Prefix with `swc-` only for events that need namespacing to avoid conflicts
   ```

**Source:** SWC-1420 §3.1, SWC-1419 §Standards to formalize

---

### 08_component-types.md

**Updates needed:**

1. **Cross-reference naming conventions** — Add a note linking to the naming guide:

   ```markdown
   ## Naming conventions

   ...existing content...

   > **See also:** [Naming conventions](../../02_style-guide/02_typescript/10_naming-conventions.md) for the full naming rules, including the rationale for underscore-separated prefixes.
   ```

The guide is already comprehensive with the underscore-separated prefix rule. No other changes needed.

**Source:** SWC-1419 §Standards to formalize

---

### 10_naming-conventions.md

**Updates needed:**

1. **Add CSS class naming section** — Document the `swc-` prefix requirement:

   ```markdown
   ## CSS class names

   CSS classes use the `swc-` prefix with PascalCase component name and optional BEM-style modifiers:

   | Pattern | Example |
   |---------|---------|
   | Base class | `swc-Badge`, `swc-Divider`, `swc-StatusLight` |
   | Size modifier | `swc-Badge--sizeS`, `swc-Divider--sizeM` |
   | Variant modifier | `swc-Badge--positive`, `swc-Badge--subtle` |
   | Element (rare) | `swc-Badge-icon`, `swc-Badge-label` |

   **Never use the `spectrum-` prefix** — this is reserved for 1st-gen compatibility:

   ```css
   /* ✅ Good */
   .swc-Badge { }
   .swc-Badge--positive { }

   /* ❌ Bad — 1st-gen prefix */
   .spectrum-Badge { }
   .spectrum-Badge--positive { }
   ```

   **Size modifier format:**

   Size modifiers use the size value uppercased: `--sizeS`, `--sizeM`, `--sizeL`, `--sizeXL`:

   ```ts
   [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null
   ```
   ```

2. **Add constant naming emphasis** — Reinforce the underscore rule:

   ```markdown
   ## Constant names

   ...existing content...

   **Critical rule: underscore-separated prefixes**

   Multi-word component names always use underscores between words. This ensures constants are greppable and consistent:

   ```ts
   // ✅ Good — consistent underscore separation
   STATUS_LIGHT_VARIANTS
   PROGRESS_CIRCLE_VALID_SIZES
   ACTION_BUTTON_VARIANTS

   // ❌ Bad — merged words
   STATUSLIGHT_VARIANTS
   PROGRESSCIRCLE_VALID_SIZES
   ACTIONBUTTON_VARIANTS
   ```

   If existing code uses merged prefixes, rename to the underscore-separated form and provide deprecated re-exports for backward compatibility (see [Component types](../../02_style-guide/02_typescript/08_component-types.md#constant-prefixes)).
   ```

**Source:** SWC-1420 §1.1, SWC-1419 §Standards to formalize

---

### 11_base-vs-concrete.md

**Updates needed:**

No significant changes needed. The guide is comprehensive.

---

### 12_composition-patterns.md

**Updates needed:**

1. **Add mixin depth guidance** — Reference the mixin composition guide's depth limit:

   ```markdown
   ## Decision guide

   ...existing content...

   **Mixin depth limit:**

   Components should have a maximum mixin depth of 2. If more behavior is needed, use controllers instead of additional mixins. See [Mixin composition](../../02_style-guide/02_typescript/13_mixin-composition.md) for the rationale (after the mixin depth limit section is added).
   ```

**Source:** SWC-1419 §Patterns to modernize or simplify

---

### 13_mixin-composition.md

**Updates needed:**

1. **Add mixin depth limit section** — Document the max depth of 2:

   ```markdown
   ## Mixin depth limit

   **Target: maximum 2 mixins** (plus `SpectrumElement`)

   Complex mixin chains (3+ mixins deep) are harder to debug and understand. If a component needs more than 2 mixins worth of behavior, consider using a controller for some of the cross-cutting concerns.

   **Acceptable (depth ≤ 2):**

   ```ts
   // Depth 2: SizedMixin → ObserveSlotText → SpectrumElement
   export abstract class StatusLightBase extends SizedMixin(
     ObserveSlotText(SpectrumElement),
     { noDefaultSize: true }
   ) {
   ```

  **Consider refactoring (depth > 2):**

  If adding a 3rd mixin, refactor to use a controller instead:

   ```ts
   // Depth 3: SizedMixin → ObserveSlotText → ObserveSlotPresence → SpectrumElement
   // @todo review — exceeds target depth of 2
   export abstract class BadgeBase extends SizedMixin(
     ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
     { noDefaultSize: true }
   ) {
   ```

   > BadgeBase currently uses 3 mixins (SizedMixin → ObserveSlotText → ObserveSlotPresence → SpectrumElement). This exceeds the target but works because the mixins are orthogonal. There is a `@todo` in the codebase to review this composition:

   **Refactoring example:**

   If you need focus management, validation, and locale-aware formatting:

   ```ts
   // ❌ Too deep — 3 mixins
   FocusableMixin(ValidatableMixin(LocaleMixin(SpectrumElement)))

   // ✅ Better — 2 mixins + 1 controller
   export abstract class MyComponentBase extends FocusableMixin(
     ValidatableMixin(SpectrumElement)
   ) {
     private localeController = new LanguageResolutionController(this);
   }
   ```
   ```

**Source:** SWC-1419 §Patterns to modernize or simplify, §Mixin chain simplification

---

### 14_controller-composition.md

**Updates needed:**

1. **Add controller catalog section** — Reference controllers available and planned:

   ```markdown
   ## Available controllers

   | Controller | Location | Purpose |
   |-----------|----------|---------|
   | `LanguageResolutionController` | `core/controllers/language-resolution.ts` | Resolve locale for formatting |

   ## Planned controllers
   The following controllers exist in 1st-gen and may be ported to 2nd-gen core:

   | Controller | 1st-gen location | Purpose |
   |-----------|-----------------|---------|
   | `RovingTabindexController` | `1st-gen/packages/shared/` | Keyboard navigation |
   | `PlacementController` | `1st-gen/packages/overlay/` | Overlay positioning |
   | `MatchMediaController` | `1st-gen/packages/picker/` | Device-adaptive behavior |
   | `PendingStateController` | `1st-gen/packages/button/` | Loading states |
   | `InteractionController` (base) | `1st-gen/packages/overlay/` | Base for trigger behavior |
   | `ClickController` | `1st-gen/packages/overlay/` | Click-to-open overlay |
   | `HoverController` | `1st-gen/packages/overlay/` | Hover-to-open overlay |
   | `LongpressController` | `1st-gen/packages/overlay/` | Longpress-to-open overlay |
   | `ColorController` | `1st-gen/tools/reactive-controllers/` | Color validation/conversion |
   | `GridController` | `1st-gen/tools/grid/` | Grid layout with virtual scrolling |

   See [SWC-1419 research](../../03_project-planning/05_research/SWC-1419_research-full-patterns.md#priority-1-focus-management-infrastructure) for the full infrastructure roadmap.
   ```

**Source:** SWC-1419 §Shared infrastructure gap analysis

---

### 15_directive-composition.md

**Updates needed:**

1. **Emphasize `when` over ternary** — Strengthen the guidance:

   ```markdown
   ### when

   ...existing content...

   **Always prefer `when` over ternary operators** for conditional rendering:

   ```ts
   // ✅ Good — when directive
   ${when(this.hasIcon, () => html`<slot name="icon"></slot>`)}

   // ❌ Bad — ternary with empty string
   ${this.hasIcon ? html`<slot name="icon"></slot>` : ''}

   // ❌ Bad — nested ternary
   ${this.variant === 'file'
     ? file(this.label)
     : this.variant === 'folder'
       ? folder(this.label)
       : html`<slot></slot>`}
   ```

   For multiple conditions, use multiple `when` directives or refactor to a helper method.
   ```

**Source:** SWC-1420 §1.2

---

### 16_interface-composition.md

**Updates needed:**

No significant changes needed. The guide is comprehensive.

---

### README.md

**Updates needed:**

1. **Add new guides to the list** — Once created, add entries for the new guides:

   ```markdown
   - **[Rendering patterns](09_rendering-patterns.md)** — Helper functions, inline SVG, size transformations, and classMap patterns.
   - **[Debug and validation](17_debug-validation.md)** — Debug-mode validation, warning patterns, and the `window.__swc` API.
   ```

   > **Note:** These files do not exist yet — they will be created as part of Phase 2/3 implementation.

---

## New guides to create

### 09_rendering-patterns.md (new)

Create a new guide covering rendering-specific patterns not covered elsewhere:

**Sections to include:**

1. **Helper functions** — When and how to define module-level helper functions:

   ```markdown
   ## Helper functions

   For complex or reusable template fragments, define helper functions at the top of the file, outside the class:

   ```ts
   // After imports, before class
   const file = (label: string): TemplateResult => html`
     <svg class="swc-Asset-file" ...>...</svg>
   `;

   const folder = (label: string): TemplateResult => html`
     <svg class="swc-Asset-folder" ...>...</svg>
   `;

   export class Asset extends AssetBase {
     protected override render(): TemplateResult {
       return html`
         ${when(this.variant === 'file', () => file(this.label))}
         ${when(this.variant === 'folder', () => folder(this.label))}
       `;
     }
   }
   ```

   **When to use:**

   - Template fragment is used multiple times
   - Fragment is complex (SVG, multiple elements)
   - Fragment needs parameters

   **When not to use:**

   - Simple conditional rendering (use `when` directly)
   - Single-use template fragments (inline in render)
   ```

2. **Size attribute transformation** — Document the `toUpperCase()` pattern:

   ```markdown
   ## Size modifier pattern

   Size-based CSS classes use the size value uppercased:

   ```ts
   class=${classMap({
     ['swc-Badge']: true,
     [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,
   })}
   ```

   This produces classes like `swc-Badge--sizeS`, `swc-Badge--sizeM`, etc.
   ```

3. **Inline SVG rendering** — Document accessibility requirements:

   ```markdown
   ## Inline SVG

   When rendering inline SVGs, ensure accessibility:

   ```ts
   const icon = (label: string): TemplateResult => html`
     <svg
       class="swc-Asset-icon"
       role="img"
       aria-label=${label}
       viewBox="0 0 24 24"
     >
       <!-- ... -->
     </svg>
   `;
   ```

   **Required attributes:**

   - `role="img"` — Identifies the SVG as an image for assistive technology
   - `aria-label` — Provides accessible name (or use `aria-labelledby`)
   ```

4. **classMap patterns** — Document key syntax and when to use computed keys:

   ```markdown
   ## classMap patterns

   Use bracketed string keys for all class names in `classMap`:

   ```ts
   class=${classMap({
     ['swc-Badge']: true,  // Bracketed string key
     [`swc-Badge--size${this.size?.toUpperCase()}`]: this.size != null,  // Template literal
   })}
   ```

   **Why bracketed keys:**

   - Consistent syntax across all entries
   - Required for computed keys (template literals)
   - Makes the pattern visually uniform
   ```

**Source:** SWC-1420 §2.1, §2.3, §2.4, §3.2

---

### 17_debug-validation.md (new)

Create a new guide covering debug-mode validation patterns:

**Sections to include:**

1. **The debug API** — Document `window.__swc`:

   ```markdown
   ## Debug mode API

   The `window.__swc` object provides debug utilities:

   ```ts
   interface SWCDebug {
     DEBUG: boolean;
     warn(element: HTMLElement, message: string, url?: string, options?: { issues?: string[] }): void;
   }
   ```

   Debug mode is enabled by setting `window.__swc.DEBUG = true` before components load.
   ```

2. **Validation patterns by lifecycle hook** — Document what to validate in each hook and why:

   ```markdown
   ## Validation by lifecycle hook

   Different validation concerns belong in different lifecycle methods. Choose based on when the validation is relevant and what information is available.

   ### update() — Pre-render validation

   **What to validate:**
   - Property values against allowed values (variant, size, etc.)
   - Property combinations that are invalid together
   - Required properties that affect rendering

   **Why update():**
   - Runs before render, so warnings appear before DOM changes
   - Can short-circuit or adjust state before template evaluation
   - Consistent with Lit's unidirectional data flow

   ```ts
   protected override update(changedProperties: PropertyValues): void {
     super.update(changedProperties);
     if (window.__swc?.DEBUG) {
       const constructor = this.constructor as typeof BadgeBase;
       // Validate variant value
       if (!constructor.VARIANTS.includes(this.variant)) {
         window.__swc.warn(
           this,
           `Invalid variant "${this.variant}". Valid variants: ${constructor.VARIANTS.join(', ')}.`,
           'https://opensource.adobe.com/spectrum-web-components/components/badge/',
           { issues: [`variant="${this.variant}"`] }
         );
       }
       // Validate property combinations
       if (this.outline && !constructor.VARIANTS_SEMANTIC.includes(this.variant)) {
         window.__swc.warn(
           this,
           `Outline styling requires a semantic variant.`,
           'https://opensource.adobe.com/spectrum-web-components/components/badge/',
           { issues: [`outline + variant="${this.variant}"`] }
         );
       }
     }
   }
   ```

   ### firstUpdated() — One-time setup validation

   **What to validate:**
   - Required attributes that must be present at initialization
   - Attributes that should not change (roles, static configuration)
   - Dependencies on external elements (labelled-by targets)

   **Why firstUpdated():**
   - Runs only once after first render
   - DOM is available for attribute checks
   - Good for "did you forget to configure X?" warnings

   ```ts
   protected override firstUpdated(changed: PropertyValues): void {
     super.firstUpdated(changed);
     if (window.__swc?.DEBUG) {
       // Warn if no accessible label is provided
       if (!this.label && !this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
         window.__swc.warn(
           this,
           `Missing accessible label. Provide a "label" attribute or "aria-label".`,
           'https://opensource.adobe.com/spectrum-web-components/components/progress-circle/',
           { issues: ['accessibility'] }
         );
       }
     }
   }
   ```

   ### updated() — Post-render validation

   **What to validate:**
   - ARIA state consistency after property changes
   - DOM structure requirements (slotted content validation)
   - Computed style or layout issues

   **Why updated():**
   - Runs after render, so DOM reflects current state
   - Can check rendered output and slot assignments
   - Good for "the current state is problematic" warnings

   ```ts
   protected override updated(changed: PropertyValues<this>): void {
     super.updated(changed);
     if (window.__swc?.DEBUG) {
       // Warn if indeterminate but has a value
       if (changed.has('indeterminate') && this.indeterminate && this.value !== undefined) {
         window.__swc.warn(
           this,
           `Indeterminate progress should not have a value. The value will be ignored.`,
           'https://opensource.adobe.com/spectrum-web-components/components/progress-circle/',
           { issues: ['indeterminate + value'] }
         );
       }
     }
   }
   ```

   ### connectedCallback() — Environment validation

   **What to validate:**
   - Required ancestor elements (form, menu, etc.)
   - Context providers availability
   - Environment capabilities (CSS features, browser support)

   **Why connectedCallback():**
   - Runs when element is added to DOM tree
   - Can traverse ancestors and check context
   - Good for "you put this in the wrong place" warnings

   ```ts
   public override connectedCallback(): void {
     super.connectedCallback();
     if (window.__swc?.DEBUG) {
       // Warn if not inside a form
       if (!this.closest('form')) {
         window.__swc.warn(
           this,
           `This component should be used inside a <form> element.`,
           'https://opensource.adobe.com/spectrum-web-components/components/field/',
           { issues: ['missing form ancestor'] }
         );
       }
     }
   }
   ```
   ```

3. **Warning format** — Document consistent warning messages:

   ```markdown
   ## Warning message format

   Warnings should include:

   - What is invalid
   - What values are valid
   - A link to documentation

   ```ts
   window.__swc.warn(
     this,
     `Invalid variant "${this.variant}". Valid variants: ${constructor.VARIANTS.join(', ')}.`,
     'https://opensource.adobe.com/spectrum-web-components/components/badge/',
     { issues: [`variant="${this.variant}"`] }
   );
   ```
   ```

**Source:** SWC-1419 §Debug and validation patterns, §Centralized validation

---

## Priority order

### High priority (documentation-source mismatch)

These updates fix gaps where documentation and code disagree:

1. **02_class-structure.md** — Standardize on getter pattern for styles
2. **10_naming-conventions.md** — Add CSS class naming section with `swc-` prefix
3. **15_directive-composition.md** — Strengthen `when` directive guidance
4. **01_file-organization.md** — Standardize CSS import naming to `styles`

### Medium priority (missing documentation)

These updates document patterns that exist in code but not in guides:

1. **Create 09_rendering-patterns.md** — Helper functions, SVG, size transformation
2. **06_method-patterns.md** — Add lifecycle selection guide and role assignment section
3. **07_jsdoc-standards.md** — Define minimum requirements for concrete classes
4. **13_mixin-composition.md** — Add mixin depth limit section

### Low priority (clarifications and minor updates)

These updates improve clarity without fixing critical gaps:

1. **02_class-structure.md** — Standardize section separator lengths
2. **04_lit-decorators.md** — Emphasize type option requirement
3. **12_composition-patterns.md** — Reference mixin depth limit
4. **14_controller-composition.md** — Add controller catalog
5. **Create 17_debug-validation.md** — Debug mode patterns

---

## Implementation checklist

### Phase 1: High priority updates

- [ ] Update 02_class-structure.md — styles getter pattern
- [ ] Update 10_naming-conventions.md — CSS class naming
- [ ] Update 15_directive-composition.md — `when` emphasis
- [ ] Update 01_file-organization.md — CSS import naming

### Phase 2: Medium priority updates

- [ ] Create 09_rendering-patterns.md
- [ ] Update 06_method-patterns.md — lifecycle and role assignment
- [ ] Update 07_jsdoc-standards.md — minimum requirements
- [ ] Update 13_mixin-composition.md — depth limit

### Phase 3: Low priority updates

- [ ] Update 02_class-structure.md — separator lengths
- [ ] Update 04_lit-decorators.md — type option
- [ ] Update 12_composition-patterns.md — mixin depth reference
- [ ] Update 14_controller-composition.md — controller catalog
- [ ] Create 17_debug-validation.md

### Phase 4: README and cross-references

- [ ] Update README.md — add new guides
- [ ] Add cross-references between related guides
- [ ] Run nav script to update breadcrumbs and TOCs

### Phase 5: Code fixes (separate from guide updates)

- [ ] Fix Asset.ts — change `spectrum-` to `swc-` prefix
- [ ] Fix Asset.ts — refactor ternary to `when()` directive
- [ ] Fix Divider.ts — change property to getter for styles
- [ ] Fix ProgressCircle.ts — rename `progressCircleStyles` to `styles`
