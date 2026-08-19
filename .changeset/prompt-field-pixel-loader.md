---
'@adobe/spectrum-wc': minor
---

**feat(prompt-field):** `<swc-prompt-field>` now renders `<swc-pixel-loader>` as its status indicator at the start of the input row, resting on a settled frame while idle and animating while `generating`.

Two new attributes pass straight through to the loader:

- **`icon`** (default `aiLogo`): the single icon the loader builds.
- **`preset`** (`cc`, `dc`, `exp`, `analyze`, `mega`): a themed icon sequence cycled one per loop; overrides `icon` while set.

The indicator is decorative (`aria-hidden`); the generating state is conveyed to assistive technology by the stop button that replaces send.
