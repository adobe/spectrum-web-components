# Icon strategies compared: spectrum-css, React Spectrum, SWC 1st-gen

A side-by-side reference of how three Adobe systems handle icons across four
stages: **source** (where the art comes from), **processing** (how raw art
becomes a usable artifact), **delivery** (what is published and how), and
**usage** (how a developer puts an icon on screen). Everything here is
S2-relevant unless noted.

---

## At a glance

| Stage | spectrum-css (`ui-icons`) | React Spectrum S2 (`@react-spectrum/s2`) | SWC 1st-gen (`icons-workflow` / `icons-ui`) |
| --- | --- | --- | --- |
| **Source** | A4U `@a4u/a4u-s2-*-global-set` (Adobe-internal, gated) | **Raw A4U export committed in-repo** (`s2wf-icons/S2_Icon_*_20_N.svg`) | Public npm `@adobe/spectrum-css-workflow-icons` + `@spectrum-css/ui-icons` (republished A4U) |
| **Ultimate origin** | A4U S2 icon global set (`icons.corp.adobe.com`) | same A4U set (committed verbatim; byte-identical to the public package) | same A4U set (via the public packages) |
| **Processing** | svgo (clean ids/classes, add `spectrum-UIIcon` class, idPrefix) + svgstore (sprite) | **Parcel** compiles each SVG to a React component at build, via the `exports` wildcard + `@react-spectrum/parcel-transformer-s2-icon` wrapping with `createIcon` | Custom `bin/build.js` (cheerio): strip ids/defs, **force `currentColor`**, emit 3 flavors for both S1 + S2 |
| **Delivery** | Public npm package: committed `dist/svg/` + sprite + `icons.json` | Per-icon subpath entry points `@react-spectrum/s2/icons/Add` (`.mjs`/`.cjs`); no committed generated components; plus consumer build tools | Committed per-icon `.ts` (function + class + `<sp-icon-*>` element) + barrels; deprecated sprite via `iconset`/`icons` |
| **Usage** | Framework-agnostic: sprite symbol or inline SVG; color via `--iconPrimary` / CSS | React only: `import Add from '.../icons/Add'; <Add aria-label />`; custom via `createIcon` / `<Icon>` | Web components: `<sp-icon-add>`, `AddIcon()`, or `<sp-icon name="ui:…">` |
| **Color model** | source fills `var(--iconPrimary, #222)` | `--iconPrimary` (private, set by the style macro) | flattened to `currentColor` |
| **Reach** | any framework (CSS/SVG) | React | any framework (custom elements) |

---

## Stage 1: Source

- **spectrum-css** and **the public Adobe packages SWC consumes** both trace back
  to the same Adobe-internal global sets (`@a4u/a4u-s2-*-global-set`). Those are
  **gated** (404 on public npm, `npm login --scope a4u`, employees only). Each
  project's job is to turn that gated source into something public.
- **React Spectrum S2 takes the cleanest approach to the gating problem: it
  commits the raw S2 SVGs directly into its own repo** under
  `packages/@react-spectrum/s2/s2wf-icons/`, named `S2_Icon_<Name>_20_N.svg`. No
  runtime or build dependency on `@a4u` or `@spectrum-css`; everyone builds from
  what is committed. The split is visible in the package `.gitignore`, which
  ignores the generated `icons/` output but **not** `s2wf-icons/`.

  **How the A4U SVGs get there: a manual download, by design.** Confirmed by the
  React Spectrum team directly: "We download the icons from a4u and run them
  through a script to make them compatible with react. The a4u download is
  manual ... can't have opensource code pointing at artifactory, so it's
  unfortunately manual." There is correspondingly no Makefile target, no script
  in the package, and no `@a4u` dependency that pulls A4U into `s2wf-icons/`. A
  maintainer downloads by hand, commits the SVGs, and a build-time script
  converts them. React Spectrum gives us the committed-source shape and a
  conversion script, but the A4U download itself is deliberately manual.
- **SWC 1st-gen** does not touch the gated source at all; it depends on the
  already-public processed packages (`@adobe/spectrum-css-workflow-icons`,
  `@spectrum-css/ui-icons`), accepting the extra hop.

**All three draw from one source: the Adobe-internal A4U "S2 icon global set"**
(`icons.corp.adobe.com`), exported as `S2_Icon_<Name>_20_N.svg`. This is
**confirmed, not inferred**: `@adobe/spectrum-css-workflow-icons@5`'s
`S2_Icon_Add_20_N.svg` is **byte-identical** to react-spectrum's committed
`s2wf-icons/S2_Icon_Add_20_N.svg`. So react-spectrum and spectrum-css are
siblings off the same A4U export.

**Shared SVG contract.** Because the source is shared, the S2 art is identical
across all three: square **20×20**, `viewBox="0 0 20 20"`,
`fill="var(--iconPrimary, #222)"`. React Spectrum publishes this as the
requirement for a custom S2 icon.

> **Consequence for SWC.** The byte-identical match proves A4U is the single
> origin; the spectrum-css packages are merely one redistribution of it. Since
> those packages are **deprecated and excluded as a source**, 2nd-gen goes to
> **A4U directly** (S2 Icon Global Set Open Source for workflow, S2 Ui Icon
> Global Set for UI), commits the raw SVGs, and refreshes them on a schedule. The
> gated package is never a committed dependency; only its OSS-cleared SVG content
> is committed.

---

## Stage 2: Processing

- **spectrum-css** is a pure asset pipeline: svgo for optimization (strip
  ids/classes/`data-name`, add a `spectrum-UIIcon` class, prefix ids, sort
  attributes) and svgstore for a sprite. It does **not** rewrite fills; color is
  left to the source's `--iconPrimary`. Output is committed and published.
- **React Spectrum S2** has **no pre-generation step and commits no generated
  components**. The package `exports` map points each icon entry at the raw SVG
  source and lets **Parcel** compile it on build:

  ```jsonc
  "./icons/*": {
    "source": "./s2wf-icons/S2_Icon_*_20_N.svg",
    "module": "./icons/*.mjs",
    "import": "./icons/*.mjs",
    "require": "./icons/*.cjs"
  }
  ```

  The transformer (`packages/dev/parcel-transformer-s2-icon/IconTransformer.js`)
  runs each SVG through `@svgr/core` + SVGO and then wraps it. Confirmed steps:
  - **SVGO**: `removeViewBox: false`, `inlineStyles` with `removeMatchedSelectors`,
    `removeAttrs` for `data-*`.
  - **ID prefixing**: every SVG element `id` is prefixed with an MD5 hash of the
    filename, so inlining many icons in one document cannot collide.
  - **Color**: it keeps `--iconPrimary` and rewrites the fallback. The static hex
    fallbacks (`#222`, `#292929`) become a theme-aware token:
    `var(--iconPrimary, light-dark(gray-800-light, gray-800-dark))`. It does
    **not** flatten to `currentColor`.
  - **Wrap**: SVGR emits a `ForwardRef` component; the transformer strips the
    default export and emits `export default createIcon(ForwardRef);`. Default
    size 20.

- **SWC 1st-gen** runs a bespoke cheerio build that does the most transformation
  of the three: strips ids/classes/`<defs>`, **forces every fill/stroke to
  `currentColor`** (discarding `--iconPrimary` theming), parameterizes
  size/aria, and emits three flavors for **both** S1 and S2 with a rename map and
  a `DefaultIcon` fallback. Output is committed.

---

## Stage 3: Delivery

- **spectrum-css**: a published npm package whose committed `dist/` carries the
  optimized individual SVGs, a combined sprite (`spectrum-css-icons.svg`), and an
  `icons.json` manifest. Consumers pull the whole package.
- **React Spectrum S2**: **per-icon subpath entry points**
  (`@react-spectrum/s2/icons/Add`) compiled to `.mjs` and `.cjs`. Tree-shaking
  comes from importing exactly the subpath you need, not from shaking a barrel.
  React Spectrum also ships **two consumer build tools** so apps can convert their
  *own* conformant SVGs:
  - `@react-spectrum/parcel-transformer-s2-icon`: a Parcel pipeline
    (`import Icon from 'icon:./Foo.svg'`).
  - `@react-spectrum/s2-icon-builder`: a CLI that emits TSX.
  Workflow icons are exposed publicly (`./icons/*` from `s2wf-icons`); **UI icons
  live in `ui-icons/` but have no package export**, so they are internal-only.
- **SWC 1st-gen**: committed per-icon `.ts` modules in three flavors (factory
  function, base class, registered `<sp-icon-*>` element) plus barrels. Plus the
  now-deprecated runtime sprite path (`iconset` registry + `<sp-icons-*>`).

---

## Stage 4: Usage

- **spectrum-css**: framework-agnostic and CSS-centric. Reference a sprite symbol
  (`<use href="…#icon">`) or inline an SVG, then style color via `--iconPrimary`
  or `currentColor`. No component model.
- **React Spectrum S2**: React components.

  ```jsx
  import Add from '@react-spectrum/s2/icons/Add';
  <Add aria-label="Add" />          // meaningful
  <Add />                            // decorative: aria-hidden by default

  import {createIcon} from '@react-spectrum/s2';
  ```

  Size via the style macro (default 20, t-shirt sizes), color via the private
  `--iconPrimary` override, decorative-by-default accessibility (`aria-hidden`
  unless `aria-label`), `role="img"`, `focusable={false}`. Parent components feed
  size/color through `IconContext`, and icons participate in loading skeletons via
  `SkeletonWrapper`.
- **SWC 1st-gen**: web components, framework-agnostic.

  ```html
  <sp-icon-add label="Add"></sp-icon-add>   <!-- per-icon element -->
  <sp-icon name="ui:Add"></sp-icon>          <!-- registry lookup (deprecated) -->
  ```
  ```ts
  html`<sp-icon>${AddIcon()}</sp-icon>`      // factory function
  ```
  Color via `currentColor`, `size` attribute, decorative-by-default. The
  web-component frame is the equivalent of React Spectrum's `createIcon`/`<Icon>`
  wrapper but needs **no per-consumer build transform**, and parent-driven
  sizing/color is done with CSS inheritance and `::slotted` rather than a context
  object.

---

## What this means for 2nd-gen

1. **Source: pull from A4U directly and copy React Spectrum's "commit the raw
   SVGs" move.** The deprecated spectrum-css packages are excluded as a source, so
   2nd-gen reads the gated A4U sets, commits the raw `S2_Icon_*_20_N.svg` files
   into the repo, and refreshes them on a schedule (Adobe-only). The gated package
   is never a committed dependency; only its OSS-cleared SVG content is.
2. **Color: preserve `--iconPrimary`, do not flatten to `currentColor`.** Both
   spectrum-css and React Spectrum keep `var(--iconPrimary, …)`; it is the
   Adobe-wide S2 contract. 2nd-gen should emit `fill="var(--iconPrimary, currentColor)"`.
3. **Delivery: lead with per-icon subpath entry points** as React Spectrum does,
   rather than relying on a bundler to tree-shake a barrel.
4. **Usage: publish the SVG contract** (20×20, `viewBox 0 0 20 20`,
   `var(--iconPrimary, currentColor)`) so a consumer's own conformant SVG drops
   into `<swc-icon>` with no consumer build step. Web components are an advantage
   here: no Parcel transformer or CLI is needed the way React Spectrum requires.
5. **Public vs internal:** match React Spectrum and design — workflow icons
   public, UI icons internal to components. Do not adopt React Spectrum's
   React-only delivery or consumer-side build transforms.
