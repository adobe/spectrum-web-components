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

Renders a component as the direct child of each flex and grid layout context, so a VRT can show whether the host box matches the rendered box wherever an app places the component. See [Layout contexts](../../../../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/04_visual-regresssion-testing.md#layout-contexts) for when and how to use it. The first element in the content is the component under test. A magenta outline marks its host box and a dashed border marks the container.

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

Contexts, in render order. Overlapping cases, such as a fixed-height parent and a taller sibling, are not listed separately.

| Context (`id`)                                                            | What it sets up                             | What it catches                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block flow (`block-flow`)                                                 | A plain block parent                        | The reference size to compare the other cells against                                                                                                                                    |
| Flex row and column, centered (`flex-row-center`, `flex-column-center`)   | `align-items` and `justify-content: center` | A component with no intrinsic width collapsing to zero when a flex parent centers it. The column also differs for a component that stretches along its row, such as the vertical divider |
| Grid, `place-items` (`grid-place-items`)                                  | An item centered in a larger cell           | A component with no intrinsic width collapsing to zero when a grid parent centers it in a cell larger than itself                                                                        |
| Grid, `place-content` (`grid-place-content`)                              | A track that sizes to the item              | A percentage-sized host with no container width to resolve against, so a fluid component shrinks to its minimum width (a horizontal divider to zero)                                     |
| Taller sibling in a flex row or grid (`flex-row-stretch`, `grid-stretch`) | A sibling taller than the component         | A host that stretches while the rendered box doesn't. Grid also stretches the inline axis                                                                                                |
| Shrink pressure (`flex-shrink`)                                           | A container narrower than its children      | A component collapsing instead of keeping a minimum size                                                                                                                                 |
| Narrow grid track (`grid-narrow-track`)                                   | A 40px track                                | Overflow, or a minimum size larger than the track                                                                                                                                        |
| `flex: 1` (`flex-grow`)                                                   | `flex: 1` on the host                       | What the host does when a consumer grows it. The consumer owns this, so a mismatch is expected                                                                                           |
| Inline with text (`inline-flow`)                                          | Text before and after the component         | Baseline position, line-box growth, and descender gaps                                                                                                                                   |

Options:

| Option               | Use it to                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `label`              | Name the row when a story renders several anatomies                                         |
| `include`, `exclude` | Limit the contexts to those that apply                                                      |
| `descriptions`       | Replace a cell's description when the outcome is specific to the component                  |
| `blockSize`          | Make the centering and `flex: 1` cells taller than the 96px default, for a taller component |
| `siblingBlockSize`   | Make the sibling taller than the component (80px by default). Stretch can't show otherwise  |

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
