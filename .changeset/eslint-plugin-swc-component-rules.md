---
'@spectrum-web-components/eslint-plugin': minor
---

**feat(eslint-plugin):** Added six data-driven rules for Spectrum Web Components usage: `swc/accessible-component`, `swc/no-deprecated`, `swc/required-attributes`, `swc/valid-attribute-values`, `swc/valid-slot-names`, and `swc/valid-slot-children`.

The rules parse both Lit `html` tagged templates and JSX/TSX, and validate `sp-*` element usage against hand-maintained component descriptors (accessibility requirements, deprecations, required attributes, enum attribute values, and slot definitions). They are authored in TypeScript under `src/`, compiled to `dist/`, and registered under the existing `swc/` namespace. The rules are not enabled by default in the repo's root `eslint.config.js`; opt in per rule (e.g. `'swc/accessible-component': 'warn'`), or consume the shipped `recommended` / `strict` presets via the `@spectrum-web-components/eslint-plugin/configs` export.
