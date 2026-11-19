---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(avatar):** Changed the default `size` of `<swc-avatar>` from `500` (40 px) to `100` (24 px), the same size value as 1st-gen's default (`20px` there) and the React Spectrum S2 default. Use `size="75"` for `20px`. Invalid `size` values now fall back to `100`. To keep the previous default, set `size="500"`.
