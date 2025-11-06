## Bug Analysis: overlay-trigger-directive listenerHost undefined

### Problem Statement

When the `OverlayTriggerDirective`'s `reconnected()` hook is called before the overlay is created, a TypeError occurs: `Cannot read property 'addEventListener' of undefined`.

### Root Cause

**Parent Class (`SlottableRequestDirective`):**

```typescript
// slottable-request-directive.ts lines 42-52
override update(part: ElementPart, [template]: Parameters<this['render']>): void {
    this.template = template;
    if (this.target !== part.element) {
        this.target = part.element as HTMLElement;
        this.renderBefore = this.target.children[0] as HTMLElement;
    }
    this.listenerHost = this.target;  // ✓ Sets listenerHost immediately
    this.init();
}

// slottable-request-directive.ts lines 66-75
init(): void {
    this.listeners?.abort();
    this.listeners = new AbortController();
    const { signal } = this.listeners;
    this.listenerHost.addEventListener(  // ← Uses this.listenerHost
        'slottable-request',
        (event: Event) => this.handleSlottableRequest(event as SlottableRequestEvent),
        { signal }
    );
}

// slottable-request-directive.ts lines 95-97
override reconnected(): void {
    this.init();  // ← Calls init() which needs listenerHost
}
```

**Child Class (`OverlayTriggerDirective`) - WITHOUT FIX:**

```typescript
// overlay-trigger-directive.ts lines 73-106
override update(part: ElementPart, [template, options]: Parameters<this['render']>): void {
    // ... setup code ...
    if (this.target !== part.element) {
        this.target = part.element as HTMLElement;
        newTarget = true;
    }
    // ✗ this.listenerHost is NOT set here!

    if (newTarget || newStrategy) {
        this.strategy = new strategies[triggerInteraction](this.target, {
            isPersistent: true,
            handleOverlayReady: (overlay: AbstractOverlay) => {
                this.listenerHost = this.overlay = overlay;  // ← Only set in async callback
                this.init();
            },
        });
    }
    this.strategy.open = options?.open ?? false;
}
```

### Bug Trigger Scenario

1. **Initial Render:**
    - `update()` is called
    - `this.target` is set
    - Strategy is created with `handleOverlayReady` callback
    - **BUT**: `this.listenerHost` is NOT set (only set inside callback)
    - Callback hasn't fired yet (overlay not created)

2. **Element Removed from DOM:**
    - `disconnected()` lifecycle hook is called
    - Listeners are aborted

3. **Element Re-added to DOM:**
    - `reconnected()` lifecycle hook is called (inherited from parent)
    - `reconnected()` calls `init()`
    - `init()` tries to execute: `this.listenerHost.addEventListener(...)`
    - **ERROR**: `this.listenerHost` is `undefined`!

### When Does This Happen?

This bug occurs in real-world scenarios like:

- React/framework re-rendering that unmounts/remounts components
- Dynamic DOM manipulation (moving elements)
- Framework transitions/animations
- Any case where an element with the directive is temporarily removed and re-added before the overlay is created

### The Fix

```typescript
override update(part: ElementPart, [template, options]: Parameters<this['render']>): void {
    // ... setup code ...
    if (this.target !== part.element) {
        this.target = part.element as HTMLElement;
        newTarget = true;
    }
    // ✓ Set listenerHost to target as a fallback, matching parent class behavior
    // This ensures reconnected() hook can safely call init() before overlay is ready
    this.listenerHost = this.target;

    if (newTarget || newStrategy) {
        this.strategy = new strategies[triggerInteraction](this.target, {
            isPersistent: true,
            handleOverlayReady: (overlay: AbstractOverlay) => {
                this.listenerHost = this.overlay = overlay;  // ← Updates to overlay when ready
                this.init();
            },
        });
    }
}
```

### Why This Fix Works

1. **Immediate Safety**: `this.listenerHost = this.target` provides a valid HTMLElement immediately
2. **Matches Parent Pattern**: The parent class sets `this.listenerHost` in `update()`, we do the same
3. **Progressive Enhancement**: When the overlay is created, `listenerHost` is upgraded to the overlay element
4. **No Breaking Changes**: Existing behavior is preserved, only prevents the undefined error

### Verification

The fix has been verified to:

- ✅ Pass all linting checks
- ✅ Follow parent class conventions
- ✅ Not introduce TypeScript errors
- ✅ Handle reconnected() lifecycle safely
- ✅ Maintain backward compatibility
