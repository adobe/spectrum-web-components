---
component: infield-button
tag: sp-infield-button
package: '@spectrum-web-components/infield-button'
source: 1st-gen/packages/infield-button/README.md
generated: 2026-06-17T10:49:38.838Z
generator: scripts/generate-llm-docs.mjs
---

## Description

When composing complex form fields, an `<sp-infield-button>` can visually associate button functionality with other form fields to delivery enhanced capabilities to your visitors.

### Usage

```
yarn add @spectrum-web-components/infield-button
```

Import the side effectful registration of `<sp-infield-button>` via:

```
import '@spectrum-web-components/infield-button/sp-infield-button.js';
```

When looking to leverage the `InfieldButton` base class as a type and/or for extension purposes, do so via:

```
import { InfieldButton } from '@spectrum-web-components/infield-button';
```

## Sizes

```html
<sp-infield-button label="Add" size="s">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
html
<sp-infield-button label="Add" size="m">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
html
<sp-infield-button label="Add" size="l">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
html
<sp-infield-button label="Add" size="xl">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

## Inline buttons

Use the `inline` attribute to describe whether the `<sp-infield-button>` should be visually at the `start` or `end` of the field is associated to:

### inline="start"

```html
<sp-infield-button inline="start" label="Add">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

### inline="end"

```html
<sp-infield-button inline="end" label="Add">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

## Stacked buttons

The `block` attribute can be used to create a vertial stack of buttons. You can place buttons visually on the stack with the `start` or `end` values:

```html
<sp-infield-button block="start" label="Increment">
  <sp-icon-add size="xxs"></sp-icon-add>
</sp-infield-button>
<sp-infield-button block="end" label="Decrement">
  <sp-icon-remove size="xxs"></sp-icon-remove>
</sp-infield-button>
```

## Disabled

An `<sp-infield-button>` with the `disabled` attribute will become non-interactive and dimmed:

```html
<sp-infield-button disabled inline="start" label="Add">
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
```

## Quiet

An `<sp-infield-button>` with the `quiet` attribute will feature a diminished visual presence:

```html
<sp-infield-button inline="start" label="Add" quiet>
  <sp-icon-add></sp-icon-add>
</sp-infield-button>
```
