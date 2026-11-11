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

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
