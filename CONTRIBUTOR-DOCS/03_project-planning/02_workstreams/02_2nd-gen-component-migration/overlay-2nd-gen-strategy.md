# Overlay 2nd-Gen Strategy

## Problem

Overlay in 1st-gen is a monolith. It bundles positioning, popover lifecycle, focus trapping, interaction strategies, stack management, polyfills, and animation coordination into a single component. This creates two problems:

1. **For consumers**: the API surface is confusing. There are four different ways to use it (`<sp-overlay>`, `<overlay-trigger>`, the `trigger` directive, `Overlay.open()`) with no clear guidance on when to reach for which.

2. **For us**: every composed component (Picker, ActionMenu, Combobox, Tooltip, etc.) depends on the full Overlay stack, pulling in `focus-trap`, `OverlayStack`, interaction controllers, and the popover/no-popover mixin branching — even when most of that machinery isn't needed.

## Strategy

Split Overlay into two tiers:

### Tier 1: Internal — Native popover + lightweight controller

2nd-gen composed components **do not use `sp-overlay`**. They use the native Popover API and a thin `FloatingController` directly.

What `popover="auto"` gives us for free:
- Top-layer rendering (no z-index management)
- Light dismiss (click-outside, Escape)
- Dismiss ordering for nested popovers
- No polyfill needed (baseline since 2024)

What `FloatingController` adds:
- Floating UI `computePosition` + `autoUpdate`
- `flip`, `shift`, `size` middleware (Spectrum edge-padding, min-height constraints)
- ~50 lines of code, no dependencies beyond `@floating-ui/dom`

Components in this tier: **Picker, ActionMenu, Combobox, Menu (nested), Tooltip, ContextualHelp**.

For modal-like components (Dialog, Tray) that need focus trapping and scroll blocking, we use `<dialog>` natively or a separate lightweight `ModalController` — still not `sp-overlay`.

### Tier 2: External — `sp-overlay` as a customer utility

`sp-overlay` ships as a standalone utility for customers building custom overlay experiences. We keep the full API but modernize it.

---

## What we keep (2nd-gen Overlay)

### Element: `<sp-overlay>`

The primary declarative API. Wraps content and manages its lifecycle on the top layer.

```html
<sp-overlay
  type="auto"
  placement="bottom-start"
  .triggerElement=${myButton}
  open
>
  <sp-popover>...</sp-popover>
</sp-overlay>
```

**Properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Show/hide the overlay |
| `type` | `'auto' \| 'hint' \| 'manual' \| 'modal' \| 'page'` | `'auto'` | Controls dismiss behavior |
| `placement` | `Placement` | — | Position relative to trigger |
| `offset` | `number \| [number, number]` | `0` | Distance from trigger (main, cross) |
| `trigger` | `string` | — | ID reference + interaction: `"my-btn@click"` |
| `triggerElement` | `HTMLElement \| VirtualTrigger` | — | Programmatic trigger reference |
| `triggerInteraction` | `'click' \| 'hover' \| 'longpress'` | — | How the trigger opens the overlay |
| `receives-focus` | `'true' \| 'false' \| 'auto'` | `'auto'` | Focus management on open |
| `delayed` | `boolean` | `false` | Warm-up delay (for tooltips) |
| `tip-padding` | `number` | — | Arrow/tip padding |
| `disabled` | `boolean` | `false` | Disable the trigger |

**Events:**

| Event | When |
|---|---|
| `sp-opened` | Overlay finished opening (after transition) |
| `sp-closed` | Overlay finished closing (after transition) |
| `beforetoggle` | Before open/close state changes |

### Element: `<overlay-trigger>`

Convenience wrapper that pairs a trigger slot with content slots. Useful when the trigger and content are siblings.

```html
<overlay-trigger type="auto" placement="bottom">
  <sp-button slot="trigger">Open</sp-button>
  <sp-popover slot="click-content">
    <p>Popover content</p>
  </sp-popover>
</overlay-trigger>
```

### Imperative: `Overlay.open()`

For programmatic overlay creation (context menus, dynamic content).

```js
const overlay = await Overlay.open(contentEl, {
  trigger: buttonEl,
  type: 'auto',
  placement: 'bottom-start',
});

// Later:
overlay.dispose();
```

### Class: `VirtualTrigger`

For positioning overlays at arbitrary coordinates (e.g. right-click context menus).

```js
const virtualTrigger = new VirtualTrigger(x, y);
```

---

## What we drop

| 1st-gen artifact | Why it goes |
|---|---|
| `OverlayNoPopover` mixin | Popover API is baseline. No polyfill needed. |
| `OverlayPopover` / `OverlayNoPopover` branching | Single code path using popover API directly. |
| `Overlay.open(trigger, interaction, content, optionsV1)` (v1 signature) | Deprecated since 0.37.0. Only keep the v2 signature. |

Everything else stays as-is. `OverlayStack`, `OverlayTimer`, transitions, `SlottableRequestEvent`, interaction controllers, focus trapping — all carried over unchanged. The goal is a clean port, not a rewrite.

---

## Internal architecture for composed components

### FloatingController

A reactive controller (~50 LOC) that wraps Floating UI:

```ts
class FloatingController implements ReactiveController {
  start(trigger: HTMLElement, popover: HTMLElement, options?: FloatingOptions): void;
  stop(): void;
  hostDisconnected(): void;
}
```

Lives in `@spectrum-web-components/core` or a shared utilities package. No custom element registration, no global state.

### Pattern for composed components

```ts
// In Picker, ActionMenu, Combobox, etc.
class Picker extends SpectrumElement {
  private floating = new FloatingController(this);

  renderOverlay(menu: TemplateResult): TemplateResult {
    return html`
      <div id="popover" popover="auto" @beforetoggle=${this.onToggle}>
        <sp-popover placement=${this.placement}>
          ${menu}
        </sp-popover>
      </div>
    `;
  }

  updated(changes) {
    if (changes.has('open')) {
      const popover = this.shadowRoot.querySelector('#popover');
      if (this.open) {
        popover.showPopover();
        this.floating.start(this, popover, { placement: this.placement });
      } else {
        this.floating.stop();
        popover.hidePopover();
      }
    }
  }
}
```

Key benefits:
- **No `sp-overlay` in the DOM** — one fewer custom element to register, define, and lazy-load
- **No OverlayStack** — `popover="auto"` handles dismiss ordering natively
- **No focus-trap** — only modals need it, and pickers aren't modals
- **No dependency manager dance** — no conditional `sp-overlay` import
- **Simpler event flow** — native `beforetoggle` instead of custom event chains through AbstractOverlay -> OverlayPopover -> Overlay -> consumer

### What about modals?

Components like Dialog and Tray that need focus trapping and scroll blocking use a separate `ModalController` or the native `<dialog>` element. This is a distinct concern from positioning and shouldn't be bundled with it.

---

## Migration path

### Phase 1: FloatingController in core

Create `FloatingController` in `@spectrum-web-components/core`. No Overlay dependency. This unblocks Picker, ActionMenu, and Tooltip migration.

### Phase 2: Migrate composed components

Migrate Picker, ActionMenu, Combobox, Tooltip, ContextualHelp to use native popover + FloatingController. Each component owns its own open/close lifecycle. Validate against existing test suites.

### Phase 3: Modernize Overlay

Port `sp-overlay` and `overlay-trigger` to 2nd-gen:
- Drop the v1 imperative API
- Drop OverlayNoPopover
- Simplify OverlayStack (lean on native popover dismiss ordering)
- Replace transition machinery with CSS-native approaches
- Clean up the API docs — one page, three sections: declarative, trigger wrapper, imperative

### Phase 4: ModalController

Build a lightweight modal utility for Dialog/Tray:
- Focus trap (consider native `inert` attribute over focus-trap library)
- Scroll blocking
- Backdrop management
- Can be a reactive controller or extend `<dialog>` behavior

---

## Documentation structure (target state)

The Overlay docs page should have three clear sections, each with a "when to use" callout:

1. **`<sp-overlay>`** — "Use when you need full control over overlay lifecycle and positioning."
2. **`<overlay-trigger>`** — "Use when your trigger and content are siblings and you want zero JS."
3. **`Overlay.open()`** — "Use when you need to create overlays programmatically (e.g. context menus, dynamic content)."

Each section: one code example, one property table, done. No cross-referencing, no "see also the directive" rabbit holes.
