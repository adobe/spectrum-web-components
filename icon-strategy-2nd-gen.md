# 2nd-gen icon strategy (S2-only)

A proposed icon strategy for 2nd-gen. It is derived from how the 1st-gen system
works (see `icon-system-eli5.md`), informed by how spectrum-css and React
Spectrum handle the same problem (see `icon-strategy-comparison.md`), and
deliberately ignores any choices already made on this branch. Goals: deliver
**only Spectrum 2 icons**, stay **simple to reason about**, be **easy to
implement**, and **keep tree-shaking**. We drop the three 1st-gen "flavors" and
treat the **SVG function as the preferred delivery**.

---

## 1. What we keep, drop, and add

| 1st-gen concept                                | 2nd-gen                     | Why                                                                      |
| ---------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `iconset` registry + `sp-iconset-added` events | **Drop**                    | No sprite sheets, no async lookup, so no registry needed.                |
| `icons` sprite-sheet packages                  | **Drop**                    | Ships every icon whether used or not; already deprecated.                |
| `<sp-icon name>` / `src`                       | **Drop**                    | Name lookup depends on the registry; `src` is just an `<img>`.           |
| Dual S1 + S2 art with runtime switch           | **Drop**                    | 2nd-gen is S2-only; one drawing per icon.                                |
| Per-icon **class** (`IconAdd`)                 | **Drop**                    | No unique value once the function exists.                                |
| Per-icon **registered element**                | **Reconsidered**            | Restored as the primary public delivery (see the RFC); framework-native. |
| Per-icon **SVG function**                      | **Keep, primary substrate** | One tiny tree-shakeable file per icon.                                   |
| Generic "picture frame" element                | **Keep, simplified**        | One `<swc-icon>` for size, color, a11y, slotting.                        |
| `fill="currentColor"`                          | **Evolve**                  | Preserve `--iconPrimary` with a `currentColor` fallback.                 |
| `label` → `aria-label` / else `aria-hidden`    | **Keep**                    | The single accessibility rule.                                           |

Net result: the drawing (SVG function) plus the frame (`<swc-icon>`), plus the
per-icon elements generated from the function.

---

## 2. The core model: function + frame

- The **function** is _what the icon is_: a tree-shakeable unit of SVG markup.
- The **frame** is _how an icon is presented_: consistent size, color, and
  accessibility, and a stable slot target inside other components.

```
AddIcon()                    -> the drawing (tree-shakeable, framework-portable)
<swc-icon> ... </swc-icon>   -> the frame around any drawing (size, color, a11y)
```

---

## 3. The per-icon SVG function

One generated file per icon, one named export. This is the entire reason
tree-shaking works.

- **S2 only.** No version branching.
- **Color** preserves `--iconPrimary` with a `currentColor` fallback.
- **Sizing args** default to the icon's own native size (workflow icons `20`; UI
  icons vary per viewBox), overridable for standalone use.
- **Accessibility args:** `hidden` toggles `aria-hidden`; `title` sets the
  accessible name when used without the frame.
- **Per-icon subpath is the primary import.** Lead with
  `import { AddIcon } from '@swc/icons-workflow/Add.js'`, as React Spectrum S2
  does with `@react-spectrum/s2/icons/Add`. A barrel stays as convenience.

---

## 4. The `<swc-icon>` frame

A thin element that extends a small base class:

- `size` attribute mapped to S2 size tokens.
- color inherited via `currentColor`.
- `label` → `aria-label`, or `aria-hidden="true"` when absent.
- render is just `<slot></slot>`.

No `name`, no `src`, no registry, no version logic. It makes the system
framework-agnostic: any consumer puts an `<svg>` inside `<swc-icon>` and gets
consistent sizing, color, and accessibility.

---

## 5. How icons get used

### 5a. Inside our own components (UI icons)

Call the function directly in the component template and style the resulting
`<svg>` with component CSS. No frame, no extra custom element instance.

```ts
import { ChevronRightIcon } from '@swc/icons-ui/ChevronRight.js';
render() {
  return html`<button><slot></slot>${ChevronRightIcon({ hidden: true })}</button>`;
}
```

### 5b. By consumers in a component's icon slot

```html
<swc-button>
  <swc-icon-add slot="icon" label="Add"></swc-icon-add>
  Add item
</swc-button>
```

### 5c. Standalone

```html
<swc-icon-add label="Add" size="l"></swc-icon-add>
```

---

## 6. Decision: what does the function return? (pros/cons)

Tree-shaking does not depend on this; it depends on the one-file-one-export
structure. The return type only decides how directly non-lit consumers can call
the function.

### Option A: lit `TemplateResult`

- **Pros:** cleanest call site in our components and lit consumers; no global
  state.
- **Cons:** only useful inside lit; couples the packages to lit; fails a
  framework-agnostic goal.

### Option B: SVG string

- **Pros:** framework-agnostic; usable via `innerHTML`, React
  `dangerouslySetInnerHTML`, Vue `v-html`, lit `unsafeSVG`; no rendering-library
  dependency; simplest mental model.
- **Cons:** in lit you need `unsafeSVG(AddIcon())`; injection goes through html
  sinks (safe here, but linters flag it).

### Option C: swappable template tag (1st-gen's `setCustomTemplateLiteralTag`)

- **Pros:** max reach from one definition.
- **Cons:** module-level mutable global state, order-sensitive, conflicts across
  consumers; the hardest to reason about.

**Recommendation:** the SVG string (Option B), paired with the framework-agnostic
`<swc-icon>` element and the per-icon custom elements. Reject the lit-coupled
output; do not adopt the swappable tag.

---

## 7. Directive vs controller vs frame

- **Reactive controller: no.** S2 icons are static, synchronous SVG. There is no
  async fetch, registration, or state to manage once the registry is gone. A
  controller adds ceremony for no benefit.
- **Lit directive: optional, not required.** Lit-only, so it cannot be the public
  mechanism, and it barely improves on calling the function. Skip for v1.
- **The element (picture frame): yes.** The only option that is framework-agnostic,
  works in plain HTML, gives a stable slot target, and centralizes size, color,
  and the label/`aria-hidden` rule. The equivalent of React Spectrum's
  `IconContext` is CSS inheritance + `::slotted`, which is simpler.

---

## 8. Source art, packaging, and generation

Everything below is **processed and shipped from 2nd-gen**: the generator and its
output live under `2nd-gen/`. The source of truth is the **Adobe-internal A4U S2
icon global set**. The deprecated spectrum-css packages
(`@adobe/spectrum-css-workflow-icons`, `@spectrum-css/ui-icons`) are **not** a
viable source and are not a dependency in any capacity.

### 8a. The source: the A4U S2 global sets

A4U (`icons.corp.adobe.com`) is Adobe's canonical icon source of truth.
spectrum-css and React Spectrum are both downstream redistributors of it
(confirmed: a public package's `S2_Icon_Add_20_N.svg` is byte-identical to React
Spectrum's committed copy). Two scoped packages cover the two families:

| Family   | A4U package                                                           |
| -------- | --------------------------------------------------------------------- |
| Workflow | S2 Icon Global Set Open Source (413 icons; third-party/brand removed) |
| UI       | S2 Ui Icon Global Set (no open-source variant needed)                 |

Two facts about access govern the approach:

1. **The packages are gated.** They live on Adobe's internal registry
   (Artifactory), not public npm (`npm login --scope a4u`). Only Adobe employees
   can pull them. The SWC repo's `.npmrc` only maps `@adobe` and the default to
   public npm, so this is per-developer/internal config, never committed.
2. **The icon content is cleared for open-source redistribution.** What is gated
   is the **package**, not the right to redistribute its SVGs. This is the seam
   the strategy exploits: pull from the gated package (Adobe-only), then commit
   and ship the SVGs publicly.

> The gated package can never be a committed `dependencies` entry: the upstream
> "do not commit the version" rule exists because it blocks non-Adobe employees.

### 8b. Getting A4U art into 2nd-gen and keeping it current

Because the package is gated but its content is publicly shippable, 2nd-gen
**commits the artwork** and treats A4U as a **refresh input**, not a dependency.

**What gets committed:** the raw `S2_Icon_<Name>_20_N.svg` files into a source
folder (the React Spectrum `s2wf-icons` pattern). External contributors and public
CI build only from these committed files and never need `@a4u` access.

**What React Spectrum does and does not give us:** it proves the committed-source
shape works (its `.gitignore` commits `s2wf-icons/` and ignores the generated
`icons/`) and has a committed conversion script (`IconTransformer.js`). What it
does not automate is the A4U download itself, confirmed by the team: "the a4u
download is manual ... can't have opensource code pointing at artifactory." So the
one irreducibly manual step is pulling bytes out of the gated registry; everything
after is scriptable.

**The refresh workflow (Adobe-only):**

1. **Download the A4U set** (the one manual step): pull the workflow and UI
   packages from Artifactory. Manual, or a credentialed install on internal infra
   (`--no-save` so `@a4u/*` never lands in `package.json`).
2. **Extract the `S2_Icon_*` files** into the committed source folder.
3. **Run the generator** (the scriptable conversion).
4. **Record the pulled A4U versions** in an `icon-source.json` metadata file, not
   in `package.json` dependencies.
5. **Commit** SVGs, generated output, and metadata; open a PR.

**Staying current:** the baseline is a documented manual "refresh icons" task; the
metadata file makes it obvious when the committed set has fallen behind. If
internal infra with `@a4u` credentials is available, the steps can be a scheduled
internal CI job that diffs versions and opens the PR. Public CI and Dependabot
cannot see the gated registry.

### 8c. Source-format facts the generator must handle

1. **Fill differs by family.** Workflow SVGs fill with `var(--iconPrimary, #222)`;
   UI SVGs ship with **no fill attribute**, so the generator adds one.
2. **Size is not uniform.** UI icons do not share one box: each has its own small
   viewBox with size-suffixed names (`Arrow75`, `Chevron200`). Derive default size
   from the viewBox; do not hard-code one.
3. **Layout and naming vary** by A4U package and across versions. Keep the source
   path and name-normalization configurable; re-verify on each refresh.

### 8d. Decision: how to handle the source fill

- **Flatten to `currentColor` (what 1st-gen does):** simple, uniform, single-color;
  discards the workflow custom-property hooks.
- **Preserve `--iconPrimary`, swap the fallback:** keep
  `fill="var(--iconPrimary, currentColor)"` (UI icons get `currentColor` added).
  Still defaults to `currentColor`, but theming stays available.

**Recommendation: preserve `--iconPrimary`.** This is what React Spectrum's
`IconTransformer.js` does; it rewrites the static hex fallback to a theme-aware
`light-dark(gray-800-light, gray-800-dark)` token. That leaves a **fallback
sub-decision** for 2nd-gen:

- `var(--iconPrimary, currentColor)`: simplest; dovetails with the frame, which
  owns color. Recommended.
- `var(--iconPrimary, light-dark(<token>, <token>))`: React Spectrum's choice;
  correct for a bare, frameless icon.

### 8e. Output packages and the generator

- **`@swc/icons-workflow`** (public) and the internal UI module: generated SVG
  functions, one file per icon, plus a tree-shakeable barrel. Generated files are
  committed so the repo builds without gated source access.
- **`@swc/icon`**: the `<swc-icon>` element and its small base class.
- **Generator:** reads the committed A4U SVGs and emits one file and one export per
  logical icon. Its SVG cleanup mirrors React Spectrum's `IconTransformer.js`,
  minus the React wrapping: SVGO with `removeViewBox: false`, strip `data-*`,
  prefix or strip ids, handle fill per 8d, derive default size from the viewBox,
  and group files by logical name (collapsing `Chevron75/100/200` into one
  `Chevron`). Emits the SVG function (not SVGR + `createIcon`). No `icons-s2` split,
  no rename table, no per-icon class, no S1/S2 pairing, no sprite sheet.

---

## 9. Summary

- Deliver S2 icons as **one tree-shakeable SVG function per icon** plus per-icon
  custom elements; keep **one generic `<swc-icon>` frame**. A controller is
  unnecessary; a directive is optional sugar.
- Use functions **directly** inside components for UI icons; use the **frame** or
  per-icon element for consumer-facing icons.
- **Source the art from A4U directly**; the deprecated spectrum-css packages are
  not a source. Its content is OSS-cleared, so commit the raw SVGs and treat A4U
  as a manual refresh input.
- Stay current with a scheduled Adobe-side refresh; external contributors build
  from committed SVGs. Derive size defaults per icon; keep source paths
  configurable.
- Decide the function's **return type** (section 6; recommended: SVG string) and
  the **fill handling** (section 8d; recommended: preserve `--iconPrimary` with a
  `currentColor` fallback). Tree-shaking is preserved regardless.
