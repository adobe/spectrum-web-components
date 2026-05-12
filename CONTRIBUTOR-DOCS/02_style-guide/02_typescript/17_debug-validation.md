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
- [Deprecation warnings](#deprecation-warnings)
    - [Deprecation warning structure](#deprecation-warning-structure)
    - [Testing deprecation warnings](#testing-deprecation-warnings)
- [Warning message format](#warning-message-format)

</details>

<!-- Document content (editable) -->

This guide covers debug-mode validation patterns for 2nd-gen components. Debug validation helps developers catch configuration errors during development without impacting production performance.

## Debug mode API

The `window.__swc` object provides debug utilities:

```ts
interface SWCDebug {
  DEBUG: boolean;
  warn(
    element: HTMLElement,
    message: string,
    url?: string,
    options?: {
      type?: string;
      level?: 'default' | 'low' | 'medium' | 'high' | 'deprecation';
      issues?: string[];
    }
  ): void;
}
```

**Initialization:** The `window.__swc` object is automatically created when the first Spectrum Web Component loads, but only in development builds (`process.env.NODE_ENV === 'development'`). The initialization lives in `@spectrum-web-components/core/element/spectrum-element.ts`. In production builds, `window.__swc` is not created, so all debug checks short-circuit via the optional chaining pattern (`window.__swc?.DEBUG`).

Debug mode is enabled by default in development builds. To disable it, set `window.__swc.DEBUG = false` before components load. In production builds, debug checks are either stripped or short-circuit when `DEBUG` is false.

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

**Why `update()` (and where to put your code):**

Lit’s [`update()`](https://lit.dev/docs/components/lifecycle/#update) “reflects property values to attributes and calls `render()` to update the component’s internal DOM.” In `LitElement`, that happens **inside** `super.update()` when your class extends Lit. So:

- If you call `super.update()` **first** and then run DEBUG code, that code runs **after** `render()` has run for this cycle (still before Lit calls [`updated()`](https://lit.dev/docs/components/lifecycle/#updated)).
- For DEBUG that should fire **before** `render()` and DOM commit, run it **before** `super.update()` in your override, or use [`willUpdate()`](https://lit.dev/docs/components/lifecycle/#willupdate) (Lit calls it before `update()`).

The [reactive update cycle](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle) runs at microtask timing, generally before the browser paints the next frame—but “before paint” is not the same as “before `render()`” inside your component.

**References (Lit):**

- [Lifecycle: `update()`](https://lit.dev/docs/components/lifecycle/#update)
- [Lifecycle: `willUpdate()`](https://lit.dev/docs/components/lifecycle/#willupdate)
- [Lifecycle: `updated()`](https://lit.dev/docs/components/lifecycle/#updated)
- [Reactive update cycle](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle)

**Implementation note:** This repo’s `lit-element` version is the source of truth for exact ordering inside `LitElement.prototype.update` (e.g. `render()` then `super.update()` on `ReactiveElement`, then committing the template). See the `update(changedProperties)` method in the installed `lit-element` package under `node_modules`.

**Example from Badge.base.ts:**

```ts
protected override update(changedProperties: PropertyValues): void {
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
  super.update(changedProperties);
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

- Lit’s [`updated()`](https://lit.dev/docs/components/lifecycle/#updated) runs after the element’s DOM has been updated and rendered for this cycle.
- DOM reflects current state; you can check rendered output and slot assignments.
- Good for “the current state is problematic” warnings.

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

## Deprecation warnings

Use `{ level: 'deprecation' }` when a property or attribute has been superseded by a new API. This signals to consumers that they need to migrate, not just fix a configuration error.

**When to use deprecation warnings:**

- A property is being replaced by a slot (consumer-owned HTML)
- A property value is being renamed (e.g. `variant="cta"` → `variant="accent"`)
- An attribute is being removed, or replaced by a different attribute


### Deprecation warning structure

The key difference from other warnings is `{ level: 'deprecation' }` instead of `{ issues: [...] }`.

```ts
if (window.__swc?.DEBUG) {
  window.__swc.warn(
    this,
    `The "oldProp" property on <${this.localName}> has been deprecated and will be removed in a future release. Use "newProp" instead.`,
    'https://opensource.adobe.com/spectrum-web-components/components/your-component/',
    { level: 'deprecation' }
  );
}
```

### Testing deprecation warnings

Write separate test cases that verify:

1. The warning fires when the deprecated API is used
2. The warning does **not** fire when the recommended API is used

```ts
it('warns when deprecated "heading" property is used', async () => {
  const el = await fixture(html`
    <sp-illustrated-message heading="Title"></sp-illustrated-message>
  `);
  await elementUpdated(el);
  expect(consoleWarnStub.called).to.be.true;
  expect(consoleWarnStub.getCall(0).args[0]).to.include('heading');
});

it('does not warn when slot-based API is used', async () => {
  await fixture(html`
    <sp-illustrated-message>
      <h2 slot="heading">Title</h2>
    </sp-illustrated-message>
  `);
  expect(consoleWarnStub.called).to.be.false;
});
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
