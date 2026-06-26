# Storybook helpers

Reusable utilities for creating consistent Storybook stories across components.

## formatComponentName

Formats a Storybook story title into a component name in either kebab-case or PascalCase.

### Usage

Import the helper in your stories file:

```typescript
import { formatComponentName } from '../../../.storybook/helpers/index.js';
```

### Parameters

- `title` (string): The Storybook story title (e.g., `'Components/Button'`)
- `typeCase` ('kebab' | 'pascal'): The desired output format (defaults to `'kebab'`)

### Examples

```typescript
// Get kebab-case component name (default)
formatComponentName('Components/Action Button');
// Returns: 'action-button'

// Get PascalCase component name
formatComponentName('Components/Action Button', 'pascal');
// Returns: 'ActionButton'

// Typical usage in stories
export default {
  title: 'Progress Circle',
  component: 'swc-progress-circle',
  // ...
} as Meta;

const componentName = formatComponentName(meta.title);
// Returns: 'progress-circle'
```

### What it does

1. Extracts the component name from the last segment of the story title path
2. Converts it to lowercase
3. Replaces spaces with hyphens for kebab-case
4. Optionally converts to PascalCase by capitalizing each word and removing hyphens

## Testing grid (`test/*.vrt.ts`)

SWC keeps VRT case lists in a sibling module (e.g. `components/button/test/button.vrt.ts`) that is **imported** by `<name>.vrt.stories.ts`, not indexed as its own Storybook file. VRT story files are excluded from production `storybook:build` (docs deploy) but included for local dev and Chromatic (`CHROMATIC=true`).

To add a testing grid for a component:

1. Add `components/<name>/stories/<name>.template.ts` — a **pure Lit** `Template()` (no `getStorybookHelpers().template`, which calls `useArgs()` per cell and breaks React hooks in large grids). Wrap each grid cell in a `div` with the `data-vrt-*` attributes below.
2. Add `components/<name>/test/<name>.vrt.ts` with `Variants()`, `ArgGrid`, `Container`, and `testData` / `stateData` using that template.
3. Export the render function (e.g. `ButtonVRTRender`) from the VRT file.
4. Add `components/<name>/stories/<name>.vrt.stories.ts` with a `VRTGrid` story: import meta from `<name>.stories.ts`, set `render: ButtonVRTRender`, set `storyName` to `TESTING_GRID_STORY_NAME` (`'VRT Grid'`), and spread `TESTING_GRID_STORY_PARAMETERS` into `parameters` (Chromatic snapshots are disabled globally; only testing-grid stories opt in via `chromatic: { disableSnapshot: false }`, with `delay: 1100` for pending cells and `prefersReducedMotion: 'no-preference'` / `pauseAnimationAtEnd: true` so the pending spinner captures a mid-animation frame).
5. Toggle **Testing preview** in the Storybook toolbar (beaker) to view the grid locally.

Forced interaction states (hover, focus, active) use the global `pseudoStatesDecorator`, which augments each component's `adoptedStyleSheets` with class-based pseudo-state rules (`.is-hover`, `.is-focus-visible`, etc.). `applyTestingGridPseudoStates` (VRT story `play` function) reads the cell wrapper attributes and patches the correct shadow-DOM node after render.

**Pseudo-state augmentation constraint:** each shadow root is augmented at most once per session (`pseudo-states.ts`). Components that replace `adoptedStyleSheets` after attribute changes need `resetAugmentedShadowRoot` or `resetAugmentedTree` before the next `augmentTree` pass picks up new rules.

### VRT cell wrapper attributes (`<name>.template.ts`)

Each grid cell should wrap the component in a `div.vrt-cell` with these attributes. They are **Storybook/VRT only** — not part of the public component API.

| Attribute                 | Required | Purpose                                                                                                                                                                                                                                            |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-vrt-host`           | Yes      | Custom-element tag inside the wrapper (e.g. `swc-button`). Used to `querySelector` the host and to `customElements.whenDefined` before patching.                                                                                                   |
| `data-vrt-control`        | Yes      | CSS selector for the **internal** element that receives forced classes — typically the root class inside the host's shadow root (e.g. `.swc-Button`). Omit only if the host element itself is the control.                                         |
| `data-vrt-state`          | No       | Interaction state to force: `hover`, `focus`, or `active`. Omit for default and disabled cells. Maps to `.is-hover`, `.is-focus-visible`, and `.is-active` on the control. Disabled state uses the component's `disabled` attribute instead.       |
| `data-vrt-layout-classes` | No       | Space-separated classes applied to the control when layout depends on slot detection or other async work (e.g. `swc-Button--hasIcon swc-Button--iconOnly` for icon-only cells). Ensures the correct layout is captured before Chromatic snapshots. |

Example (Button):

```html
<div
  class="vrt-cell"
  data-vrt-host="swc-button"
  data-vrt-control=".swc-Button"
  data-vrt-state="hover"
  data-vrt-layout-classes="swc-Button--hasIcon swc-Button--iconOnly"
>
  <swc-button>...</swc-button>
</div>
```

### Composite components (multiple surfaces)

Each `div.vrt-cell` patches **one** forced-state target: a single `data-vrt-host` plus one `data-vrt-control`. A cell cannot force hover on the input and the trigger at the same time.

**Supported patterns:**

- **Same instance, different internal controls** — add multiple cells in the grid, each with the same `data-vrt-host` but a different `data-vrt-control` (e.g. combobox input `.swc-ComboBox-input` in one column, trigger `.swc-ComboBox-button` in another). Each cell gets its own `data-vrt-state` as needed.
- **Different presentation modes** — use separate `testData` sections, `vrtCase` rows, or (when necessary) separate VRT Grid stories. Example: closed combobox matrix in one section; open listbox with option hover/focus/selected in another, with the host pre-configured (`open`, selected value) in the template args for that section only.
- **Child components in the tree** — a cell can target a nested custom element if it is the `data-vrt-host` for that wrapper (uncommon; prefer keeping the composite on the parent host and varying `data-vrt-control`).

**Recommendation:** for components like combobox, picker, or menu, prefer **separate grid sections or stories per surface** (closed field, open overlay, list item states) rather than one cell trying to capture every interaction at once. The helpers impose no limit on how many sections or stories you define in `*.vrt.ts`.

Chromatic uses a dual approach: `preview.ts` sets `chromatic.disableSnapshot: true` globally, and each testing-grid story opts in with `TESTING_GRID_STORY_PARAMETERS` (`disableSnapshot: false`). `chromatic.config.json` keeps `onlyChanged` / `traceChanged` so existing stories still snapshot when they opt in.

Play-function tests stay in `components/<name>/test/<name>.test.ts` (indexed under **Component/Tests** in dev Storybook only).

Unit tests for the testing-grid helpers live in `.storybook/helpers/test/testing-grid.unit.test.ts` (`vitest.unit.config.js`, project `swc-unit`). They cover `isChromatic()`, `Heading()`, `Container()`, `renderContent()`, and a `Variants()` smoke test. Pseudo-state augmentation tests live in `.storybook/helpers/test/pseudo-states.unit.test.ts` and cover `collectPseudoStateRules()`, `buildAugmentedSheet()`, grouping at-rules (including `@starting-style`), CORS sheet handling, and `augmentTree()` / reset behavior. Run with `yarn test:unit`.

### Module layout

`testing-grid.ts` is a thin barrel; implementation lives in `testing-grid/`:

| File            | Responsibility                                                    |
| --------------- | ----------------------------------------------------------------- |
| `constants.ts`  | `TESTING_GRID_STORY_NAME`, Chromatic params, borders, size labels |
| `types.ts`      | Shared TypeScript types                                           |
| `internal.ts`   | Static-color wrapper, theme helpers, `generateUniqueId`           |
| `primitives.ts` | `Heading`, `Container`, `renderContent`                           |
| `builders.ts`   | `States`, `ArgGrid`, `Sizes`, `vrtCase`                           |
| `variants.ts`   | `Variants` (main VRT entry)                                       |

Import from `helpers/index.js` or `helpers/testing-grid.js` as before — no call-site changes needed.

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
