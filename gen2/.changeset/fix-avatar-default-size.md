---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(avatar):** Changed the default `size` of `<swc-avatar>` from `500` (40 px) to `100` (24 px) to match 1st-gen and the React Spectrum S2 default. Invalid `size` values now fall back to `100`. To keep the previous default, set `size="500"`.
