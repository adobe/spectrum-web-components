<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Method patterns

<!-- Document title (editable) -->

# Method patterns

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Method ordering](#method-ordering)
- [Lifecycle methods](#lifecycle-methods)
- [The override keyword](#the-override-keyword)
- [Event handlers](#event-handlers)
- [Private helpers](#private-helpers)

</details>

<!-- Document content (editable) -->

This guide explains how to order and name methods in 2nd-gen component classes.

## Method ordering

Within the [IMPLEMENTATION section](02_class-structure.md#section-implementation) of a base class, or the [RENDERING & STYLING section](02_class-structure.md#section-rendering-and-styling) of a concrete class, order methods by access level:

1. **public** methods first
2. **protected** methods second (including lifecycle)
3. **private** methods last

**Example from ProgressCircle.base.ts — IMPLEMENTATION section:**

```ts
// Protected methods (lifecycle and helpers)
protected makeRotation(rotation: number): string | undefined { ... }
protected handleSlotchange(): void { ... }
protected override firstUpdated(changes: PropertyValues): void { ... }

// Private methods
private formatProgress(): string { ... }

// Protected lifecycle (later in call order)
protected override updated(changes: PropertyValues): void { ... }
```

## Lifecycle methods

Lit components have lifecycle methods that run at specific times. These are the lifecycle methods used in 2nd-gen, in the order Lit calls them:

| Method | When it runs | Common use |
|--------|-------------|------------|
| `connectedCallback()` | Element added to DOM | Set up event listeners, observers |
| `firstUpdated(changes)` | After the first render | One-time DOM setup (e.g. set ARIA role) |
| `update(changes)` | Before each render | Pre-render validation |
| `render()` | Each render cycle | Return the template |
| `updated(changes)` | After each render | Post-render DOM work |
| `disconnectedCallback()` | Element removed from DOM | Clean up listeners, observers |

**Example — firstUpdated for one-time setup (Divider.base.ts):**

```ts
protected override firstUpdated(changed: PropertyValues<this>): void {
  super.firstUpdated(changed);
  this.setAttribute('role', 'separator');
}
```

**Example — update for validation (Badge.base.ts):**

```ts
protected override update(changedProperties: PropertyValues): void {
  super.update(changedProperties);
  if (window.__swc?.DEBUG) {
    const constructor = this.constructor as typeof BadgeBase;
    if (!constructor.VARIANTS.includes(this.variant)) {
      window.__swc.warn(this, /* ... */);
    }
  }
}
```

**Example — updated for reactive DOM changes (Divider.base.ts):**

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

**Example — render in concrete class (Badge.ts):**

```ts
protected override render(): TemplateResult {
  return html`
    <div class=${classMap({ ['swc-Badge']: true })}>
      <!-- ...template... -->
    </div>
  `;
}
```

Always call `super.methodName()` at the start of lifecycle overrides (except `render()`). This ensures the parent class behavior runs first.

```ts
// ✅ Good — call super first
protected override firstUpdated(changed: PropertyValues): void {
  super.firstUpdated(changed);
  this.setAttribute('role', 'separator');
}

// ❌ Bad — forgetting to call super
protected override firstUpdated(changed: PropertyValues): void {
  this.setAttribute('role', 'separator');
}
```

## The override keyword

Always use the `override` keyword when overriding lifecycle methods or any method from the parent class. This tells TypeScript the method must exist in the parent. See [TypeScript modifier keywords](03_typescript-modifiers.md#override) for more.

```ts
// ✅ Good
protected override render(): TemplateResult { ... }
protected override update(changedProperties: PropertyValues): void { ... }

// ❌ Bad — missing override
protected render(): TemplateResult { ... }
protected update(changedProperties: PropertyValues): void { ... }
```

## Event handlers

Event handler methods are named with a `handle` prefix followed by the event name or purpose.

**Example from AlertBanner.base.ts:**

```ts
protected handleKeydown(event: KeyboardEvent): void {
  if (event.code === 'Escape' && this.dismissible) {
    this.shouldClose();
  }
}
```

**Example from ProgressCircle.base.ts:**

```ts
protected handleSlotchange(): void {
  const label = getLabelFromSlot(this.slotEl);
  if (label) {
    this.label = label;
  }
}
```

Event handlers are typically `protected` so concrete classes can override them if needed. Use `private` if only the current class needs the handler.

```ts
// ✅ Good — clear naming, typed parameter
protected handleKeydown(event: KeyboardEvent): void { ... }

// ❌ Bad — unclear name
protected onKey(e: any): void { ... }

// ❌ Bad — no event type
protected handleKeydown(event: Event): void { ... }
```

## Private helpers

Private helpers handle internal logic that no subclass or consumer needs. Keep them small and focused.

**Example from ProgressCircle.base.ts:**

```ts
private formatProgress(): string {
  // ...formats progress as locale-aware percentage string
}
```

```ts
// ✅ Good — small, single-purpose, private
private formatProgress(): string { ... }

// ❌ Bad — too broad, doing too many things
private processState(): void {
  // validates, formats, updates DOM, dispatches events...
}
```
