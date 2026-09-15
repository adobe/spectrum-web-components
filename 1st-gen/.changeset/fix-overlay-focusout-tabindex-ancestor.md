---
'@spectrum-web-components/overlay': patch
---

**fix(overlay):** Fixed `[type="auto"]` `sp-overlay` incorrectly closing when clicking inside its own content, if the trigger and the overlay share a focusable ancestor (e.g. a `tabindex="0"` wrapper). Fixes [#5731](https://github.com/adobe/spectrum-web-components/issues/5731).

**Affected pattern**, previously broken:

```html
<div tabindex="0">
  <sp-button id="trigger">Open</sp-button>
  <sp-overlay trigger="trigger@click" type="auto">
    <sp-popover>
      Clicking anywhere in here used to close the popover.
    </sp-popover>
  </sp-overlay>
</div>
```

**Root cause:** `closeOnFocusOut` decided whether focus left the overlay by checking if the newly-focused element (`event.relatedTarget`) was a descendant of the overlay. Clicking non-focusable overlay content (plain text, padding, etc.) causes the browser to resolve focus onto the nearest focusable ancestor instead of the click target; when that ancestor also wraps the overlay itself, it sits above the overlay in the DOM, so the check always concluded focus had left and closed the overlay even though the click landed inside it.

**Fix:** `closeOnFocusOut` now also tracks whether the `pointerdown` causing the current focus change originated inside the overlay's own composed subtree, and treats focus as remaining within the overlay in that case regardless of where it was ultimately resolved to.
