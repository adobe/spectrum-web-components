---
'@spectrum-web-components/field-label': patch
'@spectrum-web-components/help-text': patch
---

Fix missing CSS custom property overrides for field-label and help-text components

Previously, these components had empty override files despite having corresponding `--system-*` tokens defined in the system theme bridge. This caused the components to not properly apply size-specific spacing tokens for top and bottom text positioning. The fix adds the missing CSS custom property mappings to ensure proper theming across all component sizes (s, m, l, xl).
