# Storybook helpers

Reusable utilities for creating consistent Storybook stories across components.

## sourceLocation

Resolves where the unit that a stories file documents lives. Docs blocks use it to build the "View source on GitHub" link and the import snippets.

```typescript
import { sourceLocation } from '../helpers/index.js';

sourceLocation('./components/dropzone/stories/dropzone.stories.ts');
// Returns: {
//   repoPath: 'gen2/packages/swc/components/dropzone',
//   packageName: 'swc',
//   path: 'components/dropzone',
// }
```

Pass Storybook's `parameters.fileName`, which is the stories file path relative to `gen2/packages/swc`. Use this, not the story title, for folder, tag, and import names: titles do not always match them (for example, the "Drop zone" story documents `components/dropzone`).

## formatTitle

Turns the last segment of a story title into a kebab-case slug.

```typescript
formatTitle('Components/Action button');
// Returns: 'action-button'
```

The slug matches Spectrum design page names. Do not use it for folder, tag, or import names; use `sourceLocation` instead.

## layoutContexts

Renders a component as the direct child of each flex and grid layout context, so a VRT can show whether the host box matches the rendered box wherever an app places the component. The first element in the content is the component under test. A magenta outline marks its host box and a dashed border marks the container.

```typescript
import { layoutContexts } from '../../../../.storybook/helpers/index.js';

layoutContexts(
  html`
    <swc-divider></swc-divider>
  `,
  { label: 'Horizontal' }
);

// Skip contexts that don't apply to the component.
layoutContexts(
  html`
    <swc-divider vertical></swc-divider>
  `,
  {
    exclude: ['flex-column-center', 'grid-place-content', 'grid-narrow-track'],
  }
);
```

The contexts are: flex row and column centering, grid `place-items` and `place-content` centering, a taller sibling in a flex row and in a grid, shrink pressure, a narrow grid track, `flex: 1` on the host, and inline with text. Overlapping cases, such as a fixed-height parent and a taller sibling, are not listed separately. Pass `label` to name the row, `include` or `exclude` to limit the contexts, and `descriptions` to replace a cell's description when the outcome is specific to the component.

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
