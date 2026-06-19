---
layout: root.njk
title: 'Build with AI: Spectrum Web Components'
displayName: Build with AI
slug: build-with-ai
---

# Build with AI

Resources to help AI coding tools understand and work with Spectrum Web Components.

## Agent Skills

[Agent Skills](https://agentskills.io) are bundles of instructions and reference files that
your AI coding tool can load when they are relevant to a task.

Two skills are available for Spectrum Web Components:

### Gen1

Activated when your project uses `@spectrum-web-components/*` packages or `sp-*` custom elements.
Includes guides, component API references, accessibility guidance, and integration examples.

### Migrate from Gen1 to Gen2

Activated when migrating `sp-*` elements to `swc-*` elements from `@adobe/spectrum-wc`.
Includes the full coexistence walkthrough, per-component migration guides, and a CSS property
mapping reference.

---

Run the following command and select the skills you want to install from the list:

```bash
npx skills add spectrum-web-components.adobe.com
```

- Choose **Gen1** if you are building with `sp-*` components. When prompting your AI client, mentioning `sp-*`, `@spectrum-web-components`, or "Spectrum 1" will activate this skill.
- Choose **Migrate from Gen1 to Gen2** if you are upgrading an existing app to `swc-*` components. Mentioning "migrate", "Gen2", or `@adobe/spectrum-wc` will activate this skill.
- Choose both if you are mid-migration and working with both generations at the same time.
