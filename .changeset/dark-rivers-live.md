---
'@spectrum-web-components/menu': patch
---

**Fixes**: Icons in menu stories weren't properly responding to theme changes when used in functional story components.
Switching to class-based LitElement components ensures proper component lifecycle hooks and shadow DOM context for icon initialization and theme integration.
