## 0.0.4

### Patch Changes

- [#5998](https://github.com/adobe/spectrum-web-components/pull/5998) [`6f5419a`](https://github.com/adobe/spectrum-web-components/commit/6f5419a4de29a1ee440a36c1a57d8c2e1476e2f6) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - **Fixed** missing export for `alert-banner` from `@spectrum-web-components/core`, which could cause build failures in certain environments.

# [0.0.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.3...@spectrum-web-components/core@0.0.4) (2026-02-03)

### Patch Changes

**Fixed** missing export for `alert-banner` from `@spectrum-web-components/core`, which could cause build failures in certain environments.

## 0.0.3

### Patch Changes

- [#5993](https://github.com/adobe/spectrum-web-components/pull/5993) [`95e1c25`](https://github.com/adobe/spectrum-web-components/commit/95e1c25672f62f3723dfa66129ae5ecdeabe578a) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - - **Fixed**: Replaced wildcard exports from `@spectrum-web-components/core` with explicit named exports for better bundler compatibility
    - **Fixed**: Changed build target from ES2022 to ES2018 to support Vitest and other consumer environments
    - **Fixed**: Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared` to resolve module resolution issues in strict dependency environments
    - **Fixed**: Added `@lit-labs/observers` as dependency and externalized it in Vite build config

# [0.0.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.2...@spectrum-web-components/core@0.0.3) (2026-02-02)

### Patch Changes

- **Fixed**: Replaced wildcard exports from `@spectrum-web-components/core` with explicit named exports for better bundler compatibility
- **Fixed**: Changed build target from ES2022 to ES2018 to support Vitest and other consumer environments
- **Fixed**: Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared` to resolve module resolution issues in strict dependency environments
- **Fixed**: Added `@lit-labs/observers` as dependency and externalized it in Vite build config

## 0.0.2

### Patch Changes

- [#5900](https://github.com/adobe/spectrum-web-components/pull/5900) [`283f0fe`](https://github.com/adobe/spectrum-web-components/commit/283f0fe07533c464e9fe1a3e7edebecb9128e11f) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Added missing dependencies to the package.json files of several components to align with their usage in source code.

- [#5893](https://github.com/adobe/spectrum-web-components/pull/5893) [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650) Thanks [@majornista](https://github.com/majornista)! - hover overlays should close with the Esc key when trigger is not focused

- [#5866](https://github.com/adobe/spectrum-web-components/pull/5866) [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - - **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.

# [0.0.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.1...@spectrum-web-components/core@0.0.2) (2026-01-27)

### Patch Changes

Added missing dependencies to the package.json files of several components to align with their usage in source code.

hover overlays should close with the Esc key when trigger is not focused

- **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.
