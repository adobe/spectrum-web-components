---
'@adobe/spectrum-wc': patch
---

Refine gen2 tabs styling: `swc-tab` labels now use `cjk-line-height-100` for Japanese, Chinese, and Korean text so CJK glyphs are not vertically clipped, and `swc-tab-panel` top padding uses the `spacing-200` token via a private `--_swc-tab-panel-padding-top` custom property instead of a hardcoded `12px` fallback.
