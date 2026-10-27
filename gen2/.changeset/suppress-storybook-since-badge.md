---
'@adobe/spectrum-wc': patch
---

Suppress the "Since X" version badge on all Storybook component docs pages, by defaulting it off in `DocsHeader`/`StatusBadge`. The badge was hand-typed via `@since` and could drift from the actual release version; it will be re-enabled once release-stamping automation keeps it accurate.

No component runtime changes; Storybook docs-page rendering only.
