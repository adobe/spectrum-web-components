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

## Testing grid (`stories/*.test.ts`)

Spectrum CSS keeps VRT case lists in a sibling module (e.g. `button.test.js`) that is **imported** by `button.stories.ts`, not indexed as its own Storybook file.

For SWC:

1. Add `components/<name>/stories/<name>.template.ts` — a **pure Lit** `Template()` (no `getStorybookHelpers().template`, which calls `useArgs()` per cell and breaks React hooks in large grids).
2. Add `components/<name>/stories/<name>.test.ts` with `Variants()`, `ArgGrid`, `Container`, and `testData` / `stateData` using that template.
3. Export the render function (e.g. `ButtonGroups`) from the test file.
4. In `<name>.stories.ts`, wire a story: `render: ButtonGroups`, set `storyName` to `TESTING_GRID_STORY_NAME`, and spread `TESTING_GRID_STORY_PARAMETERS` into `parameters` (Chromatic snapshots are disabled globally; only testing-grid stories opt in via `chromatic: { disableSnapshot: false }`, with `delay: 1100` for pending cells).
5. Toggle **Testing preview** in the Storybook toolbar (beaker) to view the grid locally.

Chromatic (`chromatic.config.json`) limits the build to `**/Default` stories (one testing grid per component; Storybook path format, e.g. `Button/Default`). TurboSnap options (`onlyChanged`, `traceChanged`, `untraced`) are incompatible with `onlyStoryNames`.

Play-function tests stay in `components/<name>/test/<name>.test.ts` (indexed under **Component/Tests** in dev Storybook only).

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
