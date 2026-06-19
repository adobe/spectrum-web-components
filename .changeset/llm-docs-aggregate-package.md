---
'@spectrum-web-components/llm-docs': minor
---

Add `@spectrum-web-components/llm-docs`, an optional package that bundles LLM-consumable documentation for every Spectrum 1 component as one `{component}.llm.md` file. Each file is derived deterministically from the component's README (Storybook and docs-site chrome stripped, a small metadata frontmatter prepended) and is byte-identical to the `docs.llm.md` that now lives beside each README. Generate or verify the files with `yarn generate:llm-docs` and `yarn generate:llm-docs:check`.
