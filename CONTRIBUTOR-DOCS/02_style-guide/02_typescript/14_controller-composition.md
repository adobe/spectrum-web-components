<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-gen TypeScript](README.md) / Controller composition

<!-- Document title (editable) -->

# Controller composition

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [What is a controller](#what-is-a-controller)
- [How controllers work](#how-controllers-work)
- [Available controllers](#available-controllers)
- [Planned controllers](#planned-controllers)
- [FocusgroupNavigationController](#focusgroupnavigationcontroller)
- [LanguageResolutionController](#languageresolutioncontroller)
- [Using a controller in a component](#using-a-controller-in-a-component)
- [Controller vs mixin](#controller-vs-mixin)
- [Writing a new controller](#writing-a-new-controller)

</details>

<!-- Document content (editable) -->

This guide explains how Lit reactive controllers work in 2nd-gen components.

For the official Lit documentation, see [Lit — Controllers](https://lit.dev/docs/composition/controllers/).

## What is a controller

A controller is a class that attaches to a host component and participates in its lifecycle. Controllers are useful for behavior that is **optional** and **self-contained** — they do not modify the class hierarchy, and they can be added or removed without changing the component's type.

## How controllers work

A controller implements the `ReactiveController` interface from Lit:

```ts
interface ReactiveController {
  hostConnected?(): void;
  hostDisconnected?(): void;
  hostUpdate?(): void;
  hostUpdated?(): void;
}
```

The host component calls these methods at the right time:

| Method | When it runs |
|--------|-------------|
| `hostConnected()` | When the host element is added to the DOM |
| `hostDisconnected()` | When the host element is removed from the DOM |
| `hostUpdate()` | Before each render |
| `hostUpdated()` | After each render |

To attach a controller, call `host.addController(this)` in the constructor. This tells the host to call the controller's lifecycle methods.

## Available controllers

| Controller | Location | Purpose |
|-----------|----------|---------|
| `FocusgroupNavigationController` | `core/controllers/focus-group-navigation-controller.ts` | Roving tabindex and directional keyboard navigation for composites |
| `LanguageResolutionController` | `core/controllers/language-resolution.ts` | Resolve locale for formatting |

## Planned controllers

The following controllers exist in 1st-gen and may be recreated in 2nd-gen core (using 1st-gen as reference):

| Controller | 1st-gen location | Purpose |
|-----------|-----------------|---------|
| `RovingTabindexController` | `1st-gen/packages/shared/` | Keyboard navigation (see `FocusgroupNavigationController` in 2nd-gen for a related pattern) |
| `PlacementController` | `1st-gen/packages/overlay/` | Overlay positioning |
| `MatchMediaController` | `1st-gen/packages/picker/` | Device-adaptive behavior |
| `PendingStateController` | `1st-gen/packages/button/` | Loading states |
| `InteractionController` (base) | `1st-gen/packages/overlay/` | Base for trigger behavior |
| `ClickController` | `1st-gen/packages/overlay/` | Click-to-open overlay |
| `HoverController` | `1st-gen/packages/overlay/` | Hover-to-open overlay |
| `LongpressController` | `1st-gen/packages/overlay/` | Longpress-to-open overlay |
| `ColorController` | `1st-gen/tools/reactive-controllers/` | Color validation/conversion |
| `GridController` | `1st-gen/tools/grid/` | Grid layout with virtual scrolling |

## FocusgroupNavigationController

**File:** `core/controllers/focus-group-navigation-controller.ts`

**What it does:**

1. Collapses roving `tabindex` to one tab stop in a composite (`tabindex="0"` on the active item, `-1` on others it manages).
2. Handles Arrow keys, Home, and End for horizontal, vertical, **`both`** (horizontal and vertical arrows on the same linear order), or **grid** layouts; optional **`pageStep`** enables Page Up / Page Down by that many items (linear) or rows (**grid**); in **grid** mode, Ctrl+Home / Ctrl+End jump to the first cell of the first row or the last cell of the last row.
3. Optional **`skipDisabled`**: omit native **`disabled`** and **`aria-disabled="true"`** items from roving tabindex and arrow navigation (story **Skip disabled menu**).
4. Optionally wraps at ends and remembers the last focused item for Tab re-entry (similar to Open UI `focusgroup` semantics).

**Public API:** `setOptions`, `getActiveItem`, `refresh`, `setActiveItem` (roving `tabindex` only — call `getActiveItem()?.focus()` to move focus), `focusFirstItemByTextPrefix` (typeahead label match for roving `tabindex` only — same follow-up), plus `hostConnected` / `hostDisconnected` via `ReactiveController`.

**Events:** Dispatches `swc-focusgroup-navigation-active-change` when the active item changes.

**Docs:** See `core/controllers/focus-group-navigation-demos/focus-group-navigation-controller.md` and Storybook **Core / Focus group navigation controller**.

## LanguageResolutionController

The main controller for locale in 2nd-gen is `LanguageResolutionController`. It resolves the component's language/locale for formatting numbers, dates, and accessibility text.

**File:** `core/controllers/language-resolution.ts`

**What it does:**

1. Gets the initial language from `<html lang>`, `navigator.language`, or falls back to `'en-US'`
2. Validates the language using `Intl.DateTimeFormat.supportedLocalesOf()`
3. Subscribes to a shared `MutationObserver` on `<html lang>` to detect runtime language changes
4. Optionally subscribes to a language provider (e.g. `<sp-theme>`) via the `sp-language-context` event
5. When the language changes, calls `host.requestUpdate()` to trigger a re-render

**Public API:**

- `language` — the resolved language string (e.g. `'en-US'`, `'fr-FR'`)
- `languageResolverUpdatedSymbol` — a symbol used to detect language changes in `updated()`

## Using a controller in a component

Attach the controller as a private field in the base class:

```ts
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '@spectrum-web-components/core/controllers/language-resolution.js';

export abstract class ProgressCircleBase extends SizedMixin(SpectrumElement) {
  // SHARED API section
  private languageResolver = new LanguageResolutionController(this);

  // IMPLEMENTATION section
  private formatProgress(): string {
    return new Intl.NumberFormat(this.languageResolver.language, {
      style: 'percent',
      unitDisplay: 'long',
    }).format(this.progress / 100);
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has(languageResolverUpdatedSymbol)) {
      this.setAttribute('aria-valuetext', this.formatProgress());
    }
  }
}
```

Key points:

- The controller is created in the property initializer — `new LanguageResolutionController(this)` calls `addController` internally
- The controller is `private` because consumers should not access it
- Use `languageResolverUpdatedSymbol` in `updated()` to detect language changes
- The controller's `language` property is accessed via `this.languageResolver.language`

## Controller vs mixin

| Feature | Mixin | Controller |
|---------|-------|------------|
| Adds to class hierarchy | Yes | No |
| Adds properties to the component | Yes | No (has its own properties) |
| Has its own lifecycle | No (uses the component's) | Yes (`hostConnected`, etc.) |
| Multiple instances per component | No | Yes |
| Changes the component's type | Yes | No |

**Use a mixin when:**

- The behavior adds properties that are part of the component's public API (e.g. `size`)
- Subclasses need to override the behavior

**Use a controller when:**

- The behavior is self-contained and does not add public API
- The component may or may not need the behavior
- You need multiple independent instances (e.g. two different observers)

## Writing a new controller

When creating a new controller, follow this pattern:

```ts
import type { ReactiveController, ReactiveElement } from 'lit';

export class MyController implements ReactiveController {
  private host: ReactiveElement;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);
  }

  public hostConnected(): void {
    // Set up listeners, observers, etc.
  }

  public hostDisconnected(): void {
    // Clean up listeners, observers, etc.
  }
}
```

Key rules:

- Implement the `ReactiveController` interface
- Store the host as a private field
- Call `host.addController(this)` in the constructor
- Always clean up in `hostDisconnected()`
- Place the controller in `core/controllers/` and export from `core/controllers/index.ts`
