---
'@adobe/spectrum-wc': minor
---

**fix(tabs):** Changed the default `keyboard-activation` on `<swc-tabs>` from `manual` to `automatic`, aligning with React Spectrum/React Aria `Tabs`.

`swc-tab-panel` content is always present in the light DOM (not lazily mounted), which is the condition the WAI-ARIA APG recommends for automatic activation. Consumers relying on the previous implicit `manual` default (inherited from 1st-gen `sp-tabs`' `auto = false`) should add `keyboard-activation="manual"` explicitly, particularly if their own panel content is expensive to render or lazy-loaded.
