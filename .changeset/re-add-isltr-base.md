---
'@spectrum-web-components/base': patch
---

**Fixed**: Re-added `isLTR` getter to `SpectrumMixin` and `SpectrumInterface` that was silently removed in #6129. The getter returns `getComputedStyle(this).direction !== 'rtl'`, preserving the original semantics while aligning with the updated `dir` implementation.
