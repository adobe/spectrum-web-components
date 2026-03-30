<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Lit decorators and modifiers

<!-- Document title (editable) -->

# Lit decorators and modifiers

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Usage summary](#usage-summary)
- [@property()](#property)
- [@query()](#query)
- [@queryAssignedNodes()](#queryassignednodes)
- [Decorators not yet used in 2nd-gen](#decorators-not-yet-used-in-2nd-gen)
    - [@state()](#state)
    - [@queryAll()](#queryall)
    - [@queryAsync()](#queryasync)
    - [@queryAssignedElements()](#queryassignedelements)
    - [@eventOptions()](#eventoptions)
- [CEM and decorators](#cem-and-decorators)

</details>

<!-- Document content (editable) -->

This guide covers the Lit decorators used in 2nd-gen components. Decorators are special annotations that add behavior to class members. They come from the `lit/decorators.js` module.

For more on Lit decorators, see the [Lit decorators documentation](https://lit.dev/docs/components/decorators/).

## Usage summary

| Decorator | Used in 2nd-gen | Files | Purpose |
|-----------|-----------------|-------|---------|
| `@property()` | Yes | 11 | Reactive properties that trigger re-renders |
| `@query()` | Yes | 1 | Query a shadow root element |
| `@queryAssignedNodes()` | Yes | 1 | Query nodes assigned to a slot |
| `@state()` | No | 0 | Internal reactive state |
| `@queryAll()` | No | 0 | Query all matching shadow root elements |
| `@queryAsync()` | No | 0 | Query with updateComplete promise |
| `@queryAssignedElements()` | No | 0 | Query elements assigned to a slot |
| `@eventOptions()` | No | 0 | Event listener options |

## @property()

The most common decorator. It marks a class member as a **reactive property**. When the property changes, the component re-renders. It can also reflect the property to an HTML attribute.

**Import:**

```ts
import { property } from 'lit/decorators.js';
```

**Options:**

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `type` | `Function` | `String` | How to convert the attribute value |
| `reflect` | `boolean` | `false` | Whether to reflect the property back to the attribute |
| `attribute` | `string \| false` | derived from name | Custom attribute name, or `false` to disable |

**Example — simple property with reflection (Badge.ts):**

```ts
@property({ type: Boolean, reflect: true })
public subtle: boolean = false;
```

This creates a `subtle` property. When you set `subtle = true` in JavaScript, the `subtle` attribute appears on the HTML element. When you set `subtle="true"` in HTML, the `subtle` property becomes `true`.

**Example — property with type and reflection (Badge.base.ts):**

```ts
@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';
```

**Example — property with custom attribute name (ProgressCircle.base.ts):**

```ts
@property({ type: String, reflect: true, attribute: 'static-color' })
public staticColor?: ProgressCircleStaticColor;
```

The property is called `staticColor` in JavaScript but `static-color` in HTML. Use the `attribute` option when the HTML attribute name differs from the JavaScript property name.

**Example — property without reflection:**

```ts
@property({ type: String })
public label = '';
```

This property does not reflect. Changing `label` in JavaScript does not update the HTML attribute. Use this for properties that are only set via JavaScript.

```ts
// ✅ Good — reflect: true for attributes consumers set in HTML
@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';

// ✅ Good — no reflection for properties only set in JavaScript
@property({ type: String })
public label = '';

// ❌ Bad — missing type option
@property({ reflect: true })
public variant = 'informative';
```

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

For more, see [Lit reactive properties documentation](https://lit.dev/docs/components/properties/).

## @query()

Queries a single element from the component's shadow root using `querySelector`. The result is cached after the first access.

**Import:**

```ts
import { property, query } from 'lit/decorators.js';
```

**Example from ProgressCircle.base.ts:**

```ts
@query('slot')
private slotEl!: HTMLSlotElement;
```

This is equivalent to calling `this.renderRoot.querySelector('slot')` but caches the result. Use it when you need a reference to an element in the shadow root.

```ts
// ✅ Good — clear selector, typed, private
@query('slot')
private slotEl!: HTMLSlotElement;

// ❌ Bad — querying in a method every time
private get slotEl(): HTMLSlotElement {
  return this.renderRoot.querySelector('slot') as HTMLSlotElement;
}
```

## @queryAssignedNodes()

Queries the nodes assigned to a specific slot. This returns a `NodeList` of all nodes (including text nodes) assigned to the slot.

**Import:**

```ts
import { property, queryAssignedNodes } from 'lit/decorators.js';
```

**Options:**

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `slot` | `string` | `''` (default slot) | Which slot to query |
| `flatten` | `boolean` | `false` | Whether to flatten nested slots |

**Example from ObserveSlotText mixin:**

```ts
@queryAssignedNodes({
  slot: slotName,
  flatten: true,
})
private [assignedNodesList]!: NodeListOf<HTMLElement>;
```

This queries the nodes assigned to the specified slot and flattens nested slots. Use this when you need to observe or react to slotted content.

## Decorators not yet used in 2nd-gen

The following Lit decorators are available but not currently used in 2nd-gen components. They are documented here so contributors know they exist.

### @state()

Marks a property as **internal reactive state**. Like `@property()`, changes trigger a re-render. Unlike `@property()`, `@state()` does not create an HTML attribute and is not part of the public API.

```ts
import { state } from 'lit/decorators.js';

@state()
private _isOpen = false;
```

Use `@state()` for UI state that does not need to be set from HTML or by consumers. For example, whether a dropdown is currently open or a loading animation is playing.

### @queryAll()

Like `@query()`, but returns all matching elements using `querySelectorAll`.

```ts
import { queryAll } from 'lit/decorators.js';

@queryAll('.item')
private items!: NodeListOf<HTMLElement>;
```

### @queryAsync()

Like `@query()`, but returns a promise that resolves after `updateComplete`. Use it when you need the element after rendering is done.

```ts
import { queryAsync } from 'lit/decorators.js';

@queryAsync('#dialog')
private dialog!: Promise<HTMLDialogElement>;
```

### @queryAssignedElements()

Like `@queryAssignedNodes()`, but only returns **elements** (not text nodes). Also supports a `selector` option to filter by CSS selector.

```ts
import { queryAssignedElements } from 'lit/decorators.js';

@queryAssignedElements({ slot: 'icon' })
private icons!: Array<HTMLElement>;
```

### @eventOptions()

Sets event listener options (capture, passive, once) on a method used as an event handler in a template.

```ts
import { eventOptions } from 'lit/decorators.js';

@eventOptions({ passive: true })
private handleScroll(e: Event) {
  // ...
}
```

Then use it in the template: `@scroll=${this.handleScroll}`.

## CEM and decorators

The `@property()` decorator feeds the **Custom Elements Manifest** (CEM). Properties decorated with `@property()` are included in the CEM output, which tools like Storybook use to generate documentation and controls.

`@state()` properties are **not** included in the CEM because they are internal.

JSDoc tags on the class (like `@attribute`, `@slot`, `@element`) also feed CEM. See [JSDoc standards](07_jsdoc-standards.md) for details on which tags CEM consumes.
