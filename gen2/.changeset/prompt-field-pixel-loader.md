---
'@adobe/spectrum-wc': minor
---

**feat(prompt-field):** `<swc-prompt-field>` now renders `<swc-pixel-loader>` as its status indicator at the start of the input row, resting on a settled frame while idle and animating while `generating`.

A single **`loader`** attribute sets the loader artwork:

- An **icon name** (default `aiLogo`): a single static icon.
- A **preset name** (`cc`, `dc`, `exp`, `analyze`, `mega`): a themed icon sequence cycled one per loop.

The icon and preset name sets are disjoint, so one attribute covers both; it is routed to the loader's `icon` or `preset` internally. The indicator is decorative (`aria-hidden`); the generating state is conveyed to assistive technology by the stop button that replaces send.
