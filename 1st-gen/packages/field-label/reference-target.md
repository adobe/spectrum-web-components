# `referenceTarget` — Cross-Shadow-DOM Element Referencing

## The Problem

Web components use Shadow DOM to encapsulate their internal structure. This creates a boundary that ARIA reference attributes (`for`, `aria-labelledby`, `aria-describedby`, `aria-controls`, etc.) cannot cross.

Consider this markup:

```html
<label for="my-checkbox">Accept terms</label>
<sp-checkbox id="my-checkbox"></sp-checkbox>
```

The `sp-checkbox` shadow DOM looks like:

```
<sp-checkbox id="my-checkbox">
  #shadow-root
    <input id="input" type="checkbox" />    ← the actual form control
    <span id="box">...</span>
    <label id="label" for="input"><slot></slot></label>
```

The native `<label for="my-checkbox">` points to the **host element** (`<sp-checkbox>`), but assistive technology needs to interact with the **`<input>`** inside the shadow DOM. The `for` attribute can't reach across the shadow boundary.

### Current workaround in SWC

`sp-field-label` solves this with JavaScript in `FieldLabel.ts`:

```
Is the target in the same shadow root?
  ├─ YES → use aria-labelledby (ID-based reference works)
  └─ NO  → fall back to copying text into aria-label on the internal element
```

This works, but loses the ID-based relationship. The label is no longer _linked_ to the control — it's just a copied string.

## The Solution: `referenceTarget`

`referenceTarget` is a new web platform feature that lets a shadow root declare:

> "When someone references my host element by ID, resolve that reference to this internal element instead."

The shadow root acts as a proxy, forwarding the reference through the boundary.

### How it works

```
                    referenceTarget: 'input'
                           ↓
<label for="cb"> ──→ <sp-checkbox id="cb"> ──→ <input id="input">
                      #shadow-root                (inside shadow DOM)
```

1. The native `<label>` has `for="cb"`, pointing at `<sp-checkbox id="cb">`
2. The browser finds `<sp-checkbox>`, sees its shadow root has `referenceTarget: 'input'`
3. The reference resolves to `<input id="input">` inside the shadow DOM
4. Clicking the label activates the internal `<input>` — just like it would with a native element

### In code

```ts
class Checkbox extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    referenceTarget: 'input', // ← this is the only addition
  };
}
```

That single property enables:

- `<label for="my-checkbox">` → activates the internal `<input>`
- `<div aria-labelledby="my-checkbox">` → resolves to the internal `<input>`
- `<span aria-describedby="my-checkbox">` → resolves to the internal `<input>`
- Any other IDREF-based ARIA attribute

## Components Modified

| Component         | `referenceTarget`         | Internal element                                   |
| ----------------- | ------------------------- | -------------------------------------------------- |
| `sp-checkbox`     | `'input'`                 | `<input type="checkbox" id="input">`               |
| `sp-switch`       | `'input'`                 | `<input type="checkbox" id="input" role="switch">` |
| `sp-textfield`    | `'input'`                 | `<input id="input">` or `<textarea id="input">`    |
| `sp-combobox`     | (inherits from textfield) | `<input id="input" role="combobox">`               |
| `sp-picker`       | `'button'`                | `<button id="button">`                             |
| `sp-color-slider` | `'input'`                 | `<input type="range" id="input">`                  |

## Before vs After

### Before (without `referenceTarget`)

```
<label for="my-textfield">     ──→  <sp-textfield>  ✗ (host is not a form control)
                                       #shadow-root
                                         <input>       ← unreachable from outside
```

`sp-field-label` compensates:

```
<sp-field-label for="tf">  ──→  <sp-textfield id="tf">
                                   └─ JS workaround: copies label text
                                      into aria-label on internal <input>
```

### After (with `referenceTarget: 'input'`)

```
<label for="my-textfield">     ──→  <sp-textfield>  ──→  <input id="input">  ✓
                                       #shadow-root
                                         referenceTarget: 'input'
```

The browser handles the cross-shadow-root resolution natively. No JavaScript workaround needed.

## What this means for `sp-field-label`

With `referenceTarget`, the fallback path in `FieldLabel.ts` that copies text into `aria-label` could eventually be simplified. The `conditionAttributeWithId` / `aria-labelledby` approach would work across shadow boundaries natively, making the same-root vs. different-root branching unnecessary:

```ts
// Before: two code paths
if (targetParent === thisParent) {
  conditionAttributeWithId(focusable, 'aria-labelledby', [this.id]);
} else {
  focusable.setAttribute('aria-label', this.labelText); // lossy fallback
}

// After: one code path (once referenceTarget has broad support)
conditionAttributeWithId(focusable, 'aria-labelledby', [this.id]);
```

## Browser Support

`referenceTarget` is currently available in Chrome behind a flag / origin trial. Check the latest status at:

- [Chrome Platform Status](https://chromestatus.com/feature/5765499640782848)
- [WHATWG HTML spec discussion](https://github.com/nicolo-ribaudo/proposal-cross-root-aria-reflection)

The `shadowRootOptions` property is part of `ShadowRootInit`. Until TypeScript types are updated, you may need type assertions if strict checking is enabled.

## Storybook Demo

A story at `field-label/stories/reference-target.stories.ts` demonstrates all modified components with native `<label for="...">` elements. In a supporting browser, clicking any native label should activate/focus the corresponding component's internal control.
