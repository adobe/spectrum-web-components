<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Debug and validation

<!-- Document title (editable) -->

# Debug and validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Debug mode API](#debug-mode-api)
- [Reusable validation helpers](#reusable-validation-helpers)
    - [validateEnum() — Union types and enum values](#validateenum--union-types-and-enum-values)
    - [warnIf() — Required, conditionally required, mutually exclusive, and one-off checks](#warnif--required-conditionally-required-mutually-exclusive-and-one-off-checks)
- [Validation by lifecycle hook](#validation-by-lifecycle-hook)
    - [update() — Pre-render validation](#update--pre-render-validation)
    - [firstUpdated() — One-time setup validation](#firstupdated--one-time-setup-validation)
    - [updated() — Post-render validation](#updated--post-render-validation)
    - [connectedCallback() — Environment validation](#connectedcallback--environment-validation)
- [Slot validation](#slot-validation)
    - [validateRequiredSlot() — Required slots](#validaterequiredslot--required-slots)
    - [validateAllowedChildren() — Allowed children](#validateallowedchildren--allowed-children)
- [Deprecation warnings](#deprecation-warnings)
    - [Deprecation warning structure](#deprecation-warning-structure)
    - [Testing deprecation warnings](#testing-deprecation-warnings)
- [Warning message format](#warning-message-format)
- [Known limitations](#known-limitations)

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

## Reusable validation helpers

`@spectrum-web-components/core/utils` exports four helpers that wrap
`window.__swc.warn` for the most common validation shapes. **Use these
instead of hand-writing an `includes()` + `warn()` check.** Doing so keeps
message wording and the `DEBUG` gate consistent across components, and they
are the only thing that needs to change if the underlying warning engine is
ever reworked.

```ts
import {
  validateAllowedChildren,
  validateEnum,
  validateRequiredSlot,
  warnIf,
} from '@spectrum-web-components/core/utils';
```

None of the four require an outer `if (window.__swc?.DEBUG)` check. They
gate on `DEBUG` internally. **They do not manage lifecycle timing for you.**
Calling the right helper from the wrong place can check stale data (a
property that hasn't updated yet) or DOM that doesn't exist yet (slot content
before it's assigned). Which hook to call each helper from:

| Helper / check | Call from | Why |
|---|---|---|
| `validateEnum` | `update()`, before `super.update()` | Runs on every property change, before render commits; see [update()](#update--pre-render-validation). |
| `warnIf`: required property | `firstUpdated()` | One-time check once the DOM exists; see [firstUpdated()](#firstupdated--one-time-setup-validation). |
| `warnIf`: conditionally required property (depends on slot content) | `updated()` | Needs both the current property value *and* rendered/slotted DOM to check against; see [updated()](#updated--post-render-validation). |
| `warnIf`: mutually exclusive / no-effect combination | `update()`, before `super.update()` | Same as enum checks: pure property-to-property comparison, no DOM needed. |
| `warnIf`: ancestor/context requirement | `connectedCallback()` | Needs the element attached to the tree to call `closest()`/traverse context; see [connectedCallback()](#connectedcallback--environment-validation). |
| `validateRequiredSlot`, `validateAllowedChildren` | The slot's own `slotchange` handler | Not a Lit lifecycle hook at all: slot assignment is a separate DOM event. See [Slot validation](#slot-validation). |

Never call any of these from the constructor: no property values have been
set and there's no rendered DOM yet, so every check would run against
placeholder/undefined state.

**Re-firing across renders is expected and handled for you.** `update()`/
`updated()` run on every reactive update, so a `validateEnum`/`warnIf` call
placed there re-evaluates its condition every time; that's correct, not a
bug to guard against with a `changedProperties.has(...)` check (unless the
check is expensive; the existing `Indeterminate` example above guards for
that reason, not to avoid re-firing). Repeated warnings for the *same*
underlying issue don't spam the console: `window.__swc.warn`'s
`localName:type:level:message` dedup (see [Known limitations](#known-limitations)
for the one remaining collision case, across multiple instances of the same
component) suppresses repeat fires within a session regardless of how many
times the lifecycle hook re-runs.

### validateEnum() — Union types and enum values

```ts
protected override update(changedProperties: PropertyValues): void {
  validateEnum(this, {
    prop: 'variant',
    value: this.variant,
    valid: BadgeBase.VARIANTS,
    url: 'https://opensource.adobe.com/spectrum-web-components/components/badge/',
  });
  super.update(changedProperties);
}
```

### warnIf() — Required, conditionally required, mutually exclusive, and one-off checks

`warnIf(element, condition, message, url, options?)` is the general-purpose
primitive: it warns when `condition` is `true`. It covers every validation
shape that isn't an enum or a slot check.

**Required property:**

```ts
protected override firstUpdated(changed: PropertyValues): void {
  super.firstUpdated(changed);
  warnIf(
    this,
    !this.accessibleLabel,
    `<${this.localName}> requires an "accessible-label" attribute to provide an accessible name for the tablist.`,
    'https://opensource.adobe.com/spectrum-web-components/components/tabs/',
    { type: 'accessibility', level: 'high' }
  );
}
```

**Conditionally required property** (e.g. `accessibleLabel` is only required
when no label content is slotted):

```ts
protected override updated(changed: PropertyValues<this>): void {
  super.updated(changed);
  const hasLabelSlotContent = this.labelSlot?.assignedNodes().length ?? 0;
  warnIf(
    this,
    !this.accessibleLabel && !hasLabelSlotContent,
    `<${this.localName}> requires either slotted label content or an "accessible-label" attribute.`,
    'https://opensource.adobe.com/spectrum-web-components/components/example/',
    { type: 'accessibility', level: 'high' }
  );
}
```

**Mutually exclusive / no-effect combination** (e.g. `outline` has no effect
unless `variant` is semantic):

```ts
warnIf(
  this,
  this.outline && !BadgeBase.VARIANTS_SEMANTIC.includes(this.variant),
  `Outline styling requires a semantic variant. Current variant "${this.variant}" is not semantic.`,
  'https://opensource.adobe.com/spectrum-web-components/components/badge/',
  { issues: [`outline + variant="${this.variant}"`] }
);
```

**Component-specific quirk** (for anything that doesn't fit the shapes above,
call `warnIf` directly with whatever predicate the component needs; there is
no separate "quirks" API):

```ts
warnIf(
  this,
  this.indeterminate && this.value !== undefined,
  `Indeterminate progress should not have a value. The value will be ignored.`,
  'https://opensource.adobe.com/spectrum-web-components/components/progress-circle/',
  { issues: ['indeterminate + value'] }
);
```

## Validation by lifecycle hook

Different validation concerns belong in different lifecycle methods. Choose based on when the validation is relevant and what information is available.

The examples below show the underlying `window.__swc.warn` shape each helper
in [Reusable validation helpers](#reusable-validation-helpers) is built on.
New validation code should call `validateEnum()` or `warnIf()` rather than
writing `window.__swc.warn()` directly, but the lifecycle-hook guidance
(which method to override, and why) still applies regardless of which call
you make inside it.

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

## Slot validation

Slot content can't be checked until it's actually assigned, so both helpers
below are wired to the slot's `slotchange` event rather than a Lit lifecycle
hook. Wiring is manual (there is no base-class magic that auto-attaches
these): add a `@slotchange=${this.handleXSlotChange}` on the `<slot>` in
`render()` and call the helper from that handler.

### validateRequiredSlot() — Required slots

```ts
protected override render(): TemplateResult {
  return html`
    <slot name="label" @slotchange=${this.handleLabelSlotChange}></slot>
  `;
}

protected handleLabelSlotChange(event: Event): void {
  validateRequiredSlot(
    this,
    event.target as HTMLSlotElement,
    'label',
    'https://opensource.adobe.com/spectrum-web-components/components/example/'
  );
}
```

### validateAllowedChildren() — Allowed children

Generalizes the pattern IllustratedMessage's heading slot already uses
(previously a one-off `['H2','H3','H4','H5','H6']` allowlist inline in the
component):

```ts
protected handleHeadingSlotChange(event: Event): void {
  validateAllowedChildren(
    this,
    event.target as HTMLSlotElement,
    ['h2', 'h3', 'h4', 'h5', 'h6'],
    'heading',
    'https://opensource.adobe.com/spectrum-web-components/components/illustrated-message/'
  );
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

## Known limitations

**Dedup granularity (partially fixed).** Warnings are deduplicated on
`${localName}:${type}:${level}:${message}` in one **global** `Set`
(`window.__swc.issuedWarnings`) shared across the whole page. The `message`
segment was added specifically so that **two different checks on the same
component no longer suppress each other**. Previously, any two warnings
sharing a `type`/`level` (most calls use the `default`/`default` bucket, so
this was common) collided, and only the first one to fire in a session ever
logged.

One collision case remains, unfixed: the key has no per-instance identity, so
**two different instances of the same component with the identical
message** still collide. Ten `<swc-badge>` elements on a page all set to the
same invalid `variant` still produce exactly **one** console warning (from
whichever updates first), not ten, which is easy to misread as "only one
badge is broken." Set `window.__swc.verbose = true` before components load
to skip the `issuedWarnings` check entirely and log every occurrence, from
every instance, every time. Reach for this when auditing a page for every
instance of a given issue.

**Production stripping (partially fixed).** Each helper in
`dev-validation.ts` now starts with `if (process.env.NODE_ENV === 'production')
return;`, ahead of the `window.__swc?.DEBUG` check. This matters because a
bundler can only dead-code-eliminate a branch it can *prove* false at build
time. `window.__swc?.DEBUG` is a runtime read on a global: no bundler can
know it will be `undefined` just because a *different* file's `if (literal)`
block never assigns it. `process.env.NODE_ENV` is the opposite: once a
bundler replaces it with the literal `"production"`, `if ("production" ===
"production") return;` folds to `if (true) return;`, and a minifier can then
delete everything after it **inside that function**: the dedup lookup, the
message formatting, the `window.__swc.warn` call. That's a real, provable
removal, not a hope.

What this does **not** fix:
- **The call sites themselves.** Every `validateEnum(...)`/`warnIf(...)`
  expression in every component still executes on every `update()`/`updated()`
  pass, in every build, because JS evaluates a function's arguments before
  calling it, so the message template string and `options` object literal
  at each call site are still constructed even when the function itself
  immediately no-ops. This is a small, bounded cost (one string interpolation
  and one small object per call), not a hot-loop concern, but it is not zero.
- **Whether the substitution actually happens.** This package's own build
  does not currently replace `process.env.NODE_ENV` before publishing (it
  ships the literal check as-is), so whether any of the folding above
  actually occurs still depends on either this package's own build pipeline
  being updated to perform the substitution + minification, or the
  *consuming application's* bundler doing so downstream. Neither is
  guaranteed today.
- **The bare-ES-module case.** A consumer loading this package with no
  bundler at all (a raw `<script type="module">` import) still hits a
  `ReferenceError` on `process`, since it's never defined in that
  environment.

The more complete fix, publishing genuinely separate development/production
builds (the pattern React uses: a small entry that `require()`s one of two
fully-built files, so the unused one is never even parsed), is a
significantly larger project (doubled build output, a stripping transform,
doubled test coverage) and is tracked as a follow-up, not attempted here.

In the meantime, point consumers who are worried about shipping dev-mode
code to production at the per-bundler stripping recipes in the
["Only in development"](https://github.com/adobe/spectrum-web-components/blob/main/2nd-gen/packages/swc/.storybook/guides/dev-mode/dev-mode-warnings.mdx)
section of the consumer-facing guide. This package cannot guarantee
stripping on its own, but most bundler configurations already do it
correctly by default.
