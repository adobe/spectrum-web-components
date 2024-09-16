## Overview

An `<sp-action-button>` represents an action a user can take.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-button)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/mOF1zUEjLJzODGXFYaIU/src/index.ts)

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

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="xs">Extra Small</sp-tab>
<sp-tab-panel value="xs">

```html demo
<sp-action-group size="xs">
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-action-group size="s">
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-action-group size="m">
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-action-group size="l">
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-action-group size="xl">
    <sp-action-button>Edit</sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
        Edit
    </sp-action-button>
    <sp-action-button>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

The `<sp-action-button>` can be customized with either or both of the `emphasized` and `quiet` attributes. These will pair with either or both of the state attributes (`selected` and `disabled`) to decide the final visual delivery of the `<sp-action-button>`. Content addressed to the `icon` slot can also be provided and will be positioned just before the rest of the the supplied button content.

<sp-tabs selected="default" auto label="Variant options">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html demo
<div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 2em;"
>
    <div>
        <sp-field-label for="standard">Default</sp-field-label>
        <sp-action-group id="standard">
            <sp-action-button>Edit</sp-action-button>
            <sp-action-button>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-selected">Selected</sp-field-label>
        <sp-action-group id="standard-selected">
            <sp-action-button selected>Edit</sp-action-button>
            <sp-action-button selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled">Disabled</sp-field-label>
        <sp-action-group id="standard-disabled">
            <sp-action-button disabled>Edit</sp-action-button>
            <sp-action-button disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button disabled hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled-selected">
            Disabled + Selected
        </sp-field-label>
        <sp-action-group id="standard-disabled-selected">
            <sp-action-button disabled selected>Edit</sp-action-button>
            <sp-action-button disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button disabled selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>
</div>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html demo
<div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 2em;"
>
    <div>
        <sp-field-label for="standard">Default</sp-field-label>
        <sp-action-group quiet id="standard">
            <sp-action-button quiet>Edit</sp-action-button>
            <sp-action-button quiet>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button quiet>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button quiet hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-selected">Selected</sp-field-label>
        <sp-action-group quiet id="standard-selected">
            <sp-action-button quiet selected>Edit</sp-action-button>
            <sp-action-button quiet selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button quiet selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button quiet selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled">Disabled</sp-field-label>
        <sp-action-group quiet id="standard-disabled">
            <sp-action-button quiet disabled>Edit</sp-action-button>
            <sp-action-button quiet disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button quiet disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button quiet disabled hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled-selected">
            Disabled + Selected
        </sp-field-label>
        <sp-action-group quiet id="standard-disabled-selected">
            <sp-action-button quiet disabled selected>Edit</sp-action-button>
            <sp-action-button quiet disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button quiet disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button quiet disabled selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>
</div>
```

</sp-tab-panel>
<sp-tab value="emphasized">Emphasized</sp-tab>
<sp-tab-panel value="emphasized">

```html demo
<div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 2em;"
>
    <div>
        <sp-field-label for="standard">Default</sp-field-label>
        <sp-action-group emphasized id="standard">
            <sp-action-button emphasized>Edit</sp-action-button>
            <sp-action-button emphasized>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-selected">Selected</sp-field-label>
        <sp-action-group emphasized id="standard-selected">
            <sp-action-button emphasized selected>Edit</sp-action-button>
            <sp-action-button emphasized selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled">Disabled</sp-field-label>
        <sp-action-group emphasized id="standard-disabled">
            <sp-action-button emphasized disabled>Edit</sp-action-button>
            <sp-action-button emphasized disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized disabled hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled-selected">
            Disabled + Selected
        </sp-field-label>
        <sp-action-group emphasized id="standard-disabled-selected">
            <sp-action-button emphasized disabled selected>
                Edit
            </sp-action-button>
            <sp-action-button emphasized disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized disabled selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>
</div>
```

</sp-tab-panel>
<sp-tab value="emq">Emphasized + quiet</sp-tab>
<sp-tab-panel value="emq">

```html demo
<div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 2em;"
>
    <div>
        <sp-field-label for="standard">Default</sp-field-label>
        <sp-action-group emphasized quiet id="standard">
            <sp-action-button emphasized quiet>Edit</sp-action-button>
            <sp-action-button emphasized quiet>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized quiet>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized quiet hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-selected">Selected</sp-field-label>
        <sp-action-group emphasized quiet id="standard-selected">
            <sp-action-button emphasized quiet selected>Edit</sp-action-button>
            <sp-action-button emphasized quiet selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized quiet selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized quiet selected hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled">Disabled</sp-field-label>
        <sp-action-group emphasized quiet id="standard-disabled">
            <sp-action-button emphasized quiet disabled>Edit</sp-action-button>
            <sp-action-button emphasized quiet disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized quiet disabled>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button emphasized quiet disabled hold-affordance>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>

    <div>
        <sp-field-label for="standard-disabled-selected">
            Disabled + Selected
        </sp-field-label>
        <sp-action-group emphasized quiet id="standard-disabled-selected">
            <sp-action-button emphasized quiet disabled selected>
                Edit
            </sp-action-button>
            <sp-action-button emphasized quiet disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-action-button>
            <sp-action-button emphasized quiet disabled selected>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button
                emphasized
                quiet
                disabled
                selected
                hold-affordance
            >
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-group>
    </div>
</div>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Action button with hold affordance

The use of the `hold-affordance` attribute signifies that the `<sp-action-button>` in question will be delivered with a visual affordance outlining that special interaction with the button will dispatch a `longpress` event. Via a pointer input, this even will be dispatched when 300ms has passed after a `pointerdown` event without the presence of a `pointerup` or `pointercancel` event. Via the keyboard, an event with a code of `Space` or or `ArrowDown` while `altKey === true` will dispatch the event.

```html demo
<div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2em;"
>
    <overlay-trigger placement="bottom-start">
        <sp-action-button label="Edit" hold-affordance slot="trigger">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p style="color: var(--spectrum-neutral-content-color-default);">
                This content is triggered by the "longpress" interaction.
            </p>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger placement="top">
        <sp-action-button hold-affordance quiet slot="trigger">
            Show Longpress Content
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p style="color: var(--spectrum-neutral-content-color-default);">
                This content is triggered by the "longpress" interaction.
            </p>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger placement="top-end">
        <sp-action-button hold-affordance selected slot="trigger">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Extended Content with Longpress
        </sp-action-button>
        <sp-popover slot="longpress-content" dialog tip>
            <p style="color: var(--spectrum-neutral-content-color-default);">
                This content is triggered by the "longpress" interaction.
            </p>
        </sp-popover>
    </overlay-trigger>
</div>
```

#### Toggles

With the application of the `toggles` attribute, the button will self manage its `selected` property on `click`. When this value is updated, a cancellable `change` event will be dispatched to inform the parent application.

<sp-tabs selected="default" auto label="Toggled action buttons">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html demo
<sp-action-button toggles id="toggles-default">Toggle button</sp-action-button>
<sp-action-button toggles selected id="toggles-default">
    Toggle button
</sp-action-button>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html demo
<sp-action-button toggles quiet id="toggles-quiet">
    Toggle button
</sp-action-button>
<sp-action-button toggles quiet selected id="toggles-quiet">
    Toggle button
</sp-action-button>
```

</sp-tab-panel>
<sp-tab value="emphasized">Emphasized</sp-tab>
<sp-tab-panel value="emphasized">

```html demo
<sp-action-button toggles emphasized id="toggles-emphasized">
    Toggle button
</sp-action-button>
<sp-action-button toggles emphasized selected id="toggles-emphasized">
    Toggle button
</sp-action-button>
```

</sp-tab-panel>
<sp-tab value="emphasized-quiet">Emphasized + Quiet</sp-tab>
<sp-tab-panel value="emphasized-quiet">

```html demo
<sp-action-button toggles emphasized quiet id="toggles-emphasized-quiet">
    Toggle button
</sp-action-button>
<sp-action-button
    toggles
    emphasized
    quiet
    selected
    id="toggles-emphasized-quiet"
>
    Toggle button
</sp-action-button>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility guidelines

#### Include a label

A button is required to have either a visible text label or `label` attribute on an `<sp-button>`
or on an `<sp-icon*>` element child.

#### Don't override color

Do not use custom colors for buttons. The colors of different button variations have been designed to be consistent and accessible.

#### Use static black or static white to contrast with backgrounds and images

To ensure maximum contrast with the background, use static black for light backgrounds and images, and use static white for dark backgrounds and images. Avoid placing static components on top of busy images with a lot of variance in contrast.

<sp-tabs selected="black" auto label="Static variants for contrast">
<sp-tab value="black">Static black on light background</sp-tab>
<sp-tab-panel value="black">

```html demo
<div style="background-color: #ccffee; padding: 20px">
    <sp-action-button static="black">Click me</sp-action-button>
    <sp-action-button static="black" selected>Click me</sp-action-button>
</div>
```

</sp-tab-panel>
<sp-tab value="white">Static white on dark background</sp-tab>
<sp-tab-panel value="white">

```html demo
<div style="background-color: #220033; padding: 20px">
    <sp-action-button static="white">Click me</sp-action-button>
    <sp-action-button static="white" selected>Click me</sp-action-button>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Clearly state the action

Make sure that an action button’s label clearly states the outcome of the action. Use the same word or phrase as found elsewhere in the experience.
