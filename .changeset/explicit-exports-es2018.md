---
'@spectrum-web-components/core': patch
'@spectrum-web-components/shared': patch
'@spectrum-web-components/base': patch
---

- **Fixed**: Replaced all wildcard exports with explicit named exports for better bundler compatibility and tree-shaking
- **Fixed**: Changed build target from ES2022 to ES2018 to support Vitest and other test environments
- **Fixed**: Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared` to resolve module resolution issues in strict dependency environments
- **Fixed**: Added `@lit-labs/observers` as dependency and externalized it in Vite build config
