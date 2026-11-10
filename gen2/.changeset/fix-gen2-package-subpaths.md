---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc-icons': minor
---

**fix(gen2):** Package import paths now always end in `.js`, and every subpath export points at a file that exists in the published package. Several import paths change (breaking).

- Barrels are sibling files instead of `index.js` files inside a folder. Import `@adobe/spectrum-wc/components/badge.js` (previously `@adobe/spectrum-wc/badge` or `@adobe/spectrum-wc/components/badge`), `@adobe/spectrum-wc/patterns/ai-toolkit/response-status.js`, and `@adobe/spectrum-wc-core/components/badge.js`.
- Core folders use the same form: `@adobe/spectrum-wc-core/element.js`, `mixins.js`, `utils.js`, `controllers.js`, `directives.js`, and one file for each controller or directive, such as `controllers/placement-controller.js` and `directives/pending-spinner.js`.
- The focus group navigation controller is exported as `@adobe/spectrum-wc-core/controllers/focusgroup-navigation-controller.js`. The previous `controllers/focus-group-navigation-controller.js` export pointed at a file that did not exist.
- Class files and registration modules keep their paths, for example `@adobe/spectrum-wc/components/badge/Badge.js` and `@adobe/spectrum-wc/components/badge/swc-badge.js`.
- Extensionless subpaths (such as `@adobe/spectrum-wc/badge` and `@adobe/spectrum-wc-core/element`) and `/index.js` subpaths no longer work. Use the `.js` forms above.
- Core no longer exports individual files inside its folders (such as `element/define-element.js` or `utils/capitalize.js`); import them from the folder barrel. The internal warning helpers in `element/spectrum-element.js` are no longer public.
- `@adobe/spectrum-wc` no longer exports `utils/*` or component CSS modules (`*.css.js`), and `@adobe/spectrum-wc-icons` no longer exports `stylesheets/*`.
- `@adobe/spectrum-wc` and `@adobe/spectrum-wc-core` have no package root export, `main`, or `module` field. Core no longer ships `typesVersions`, so TypeScript consumers need `moduleResolution` set to `node16`, `nodenext`, or `bundler`.
