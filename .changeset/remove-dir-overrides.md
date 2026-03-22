---
'@spectrum-web-components/base': patch
'@spectrum-web-components/theme': patch
'@spectrum-web-components/core': patch
---

**Refactored**: Overhauled text direction management across the component library. Previously, `SpectrumElement` and `sp-theme` actively managed `dir` by traversing the DOM on connect, setting `dir` attributes on every component, and observing changes via `MutationObserver`. This has been replaced with a passive approach that relies on the native CSS `:dir()` pseudo-class and `getComputedStyle(this).direction` for JavaScript access, letting the browser's built-in direction inheritance do the work. Removed redundant `dir` property overrides from individual components, replaced `[dir]` attribute selectors with `:dir()` in stylesheets, and converted physical CSS properties to logical equivalents where applicable.
