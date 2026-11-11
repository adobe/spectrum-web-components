---
'@adobe/spectrum-wc-icons': patch
---

**fix(icons):** The element stylesheet (`stylesheets/icon-base.css`) is now a generated, verbatim copy of the shared `<swc-icon>` stylesheet in `@adobe/spectrum-wc`, so workflow icons can no longer drift from `<swc-icon>` and `<swc-ui-icon>`. The copy adds `box-sizing: border-box` to the inner `svg`, which has no visual effect. Contributors edit `gen2/packages/swc/stylesheets/_lit-styles/icon-base.css` and run `yarn generate:icon-styles`; the package build fails if the copy is out of date.
