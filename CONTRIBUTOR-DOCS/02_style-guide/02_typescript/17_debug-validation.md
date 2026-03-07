<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Debug and validation

<!-- Document title (editable) -->

# Debug and validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Debug mode API](#debug-mode-api)
- [Validation by lifecycle hook](#validation-by-lifecycle-hook)
    - [update() — Pre-render validation](#update--pre-render-validation)
    - [firstUpdated() — One-time setup validation](#firstupdated--one-time-setup-validation)
    - [updated() — Post-render validation](#updated--post-render-validation)
    - [connectedCallback() — Environment validation](#connectedcallback--environment-validation)
- [Warning message format](#warning-message-format)

</details>

<!-- Document content (editable) -->

This guide covers debug-mode validation patterns for 2nd-gen components. Debug validation helps developers catch configuration errors during development without impacting production performance.

## Debug mode API

The `window.__swc` object provides debug utilities:

```ts
interface SWCDebug {
  DEBUG: boolean;
  warn(element: HTMLElement, message: string, url?: string, options?: { issues?: string[] }): void;
}
```

Debug mode is enabled by setting `window.__swc.DEBUG = true` before components load. In production builds, debug checks are either stripped or short-circuit when `DEBUG` is false.

**Basic usage:**

```ts
if (window.__swc?.DEBUG) {
  // Debug-only validation code
}
```

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

**Example from Badge.base.ts:**

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

**Example:**

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

**Example:**

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

**Example:**

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

## Warning message format

Warnings should be clear, actionable, and include helpful context. Follow this format:

**Include:**

1. What is invalid
2. What values are valid (if applicable)
3. A link to documentation
4. An issues array for diagnostic tools

**Example:**

```ts
window.__swc.warn(
  this,
  `Invalid variant "${this.variant}". Valid variants: ${constructor.VARIANTS.join(', ')}.`,
  'https://opensource.adobe.com/spectrum-web-components/components/badge/',
  { issues: [`variant="${this.variant}"`] }
);
```

**Writing good warning messages:**

```ts
// ✅ Good — specific, actionable
`Invalid variant "${this.variant}". Valid variants: positive, negative, informative, notice, neutral.`

// ❌ Bad — vague
`Invalid variant.`

// ✅ Good — explains the constraint
`Outline styling requires a semantic variant. Current variant "${this.variant}" is not semantic.`

// ❌ Bad — doesn't explain why
`Cannot use outline with this variant.`
```

**URL format:**

Use the full documentation URL for the component:

```ts
'https://opensource.adobe.com/spectrum-web-components/components/badge/'
```
