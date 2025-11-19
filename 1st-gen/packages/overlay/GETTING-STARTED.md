# Getting started with overlays

This guide helps you choose the right overlay approach for your use case and get up and running quickly.

## Quick decision tree

Choose your overlay entry point by answering these questions:

### 1. What's your development approach?

**Declarative HTML** → Continue to question 2

**Imperative JavaScript** → Continue to question 3

**Using Lit templates** → Use the [trigger directive](#trigger-directive-lit-only)

### 2. Declarative HTML approach

**Do you need multiple interaction types on the same trigger?** (e.g., click AND hover)

- **Yes** → Use [`<overlay-trigger>`](#overlay-trigger)
- **No** → Use [`<sp-overlay>`](#sp-overlay)

### 3. Imperative JavaScript approach

**Do you have a DOM element as the trigger?**

- **Yes** → Use the [imperative API](#imperative-api) with a real element
- **No** (positioning at cursor/coordinates) → Use the [imperative API](#imperative-api) with `VirtualTrigger`

## Entry point comparison

| Feature                   | `<sp-overlay>`                   | `<overlay-trigger>`                        | Imperative API                           | Trigger directive                              |
| ------------------------- | -------------------------------- | ------------------------------------------ | ---------------------------------------- | ---------------------------------------------- |
| **Development style**     | Declarative HTML                 | Declarative HTML                           | Imperative JavaScript                    | Lit templates                                  |
| **Multiple interactions** | Single type per overlay          | ✅ Click + hover + longpress               | Single type per overlay                  | Single type per directive                      |
| **Virtual positioning**   | ✅ Via `triggerElement` property | ❌ Not supported                           | ✅ Via `VirtualTrigger`                  | ✅ Via options                                 |
| **Lazy content loading**  | ✅ Via `slottable-request`       | ✅ Automatic for each slot                 | ✅ Manual control                        | ✅ Automatic via directive                     |
| **Best for**              | Single interaction, fine control | Multiple interactions per trigger          | Dynamic/programmatic use                 | Lit apps, reactive content                     |
| **Setup complexity**      | Simple                           | Simple                                     | Moderate                                 | Simple (with Lit)                              |
| **Documentation**         | [README.md](./README.md)         | [overlay-trigger.md](./overlay-trigger.md) | [imperative-api.md](./imperative-api.md) | [trigger-directive.md](./trigger-directive.md) |

## Common use cases

Jump directly to patterns for common scenarios:

### Tooltips

**Simple hover tooltip** → Use `<sp-overlay>` with `trigger="element@hover"` and `type="hint"`

```html
<sp-button id="help-button">Help</sp-button>
<sp-overlay trigger="help-button@hover" type="hint" placement="top">
    <sp-tooltip>Click for more information</sp-tooltip>
</sp-overlay>
```

**Tooltip with click action** → Use `<overlay-trigger>` with both hover and click content

```html
<overlay-trigger placement="top">
    <sp-button slot="trigger">Help</sp-button>
    <sp-tooltip slot="hover-content">Click for more info</sp-tooltip>
    <sp-popover slot="click-content">
        <sp-dialog size="s">
            <h2 slot="heading">Help</h2>
            <p>Detailed help information here...</p>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

### Modal dialogs

**Confirmation dialog** → Use `<sp-overlay>` with `type="modal"`

```html
<sp-button id="delete-button">Delete</sp-button>
<sp-overlay trigger="delete-button@click" type="modal">
    <sp-dialog-wrapper headline="Confirm deletion" dismissable underlay>
        <p>Are you sure you want to delete this item?</p>
        <sp-button slot="button" variant="accent">Delete</sp-button>
        <sp-button
            slot="button"
            onclick="this.dispatchEvent(new Event('close', {bubbles: true}))"
        >
            Cancel
        </sp-button>
    </sp-dialog-wrapper>
</sp-overlay>
```

### Context menus

**Right-click menu** → Use imperative API with `VirtualTrigger`

```javascript
import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

element.addEventListener('contextmenu', async (event) => {
    event.preventDefault();

    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
    const menu = document.createElement('sp-popover');
    menu.innerHTML = `
        <sp-menu>
            <sp-menu-item>Cut</sp-menu-item>
            <sp-menu-item>Copy</sp-menu-item>
            <sp-menu-item>Paste</sp-menu-item>
        </sp-menu>
    `;

    const overlay = await openOverlay(menu, {
        trigger: virtualTrigger,
        placement: 'right-start',
        type: 'auto',
    });

    element.appendChild(overlay);
});
```

### Dropdown pickers

**Select menu** → Use `<sp-overlay>` with `type="auto"`

```html
<sp-button id="picker-trigger">Choose option</sp-button>
<sp-overlay trigger="picker-trigger@click" type="auto" placement="bottom-start">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option 2</sp-menu-item>
            <sp-menu-item>Option 3</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

## Entry point details

### `<sp-overlay>`

**When to use:**

- Single interaction type per trigger (click, hover, or longpress)
- Need fine-grained control over overlay behavior
- Working with virtual triggers or dynamic positioning

**Pros:**

- Most flexible and feature-complete
- Supports all overlay types and configurations
- Works with `VirtualTrigger` for cursor-based positioning

**Cons:**

- Need separate overlays for multiple interaction types
- Slightly more verbose than `<overlay-trigger>`

**Learn more:** [README.md](./README.md)

### `<overlay-trigger>`

**When to use:**

- Need multiple interactions on the same trigger (e.g., hover tooltip + click dialog)
- Want automatic content management per interaction type
- Prefer slot-based API

**Pros:**

- Handles multiple interaction types elegantly
- Automatic content lifecycle management
- Clean slot-based API

**Cons:**

- Cannot use `VirtualTrigger` (requires real DOM element)
- Less control over individual overlay behaviors
- Hover content is always `hint` type (non-interactive)

**Learn more:** [overlay-trigger.md](./overlay-trigger.md)

### Imperative API

**When to use:**

- Building components that need programmatic overlay control
- Dynamic overlay creation based on runtime conditions
- Context menus or cursor-following overlays
- Complex lifecycle management requirements

**Pros:**

- Full programmatic control
- Works with `VirtualTrigger` for any position
- Can create overlays on-demand
- Easy cleanup and disposal

**Cons:**

- More code to write
- Manual DOM management
- Need to handle async operations

**Learn more:** [imperative-api.md](./imperative-api.md)

### Trigger directive (Lit only)

**When to use:**

- Working in Lit-based applications
- Need reactive overlay content
- Want template composition benefits
- Building reusable Lit components

**Pros:**

- Integrates seamlessly with Lit
- Automatic reactive updates
- Lazy content rendering
- Clean template syntax

**Cons:**

- Only works with Lit
- Single interaction type per directive
- Need to understand Lit directives

**Learn more:** [trigger-directive.md](./trigger-directive.md)

## Next steps

1. **Choose your entry point** using the decision tree above
2. **Read the detailed documentation** for your chosen approach
3. **Explore [Storybook examples](../../storybook/)** to see patterns in action
4. **Review [common patterns](./README.md#integration-patterns)** for your use case
5. **Check [troubleshooting guide](./TROUBLESHOOTING.md)** if you encounter issues

## Additional resources

- [Architecture documentation](./ARCHITECTURE.md) - Deep dive into how the overlay system works
- [Accessibility guide](./ACCESSIBILITY.md) - Focus management and ARIA patterns
- [Performance guide](./PERFORMANCE.md) - Optimization strategies
- [Forms integration](./FORMS-INTEGRATION.md) - Validation popovers and field helpers
- [Menus integration](./MENUS-INTEGRATION.md) - Action menus and dropdown patterns
