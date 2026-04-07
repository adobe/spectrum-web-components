<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Property patterns

<!-- Document title (editable) -->

# Property patterns

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Property ordering](#property-ordering)
- [Static properties](#static-properties)
- [Reactive properties with @property()](#reactive-properties-with-property)
- [Default reactive property (Lit default)](#default-reactive-property-lit-default)
- [Custom getter and setter](#custom-getter-and-setter)
- [Backing fields](#backing-fields)

</details>

<!-- Document content (editable) -->

This guide explains how to declare and order properties in 2nd-gen component classes. It covers ordering rules, decorator usage, and when to use a custom getter/setter vs Lit's default behavior.

## Property ordering

Within each [class section](02_class-structure.md), order properties by access level:

1. **public** properties first
2. **protected** properties second
3. **private** properties last

Static properties appear with their section, not grouped separately. For example, `static readonly VARIANTS` goes in `API TO OVERRIDE`, not in a separate "statics" block.

**Example from Badge.base.ts — API TO OVERRIDE section:**

```ts
// Static declarations (public by default)
static readonly VARIANTS_COLOR: readonly string[];
static readonly VARIANTS: readonly string[];

// Public reactive property
@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';
```

**Example from Badge.base.ts — SHARED API section:**

```ts
// Public static constants
static readonly FIXED_VALUES: readonly string[] = FIXED_VALUES;
static readonly VARIANTS_SEMANTIC: readonly string[] = BADGE_VARIANTS_SEMANTIC;

// Public getter/setter
@property({ reflect: true })
public get fixed(): FixedValues | undefined { ... }
public set fixed(fixed: FixedValues | undefined) { ... }

// Private backing field
private _fixed?: FixedValues;
```

## Static properties

Static properties hold values that are the same for every instance of a component. In 2nd-gen, they are used for:

- Arrays of valid values (`VARIANTS`, `VALID_SIZES`, `STATIC_COLORS`)
- The `styles` getter in concrete classes

Static properties always use `static readonly` and are typed as `readonly string[]` or a more specific readonly array type.

```ts
// ✅ Good — static readonly with readonly array type
static readonly VARIANTS_COLOR: readonly string[];

// ❌ Bad — missing readonly on the property
static VARIANTS_COLOR: readonly string[];

// ❌ Bad — mutable array type
static readonly VARIANTS_COLOR: string[];
```

In concrete classes, static overrides use `static override readonly`:

```ts
// ✅ Good
static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR;
```

## Reactive properties with @property()

Use the `@property()` decorator for properties that are part of the component's public API. See [Lit decorators](04_lit-decorators.md) for full decorator options.

Key rules:

- Use `reflect: true` when the property should appear as an HTML attribute because it causes a visual effect in the DOM when present or updated.  
- Use the `type` option to tell Lit how to convert the attribute value.
- Use the `attribute` option when the HTML attribute name differs from the property name (e.g. `static-color` → `staticColor`).

**Example — reflected string property (Badge.base.ts):**

```ts
@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';
```

**Example — reflected boolean property (Badge.ts):**

```ts
@property({ type: Boolean, reflect: true })
public subtle: boolean = false;
```

**Example — custom attribute name (ProgressCircle.base.ts):**

```ts
@property({ type: String, reflect: true, attribute: 'static-color' })
public staticColor?: ProgressCircleStaticColor;
```

**Example — non-reflected property (ProgressCircle.base.ts):**

```ts
@property({ type: String })
public label = '';
```

## Default reactive property (Lit default)

Most properties should use **Lit's default reactive behavior** — just add the `@property()` decorator and set a default value. Lit handles attribute conversion, change detection, and re-rendering automatically.

**Use Lit's default when:**

- The property is a simple value (string, number, boolean)
- No side effects are needed when the property changes
- No special attribute handling is needed

```ts
// ✅ Good — Lit's default behavior is sufficient
@property({ type: Boolean, reflect: true })
public indeterminate = false;

@property({ type: Number })
public progress = 0;
```

## Custom getter and setter

In some cases, you need a custom getter and setter instead of Lit's default. This is less common and should only be used when Lit's default is not enough.

**Use a custom getter/setter when:**

- You need to run side effects when the property changes (e.g. manually setting an attribute)
- You need to validate or transform the value before storing it
- The property has non-standard attribute handling

**Example from Badge.base.ts — custom getter/setter for `fixed`:**

```ts
@property({ reflect: true })
public get fixed(): FixedValues | undefined {
  return this._fixed;
}

public set fixed(fixed: FixedValues | undefined) {
  if (fixed === this.fixed) {
    return;
  }
  const oldValue = this.fixed;
  this._fixed = fixed;
  if (fixed) {
    this.setAttribute('fixed', fixed);
  } else {
    this.removeAttribute('fixed');
  }
  this.requestUpdate('fixed', oldValue);
}

private _fixed?: FixedValues;
```

This custom setter manually manages the attribute and calls `requestUpdate` to trigger a re-render. The `@todo` on this property in the codebase notes that this may be replaceable with Lit's default behavior in the future.

```ts
// ✅ Good — custom getter/setter when side effects are needed
@property({ reflect: true })
public get fixed(): FixedValues | undefined {
  return this._fixed;
}

// ❌ Bad — using a custom getter/setter when Lit's default would work
@property({ type: Boolean, reflect: true })
public get subtle(): boolean {
  return this._subtle;
}
public set subtle(value: boolean) {
  this._subtle = value;
  this.requestUpdate('subtle');
}
private _subtle = false;
// This could just be: public subtle: boolean = false;
```

## Backing fields

When you use a custom getter/setter, you need a **backing field** to store the actual value. Backing fields are `private` and start with an underscore.

```ts
// ✅ Good — underscore prefix, private, typed
private _fixed?: FixedValues;
private _variant: AlertBannerVariants = '';

// ❌ Bad — no underscore prefix
private fixed?: FixedValues;

// ❌ Bad — protected instead of private
protected _fixed?: FixedValues;
```

Place the backing field right after the setter, in the same section as the getter/setter pair.
