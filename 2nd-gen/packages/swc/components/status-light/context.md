---
component: status-light
tag: swc-status-light
package: '@adobe/spectrum-wc/status-light'
status: preview
since: 0.0.1
sizes: [s, m, l, xl]
default_size: m
variants:
  semantic: [neutral, info, positive, negative, notice]
  color:
    [
      fuchsia,
      indigo,
      magenta,
      purple,
      seafoam,
      yellow,
      chartreuse,
      celery,
      cyan,
      pink,
      turquoise,
      brown,
      cinnamon,
      silver,
    ]
boolean_attributes: []
slots:
  - name: ''
    accepts: text
    description: text label of the status light
    required: true
events: []
methods: []
peer_components: [swc-badge]
not_for: [interactive-toggles, button-replacements]
---

## When to use

- Communicate the status of a single entity inline with a colored dot + text label (e.g., row in a table, list item, profile presence).
- Alternative to `swc-badge` when you want a discreet dot rather than a filled pill.

## When NOT to use

- For interactive toggles or filters → use a button or tag.
- For wrapping text-only metadata without status semantics → use `swc-badge` with `subtle`.
- For pure progress / loading signals → use `swc-progress-circle`.

## Canonical import

```js
import '@adobe/spectrum-wc/status-light';
```

## Minimal correct examples

```html
<!-- Semantic variants -->
<swc-status-light variant="positive">Approved</swc-status-light>
<swc-status-light variant="negative">Rejected</swc-status-light>
<swc-status-light variant="notice">Pending approval</swc-status-light>
<swc-status-light variant="info">Active</swc-status-light>
<swc-status-light variant="neutral">Archived</swc-status-light>

<!-- Non-semantic color variants for category coding -->
<swc-status-light variant="cyan">Analytics</swc-status-light>
<swc-status-light variant="silver">Version 1.2.10</swc-status-light>

<!-- Sizes -->
<swc-status-light size="s" variant="positive">Live</swc-status-light>
<swc-status-light size="xl" variant="negative">Down</swc-status-light>
```

## Accessibility contract

- The component sets: nothing on the host. Non-interactive, non-focusable. No implicit `role`.
- The consumer MUST provide: text in the default slot. The label is the entire accessible name.
- Color is not the only signal — semantic meaning is conveyed via the accompanying text label.
- Status-light is decorative without text — never render with an empty default slot.

## Composition rules

- **Pairs with**: table cells, list items, breadcrumb-like presence indicators.
- **Sibling component**: `swc-badge` for filled pill presentation; status-light is the dot-only equivalent.
- **Conflicts with**: nesting interactive elements inside status-light (no slot for icons, no event surface).

## Runtime constraints

- Invalid `variant` values log a debug warning at runtime but do not throw. (Source: `core/components/status-light/StatusLight.base.ts` `__swc.warn` block.)
- `disabled` attribute is **not supported in S2** but the component logs a debug warning if it sees one (S1 supported it). Remove `disabled` from your markup when migrating.
- The semantic variant `accent` is **S1-only**; S2 dropped it. Use `info` instead.

## Common LLM mistakes

- ❌ `<swc-status-light variant="success">` — there is no `success` variant. Use `positive`.
- ❌ `<swc-status-light variant="error">` — there is no `error` variant. Use `negative`.
- ❌ `<swc-status-light variant="warning">` — there is no `warning` variant. Use `notice`.
- ❌ `<swc-status-light variant="accent">` in S2 — `accent` was removed. Use `info`.
- ❌ Adding `disabled` — not supported in S2 (logs warning). Disable the surrounding container instead.
- ❌ Empty default slot (icon-only or text-less status-light). Always provide text.
- ❌ Treating status-light as interactive — it has no events, no focus, no click behavior.

## Spectrum 1 → Spectrum 2 differences

| Area                   | S1 (`sp-status-light`)                                        | S2 (`swc-status-light`)                                                |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Tag                    | `sp-status-light`                                             | `swc-status-light`                                                     |
| Package                | `@spectrum-web-components/status-light`                       | `@adobe/spectrum-wc/status-light`                                      |
| Semantic variants      | `accent`, `info`, `positive`, `negative`, `notice`, `neutral` | `info`, `positive`, `negative`, `notice`, `neutral` (`accent` removed) |
| Color variants         | 9                                                             | 14 (added `pink`, `turquoise`, `brown`, `cinnamon`, `silver`)          |
| `disabled` attribute   | supported                                                     | removed (warns at runtime if present)                                  |
| Custom-property prefix | `--mod-statuslight-*`                                         | `--swc-status-light-*`                                                 |
