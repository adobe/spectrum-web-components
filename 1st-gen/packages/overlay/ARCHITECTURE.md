# Overlay system architecture

This document provides a deep dive into the technical architecture of the overlay system for contributors and advanced users.

## System overview

The overlay system is built on several key architectural patterns:

```
┌─────────────────────────────────────────────────────────────┐
│                      Entry Points                            │
├───────────────┬──────────────┬───────────────┬──────────────┤
│ <sp-overlay>  │ <overlay-    │ Overlay.open()│ trigger()    │
│               │  trigger>    │               │ directive    │
└───────┬───────┴───────┬──────┴───────┬───────┴──────┬───────┘
        │               │              │              │
        └───────────────┴──────────────┴──────────────┘
                        │
        ┌───────────────▼──────────────────────────┐
        │         Overlay Class                     │
        │  ┌─────────────────────────────────────┐ │
        │  │ AbstractOverlay                     │ │
        │  │   + OverlayPopover / OverlayNoPopover│ │
        │  └─────────────────────────────────────┘ │
        └──────────┬────────────────────────────────┘
                   │
        ┌──────────▼────────────┬─────────────────────┐
        │                       │                     │
┌───────▼─────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│ Interaction     │   │  Placement      │   │  Overlay       │
│ Controllers     │   │  Controller     │   │  Stack         │
├─────────────────┤   ├─────────────────┤   ├────────────────┤
│ - Click         │   │ Uses Floating   │   │ Global state   │
│ - Hover         │   │ UI for position │   │ Focus trapping │
│ - Longpress     │   │ and constraints │   │ ESC handling   │
└─────────────────┘   └─────────────────┘   └────────────────┘
```

## Core components

### AbstractOverlay

The `AbstractOverlay` class provides the foundational interface and minimal implementation that all overlay implementations build upon.

**Key responsibilities:**

- Defines property signatures and getters/setters
- Provides lifecycle hooks (`applyFocus`, `dispose`)
- Establishes the contract for reactive controllers
- Minimal implementation allows mixins to add functionality

**Design rationale:** Using an abstract base class allows the mixin pattern to work effectively. The `OverlayPopover` and `OverlayNoPopover` mixins add browser-specific functionality while the `Overlay` class adds the complete implementation.

### Overlay class

The `Overlay` class extends `AbstractOverlay` with a mixin (either `OverlayPopover` or `OverlayNoPopover` based on browser support) and implements the complete overlay functionality.

**Key properties:**

- `open`: Boolean controlling visibility
- `type`: Determines interaction model (`modal`, `page`, `hint`, `auto`, `manual`)
- `placement`: Position relative to trigger
- `trigger`: String reference to trigger element with interaction type
- `triggerElement`: Direct element or `VirtualTrigger` reference
- `delayed`: Enables warm-up/cool-down timing
- `receivesFocus`: Controls focus behavior

**Key methods:**

- `bindEvents()`: Sets up interaction controllers
- `manageDelay()`: Handles delayed opening logic
- `handleBeforetoggle()`: Prepares overlay state before visibility changes
- `handleTransitionEvents()`: Tracks CSS transitions for `sp-opened`/`sp-closed` events

### Mixin pattern: OverlayPopover and OverlayNoPopover

The overlay system uses mixins to handle browser-specific behaviors:

```typescript
// Browser detection
const browserSupportsPopover = 'showPopover' in document.createElement('div');

// Apply appropriate mixin
let ComputedOverlayBase = OverlayPopover(AbstractOverlay);
if (!browserSupportsPopover) {
    ComputedOverlayBase = OverlayNoPopover(AbstractOverlay);
}

// Overlay extends the computed base
export class Overlay extends ComputedOverlayBase {
    // Implementation
}
```

**OverlayPopover:** Uses modern `popover` API for top-layer rendering

**OverlayNoPopover:** Uses `<dialog>` element and manual z-index management

This approach provides:

- Transparent fallback for older browsers
- Single codebase for all browsers
- Progressive enhancement

## Interaction controllers

Interaction controllers follow the [Reactive Controller pattern](https://lit.dev/docs/composition/controllers/) and manage the relationship between trigger elements and overlays.

### Base: InteractionController

All controllers extend `InteractionController` which provides:

**Core functionality:**

- `open` property: Manages overlay state
- `overlay` property: Reference to associated overlay with automatic binding
- `isPersistent` flag: Controls initialization timing
- `hostConnected()` / `hostDisconnected()`: Lifecycle hooks

**Lifecycle:**

```
Constructor
    │
    ├──[if isPersistent]──> init()
    │                        └─> Bind trigger events
    │
    ├──[if overlay provided]─> set overlay
    │                           ├─> overlay.addController(this)
    │                           ├─> initOverlay()
    │                           └─> prepareDescription()
    │
    └──> Host element tracks controller

hostConnected()
    │
    └──[if !isPersistent]──> init()
                              └─> Bind trigger events

hostDisconnected()
    │
    └──[if !isPersistent]──> abort()
                              ├─> releaseDescription()
                              └─> abortController.abort()
```

### ClickController

Manages click interactions with toggle behavior.

**Event handling:**

```typescript
init() {
    this.abortController = new AbortController();
    target.addEventListener('click', handleClick, { signal });
    target.addEventListener('pointerdown', handlePointerdown, { signal });
}
```

**Toggle prevention logic:**

- On `pointerdown`: If overlay is open, set `preventNextToggle = true`
- On `click`: Toggle overlay unless `preventNextToggle` is set
- This prevents closing and immediately reopening when clicking the trigger

**Use cases:**

- Dropdown menus
- Modal dialogs
- Expandable panels

### HoverController

Manages hover and focus interactions with delayed close behavior.

**State tracking:**

```typescript
private hovering = false;           // Mouse over trigger or overlay
private targetFocused = false;      // Trigger has focus
private overlayFocused = false;     // Content within overlay has focus
private hoverTimeout?: ReturnType<typeof setTimeout>;
```

**Event handling:**

```typescript
init() {
    // Bind to trigger
    target.addEventListener('keyup', handleKeyup, { signal });
    target.addEventListener('focusin', handleTargetFocusin, { signal });
    target.addEventListener('focusout', handleTargetFocusout, { signal });
    target.addEventListener('pointerenter', handleTargetPointerenter, { signal });
    target.addEventListener('pointerleave', handleTargetPointerleave, { signal });
}

initOverlay() {
    // Bind to overlay itself
    overlay.addEventListener('pointerenter', handleHostPointerenter, { signal });
    overlay.addEventListener('pointerleave', handleHostPointerleave, { signal });
    overlay.addEventListener('focusin', handleOverlayFocusin, { signal });
    overlay.addEventListener('focusout', handleOverlayFocusout', { signal });
}
```

**Close delay logic:**

- When pointer or focus leaves, schedule close after 300ms
- If pointer or focus returns within 300ms, cancel scheduled close
- Allows smooth transition from trigger to overlay content

**Accessibility features:**

- Adds `aria-describedby` linking trigger to tooltip content
- Responds to ESC key to close and return focus
- Handles `:focus-visible` to avoid showing on click interactions

**Use cases:**

- Tooltips
- Hover cards
- Info popovers

### LongpressController

Detects longpress gestures on trigger elements.

**Timing:**

- Longpress threshold: 350ms
- Touch movement threshold: 10px

**Event handling:**

```typescript
init() {
    target.addEventListener('pointerdown', handlePointerdown, { signal });
    target.addEventListener('pointerup', handlePointerup, { signal });
    target.addEventListener('pointermove', handlePointermove, { signal });
    target.addEventListener('pointercancel', handlePointercancel, { signal });
}
```

**State machine:**

```
pointerdown
    │
    ├─> Start 350ms timer
    ├─> Record start position
    │
    ├─[pointermove > 10px]─> Cancel timer
    ├─[pointerup < 350ms]──> Cancel timer
    ├─[pointercancel]──────> Cancel timer
    │
    └─[timer expires]──────> Open overlay
                              + Set activelyOpening flag
```

**Accessibility features:**

- Provides `aria-describedby` with longpress instructions
- Descriptor text customizable via `longpress-describedby-descriptor` slot

**Use cases:**

- Mobile context menus
- Hold-to-reveal actions
- Alternative interaction methods

## Placement system

The `PlacementController` manages overlay positioning using [Floating UI](https://floating-ui.com/).

### Key concepts

**Placement:** Initial preferred position (`top`, `bottom-start`, etc.)

**Fallback placements:** Alternative positions when space is constrained

**Middleware:** Floating UI plugins that modify position:

- `offset`: Adds spacing between trigger and overlay
- `flip`: Switches to fallback placement when constrained
- `shift`: Slides overlay along axis to stay in view
- `size`: Adjusts overlay dimensions to fit viewport
- `arrow`: Positions arrow element (if present)

### Configuration

```typescript
const config = {
    placement: 'bottom-start',
    middleware: [
        offset(offsetValue),
        flip({
            fallbackPlacements: ['top-start', 'right', 'left'],
            padding: REQUIRED_DISTANCE_TO_EDGE, // 8px
        }),
        shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
        size({
            apply({ availableHeight }) {
                // Ensure minimum height
                const height = Math.max(availableHeight, MIN_OVERLAY_HEIGHT);
                overlay.style.maxHeight = `${height}px`;
            },
        }),
    ],
};
```

### Auto-update

The controller uses Floating UI's `autoUpdate` to reposition when:

- Trigger element moves or resizes
- Overlay content changes dimensions
- Viewport is resized or scrolled
- Any ancestor element changes

**Cleanup:** The controller's `cleanup()` method stops auto-update when overlay closes.

### Device pixel ratio rounding

Positions are rounded to device pixel ratio to prevent subpixel rendering issues:

```typescript
function roundByDPR(num?: number): number {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(num * dpr) / dpr;
}
```

## Overlay stack

The `OverlayStack` class manages all open overlays globally.

### Responsibilities

**Track overlay order:**

```typescript
private overlays: Overlay[] = [];

add(overlay: Overlay): void {
    if (!this.overlays.includes(overlay)) {
        this.overlays.push(overlay);
    }
}

remove(overlay: Overlay): void {
    const index = this.overlays.indexOf(overlay);
    if (index > -1) {
        this.overlays.splice(index, 1);
    }
}
```

**Manage focus trapping:**

- Modal and page overlays create focus traps
- Focus traps prevent tabbing outside overlay
- Nested overlays have nested focus traps

**Handle ESC key:**

```typescript
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const topOverlay = this.overlays[this.overlays.length - 1];
        if (topOverlay?.type !== 'page') {
            topOverlay?.close();
            event.preventDefault();
            event.stopPropagation();
        }
    }
});
```

**Coordinate overlays:**

- Prevent multiple modal overlays simultaneously
- Manage light dismiss behavior
- Coordinate delayed tooltips

### Light dismiss

"Light dismiss" means closing an overlay when interacting outside it. The stack manages this by:

1. Listening for clicks at capture phase
2. Checking if click target is within current overlay
3. Closing overlay if click is outside (for `auto` type)

```typescript
document.addEventListener(
    'click',
    (event) => {
        const topOverlay = this.overlays[this.overlays.length - 1];
        if (topOverlay?.type === 'auto') {
            const path = event.composedPath();
            if (!path.includes(topOverlay)) {
                topOverlay.close();
            }
        }
    },
    { capture: true }
);
```

## State management

### Open/closed lifecycle

```
Closed State
    │
    └─[open = true]──> Opening State
                        │
                        ├─> Dispatch 'slottable-request'
                        ├─> Add to overlay stack
                        ├─> Apply positioning
                        ├─> Show overlay (popover/dialog)
                        ├─> Start CSS transitions
                        │
                        └─[transitions end]──> Open State
                                                │
                                                └─> Dispatch 'sp-opened'

Open State
    │
    └─[open = false]──> Closing State
                         │
                         ├─> Start CSS transitions
                         │
                         └─[transitions end]──> Closed State
                                                 │
                                                 ├─> Hide overlay
                                                 ├─> Remove from stack
                                                 ├─> Dispatch 'sp-closed'
                                                 └─> Dispatch 'slottable-request'
                                                     with removeSlottableRequest
```

### Transition tracking

The overlay tracks CSS transitions on direct children to know when to dispatch `sp-opened` and `sp-closed` events:

```typescript
guaranteedAllTransitionend(
    element,
    () => {
        // Trigger transition (e.g., add class)
    },
    () => {
        // Transition complete callback
    }
);
```

**Guarantees:**

- Callback fires even if no transitions occur
- Tracks multiple properties transitioning
- Handles `transitioncancel` events
- Uses multiple `requestAnimationFrame` calls to catch WebKit early firing

## Event system

### Custom events

**`sp-opened`:** Dispatched when overlay is fully visible

```typescript
type OverlayStateEvent = Event & {
    overlay: Overlay;
};
```

**`sp-closed`:** Dispatched when overlay is fully hidden

**`slottable-request`:** Requests content to be added or removed

```typescript
type SlottableRequestEvent = CustomEvent & {
    data: {} | typeof removeSlottableRequest;
};
```

### Event bubbling and composition

Overlays dispatch events that bubble and compose through shadow DOM:

```typescript
this.dispatchEvent(
    new CustomEvent('sp-opened', {
        bubbles: true,
        composed: true,
        detail: { overlay: this },
    })
);
```

This allows parent components to listen for any nested overlay opening.

### Close event

Overlays listen for a `close` event on themselves and their children:

```html
<sp-button onclick="this.dispatchEvent(new Event('close', {bubbles: true}))">
    Close
</sp-button>
```

When received, the overlay closes itself. This provides a standard way for content to close its containing overlay.

## Performance optimizations

### Lazy initialization

Controllers can be non-persistent, delaying initialization until `hostConnected()`:

```typescript
new ClickController(target, {
    overlay,
    isPersistent: false, // Don't init until connected
});
```

**Benefits:**

- Reduces initial setup cost
- Allows garbage collection of unused controllers
- Automatic cleanup on disconnect

### Delayed tooltips

The `delayed` attribute uses shared timers to coordinate tooltip opening:

```typescript
class OverlayTimer {
    private warmupTimer?: ReturnType<typeof setTimeout>;
    private cooldownTimer?: ReturnType<typeof setTimeout>;
    private isWarmedUp = false;

    shouldDelay(): boolean {
        return !this.isWarmedUp;
    }

    recordOpen(): void {
        clearTimeout(this.cooldownTimer);
        if (!this.isWarmedUp) {
            this.isWarmedUp = true;
        }
    }

    recordClose(): void {
        clearTimeout(this.cooldownTimer);
        this.cooldownTimer = setTimeout(() => {
            this.isWarmedUp = false;
        }, 1000);
    }
}
```

**Benefits:**

- First tooltip waits 1000ms
- Subsequent tooltips open immediately
- System cools down after 1000ms of no tooltips

### Virtual triggers

`VirtualTrigger` provides positioning without a DOM element:

```typescript
class VirtualTrigger {
    private rect: DOMRect;

    constructor(x: number, y: number) {
        this.updateBoundingClientRect(x, y);
    }

    updateBoundingClientRect(x: number, y: number): void {
        this.rect = new DOMRect(x, y, 0, 0);
    }

    getBoundingClientRect(): DOMRect {
        return this.rect;
    }
}
```

**Use cases:**

- Context menus at cursor position
- Drag-and-drop target previews
- Touch gesture responses

**Performance:** No DOM queries or mutations required for positioning updates.

## Browser compatibility

### Popover API support

The system detects and adapts to popover API support:

```typescript
const browserSupportsPopover = 'showPopover' in document.createElement('div');
```

**With popover support:**

- Uses native top-layer rendering
- Automatic z-index management
- Better performance

**Without popover support:**

- Falls back to `<dialog>` element
- Manual z-index management
- Additional CSS workarounds may be needed

### Known issues

**WebKit clip bug:** [WebKit bug #160953](https://bugs.webkit.org/show_bug.cgi?id=160953)

- Affects `position: fixed` in containers with specific CSS
- Workaround: Restructure DOM or adjust CSS

**Focus trap limitations:**

- Some browsers have inconsistent focus event firing
- Robust focus management requires multiple event listeners

## Extension points

### Custom interaction controllers

Create a custom controller by extending `InteractionController`:

```typescript
class CustomController extends InteractionController {
    override type = InteractionTypes.custom;

    override init(): void {
        this.abortController = new AbortController();
        const { signal } = this.abortController;

        this.target.addEventListener(
            'customevent',
            () => {
                this.open = !this.open;
            },
            { signal }
        );
    }
}
```

### Custom overlay types

While not officially supported, you can extend the `Overlay` class for specialized behavior:

```typescript
class CustomOverlay extends Overlay {
    constructor() {
        super();
        // Custom initialization
    }

    // Override methods as needed
}
```

**Note:** Extending `Overlay` should be done carefully as internal APIs may change.

## Testing considerations

### Unit testing overlays

Key aspects to test:

**State transitions:**

```javascript
it('should open and close', async () => {
    overlay.open = true;
    await overlay.updateComplete;
    expect(overlay.hasAttribute('open')).to.be.true;

    overlay.open = false;
    await overlay.updateComplete;
    expect(overlay.hasAttribute('open')).to.be.false;
});
```

**Event firing:**

```javascript
it('should dispatch sp-opened event', async () => {
    const listener = spy();
    overlay.addEventListener('sp-opened', listener);

    overlay.open = true;
    await oneEvent(overlay, 'sp-opened');

    expect(listener).to.have.been.calledOnce;
});
```

**Positioning:**

```javascript
it('should position relative to trigger', async () => {
    overlay.trigger = 'button@click';
    overlay.placement = 'bottom';
    overlay.open = true;
    await overlay.updateComplete;

    const triggerRect = trigger.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    expect(overlayRect.top).to.be.greaterThan(triggerRect.bottom);
});
```

### Integration testing

Test real-world scenarios:

- Multiple overlays open simultaneously
- Nested overlays
- Focus management
- Keyboard navigation
- Touch interactions
- Responsive behavior

## Future considerations

### Proposed improvements

**Simplified controller API:**

- Extract common AbortController patterns
- Unified cleanup method
- Better separation of concerns

**Performance monitoring:**

- Track overlay open/close timing
- Measure positioning calculation performance
- Identify bottlenecks in large applications

**Enhanced accessibility:**

- Automated focus trap testing
- Screen reader testing tools
- Keyboard navigation validation

**Better TypeScript support:**

- Stronger type checking for overlay options
- Generic types for custom overlays
- Improved IDE autocomplete

## Additional resources

- [Getting Started Guide](./GETTING-STARTED.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Accessibility Guide](./ACCESSIBILITY.md)
- [Performance Guide](./PERFORMANCE.md)
- [Floating UI Documentation](https://floating-ui.com/)
- [Focus Trap Library](https://github.com/focus-trap/focus-trap)
