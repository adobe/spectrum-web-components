<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / JSDoc standards

<!-- Document title (editable) -->

# JSDoc standards

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When JSDoc is required](#when-jsdoc-is-required)
- [Class-level JSDoc](#class-level-jsdoc)
    - [@element](#element)
    - [@slot](#slot)
    - [@attribute](#attribute)
    - [@property (class-level)](#property-class-level)
    - [@example](#example)
    - [@fires](#fires)
- [Member-level JSDoc](#member-level-jsdoc)
    - [@internal](#internal)
    - [@todo](#todo)
    - [@param and @returns](#param-and-returns)
    - [@private](#private)
- [Tags and the Custom Elements Manifest](#tags-and-the-custom-elements-manifest)
- [Formatting rules](#formatting-rules)

</details>

<!-- Document content (editable) -->

This guide explains when and how to write JSDoc comments in 2nd-gen components. JSDoc serves two purposes: it documents the code for humans and agents, and it feeds the **Custom Elements Manifest** (CEM) that tools like Storybook use.

## When JSDoc is required

| Location | Required | Purpose |
|----------|----------|---------|
| Class declaration (base) | Yes | Describes the component, declares slots and attributes |
| Class declaration (concrete) | Yes | Declares `@element`, `@example`, and `@slot` (if concrete-only) |
| Public properties | Yes | Describes what the property does |
| Protected getters | Yes, if non-obvious | Explains purpose for subclass authors |
| Static readonly members | Yes | Marks as `@internal` and describes the array |
| Private members | Optional | Useful for complex backing fields or helpers |
| Lifecycle methods | Optional | Only if the logic is non-obvious |

## Class-level JSDoc

Class-level JSDoc goes above the `export abstract class` or `export class` declaration. It describes the component and declares tags that CEM tools consume.

### @element

Declares the custom element tag name. Use this on the **concrete class** (in the SWC package).

**Format:** `@element swc-<component-name>`

**Example from Badge.ts:**

```ts
/**
 * @element swc-badge
 *
 * @example
 * <swc-badge variant="positive">New</swc-badge>
 */
export class Badge extends BadgeBase {
```

**Example from ProgressCircle.ts:**

```ts
/**
 * @element swc-progress-circle
 *
 * @property {string} static-color - Static color variant for use on different backgrounds.
 * @property {number} progress - Progress value between 0 and 100.
 *
 * @example
 * <swc-progress-circle progress="75" label="Loading progress"></swc-progress-circle>
 */
export class ProgressCircle extends ProgressCircleBase {
```

### @slot

Declares the slots the component provides. Use this on the **base class**. If the concrete class adds slots not in the base, declare them on the concrete class.

**Format:**

- Default slot: `@slot - Description`
- Named slot: `@slot name - Description`

**Example from Badge.base.ts:**

```ts
/**
 * A badge is a non-interactive visual indicator used to highlight
 * a status, category, or other metadata.
 *
 * @attribute {ElementSize} size - The size of the badge.
 *
 * @slot - Text label of the badge.
 * @slot icon - Optional icon that appears to the left of the label
 */
export abstract class BadgeBase extends SizedMixin(...) {
```

**Example from StatusLight.base.ts:**

```ts
/**
 * A status light is a great way to convey semantic meaning...
 *
 * @slot - The text label of the status light.
 */
export abstract class StatusLightBase extends SizedMixin(...) {
```

### @attribute

Declares attributes that come from mixins and are not visible as `@property()` decorators on the class itself. This helps CEM and documentation tools discover these attributes.

**Format:** `@attribute {Type} name - Description`

**Example from Badge.base.ts:**

```ts
/**
 * @attribute {ElementSize} size - The size of the badge.
 *
 * @slot - Text label of the badge.
 */
```

Use `@attribute` when:

- A mixin (like `SizedMixin`) adds a property that consumers set via HTML attributes.
- The property is not declared directly on the class.

### @property (class-level)

Declares properties at the class level for CEM tools. This is different from the `@property()` decorator — this is a JSDoc tag that lists properties on the class documentation.

**Format:** `@property {Type} name - Description`

**Example from ProgressCircle.ts:**

```ts
/**
 * @element swc-progress-circle
 *
 * @property {string} static-color - Static color variant for use on different backgrounds.
 * @property {number} progress - Progress value between 0 and 100.
 * @property {boolean} indeterminate - Indeterminate state for loading.
 * @property {string} size - Size of the component.
 * @property {string} label - Label for the component.
 */
```

Use class-level `@property` when you want to document a property that is inherited from the base class but should appear in the concrete class's CEM output.

### @example

Shows how to use the component in HTML. Use this on the **concrete class**. Include at least one simple example and one more complex example when relevant.

**Format:**

```ts
/**
 * @example
 * <swc-badge variant="positive">New</swc-badge>
 *
 * @example
 * <swc-badge variant="neutral" fixed="fill">
 *   <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
 *   Verified
 * </swc-badge>
 */
```

For non-HTML examples (like controller usage), use a fenced code block:

```ts
/**
 * @example
 * ```typescript
 * protected override updated(changes: PropertyValues): void {
 *   // ...
 * }
 * ```
 */
```

### @fires

Declares custom events the component dispatches. This tag is not yet used in 2nd-gen components, but it is consumed by CEM and should be used when a component dispatches events.

**Format:** `@fires event-name - Description`

**Example (not yet in codebase, shown for reference):**

```ts
/**
 * @fires close - Dispatched when the banner is dismissed.
 * @fires change - Dispatched when the value changes.
 */
```

## Member-level JSDoc

Member-level JSDoc goes above individual properties, methods, getters, and setters.

### @internal

Marks a member as **not part of the public API**. Internal members are hidden from documentation and should not be used by consumers. CEM tools exclude `@internal` members from the public manifest.

**Format:** `@internal` (standalone or with description)

**When to use:**

- Static readonly arrays (e.g. `VARIANTS`, `VALID_SIZES`)
- Getters used only for rendering (e.g. `hasIcon`)
- Any member that consumers should not rely on

**Example — standalone (Badge.ts):**

```ts
/**
 * @internal
 */
static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S2;
```

**Example — with description (Badge.base.ts):**

```ts
/**
 * @internal
 *
 * A readonly array of the valid color variants for the badge.
 *
 * Concrete classes override this property with their own set of color
 * variants.
 */
static readonly VARIANTS_COLOR: readonly string[];
```

```ts
// ✅ Good — @internal on the first line, description below
/**
 * @internal
 *
 * A readonly array of the valid color variants for the badge.
 */

// ❌ Bad — description before @internal
/**
 * A readonly array of the valid color variants for the badge.
 *
 * @internal
 */
```

The convention in 2nd-gen is to put `@internal` first, then a blank line, then the description.

### @todo

Marks future work or known issues. Use it to flag things that need attention later.

**Format:** `@todo Description of what needs to be done`

**Example from Badge.base.ts:**

```ts
/**
 * The fixed position of the badge.
 *
 * @todo The purpose of the bespoke getter and setter is unclear. Consider
 * replacing with Lit's default reactive property behavior.
 */
```

**Example from Badge.ts:**

```ts
/**
 * Whether the badge is subtle.
 *
 * @todo This can be moved to the base class once we are no longer maintaining 1st-gen.
 */
```

### @param and @returns

Standard JSDoc tags for function parameters and return values. Use them on methods that have non-obvious parameters.

**Format:**

- `@param {Type} name - Description`
- `@returns {Type} Description`

```ts
// ✅ Good — describes non-obvious parameter
/**
 * Creates a CSS rotation string for the progress indicator.
 *
 * @param rotation - The rotation angle in degrees
 * @returns The CSS rotation value, or undefined if not needed
 */
protected makeRotation(rotation: number): string | undefined { ... }
```

`@param` and `@returns` are optional when the types and names are self-explanatory.

### @private

Marks a method as private for documentation tools. Use the TypeScript `private` keyword instead when possible. The JSDoc `@private` tag is only needed in rare cases where TypeScript visibility is not sufficient (e.g. in plain JavaScript files or for documentation tool compatibility).

## Tags and the Custom Elements Manifest

The CEM analyzer reads JSDoc tags to generate the component manifest. Here is which tags it consumes:

| Tag | CEM field | Level |
|-----|-----------|-------|
| `@element` | Tag name | Class |
| `@slot` | Slots | Class |
| `@attribute` | Attributes | Class |
| `@property` (JSDoc) | Properties | Class |
| `@fires` | Events | Class |
| `@example` | Examples | Class |
| `@internal` | Excludes from public API | Member |

If a tag is missing, the CEM output may be incomplete, and Storybook or other tools may not generate the right documentation.

## Formatting rules

1. **Blank line between description and tags:**

```ts
// ✅ Good
/**
 * A badge is a non-interactive visual indicator.
 *
 * @slot - Text label of the badge.
 */

// ❌ Bad — no blank line
/**
 * A badge is a non-interactive visual indicator.
 * @slot - Text label of the badge.
 */
```

2. **Tag line spacing:** ESLint enforces `jsdoc/tag-lines` with `startLines: 1`. This means there should be one blank line before each tag group and no blank lines after the last tag.

3. **No extra spaces before tags:**

```ts
// ✅ Good
 * @internal

// ❌ Bad — extra space before @
 *  @internal
```

4. **Use sentence case for descriptions.** Do not capitalize every word.

```ts
// ✅ Good
 * A readonly array of the valid color variants for the badge.

// ❌ Bad
 * A Readonly Array Of The Valid Color Variants For The Badge.
```
