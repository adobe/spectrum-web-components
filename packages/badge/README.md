## Overview

`<sp-badge>` elements display a small amount of color-categorized metadata. They're ideal for getting a user's attention.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/badge?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/badge)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/badge?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/badge)

```bash
yarn add @spectrum-web-components/badge
```

Import the side effectful registration of `<sp-badge>` via:

```js
import '@spectrum-web-components/badge/sp-badge.js';
```

When looking to leverage the `Badge` base class as a type and/or for extension purposes, do so via:

```js
import { Badge } from '@spectrum-web-components/badge';
```

### Anatomy

A badge is made up of the following parts:

- **Icon**: an `<sp-icon-*>` element can be used to display an icon within the badge.
- **Label**: text can be displayed within the badge by using the default slot.

Badges can contain either a label, an icon, or both.

```html demo
<sp-badge size="s">Label only</sp-badge>
<sp-badge size="s">
    <sp-icon-checkmark-circle
        label="Icon-only badge"
        slot="icon"
    ></sp-icon-checkmark-circle>
</sp-badge>
<sp-badge size="s">
    <sp-icon-settings slot="icon"></sp-icon-settings>
    Icon and label
</sp-badge>
```

### Options

It is not recommended to make badges interactive. Consider using a different component if you need interactivity, such as buttons, tags, or links.

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="s">Label</sp-badge>
    <sp-badge size="s">
        <sp-icon-checkmark-circle
            label="Icon-only badge"
            slot="icon"
        ></sp-icon-checkmark-circle>
    </sp-badge>
    <sp-badge size="s">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="m">Label</sp-badge>
    <sp-badge size="m">
        <sp-icon-checkmark-circle
            label="Icon-only badge"
            slot="icon"
        ></sp-icon-checkmark-circle>
    </sp-badge>
    <sp-badge size="m">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="l">Label</sp-badge>
    <sp-badge size="l">
        <sp-icon-checkmark-circle
            label="Icon-only badge"
            slot="icon"
        ></sp-icon-checkmark-circle>
    </sp-badge>
    <sp-badge size="l">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge size="xl">Label</sp-badge>
    <sp-badge size="xl">
        <sp-icon-checkmark-circle
            label="Icon-only badge"
            slot="icon"
        ></sp-icon-checkmark-circle>
    </sp-badge>
    <sp-badge size="xl">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Icon and label
    </sp-badge>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

The `<sp-badge>` can be customized with either semantic or non-semantic variants. Badges are intended as display elements (like status lights), so avoid using badges for critical actions.

<sp-tabs selected="semantic" auto label="Semantic and non-semantic variants">
<sp-tab value="semantic">Semantic</sp-tab>
<sp-tab-panel value="semantic">

When badges have a semantic meaning, they use semantic colors. Use these variants for the following statuses:

- **Positive**: approved, complete, success, new, purchased, licensed
- **Informative**: active, in use, live, published
- **Negative**: error, alert, rejected, failed
- **Neutral**: archived, deleted, paused, draft, not started, ended

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75);">
    <sp-badge variant="accent">Accent</sp-badge>
    <sp-badge variant="neutral">Neutral</sp-badge>
    <sp-badge variant="informative">Informative</sp-badge>
    <sp-badge variant="positive">Positive</sp-badge>
    <sp-badge variant="negative">Negative</sp-badge>
    <sp-badge variant="notice">Notice</sp-badge>
</div>
```

</sp-tab-panel>
<sp-tab value="nonsemantic">Non-semantic</sp-tab>
<sp-tab-panel value="nonsemantic">

When badges are for color-coded categories, they use non-semantic colors. Non-semantic variants are ideally used for when there are 8 categories or less.

```html demo
<div style="display: flex; gap: var(--spectrum-spacing-75); flex-wrap:wrap;">
    <sp-badge variant="seafoam">Seafoam</sp-badge>
    <sp-badge variant="indigo">Indigo</sp-badge>
    <sp-badge variant="purple">Purple</sp-badge>
    <sp-badge variant="fuchsia">Fuchsia</sp-badge>
    <sp-badge variant="magenta">Magenta</sp-badge>
    <sp-badge variant="yellow">Yellow</sp-badge>
    <sp-badge variant="gray">Gray</sp-badge>
    <sp-badge variant="red">Red</sp-badge>
    <sp-badge variant="orange">Orange</sp-badge>
    <sp-badge variant="chartreuse">Chartreuse</sp-badge>
    <sp-badge variant="celery">Celery</sp-badge>
    <sp-badge variant="green">Green</sp-badge>
    <sp-badge variant="cyan">Cyan</sp-badge>
    <sp-badge variant="blue">Blue</sp-badge>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Fixed positioning

`<sp-badge>` can be displayed as if it is "fixed" to the edge of a UI. The `fixed` attribute can be leveraged to alter the border rounding based on the position you would like to achieve. Fixed positioning options include `block-start`, `block-end`, `inline-start`, and `inline-end`.

```html
<div
    style="position: relative; width: 400px; height: 200px; background: #eee; max-width: 100%"
>
    <sp-badge>None</sp-badge>
    <sp-badge
        fixed="block-start"
        style="position: absolute; top: 0; left: 200px;"
    >
        block-start
    </sp-badge>
    <sp-badge
        fixed="inline-end"
        style="position: absolute; right: 0; top: 100px;"
    >
        inline-end
    </sp-badge>
    <sp-badge
        fixed="block-end"
        style="position: absolute; bottom: 0; left: 200px;"
    >
        block-end
    </sp-badge>
    <sp-badge
        fixed="inline-start"
        style="position: absolute; left: 0; top: 100px;"
    >
        inline-start
    </sp-badge>
</div>
```

### Behaviors

Badges are not interactive by default.

When a badge's label is too long for the available horizontal space, it wraps to form another line. Text wrapping can be enforced when a `max-inline-size` is applied to the badge. If there is no room for a second line of text, the badge should truncate and include a tooltip to expose the full text upon hover.

```html demo
<overlay-trigger>
    <sp-badge style="max-inline-size: 350px;" slot="trigger">
        Wikipedia is the best thing ever. Anyone in the world can write anything
        they want about any subject so you know you are getting the best
        possible information.
    </sp-badge>
    <sp-tooltip slot="hover-content">
        Wikipedia is the best thing ever. Anyone in the world can write anything
        they want about any subject so you know you are getting the best
        possible information.
    </sp-tooltip>
</overlay-trigger>
```

### Accessibility

<div style="margin-block-end: 2rem">
<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Do ✅</sp-table-head-cell>
        <sp-table-head-cell>Don't ❌</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Use badges for status indication</sp-table-cell>
            <sp-table-cell>Use badges for critical actions</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Use visible labels most often</sp-table-cell>
            <sp-table-cell>Overwhelm a user with too much critical information</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
        <sp-table-cell>Use icon-only badges with aria-label</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Use badges for supplemental information</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
</div>

#### Always include a label

Badges should always have a label for accessibility and clear comprehension. When the label is not defined, a badge becomes icon-only. If a visible label isn't specified, an `aria-label` must be provided to the icon for accessibility. An icon-only badge is best for very small spaces, and it should include a tooltip on hover to provide more context for the icon's meaning.

Remember that a tooltip does not replace an accessible label.

```html demo
<overlay-trigger>
    <sp-badge size="m" slot="trigger">
        <sp-icon-checkmark-circle
            label="Labels are important"
            slot="icon"
        ></sp-icon-checkmark-circle>
    </sp-badge>
    <sp-tooltip placement="top" slot="hover-content">
        <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        Labels are important
    </sp-tooltip>
</overlay-trigger>
```

#### Keyboard interactions

- <kbd>Tab</kbd>: Places focus on the badge if it is interactive.
- <kbd>Space</kbd> or <kbd>Enter</kbd>: Filters results by the selected badge or performs the action associated with the badge.

#### Don't override semantic colors

The badge's variants provide semantic meaning through both color and ARIA attributes, ensuring that information is not conveyed through color alone.
