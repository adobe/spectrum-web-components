---
'@spectrum-web-components/avatar': patch
---

**Added**: `is-decorative` attribute to `<sp-avatar>` to allow developers to explicitly mark avatars as decorative. When set, the avatar is hidden from screen readers with `alt=""` and `aria-hidden="true"`.

**Fixed**: Fixed accessibility violation where `<sp-avatar>` rendered an underlying `img` without any `alt` attribute when no `label` was provided. The component now defaults to `alt=""` when neither `label` nor `is-decorative` is provided, and logs a dev mode warning to help developers catch missing accessibility attributes.
