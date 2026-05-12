---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
'@spectrum-web-components/badge': minor
'@spectrum-web-components/divider': minor
'@spectrum-web-components/progress-circle': minor
'@spectrum-web-components/status-light': minor
---

**Breaking**: `<swc-badge>` migration includes new `subtle`/`outline` styles, additional non-semantic color variants, and default behavior updates (`variant="neutral"` and reflected `size="s"` when omitted). `--mod-badge-*` hooks are removed, and `--swc-badge-*` hooks are **not** a strict 1:1 replacement surface for every previous override. See the badge consumer migration guide.

**Breaking**: `<swc-divider>` migration reflects `size="m"` when omitted (visual medium behavior remains unchanged). `--mod-divider-*` hooks are removed, and the new public styling surface (`--swc-divider-thickness`, `--swc-divider-background-color`) is **not** a strict 1:1 replacement for prior size/static-color-specific overrides. See the divider consumer migration guide.

**Breaking**: `<swc-progress-circle>` migration removes the `indeterminate` attribute (omit `progress` or set `progress = null` instead), no longer renders light DOM children as labels (use `label`/`aria-label`), and adds `static-color="black"` support. `--mod-progress-circle-*` hooks are removed, and `--swc-progress-circle-*` hooks are **not** a strict 1:1 replacement for all prior behavior. See the progress circle consumer migration guide.

**Breaking**: `<swc-status-light>` migration removes the deprecated `disabled` attribute, removes the `accent` variant, and updates default behavior (`variant="neutral"` when omitted). `--mod-status-light-*` hooks are removed, and `--swc-status-light-*` hooks are **not** a strict 1:1 replacement for every previous override pattern. `StatusLightSize` is exported from core for typed usage. See the status light consumer migration guide.
