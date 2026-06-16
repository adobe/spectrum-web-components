---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
---

Add the 2nd-gen `<swc-action-button>`, migrated from the Spectrum 1 `<sp-action-button>`.

- **API**: `accessible-label` replaces `label`; `size` includes `xs` (not on `swc-button`); `quiet` and `static-color` retained as primary visual differentiators; `pending` / `pending-label` added (matching `swc-button`); `aria-haspopup` / `aria-expanded` forwarded to the inner `<button>` for menu-trigger patterns.
- **Breaking changes**: `toggles`, `selected`, `emphasized`, and `aria-pressed` removed (toggle UX moves to `swc-toggle-button` / `swc-toggle-button-group`); `href` and the link API removed (use native `<a>`); `hold-affordance` / `longpress` deferred; `label` renamed to `accessible-label`.
- **Accessibility**: semantics and focus land on the internal native `<button>` (`delegatesFocus: true`); host carries no `role="button"`; `aria-disabled="true"` on the inner `<button>` during pending state; dev-mode warning when icon-only usage is missing `accessible-label`.
- **Styling**: exposes `--swc-action-button-*` custom properties (replaces `--mod-actionbutton-*` / `--spectrum-actionbutton-*`); full Spectrum 2 token coverage across all size × quiet × static-color combinations; Windows High Contrast support.
- **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.
