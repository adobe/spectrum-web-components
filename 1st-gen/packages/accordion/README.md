## Overview

The `<sp-accordion>` element contains a list of items that can be expanded or collapsed to reveal additional content or information associated with each item. There can be zero expanded items, exactly one expanded item, or more than one item expanded at a time, depending on the configuration. This list of items is defined by child [`<sp-accordion-item>`](../accordion-item/) elements that are targeted to the default slot of their `<sp-accordion>` parent.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/accordion?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/accordion)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/accordion?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/accordion)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-gbdet9lz)

```bash
yarn add @spectrum-web-components/accordion
```

Import the side effectful registration of `<sp-accordion>` and `<sp-accordion-item>` via:

```js
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
```

When looking to leverage the `Accordion` and `AccordionItem` base class as a type and/or for extension purposes, do so via:

```js
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
```

### Anatomy

The accordion consists of several key parts:

- A container element that manages the accordion behavior
- Individual accordion items that can be expanded or collapsed
- Each item has a header with a label and chevron icon
- Content that is revealed when an item is expanded

```html
<sp-accordion>
    <sp-accordion-item label="Bellows">
        <div>
            The bellows is the expandable section in the middle of the
            accordion.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Treble">
        <div>
            The treble section of the accordion is the right-hand section for
            playing melodies.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Bass">
        <div>
            The bass section of the accordion is the left-hand section for
            playing accompaniment.
        </div>
    </sp-accordion-item>
</sp-accordion>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-accordion size="s">
    <sp-accordion-item label="Key Accordion">
        <div>
            A key accordion, or a chromatic piano accordion, includes a keyboard
            for the right hand.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Button Accordion">
        <div>
            A button accoridon, or a chromatic accordion, has buttons instead of
            keys.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Diatonic Accordion">
        <div>
            Produces two different tones or notes depending on whether the
            bellows is pulled or pushed.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Concertina">
        <div>
            A concertina has buttons on both sides and each button makes two
            different notes or tones depending on whether the bellows is pulled
            or pushed.
        </div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-accordion size="m">
    <sp-accordion-item label="Key Accordion">
        <div>
            A key accordion, or a chromatic piano accordion, includes a keyboard
            for the right hand.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Button Accordion">
        <div>
            A button accoridon, or a chromatic accordion, has buttons instead of
            keys.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Diatonic Accordion">
        <div>
            Produces two different tones or notes depending on whether the
            bellows is pulled or pushed.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Concertina">
        <div>
            A concertina has buttons on both sides and each button makes two
            different notes or tones depending on whether the bellows is pulled
            or pushed.
        </div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-accordion size="l">
    <sp-accordion-item label="Key Accordion">
        <div>
            A key accordion, or a chromatic piano accordion, includes a keyboard
            for the right hand.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Button Accordion">
        <div>
            A button accoridon, or a chromatic accordion, has buttons instead of
            keys.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Diatonic Accordion">
        <div>
            Produces two different tones or notes depending on whether the
            bellows is pulled or pushed.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Concertina">
        <div>
            A concertina has buttons on both sides and each button makes two
            different notes or tones depending on whether the bellows is pulled
            or pushed.
        </div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-accordion size="xl">
    <sp-accordion-item label="Key Accordion">
        <div>
            A key accordion, or a chromatic piano accordion, includes a keyboard
            for the right hand.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Button Accordion">
        <div>
            A button accoridon, or a chromatic accordion, has buttons instead of
            keys.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Diatonic Accordion">
        <div>
            Produces two different tones or notes depending on whether the
            bellows is pulled or pushed.
        </div>
    </sp-accordion-item>
    <sp-accordion-item label="Concertina">
        <div>
            A concertina has buttons on both sides and each button makes two
            different notes or tones depending on whether the bellows is pulled
            or pushed.
        </div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
</sp-tabs>

#### Density

The `density` property, when applied, accepts the values of `compact` or `spacious`.

<sp-tabs selected="compact" auto label="Density Attribute Options">
<sp-tab value="compact">Compact</sp-tab>
<sp-tab-panel value="compact">

```html
<div
    style="
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr"
>
    <sp-accordion density="compact" size="s">
        <sp-accordion-item label="Compact Density">
            <div>This accordion is compact.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Small Size">
            <div>This accordion is also small.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="compact" size="m">
        <sp-accordion-item label="Compact Density">
            <div>This accordion is compact.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Medium Size">
            <div>This accordion is also medium.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="compact" size="l">
        <sp-accordion-item label="Compact Density">
            <div>This accordion is compact.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Large Size">
            <div>This accordion is also large.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="compact" size="xl">
        <sp-accordion-item label="Compact Density">
            <div>This accordion is compact.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Extra Large Size">
            <div>This accordion is also extra large.</div>
        </sp-accordion-item>
    </sp-accordion>
</div>
```

</sp-tab-panel>
<sp-tab value="spacious">Spacious</sp-tab>
<sp-tab-panel value="spacious">

```html
<div
    style="
  display: grid;
  grid-gap: 20px;
    grid-template-columns: 1fr 1fr"
>
    <sp-accordion density="spacious" size="s">
        <sp-accordion-item label="Spacious Density">
            <div>This accordion is spacious.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Small Size">
            <div>This accordion is also small.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="spacious" size="m">
        <sp-accordion-item label="Spacious Density">
            <div>This accordion is spacious.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Medium Size">
            <div>This accordion is also medium.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="spacious" size="l">
        <sp-accordion-item label="Spacious Density">
            <div>This accordion is spacious.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Large Size">
            <div>This accordion is also large.</div>
        </sp-accordion-item>
    </sp-accordion>
    <sp-accordion density="spacious" size="xl">
        <sp-accordion-item label="Spacious Density">
            <div>This accordion is spacious.</div>
        </sp-accordion-item>
        <sp-accordion-item label="Extra Large Size">
            <div>This accordion is also extra large.</div>
        </sp-accordion-item>
    </sp-accordion>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Heading level

The `level` attribute controls the semantic heading level (2-6) used for all accordion item titles. This helps maintain proper document structure and accessibility. The range is restricted to 2-6 as there should only be one `h1` per page. Defaults to 3.

All items within an accordion will use the same heading level, ensuring items of equal importance have consistent semantic meaning.

```html
<h1>Main Page Title</h1>

<sp-accordion level="2">
    <sp-accordion-item label="First Section">
        <div>Content for the first main section.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Second Section">
        <div>Content for the second main section.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Third Section">
        <div>Content for the third main section.</div>
    </sp-accordion-item>
</sp-accordion>

<h2>Subsection Title</h2>

<sp-accordion level="3">
    <sp-accordion-item label="Subsection A">
        <div>Content for subsection A.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Subsection B">
        <div>Content for subsection B.</div>
    </sp-accordion-item>
</sp-accordion>
```

### States

#### Allow Multiple

By default, only one accordion item can be expanded at a time. Use the `allow-multiple` attribute to allow multiple items to be expanded simultaneously.

```html
<sp-accordion allow-multiple>
    <sp-accordion-item label="Kermit">
        <div>Kermit is a frog.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Fozzie">
        <div>Fozzie is a bear.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Miss Piggy">
        <div>Miss Piggy is a pig.</div>
    </sp-accordion-item>
</sp-accordion>
```

#### Disabled

Individual accordion items can be disabled using the `disabled` attribute. Disabled items cannot be expanded or collapsed.

```html
<sp-accordion>
    <sp-accordion-item label="Apples">
        <div>
            We have some of the most popular varieties include Red Delicious,
            Gala, Granny Smith, Honeycrisp, and Fuji.
        </div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Bananas">
        <div>We have the Gros Michel.</div>
    </sp-accordion-item>
    <sp-accordion-item label="Oranges">
        <div>We have Mandarins, Seville Oranges, and Clementines.</div>
    </sp-accordion-item>
</sp-accordion>
```

### Accessibility

The accordion component provides proper ARIA attributes and keyboard navigation:

- Each accordion item header has `aria-expanded` to indicate its current state
- The header button has `aria-controls` pointing to the content region
- The content region has `role="region"` and `aria-labelledby` pointing to the header
- Disabled items have `aria-disabled="true"` applied
- The accordion supports keyboard navigation with arrow keys and <kbd>Enter</kbd>/<kbd>Space</kbd> for activation

#### Include descriptive labels

Each accordion item should have a clear, descriptive label that indicates what content will be revealed when expanded.

#### Use appropriate content

Accordion content should be related to the header label and provide additional information or functionality that users can access when needed.
