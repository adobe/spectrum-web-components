# Troubleshooting

This guide provides solutions to common overlay issues, organized by symptom for quick problem diagnosis.

## Table of contents

- [Overlay doesn't open](#overlay-doesnt-open)
- [Overlay doesn't close](#overlay-doesnt-close)
- [Overlay appears in wrong position](#overlay-appears-in-wrong-position)
- [Overlay appears behind content](#overlay-appears-behind-content)
- [Content doesn't update](#content-doesnt-update)
- [Focus issues](#focus-issues)
- [Performance problems](#performance-problems)
- [Accessibility issues](#accessibility-issues)

## Overlay doesn't open

### Symptom: Clicking trigger does nothing

**Possible causes:**

1. **Missing or incorrect `trigger` attribute**

    ```html
    <!-- ❌ BAD: Missing @interaction -->
    <sp-overlay trigger="my-button">
        <!-- ✅ GOOD: Complete trigger reference -->
        <sp-overlay trigger="my-button@click"></sp-overlay>
    </sp-overlay>
    ```

2. **Trigger element doesn't exist**

    ```javascript
    // Check if element exists
    const trigger = document.querySelector('#my-button');
    if (!trigger) {
        console.error('Trigger element not found!');
    }
    ```

3. **Overlay is disabled**

    ```html
    <!-- Remove disabled attribute -->
    <sp-overlay trigger="btn@click" disabled>
        <!-- ❌ -->
        <sp-overlay trigger="btn@click"><!-- ✅ --></sp-overlay>
    </sp-overlay>
    ```

4. **JavaScript error preventing execution**
    ```javascript
    // Check browser console for errors
    console.log('Overlay element:', overlay);
    console.log('Trigger element:', trigger);
    ```

### Symptom: Hover tooltip doesn't appear

**Possible causes:**

1. **Missing `delayed` attribute causing warm-up period**

    ```html
    <!-- First hover requires warm-up (1000ms) -->
    <sp-overlay trigger="btn@hover" type="hint" delayed>
        <!-- Subsequent hovers open immediately -->
    </sp-overlay>
    ```

2. **Wrong overlay type**

    ```html
    <!-- ❌ BAD: click type doesn't work with hover -->
    <sp-overlay trigger="btn@hover" type="auto">
        <!-- ✅ GOOD: hint type for hover tooltips -->
        <sp-overlay trigger="btn@hover" type="hint"></sp-overlay>
    </sp-overlay>
    ```

3. **Trigger element is not hoverable**
    ```css
    /* Ensure element can receive hover events */
    #my-trigger {
        pointer-events: auto; /* Not 'none' */
    }
    ```

### Symptom: Programmatic `overlay.open = true` doesn't work

**Possible causes:**

1. **Overlay not connected to DOM**

    ```javascript
    // Ensure overlay is in the document
    if (!overlay.isConnected) {
        document.body.appendChild(overlay);
    }
    overlay.open = true;
    ```

2. **Missing trigger element for positioned overlays**

    ```javascript
    // Positioned overlays need a trigger
    overlay.triggerElement = document.querySelector('#trigger');
    overlay.placement = 'bottom';
    overlay.open = true;
    ```

3. **Overlay is disabled**
    ```javascript
    if (overlay.disabled) {
        console.warn('Overlay is disabled');
    }
    overlay.disabled = false;
    overlay.open = true;
    ```

## Overlay doesn't close

### Symptom: ESC key doesn't close overlay

**Possible causes:**

1. **Overlay type is `modal`**

    ```html
    <!-- ❌ modal type prevents ESC close -->
    <sp-overlay type="modal">
        <!-- ✅ Use page, auto, or manual for ESC close -->
        <sp-overlay type="page"></sp-overlay>
    </sp-overlay>
    ```

2. **Event is being prevented**
    ```javascript
    // Check if something is preventing the event
    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('ESC pressed, propagating:', !e.defaultPrevented);
        }
    });
    ```

### Symptom: Clicking outside doesn't close overlay

**Possible causes:**

1. **Wrong overlay type**

    ```html
    <!-- ❌ manual type only closes on ESC -->
    <sp-overlay type="manual">
        <!-- ✅ auto type closes on outside click -->
        <sp-overlay type="auto"></sp-overlay>
    </sp-overlay>
    ```

2. **`notImmediatelyClosable` is set**

    ```javascript
    // For imperative API
    const overlay = await openOverlay(content, {
        type: 'auto',
        notImmediatelyClosable: true, // ❌ Prevents immediate close
    });

    // Remove this option for normal behavior
    const overlay = await openOverlay(content, {
        type: 'auto', // ✅ Closes on outside click
    });
    ```

3. **Focus is trapped (modal overlay)**
    ```html
    <!-- Modal traps focus, requires explicit close -->
    <sp-overlay type="modal">
        <sp-popover>
            <sp-dialog>
                <sp-button onclick="this.closest('sp-overlay').open = false">
                    Close
                </sp-button>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
    ```

### Symptom: Overlay won't close programmatically

**Possible causes:**

1. **Trying to close during opening animation**

    ```javascript
    // Wait for overlay to finish opening
    overlay.addEventListener(
        'sp-opened',
        () => {
            overlay.open = false; // Now safe to close
        },
        { once: true }
    );
    ```

2. **Event listener preventing close**
    ```javascript
    // Check for listeners preventing the close
    overlay.addEventListener('beforetoggle', (e) => {
        if (e.newState === 'closed') {
            console.log('Close event fired');
        }
    });
    ```

## Overlay appears in wrong position

### Symptom: Overlay is not positioned relative to trigger

**Possible causes:**

1. **Missing `placement` attribute**

    ```html
    <!-- ❌ No placement specified -->
    <sp-overlay trigger="btn@click" type="auto">
        <!-- ✅ Specify desired placement -->
        <sp-overlay
            trigger="btn@click"
            type="auto"
            placement="bottom"
        ></sp-overlay>
    </sp-overlay>
    ```

2. **Trigger element is not set**

    ```javascript
    // For programmatic control
    overlay.triggerElement = document.querySelector('#trigger');
    overlay.placement = 'bottom';
    overlay.open = true;
    ```

3. **Trigger element has `display: none` or is not in viewport**
    ```javascript
    // Check trigger visibility
    const trigger = overlay.triggerElement;
    const rect = trigger.getBoundingClientRect();
    console.log('Trigger visible:', rect.width > 0 && rect.height > 0);
    ```

### Symptom: Overlay placement ignores preference

**Possible causes:**

1. **Not enough space for preferred placement**

    ```html
    <!-- Floating UI will automatically use fallback placement -->
    <sp-overlay placement="top">
        <!-- Tries top first -->

        <!-- Check actual placement -->
        <script>
            overlay.addEventListener('sp-opened', () => {
                const actual =
                    overlay.dialogEl.getAttribute('actual-placement');
                console.log('Actual placement:', actual);
            });
        </script>
    </sp-overlay>
    ```

2. **Viewport constraints**
    ```javascript
    // Overlay adjusts position to stay in viewport
    // This is expected behavior
    ```

### Symptom: VirtualTrigger not working

**Possible causes:**

1. **Incorrect VirtualTrigger usage**

    ```javascript
    // ❌ BAD: Creating but not assigning
    new VirtualTrigger(x, y);

    // ✅ GOOD: Assign to overlay
    overlay.triggerElement = new VirtualTrigger(x, y);
    overlay.open = true;
    ```

2. **Coordinates are off-screen**
    ```javascript
    // Ensure coordinates are within viewport
    const x = Math.max(0, Math.min(event.clientX, window.innerWidth));
    const y = Math.max(0, Math.min(event.clientY, window.innerHeight));
    overlay.triggerElement = new VirtualTrigger(x, y);
    ```

## Overlay appears behind content

### Symptom: Overlay is obscured by other elements

**Possible causes:**

1. **Parent element has higher `z-index`**

    ```css
    /* ❌ Parent with high z-index */
    .parent {
        z-index: 9999;
        position: relative;
    }

    /* ✅ Move overlay outside parent or adjust z-index */
    ```

2. **CSS `contain` property on parent**

    ```css
    /* ❌ Contain creates new stacking context */
    .parent {
        contain: layout;
    }

    /* ✅ Remove contain or move overlay outside */
    .parent {
        /* Remove contain property */
    }
    ```

3. **Parent has `clip-path`**

    ```html
    <!-- ❌ Overlay clipped by parent -->
    <div style="clip-path: inset(0);">
        <button id="trigger">Click</button>
        <sp-overlay trigger="trigger@click">...</sp-overlay>
    </div>

    <!-- ✅ Move overlay outside clipped parent -->
    <div style="clip-path: inset(0);">
        <button id="trigger">Click</button>
    </div>
    <sp-overlay trigger="trigger@click">...</sp-overlay>
    ```

4. **Browser doesn't support Popover API**
    ```javascript
    // Check if browser supports popover
    if (!('showPopover' in document.createElement('div'))) {
        console.warn('Popover API not supported, using fallback');
    }
    ```

### Solution: Move overlay to document body

```javascript
// Move overlay to body to escape stacking context
document.body.appendChild(overlay);

// Maintain trigger association
overlay.triggerElement = document.querySelector('#trigger');
```

## Content doesn't update

### Symptom: Overlay shows stale content

**Possible causes:**

1. **Content is set once and not updated**

    ```javascript
    // ❌ BAD: Content set once
    overlay.innerHTML = '<sp-popover>Static content</sp-popover>';

    // ✅ GOOD: Update content before opening
    overlay.addEventListener('sp-opened', () => {
        const popover = overlay.querySelector('sp-popover');
        popover.innerHTML = getCurrentData();
    });
    ```

2. **Need to use `slottable-request`**
    ```javascript
    // Load fresh content when overlay opens
    overlay.addEventListener('slottable-request', (event) => {
        if (event.data !== removeSlottableRequest) {
            const freshData = fetchFreshData();
            overlay.innerHTML = `<sp-popover>${freshData}</sp-popover>`;
        }
    });
    ```

### Symptom: Reactive framework not updating overlay content

**Possible causes:**

1. **Change detection not running**

    ```javascript
    // For Lit
    overlay.requestUpdate();

    // For React
    forceUpdate();

    // For Angular
    changeDetectorRef.detectChanges();
    ```

2. **Using trigger directive incorrectly**

    ```typescript
    // ❌ BAD: Static template
    ${trigger(() => staticTemplate, options)}

    // ✅ GOOD: Reactive template
    ${trigger(() => this.getDynamicTemplate(), options)}
    ```

## Focus issues

### Symptom: Focus not moving into overlay

**Possible causes:**

1. **`receives-focus` is set to `false`**

    ```html
    <!-- ❌ Prevents focus -->
    <sp-overlay receives-focus="false">
        <!-- ✅ Allow focus -->
        <sp-overlay receives-focus="true"></sp-overlay>
    </sp-overlay>
    ```

2. **Overlay type is `hint`**

    ```html
    <!-- hint type never receives focus (by design) -->
    <sp-overlay type="hint"></sp-overlay>
    ```

3. **No focusable elements in overlay**
    ```html
    <!-- Add focusable element -->
    <sp-overlay type="modal">
        <sp-popover>
            <sp-dialog>
                <sp-button>Focusable button</sp-button>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
    ```

### Symptom: Focus not returning to trigger

**Possible causes:**

1. **Trigger element removed from DOM**

    ```javascript
    // Ensure trigger exists when overlay closes
    overlay.addEventListener('sp-closed', () => {
        if (trigger.isConnected) {
            trigger.focus();
        }
    });
    ```

2. **Using VirtualTrigger**
    ```javascript
    // VirtualTrigger has no element to return focus to
    // Manually manage focus
    const lastFocused = document.activeElement;
    overlay.addEventListener('sp-closed', () => {
        lastFocused.focus();
    });
    ```

### Symptom: Can't tab out of modal overlay

**This is expected behavior for modal overlays. Focus is trapped intentionally.**

```html
<!-- Modal traps focus (by design) -->
<sp-overlay type="modal">
    <!-- Use 'auto' or 'manual' for non-trapping behavior -->
    <sp-overlay type="auto"></sp-overlay>
</sp-overlay>
```

## Performance problems

### Symptom: Page sluggish with many overlays

**Solutions:**

1. **Use `slottable-request` for lazy loading**

    ```javascript
    overlay.addEventListener('slottable-request', (event) => {
        if (event.data !== removeSlottableRequest) {
            // Load content only when opened
            overlay.innerHTML = generateLargeContent();
        } else {
            // Remove content when closed
            overlay.innerHTML = '';
        }
    });
    ```

2. **Share overlays between triggers**

    ```javascript
    // One overlay for all table rows
    const sharedOverlay = document.querySelector('#shared-menu');

    document.querySelectorAll('.trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            sharedOverlay.triggerElement = trigger;
            updateMenuForTrigger(trigger);
            sharedOverlay.open = true;
        });
    });
    ```

3. **Use `triggered-by` attribute**
    ```html
    <!-- Declare which interactions are used -->
    <overlay-trigger triggered-by="click hover"></overlay-trigger>
    ```

See [PERFORMANCE.md](./PERFORMANCE.md) for comprehensive optimization strategies.

### Symptom: Slow overlay opening

**Possible causes:**

1. **Large content in overlay**

    ```javascript
    // Measure opening time
    performance.mark('overlay-start');
    overlay.open = true;

    overlay.addEventListener(
        'sp-opened',
        () => {
            performance.mark('overlay-end');
            performance.measure('open-time', 'overlay-start', 'overlay-end');
            const measure = performance.getEntriesByName('open-time')[0];
            console.log(`Opened in ${measure.duration}ms`);
        },
        { once: true }
    );
    ```

2. **Complex positioning calculations**
    ```html
    <!-- Simplify by removing unnecessary positioning -->
    <sp-overlay type="modal">
        <!-- Centered, no positioning needed -->
    </sp-overlay>
    ```

## Accessibility issues

### Symptom: Screen reader not announcing overlay

**Possible causes:**

1. **Missing ARIA attributes**

    ```html
    <!-- Add proper ARIA -->
    <sp-overlay type="modal">
        <sp-popover role="dialog" aria-modal="true" aria-labelledby="title">
            <sp-dialog>
                <h2 id="title" slot="heading">Dialog Title</h2>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
    ```

2. **Incorrect role**

    ```html
    <!-- For menus -->
    <sp-popover role="menu">
        <sp-menu>...</sp-menu>
    </sp-popover>

    <!-- For dialogs -->
    <sp-popover role="dialog" aria-modal="true">
        <sp-dialog>...</sp-dialog>
    </sp-popover>
    ```

### Symptom: Keyboard navigation not working

**Possible causes:**

1. **Trigger element is not keyboard accessible**

    ```html
    <!-- ❌ BAD: div is not keyboard accessible -->
    <div id="trigger" onclick="...">Click me</div>

    <!-- ✅ GOOD: button is keyboard accessible -->
    <sp-button id="trigger">Click me</sp-button>
    ```

2. **Missing `tabindex`**
    ```html
    <!-- Make custom elements focusable -->
    <custom-trigger id="trigger" tabindex="0"></custom-trigger>
    ```

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for comprehensive accessibility guidance.

## Debugging techniques

### Enable debug mode

```javascript
// Enable debug logging (if available)
window.__swc = window.__swc || {};
window.__swc.DEBUG = true;
```

### Inspect overlay state

```javascript
console.log('Overlay open:', overlay.open);
console.log('Overlay type:', overlay.type);
console.log('Overlay state:', overlay.state);
console.log('Trigger element:', overlay.triggerElement);
console.log('Placement:', overlay.placement);
console.log('Disabled:', overlay.disabled);
```

### Monitor events

```javascript
// Log all overlay events
['sp-opened', 'sp-closed', 'beforetoggle', 'slottable-request'].forEach(
    (event) => {
        overlay.addEventListener(event, (e) => {
            console.log(`Event: ${event}`, e.detail || e.data);
        });
    }
);
```

### Check computed styles

```javascript
// Check if overlay is visible
const computed = window.getComputedStyle(overlay);
console.log('Display:', computed.display);
console.log('Visibility:', computed.visibility);
console.log('Opacity:', computed.opacity);
console.log('Z-index:', computed.zIndex);
```

### Inspect overlay stack

```javascript
// Check overlay stack state (if exposed)
import { overlayStack } from '@spectrum-web-components/overlay';
console.log('Active overlays:', overlayStack.activeOverlays);
```

## Getting help

If you're still experiencing issues after trying these solutions:

1. **Check the documentation:**
    - [README.md](./README.md) - Overview and examples
    - [ARCHITECTURE.md](./ARCHITECTURE.md) - System internals
    - [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Accessibility guidelines

2. **Search existing issues:**
    - [GitHub Issues](https://github.com/adobe/spectrum-web-components/issues)

3. **Create a minimal reproduction:**
    - Isolate the problem
    - Remove unrelated code
    - Use CodePen or CodeSandbox

4. **File an issue:**
    - Include minimal reproduction
    - Describe expected vs actual behavior
    - Include browser/version information
    - Add relevant error messages

## See also

- [README.md](./README.md) - Overlay system overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical deep dive
- [PERFORMANCE.md](./PERFORMANCE.md) - Optimization strategies
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Accessibility best practices
