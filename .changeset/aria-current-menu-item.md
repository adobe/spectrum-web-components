---
'@spectrum-web-components/menu': patch
---

- **Fixed**: Resolved accessibility issue where `<sp-menu-item>` selected state was not announced to screen readers by adding `aria-current="true"` attribute when `role="menuitem"` [#5888](https://github.com/adobe/spectrum-web-components/pull/5888)
