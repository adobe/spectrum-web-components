---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
---

Add the 2nd-gen `<swc-tooltip>`, migrated from the Spectrum 1 `<sp-tooltip>`.

- **API**: `for` attribute wires the tooltip to a trigger by ID; `trigger-element` property for programmatic or cross-shadow-root wiring; `manual` opts out of automatic wiring; `delay` (default 1500ms) for hover warm-up; `offset`, `cross-offset`, `container-padding`, and `should-flip` for viewport-aware positioning; `labeling` switches ARIA wiring to `ariaLabelledByElements` for icon-only triggers; `variant` accepts `neutral` (default), `informative`, and `negative`.
- **Breaking changes from `<sp-tooltip>`**: `slot="icon"` removed; `variant="positive"` removed; `variant="info"` renamed to `variant="informative"`; `self-managed` attribute removed (automatic wiring is now the default; use `manual` to opt out); events renamed from `sp-opened`/`sp-closed` to `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close`; authoring pattern changed — `<swc-tooltip>` is authored as a sibling of the trigger, not nested inside it.
- **Accessibility**: `role="tooltip"` set on the host; `Element.ariaDescribedByElements` wired on the trigger's inner interactive element on open; `Escape` closes without moving focus via native `popover="auto"`; WCAG 1.4.13 pointer bridge keeps the tooltip open when the pointer moves from the trigger into the bubble; high-contrast border in forced-colors mode.
- **Controllers**: `HoverController` manages hover and keyboard-focus wiring with warm-up/cooldown timing; `PlacementController` handles viewport-aware pixel positioning via Floating UI with automatic flip on viewport collision.
- **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.
