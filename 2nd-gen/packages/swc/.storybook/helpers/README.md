# Storybook helpers

Reusable utilities for creating consistent Storybook stories across components.

## Available helpers

### `formatComponentName`

Formats a component tag name for display (e.g., `swc-badge` → `Badge`).

```typescript
import { formatComponentName } from '../../../.storybook/helpers/index.js';

const displayName = formatComponentName('swc-badge'); // "Badge"
```

## Adding new helpers

When adding new helpers to this directory:

1. Create the helper file in this directory
2. Export it from `index.ts`
3. Document it in this README
4. Add usage examples in component stories
