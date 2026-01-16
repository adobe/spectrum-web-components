## Overview

The `<sp-accordion-item>` element represents a single item in an [`<sp-accordion>`](../accordion/) parent element. Its `label` attribute and default slot content make up the "headline" and "body" of the toggleable content item.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/accordion?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/accordion)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/accordion?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/accordion)

```zsh
yarn add @spectrum-web-components/accordion
```

Import the side effectful registration of `<sp-accordion-item>` via:

```javascript
import '@spectrum-web-components/accordion/sp-accordion-item.js';
```

When looking to leverage the `AccordionItem` base class as a type and/or for extension purposes, do so via:

```javascript
import { AccordionItem } from '@spectrum-web-components/accordion';
```

### Anatomy

The accordion item consists of two key parts:

- A header button with a label and chevron icon
- Content that is revealed when the item is expanded

```html
<sp-accordion>
    <sp-accordion-item label="Accordion Item">
        <div>Accordion item content can be toggled visible.</div>
    </sp-accordion-item>
</sp-accordion>
```

### States

#### Opened

An accordion item can be opened by default using the `open` attribute:

```html
<sp-accordion allow-multiple>
    <sp-accordion-item open label="Opened Accordion Item">
        <div>This accordion item content is visible by default.</div>
    </sp-accordion-item>
</sp-accordion>
```

#### Disabled

Individual accordion items can be disabled using the `disabled` attribute. Disabled items cannot be expanded or collapsed:

```html
<sp-accordion allow-multiple>
    <sp-accordion-item disabled label="Disabled Accordion Item">
        <div>You can not toggle this content visible.</div>
    </sp-accordion-item>
</sp-accordion>
```

#### Heading level

The `level` attribute controls the semantic heading level (1-6) used for the accordion item heading. This helps maintain proper document structure and accessibility. Defaults to 3:

```html
<sp-accordion>
    <sp-accordion-item level="2" label="Level 2 Heading">
        <div>This accordion item uses an h2 heading.</div>
    </sp-accordion-item>
    <sp-accordion-item level="4" label="Level 4 Heading">
        <div>This accordion item uses an h4 heading.</div>
    </sp-accordion-item>
</sp-accordion>
```

### Behaviors

#### Events

An `<sp-accordion-item>` element will dispatch `sp-accordion-item-toggle` events when it is opened or closed. By default, these events are dispatched to allow the parent `<sp-accordion>` to manage which of its item children are expanded at any given time. Consumers can also listen for this event and check `event.target.open` to determine whether the item is currently expanded.

### Accessibility

The accordion component provides proper ARIA attributes and keyboard navigation:

- Each accordion item header has `aria-expanded` to indicate its current state
- The header button has `aria-controls` pointing to the content region
- The content region has `role="region"` and `aria-labelledby` pointing to the header
- Disabled items have `aria-disabled="true"` applied
- The accordion supports keyboard navigation with <kbd>Enter</kbd>/<kbd>Space</kbd> for activation
- The heading level can be customized using the `level` attribute (1-6) to maintain proper document structure and assistive technology navigation

#### Include descriptive labels

Each accordion item should have a clear, descriptive label that indicates what content will be revealed when expanded.

#### Use appropriate content

Accordion content should be related to the header label and provide additional information or functionality that users can access when needed.
