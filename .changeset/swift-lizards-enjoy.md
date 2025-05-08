---
'@spectrum-web-components/icon': minor
---

fix: added missing reactive controller dependency for IconBase which was importing SystemContextResolution for context switching
Moved all linting, formatting, and static analysis logic (ESLint, Stylelint, Prettier, Lit Analyzer) into a centralized lint-staged configuration. Simplifies the pre-commit hook by delegating to `yarn lint-staged`, improving maintainability and consistency across contributors.
