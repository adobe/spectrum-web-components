---
'@spectrum-web-components/core': patch
'@spectrum-web-components/base': patch
---

- **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.
