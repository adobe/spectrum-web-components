## Description

An `<sp-action-button>` represents an action a user can take.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-button)

```
yarn add @spectrum-web-components/action-button
```

Import the side effectful registration of `<sp-action-button>` via:

```
import '@spectrum-web-components/action-button/sp-action-button.js';
```

When looking to leverage the `ActionButton` base class as a type and/or for extension purposes, do so via:

```
import { ActionButton } from '@spectrum-web-components/action-button';
```

## Sizes

<sp-tabs selected="m">
    <sp-tab value="s">Small</sp-tab>
    <sp-tab value="m">Medium</sp-tab>
    <sp-tab value="l">Large</sp-tab>
    <sp-tab value="xl">Extra Large</sp-tab>
</sp-tabs>

<div class="tabs--s">

```html demo
<sp-button-group>
    <sp-action-button size="s">Do action</sp-action-button>
    <sp-action-button size="s" selected>Do action</sp-action-button>
    <sp-action-button size="s" disabled>Do action</sp-action-button>
</sp-button-group>
```

</div>

<div class="tabs--m">

```html demo
<sp-button-group>
    <sp-action-button size="m">Do action</sp-action-button>
    <sp-action-button size="m" selected>Do action</sp-action-button>
    <sp-action-button size="m" disabled>Do action</sp-action-button>
</sp-button-group>
```

</div>

<div class="tabs--l">

```html demo
<sp-button-group>
    <sp-action-button size="l">Do action</sp-action-button>
    <sp-action-button size="l" selected>Do action</sp-action-button>
    <sp-action-button size="l" disabled>Do action</sp-action-button>
</sp-button-group>
```

</div>

<div class="tabs--xl">

```html demo
<sp-button-group>
    <sp-action-button size="xl">Do action</sp-action-button>
    <sp-action-button size="xl" selected>Do action</sp-action-button>
    <sp-action-button size="xl" disabled>Do action</sp-action-button>
</sp-button-group>
```

</div>

## Variants

### Action button with icon

```html demo
<sp-action-button>
    <sp-icon-edit slot="icon"></sp-icon-edit>
    This is an action button
</sp-action-button>
```

### Icon only action button

```html demo
<sp-action-button label="Edit">
    <sp-icon-edit slot="icon"></sp-icon-edit>
</sp-action-button>
```

### Emphasized action button

```html demo
<sp-action-button label="Edit" emphasized selected>
    <sp-icon-edit slot="icon"></sp-icon-edit>
</sp-action-button>
```

### Action button with hold affordance

The use of the `hold-affordance` attribute signifies that the `<sp-action-button>` in question will be delivered with a visual affordance outlining that special interaction with the button will dispatch a `longpress` event. Via a pointer input, this even will be dispatched when 300ms has passed after a `pointerdown` event without the presence of a `pointerup` or `pointercancel` event. Via the keyboard, an event with a code of `Space` or or `ArrowDown` while `altKey === true` will dispatch the event.

```html-live demo
<sp-action-group>
    <overlay-trigger placement="bottom">
        <sp-action-button label="Edit" hold-affordance slot="trigger">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p class="spectrum-Body spectrum-Body--sizeM" style="color: var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));">This content is triggered by the "longpress" interaction.</p>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger placement="top">
        <sp-action-button hold-affordance quiet slot="trigger">
            Show Longpress Content
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p class="spectrum-Body spectrum-Body--sizeM" style="color: var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));">This content is triggered by the "longpress" interaction.</p>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger placement="top">
        <sp-action-button hold-affordance selected slot="trigger">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Extended Content with Longpress
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p class="spectrum-Body spectrum-Body--sizeM" style="color: var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));">This content is triggered by the "longpress" interaction.</p>
        </sp-popover>
    </overlay-trigger>
</sp-action-group>
```

## Toggles

With the application of the `toggles` attribute, the button will self manage its `selected` property on `click`:

```html demo
<sp-action-button toggles>Toggle button</sp-action-button>
```
