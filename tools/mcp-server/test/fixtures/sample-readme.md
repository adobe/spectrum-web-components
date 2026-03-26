## Description

An `<sp-button>` represents an action a user can take.

## Usage

### Installation

```
yarn add @spectrum-web-components/button
```

### Basic

```html demo
<sp-button variant="accent">Save</sp-button>
```

### With Icon

```html demo
<sp-button variant="primary">
    <sp-icon-edit slot="icon"></sp-icon-edit>
    Edit
</sp-button>
```

### Pending State

```html demo
<sp-button pending pending-label="Saving...">Save</sp-button>
```

### TypeScript Example

```typescript
import { Button } from '@spectrum-web-components/button';
```

### Multiple Variants

```html demo
<div style="display: flex; gap: 8px;">
    <sp-button variant="accent">Accent</sp-button>
    <sp-button variant="primary">Primary</sp-button>
    <sp-button variant="secondary">Secondary</sp-button>
    <sp-button variant="negative">Negative</sp-button>
</div>
```
