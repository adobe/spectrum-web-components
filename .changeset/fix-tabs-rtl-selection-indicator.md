---
'@adobe/spectrum-wc': patch
'@spectrum-web-components/core': patch
---

**fix(tabs):** Fixed the `<swc-tabs>` selection indicator rendering in the wrong horizontal position in right-to-left (RTL) layouts.

The indicator's resting position is set via the logical property `inset-inline-start: 0`, which resolves to `right: 0` in RTL, but the JS that positions it always measured and translated it from the container's left edge regardless of direction. The offset calculation now branches on `getComputedStyle(this).direction`, and `transform-origin` flips to `right center` in RTL to match the indicator's anchor point. The indicator also recalculates when the writing direction changes at runtime, such as an ancestor's `dir` attribute flipping after the tabs have already rendered.
