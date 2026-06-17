---
name: build-with-spectrum-web-components
description: >-
  Build, scaffold, or edit web UIs with Adobe Spectrum Web Components (the
  `<sp-*>` custom elements from the `@spectrum-web-components/*` packages),
  grounded in the official per-component documentation shipped in
  `@spectrum-web-components/llm-docs`. Use this skill whenever the user wants to
  create or change an interface with Spectrum Web Components — for example "add
  an sp-button", "build a settings form with Spectrum", "use Adobe Spectrum
  components here", "scaffold a dialog with sp-dialog", or "wire up an
  sp-picker" — and also whenever they ask about the correct tag, import,
  attribute, slot, variant, event, or accessibility contract of an `sp-*`
  component while implementing. The skill installs the llm-docs package if it is
  missing and reads the authoritative component docs first, so the generated code
  uses real APIs (correct tags, package imports, attribute names, valid variant
  values) instead of guessed ones, and builds with Spectrum Web Components only
  rather than mixing in other UI libraries. Do NOT use this for React Spectrum
  (`@adobe/react-spectrum` / `@react-spectrum/*`), for raw Spectrum CSS classes,
  or when contributing inside the spectrum-web-components monorepo itself, where
  the component source and docs are already local.
---

# Build with Spectrum Web Components

## Why this skill exists

Spectrum Web Components is large (60+ components) and its API is specific: tag
names are `sp-*`, registration imports are side-effectful, variant and size
values are enumerated, and several components carry non-obvious accessibility
contracts (an icon-only `sp-button` needs a `label`; an `sp-dialog` is labelled
through its `heading` slot; overlays manage focus through `overlay-trigger`).
Guessing these from memory produces code that looks plausible but fails at
runtime — invented variants like `variant="success"`, wrong packages, missing
labels, or React-Spectrum props bolted onto a web component.

The `@spectrum-web-components/llm-docs` package solves this. It ships one
chrome-stripped markdown file per component, derived directly from each
component's README, with frontmatter listing the tag, package, sizes, variants,
slots, and events. Reading the relevant file before writing code grounds the
implementation in the real API. That is the whole point of this skill: **consult
the docs, then build — with Spectrum Web Components only.**

## When to use

- The user is building or editing a web interface and wants to use Spectrum Web
  Components (`<sp-button>`, `<sp-picker>`, `<sp-dialog>`, etc.).
- The user names "Adobe Spectrum" or "Spectrum" in a web (not React) context and
  expects components rather than design tokens or CSS.
- The user asks for the correct API of an `sp-*` component (which attributes,
  what variants are valid, which slots exist, how to label it) while coding.
- You are about to write `<sp-*>` markup or `@spectrum-web-components/*` imports
  and want to confirm the API instead of guessing.

## When not to use

- React Spectrum (`@adobe/react-spectrum`, `@react-spectrum/*`) — different
  library, different API. This skill does not cover it.
- Raw Spectrum CSS (the `spectrum-*` class-based stylesheets) with no components.
- Work inside the spectrum-web-components monorepo itself: the component source,
  READMEs, and docs are already in the tree, and contributors should edit those
  directly rather than install a published docs package. (The helper script will
  still find the local docs if you do run it there, but prefer the source.)

## Workflow

### 1. Ensure the docs are available

Run the bundled helper from the consumer project root. It finds the docs if they
are already installed, finds them in the monorepo if you are there, and otherwise
installs `@spectrum-web-components/llm-docs` as a devDependency using the
project's package manager (detected from the lockfile):

```bash
node <skill-dir>/scripts/ensure-llm-docs.mjs <component> [<component> ...]
```

Pass the components you expect to need. The script prints a `READ <name>: <path>`
line for each one and a final `DOCS_DIR=<path>` line pointing at the directory of
all `*.llm.md` files. Running it with no arguments lists every documented
component, which is useful when you are not yet sure which components map to the
user's request.

### 2. Read the docs for each component you will use

Read the `*.llm.md` file for every component before writing code that uses it.
Each file's frontmatter is the fast path — it enumerates the valid `tag`,
`package`, `sizes`, `variants`, `slots`, and `events`, so you can confirm an
attribute or variant value at a glance. The body covers usage, the accessibility
contract, composition rules, and common mistakes. Do not write an attribute or
variant value you have not seen in the doc.

If the user's request implies a component you cannot map to a filename, run the
script with no arguments to see the full list and pick the right one (e.g. a
"dropdown" is `picker`; a "toggle" is `switch`; a "chip" is `tags`).

### 3. Build with Spectrum Web Components only

Implement the UI using the documented API:

- **Import the side-effectful registration** for every tag you render, e.g.
  `import '@spectrum-web-components/button/sp-button.js';`. The element is not
  defined until this import runs.
- **Import the base class only for types/extension**, e.g.
  `import { Button } from '@spectrum-web-components/button';`.
- **Use the exact tag, attributes, and enumerated values** from the doc. If the
  doc lists `variant: [accent, primary, secondary, negative]`, do not invent
  `success` or `danger`.
- **Honor the accessibility contract** the doc spells out (visible label, slot
  label, or `label`/`aria-label` as applicable).
- **Stay within Spectrum Web Components.** Do not reach for another UI library,
  React Spectrum, or hand-rolled equivalents for something Spectrum already
  provides. A theme wrapper (`<sp-theme>`) is part of the system and is expected;
  unrelated component libraries are not.

If a component the user wants genuinely does not exist in the package, say so
plainly and suggest the closest Spectrum component rather than substituting a
different library.

### 4. Verify before finishing

- Every rendered `sp-*` tag has a matching side-effectful import.
- No attribute or variant value appears that is not in the component's doc.
- Accessibility requirements from the docs are met (labels, slots, roles).
- The app is wrapped in an `<sp-theme>` with a color and scale if the project
  does not already establish one.

## Fallbacks when the package will not install

The package is normally on npm. If the install fails (offline, private registry,
or a version not yet published), fall back in this order before giving up:

1. **Docs-site mirror** — fetch the per-component markdown by URL, e.g.
   `https://opensource.adobe.com/spectrum-web-components/llm-docs/<component>.md`.
   Use this when network access is available but the npm install is not.
2. **The component README** — `node_modules/@spectrum-web-components/<component>/README.md`
   if the component package itself is installed. The llm-docs file is derived
   from exactly this README, so it is an authoritative substitute.

Only after all of these fail should you proceed from general knowledge, and if
you do, tell the user the code was not grounded in the official docs so they can
double-check the API.

## Quick reference: common name → component

Use the helper script's full list to disambiguate, but these are frequent
mismatches between everyday words and Spectrum component names:

| User says        | Component (`sp-*`)                           |
| ---------------- | -------------------------------------------- |
| dropdown, select | `picker`                                     |
| toggle           | `switch`                                     |
| chip, pill       | `tags`                                       |
| text input       | `textfield`                                  |
| spinner, loader  | `progress-circle`                            |
| modal            | `dialog` + `overlay-trigger` or `sp-overlay` |
| tooltip          | `tooltip` + `overlay-trigger`                |
| icon button      | `action-button` or `button` with `icon-only` |
