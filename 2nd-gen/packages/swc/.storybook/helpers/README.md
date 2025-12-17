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
    title: 'Components/Progress Circle',
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

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
