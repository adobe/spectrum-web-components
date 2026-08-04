---
'@adobe/spectrum-wc': patch
---

Remove the package-root `"."` export, `main`, and `module` fields from `@adobe/spectrum-wc`. They pointed at `./dist/index.js`/`./dist/index.d.ts`, but no root `index.ts` source ever existed and the build never produced those files in any published version, so `import '@adobe/spectrum-wc'` always failed to resolve. Import individual components and patterns instead, e.g. `@adobe/spectrum-wc/components/badge` or `@adobe/spectrum-wc/badge`.
