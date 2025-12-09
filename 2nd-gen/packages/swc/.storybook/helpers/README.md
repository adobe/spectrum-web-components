# Storybook helpers

Reusable utilities for creating consistent Storybook stories across components.

## Static color wrapper helpers

When documenting components that support `static-color` variants (for use on colored backgrounds), these helpers provide a clean, reusable pattern.

### Usage

Import the helpers in your stories file:

```typescript
import {
    createStaticColorStory,
    generateStaticColorSource,
} from '../../../.storybook/helpers/index.js';
```

### Example: Showing multiple static color variants

```typescript
export const StaticColors: Story = {
    render: createStaticColorStory(template, [
        {
            staticColor: 'white',
            args: { progress: 60, label: 'Loading on dark' },
        },
        {
            staticColor: 'black',
            args: { progress: 60, label: 'Loading on light' },
        },
    ]),
    parameters: {
        docs: {
            source: {
                code: generateStaticColorSource('swc-progress-circle', [
                    {
                        staticColor: 'white',
                        args: { progress: 60, label: 'Loading on dark' },
                    },
                    {
                        staticColor: 'black',
                        args: { progress: 60, label: 'Loading on light' },
                    },
                ]),
            },
        },
    },
    tags: ['options'],
};
```

### What it does

1. **`createStaticColorStory`**: Wraps each component variant in an appropriately colored background
    - `white` static color → dark gradient background
    - `black` static color → light gradient background

2. **`generateStaticColorSource`**: Generates clean source code for the docs that excludes the wrapper styling

### Benefits

- **Reusable**: Same pattern across all components
- **Clean source**: Source code view shows only the component, not the wrapper
- **Consistent styling**: Uses the same gradient backgrounds as the decorator
- **Type-safe**: Full TypeScript support

### Individual wrapper

If you need to wrap a single component:

```typescript
import { withStaticColorWrapper } from '../../../.storybook/helpers/index.js';

export const SingleStatic: Story = {
    render: (args) =>
        withStaticColorWrapper(
            template({ ...args, 'static-color': 'white' }),
            'white'
        ),
};
```

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
