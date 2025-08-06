---
'@spectrum-web-components/styles': patch
---

Bring the CJK font alias token fix from CSS [#3883](https://github.com/adobe/spectrum-css/pull/3883) [`4e3a120`](https://github.com/adobe/spectrum-css/commit/4e3a120339a6e7e6d0d19e3f2f7f608ab96621ed).

The `--spectrum-cjk-font` token was incorrectly mapped to the code font-family stack instead of `--spectrum-cjk-font-family-stack`. Thanks [@byteakp](https://github.com/byteakp)!
