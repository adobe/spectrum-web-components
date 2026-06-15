---
'@adobe/spectrum-wc': minor
---

Add 2nd-gen Link styles for native `<a href>` elements (no `swc-link` custom element).

- **CSS**: `link.css` BEM modifiers (standalone, secondary, quiet, static white/black); default prose and link-list appearance via `typography.css` (`.swc-Typography--prose`, `.swc-Typography--links`); optional `global-link.css` for application-wide bare-anchor baseline.
- **Migration**: consumer migration guide and Storybook docs for explicit modifiers, Typography cross-links, and accessibility guidance (no `disabled` on navigational links; quiet styling scoped to section patterns).
- **Tests**: Storybook play functions and Playwright ARIA snapshot coverage for link modifiers and typography wrapper contexts.
