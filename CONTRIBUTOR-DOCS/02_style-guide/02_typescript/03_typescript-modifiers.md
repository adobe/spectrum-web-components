<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / TypeScript modifier keywords

<!-- Document title (editable) -->

# TypeScript modifier keywords

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [static](#static)
- [readonly](#readonly)
- [abstract](#abstract)
- [override](#override)
- [public](#public)
- [protected](#protected)
- [private](#private)
- [Combining modifiers](#combining-modifiers)

</details>

<!-- Document content (editable) -->

This guide explains the TypeScript modifier keywords used in 2nd-gen components. Each keyword controls who can access a class member and how it behaves. Using them correctly keeps the API clear and prevents bugs.

## static

`static` means the member belongs to the **class itself**, not to any instance. Use it for values that are the same across all instances of a component, like valid variant arrays or size lists.

**When to use:**

- Readonly arrays of valid values (e.g. `VARIANTS`, `VALID_SIZES`, `STATIC_COLORS`)
- The `styles` getter in concrete classes

**Example from Badge.base.ts:**

```ts
// ✅ Good — VARIANTS is the same for all Badge instances
static readonly VARIANTS_COLOR: readonly string[];
```

**Example from Badge.ts:**

```ts
// ✅ Good — styles apply to all Badge instances
public static override get styles(): CSSResultArray {
  return [styles];
}
```

```ts
// ❌ Bad — variant values do not belong on each instance
readonly VARIANTS_COLOR: readonly string[];
```

## readonly

`readonly` means the member cannot be reassigned after it is set. Use it with `static` for constant arrays that should never change.

**When to use:**

- Static arrays of valid values

**Example from Badge.base.ts:**

```ts
// ✅ Good — this array should never be reassigned
static readonly VARIANTS: readonly string[];
```

```ts
// ❌ Bad — missing readonly allows accidental reassignment
static VARIANTS: readonly string[];
```

Note that `readonly` on the property prevents reassignment of the reference, while `readonly string[]` in the type prevents mutation of the array contents. Use both for constant arrays.

## abstract

`abstract` means the member has no implementation in this class. Subclasses must provide the implementation. Use it on the base class itself and on methods that each concrete class needs to implement differently.

**When to use:**

- Base classes that should never be instantiated directly
- Methods that each generation implements differently (rare — most overrides use the `override` pattern instead)

**Example — abstract class (every base class):**

```ts
// ✅ Good — BadgeBase cannot be instantiated directly
export abstract class BadgeBase extends SizedMixin(...) {
  // ...
}
```

**Example — abstract method (AlertBanner.base.ts):**

```ts
// ✅ Good — each generation provides its own icon rendering
protected abstract renderIcon(variant: string): TemplateResult;
```

Abstract methods are rare in 2nd-gen. Most base classes use the `API TO OVERRIDE` pattern with concrete default values instead.

## override

`override` tells TypeScript that this member replaces one from the parent class. TypeScript will error if the parent does not have a matching member. This catches typos and API drift.

**When it is required:**

- When a concrete class sets static overrides declared in the base
- When a concrete class narrows the type of a property from the base
- When overriding Lit lifecycle methods (`update`, `firstUpdated`, `updated`, `render`, `connectedCallback`)
- When overriding the `styles` getter

**Example from Badge.ts:**

```ts
// ✅ Good — override tells TypeScript this must match the base class
static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR;

@property({ type: String, reflect: true })
public override variant: BadgeVariant = 'informative';

protected override render(): TemplateResult {
  return html`...`;
}
```

```ts
// ❌ Bad — forgetting override hides the parent member silently
static readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR;

@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';
```

If you forget `override`, TypeScript may not catch the problem, and the base class member could be shadowed instead of properly overridden.

## public

`public` means anyone can access the member — consumers, subclasses, and internal code. In TypeScript, class members are `public` by default, but we write it explicitly for clarity.

**When to use:**

- Properties that are part of the component's public API (e.g. `variant`, `size`, `label`, `subtle`)
- Methods that consumers call (e.g. `close()`)
- Static members (e.g. `static override get styles()`)

**Example from Badge.ts:**

```ts
// ✅ Good — explicit public makes the API clear
@property({ type: Boolean, reflect: true })
public subtle: boolean = false;
```

```ts
// ❌ Bad — implicit public is harder to scan
@property({ type: Boolean, reflect: true })
subtle: boolean = false;
```

Always write `public` explicitly. It makes it easy to scan a class and see what is part of the API vs what is internal.

## protected

`protected` means only the class itself and its subclasses can access the member. Use it for lifecycle methods and helpers that subclasses may need.

**When to use:**

- Lit lifecycle overrides (`update`, `firstUpdated`, `updated`, `render`)
- Internal getters used by subclass rendering (e.g. `hasIcon`)
- Helper methods that subclasses call but consumers should not

**Example from Badge.base.ts:**

```ts
// ✅ Good — hasIcon is used by the concrete class render(), not by consumers
protected get hasIcon(): boolean {
  return this.slotContentIsPresent;
}

// ✅ Good — update is a lifecycle method, not a public API
protected override update(changedProperties: PropertyValues): void {
  super.update(changedProperties);
  // ...
}
```

```ts
// ❌ Bad — using public for a lifecycle method suggests consumers should call it
public override update(changedProperties: PropertyValues): void {
  // ...
}

// ❌ Bad — using private prevents subclasses from accessing it
private get hasIcon(): boolean {
  return this.slotContentIsPresent;
}
```

## private

`private` means only the class itself can access the member. Not subclasses, not consumers. Use it for internal state and helpers that no one else should touch.

**When to use:**

- Backing fields for custom getters/setters (e.g. `_fixed`, `_variant`)
- Controllers attached to the host (e.g. `languageResolver`)
- Internal `@query` elements (e.g. `slotEl`)
- Helper methods that are only used within the class

**Example from Badge.base.ts:**

```ts
// ✅ Good — _fixed is the backing field for the public fixed getter
private _fixed?: FixedValues;
```

**Example from ProgressCircle.base.ts:**

```ts
// ✅ Good — slotEl is only used internally
@query('slot')
private slotEl!: HTMLSlotElement;

// ✅ Good — formatProgress is only used within this class
private formatProgress(): string {
  // ...
}
```

```ts
// ❌ Bad — using protected for a backing field exposes it to subclasses
protected _fixed?: FixedValues;
```

## Combining modifiers

Modifiers can be combined. The order is:

```ts
[public | protected | private] [static] [abstract | override] [readonly] name
```

Common combinations in 2nd-gen:

| Combination | Usage |
|-------------|-------|
| `public static override get styles()` | Concrete class styles |
| `static override readonly VARIANTS` | Concrete class static overrides |
| `public override variant` | Concrete class property override |
| `protected override render()` | Concrete class render method |
| `protected override update()` | Base or concrete lifecycle override |
| `static readonly VARIANTS` | Base class static declarations |
| `protected abstract renderIcon()` | Abstract method in base class |
| `private _fixed` | Backing field for getter/setter |

```ts
// ✅ Good — correct modifier order
public static override get styles(): CSSResultArray {
  return [styles];
}

// ❌ Bad — wrong order (override before static)
public override static get styles(): CSSResultArray {
  return [styles];
}
```
