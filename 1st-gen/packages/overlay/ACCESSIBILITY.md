# Accessibility

This guide covers accessibility best practices for implementing overlays in Spectrum Web Components.

## Table of contents

- [Focus management](#focus-management)
- [ARIA patterns](#aria-patterns)
- [Keyboard navigation](#keyboard-navigation)
- [Screen reader support](#screen-reader-support)
- [Color contrast and visual indicators](#color-contrast-and-visual-indicators)
- [Common accessibility issues](#common-accessibility-issues)

## Focus management

Proper focus management is critical for keyboard users and screen reader users to interact with overlays effectively.

### Focus behavior by overlay type

Different overlay types have different focus management behaviors:

**`modal` and `page` overlays:**

- Always trap focus within the overlay
- Focus moves to first focusable element (or overlay container if none)
- Cannot tab outside the overlay
- ESC key behavior: `modal` cannot close with ESC, `page` can close with ESC

```html
<sp-overlay trigger="open-dialog@click" type="modal" receives-focus="true">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Confirm Action</h2>
            <p>Are you sure you want to proceed?</p>
            <sp-button slot="button" variant="accent">Confirm</sp-button>
            <sp-button slot="button" variant="secondary">Cancel</sp-button>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

**`auto` overlays:**

- Accept focus into the overlay content
- Do not trap focus (user can tab outside)
- Close automatically when focus moves outside
- ESC key closes the overlay

```html
<sp-overlay trigger="menu-btn@click" type="auto" receives-focus="true">
    <sp-popover>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option 2</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

**`hint` overlays:**

- No focus management (non-interactive)
- Close on any user interaction
- Best for tooltips that provide supplementary information

```html
<sp-overlay trigger="help-btn@hover" type="hint" delayed placement="top">
    <sp-tooltip>This is helpful information</sp-tooltip>
</sp-overlay>
```

**`manual` overlays:**

- Accept focus into the overlay content
- Do not trap focus
- Only close on ESC key or programmatic close
- Best for persistent information popovers

### Controlling focus with receives-focus

Use the `receives-focus` attribute to control whether the overlay receives focus when opened:

```html
<!-- Always move focus (good for dialogs and menus) -->
<sp-overlay receives-focus="true" type="modal">
    <sp-popover>
        <sp-dialog>...</sp-dialog>
    </sp-popover>
</sp-overlay>

<!-- Never move focus (good for non-interactive hints) -->
<sp-overlay receives-focus="false" type="auto">
    <sp-popover>
        <p>Informational content</p>
    </sp-popover>
</sp-overlay>

<!-- Automatic based on type (default) -->
<sp-overlay receives-focus="auto" type="auto">
    <sp-popover>...</sp-popover>
</sp-overlay>
```

### Returning focus to trigger

When an overlay closes, focus should return to the trigger element:

```javascript
const overlay = document.querySelector('sp-overlay');

// Focus automatically returns to trigger when overlay closes
overlay.addEventListener('sp-closed', () => {
    console.log('Focus returned to trigger element');
});
```

This is handled automatically by the overlay system for most cases.

## ARIA patterns

### Required ARIA attributes

**Trigger elements:**

```html
<!-- For menu triggers -->
<sp-button
    id="menu-trigger"
    aria-haspopup="menu"
    aria-expanded="false"
    aria-controls="menu-overlay"
>
    Actions
</sp-button>

<!-- For dialog triggers -->
<sp-button id="dialog-trigger" aria-haspopup="dialog" aria-expanded="false">
    Open Dialog
</sp-button>
```

**Overlay content:**

```html
<!-- Dialog overlay -->
<sp-overlay type="modal">
    <sp-popover role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <sp-dialog>
            <h2 id="dialog-title" slot="heading">Dialog Title</h2>
            <p>Dialog content...</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>

<!-- Menu overlay -->
<sp-overlay type="auto">
    <sp-popover role="menu" aria-label="Actions menu">
        <sp-menu>
            <sp-menu-item role="menuitem">Copy</sp-menu-item>
            <sp-menu-item role="menuitem">Paste</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

### Descriptive relationships

Use `aria-describedby` to associate tooltip content with trigger elements:

```html
<sp-button id="save-btn" aria-describedby="save-tooltip">Save</sp-button>

<sp-overlay trigger="save-btn@hover" type="hint">
    <sp-tooltip id="save-tooltip">Save your changes (Ctrl+S)</sp-tooltip>
</sp-overlay>
```

This relationship is automatically managed by `HoverController` and `LongpressController`.

### Live regions for dynamic content

For overlays with dynamic content that should be announced:

```html
<sp-overlay type="auto">
    <sp-popover>
        <div aria-live="polite" aria-atomic="true">
            <p id="status-message">Loading...</p>
        </div>
    </sp-popover>
</sp-overlay>
```

## Keyboard navigation

### Standard keyboard interactions

**All overlays:**

- **ESC** - Close overlay (except `modal` type)
- **TAB** - Move focus forward (within overlay for modal, or to next element for non-modal)
- **Shift+TAB** - Move focus backward

**Menu overlays:**

- **Arrow Up/Down** - Navigate menu items
- **Home** - First menu item
- **End** - Last menu item
- **Enter/Space** - Activate menu item

**Dialog overlays:**

- **TAB** - Cycle through interactive elements
- **Shift+TAB** - Cycle backward
- Focus trapped within dialog for modal type

**Longpress overlays:**

- **Space** - Trigger longpress overlay
- **Alt+Down Arrow** - Trigger longpress overlay

### Implementing custom keyboard handlers

For custom keyboard interactions:

```javascript
overlay.addEventListener('keydown', (event) => {
    // Custom keyboard handling
    if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        // Perform custom action
        overlay.open = false;
    }
});
```

### Ensuring keyboard-only users can access hover content

Hover tooltips should also be accessible via keyboard focus:

```html
<overlay-trigger>
    <sp-button slot="trigger">Help</sp-button>

    <!-- This tooltip appears on BOTH hover and keyboard focus -->
    <sp-tooltip slot="hover-content">
        Helpful information accessible to keyboard users
    </sp-tooltip>
</overlay-trigger>
```

## Screen reader support

### Announcing overlay state changes

The overlay system dispatches events that can be used to announce state changes:

```javascript
overlay.addEventListener('sp-opened', () => {
    // Optionally announce that overlay opened
    // Most screen readers will announce this automatically via role/aria-modal
});

overlay.addEventListener('sp-closed', () => {
    // Optionally announce that overlay closed
});
```

### Proper heading structure

Maintain logical heading hierarchy within overlay content:

```html
<sp-overlay type="modal">
    <sp-popover>
        <sp-dialog aria-labelledby="main-heading">
            <h2 id="main-heading" slot="heading">Main Dialog Title</h2>

            <!-- Subsection within dialog -->
            <h3>Subsection Title</h3>
            <p>Subsection content...</p>

            <!-- Another subsection -->
            <h3>Another Subsection</h3>
            <p>More content...</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

### Descriptive labels for all interactive elements

```html
<sp-overlay type="auto">
    <sp-popover>
        <sp-menu>
            <!-- Good: Descriptive text -->
            <sp-menu-item>Copy to clipboard</sp-menu-item>
            <sp-menu-item>Delete permanently</sp-menu-item>

            <!-- Avoid: Vague text -->
            <!-- <sp-menu-item>Copy</sp-menu-item> -->
            <!-- <sp-menu-item>Delete</sp-menu-item> -->
        </sp-menu>
    </sp-popover>
</sp-overlay>
```

### Error messages and validation

Ensure error messages in overlays are announced:

```html
<sp-overlay type="modal" receives-focus="true">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Edit Profile</h2>

            <sp-field-label for="username">Username</sp-field-label>
            <sp-textfield
                id="username"
                aria-describedby="username-error"
                aria-invalid="true"
            ></sp-textfield>

            <!-- Error message with role="alert" for announcement -->
            <sp-help-text id="username-error" variant="negative" role="alert">
                Username must be at least 3 characters
            </sp-help-text>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

## Color contrast and visual indicators

### Focus indicators

Ensure focus indicators meet WCAG AA standards (3:1 contrast ratio):

```css
/* Custom focus indicator for overlay content */
sp-overlay sp-button:focus-visible {
    outline: 2px solid var(--spectrum-blue-800);
    outline-offset: 2px;
}
```

### Visual distinction from page content

Modal overlays should have a backdrop that clearly distinguishes them from the page:

```html
<!-- Modal with backdrop (automatic) -->
<sp-overlay type="modal">
    <sp-popover>
        <sp-dialog>...</sp-dialog>
    </sp-popover>
</sp-overlay>
```

### High contrast mode support

Test overlays in high contrast mode to ensure visibility:

```css
@media (prefers-contrast: high) {
    sp-overlay[type='modal'] {
        border: 2px solid currentColor;
    }
}
```

## Common accessibility issues

### Issue: Trigger element is not keyboard accessible

**Problem:**

```html
<!-- BAD: div is not keyboard accessible -->
<div id="menu-trigger" onclick="openMenu()">Menu</div>
<sp-overlay trigger="menu-trigger@click" type="auto">
    <sp-popover>...</sp-popover>
</sp-overlay>
```

**Solution:**

```html
<!-- GOOD: Use button or other interactive element -->
<sp-button id="menu-trigger">Menu</sp-button>
<sp-overlay trigger="menu-trigger@click" type="auto">
    <sp-popover>...</sp-popover>
</sp-overlay>
```

### Issue: Hover content contains interactive elements

**Problem:**

```html
<!-- BAD: hover-content should be non-interactive -->
<overlay-trigger>
    <sp-button slot="trigger">Help</sp-button>
    <sp-popover slot="hover-content">
        <sp-link href="/help">Read more</sp-link>
    </sp-popover>
</overlay-trigger>
```

**Solution:**

```html
<!-- GOOD: Use click-content for interactive overlays -->
<overlay-trigger>
    <sp-button slot="trigger">Help</sp-button>
    <sp-tooltip slot="hover-content">Click for more information</sp-tooltip>
    <sp-popover slot="click-content">
        <sp-dialog>
            <h2 slot="heading">Help</h2>
            <p>Detailed help content...</p>
            <sp-link href="/help">Read full documentation</sp-link>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

### Issue: Missing ARIA attributes

**Problem:**

```html
<!-- BAD: No aria-haspopup or aria-expanded -->
<sp-button id="dialog-trigger">Open</sp-button>
```

**Solution:**

```html
<!-- GOOD: Proper ARIA attributes -->
<sp-button id="dialog-trigger" aria-haspopup="dialog" aria-expanded="false">
    Open
</sp-button>
```

### Issue: Focus not returned to trigger

This is usually handled automatically, but if you're managing overlay lifecycle manually:

```javascript
const overlay = await openOverlay(content, options);
const triggerElement = document.querySelector('#trigger');

overlay.addEventListener(
    'sp-closed',
    () => {
        // Return focus to trigger
        triggerElement.focus();
        overlay.remove();
    },
    { once: true }
);
```

### Issue: Insufficient color contrast

Test with browser DevTools or accessibility tools to ensure:

- Text has at least 4.5:1 contrast ratio (WCAG AA)
- Large text (18pt+) has at least 3:1 contrast ratio
- Focus indicators have at least 3:1 contrast ratio

## Testing accessibility

### Automated testing

Use tools like:

- **axe DevTools** - Browser extension for accessibility testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Built into Chrome DevTools

### Manual testing checklist

- [ ] Can you reach all interactive elements with keyboard only?
- [ ] Is focus visible at all times?
- [ ] Does ESC key close the overlay?
- [ ] Is focus returned to trigger when overlay closes?
- [ ] Are all interactive elements properly labeled?
- [ ] Can screen readers access and understand all content?
- [ ] Is the overlay announced when it opens?
- [ ] Does the overlay work in high contrast mode?
- [ ] Is color not the only means of conveying information?

### Screen reader testing

Test with at least one screen reader:

- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

## Resources

- [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/articles/keyboard/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## See also

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overlay system architecture
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions
- [overlay-trigger.md](./overlay-trigger.md) - Multi-interaction overlays
