## Overview

An `<sp-close-button>` is a special extension of the `BaseButton` class that includes icons and styling for buttons used to close a modal or dialog.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Zjc3o94DWuBkT4ve3dny/src/index.ts)

```zsh
yarn add @spectrum-web-components/button
```

Import the side effectful registration of `<sp-close-button>` as follows:

```ts
import '@spectrum-web-components/button/sp-clear-button.js';
```

When looking to leverage the `CloseButton` base class as a type and/or for extension purposes, do so via:

```ts
import { ClearButton } from '@spectrum-web-components/button';
```

### Anatomy

```html
<sp-close-button>Close Dialog</sp-close-button>
```

#### Label

The label for an `<sp-close-button>` element can be set via it's default slot or with the `label` attribute.

<sp-tabs selected="label" auto label="Labelling a button">
<sp-tab value="slot">Default slot</sp-tab>
<sp-tab-panel value="slot">

```html demo
<sp-close-button>Close</sp-close-button>
```

</sp-tab-panel>
<sp-tab value="attribute">Label attribute</sp-tab>
<sp-tab-panel value="attribute">

```html demo
<sp-close-button label="Close"></sp-close-button>
```

</sp-tab-panel>
<sp-tab value="attribute">Label attribute</sp-tab>
<sp-tab-panel value="attribute">

```html demo
<sp-close-button></sp-close-button>
```

</sp-tab-panel>
</sp-tabs>

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-close-button size="s">Small</sp-close-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-close-button size="m">Medium</sp-close-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-close-button size="l">Large</sp-close-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-close-button size="xl">Extra Large</sp-close-button>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

There are many button variants to choose from in Spectrum. The `variant`
attribute defaults to `accent`, but also accepts the following value: `accent`, `primary`, `secondary`, `negative`, `white`, and `black`. They display as follows:

<sp-tabs selected="accent" auto label="Variant Attribute Options">
<sp-tab value="accent">Accent</sp-tab>
<sp-tab-panel value="accent">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button variant="accent">Label only</sp-close-button>
    <sp-close-button variant="accent">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button variant="accent" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="primary">Primary</sp-tab>
<sp-tab-panel value="primary">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button variant="primary">Label only</sp-close-button>
    <sp-close-button variant="primary">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button variant="primary" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="secondary">Secondary</sp-tab>
<sp-tab-panel value="secondary">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button variant="secondary">Label only</sp-close-button>
    <sp-close-button variant="secondary">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button variant="secondary" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="negative">Negative</sp-tab>
<sp-tab-panel value="negative">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button variant="negative">Label only</sp-close-button>
    <sp-close-button variant="negative">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button variant="negative" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="black">Black</sp-tab>
<sp-tab-panel value="black">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button static-color="black">Label only</sp-close-button>
    <sp-close-button static-color="black">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button static-color="black" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="white">White</sp-tab>
<sp-tab-panel value="white">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button static-color="white">Label only</sp-close-button>
    <sp-close-button static-color="white">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button static-color="white" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
</sp-tabs>

#### Treatment

The `treatment` attribute accepts `fill` and `outline` as values, and defaults to `fill`. These display as follows:

<sp-tabs selected="fill" auto label="Treatment Attribute Options">
<sp-tab value="fill">Fill</sp-tab>
<sp-tab-panel value="fill">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button treatment="fill" variant="primary">
        Primary, Fill
    </sp-close-button>
    <sp-close-button treatment="fill" variant="secondary">
        Secondary, Fill
    </sp-close-button>
    <sp-close-button treatment="fill" variant="negative">
        Negative, Fill
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="outline">Outline</sp-tab>
<sp-tab-panel value="outline">

```html demo
<sp-close-button-group style="min-width: max-content">
    <sp-close-button treatment="outline" variant="primary">
        Primary, Outline
    </sp-close-button>
    <sp-close-button treatment="outline" variant="secondary">
        Secondary, Outline
    </sp-close-button>
    <sp-close-button treatment="outline" variant="negative">
        Negative, Outline
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="outline-black">Outline, black</sp-tab>
<sp-tab-panel value="outline-black">

```html demo
<sp-close-button-group
    style="background: var(--spectrum-seafoam-600); padding: 0.5em; min-width: max-content"
>
    <sp-close-button treatment="outline" static-color="black">
        Label only
    </sp-close-button>
    <sp-close-button treatment="outline" static-color="black">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button
        treatment="outline"
        static-color="black"
        label="Icon only"
        icon-only
    >
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
<sp-tab value="outline-white">Outline, white</sp-tab>
<sp-tab-panel value="outline-white">

```html demo
<sp-close-button-group
    style="background: var(--spectrum-seafoam-600); padding: 0.5em; min-width: max-content"
>
    <sp-close-button treatment="outline" static-color="white">
        Label only
    </sp-close-button>
    <sp-close-button treatment="outline" static-color="white">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-close-button>
    <sp-close-button
        treatment="outline"
        static-color="white"
        label="Icon only"
        icon-only
    >
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-close-button>
</sp-close-button-group>
```

</sp-tab-panel>
</sp-tabs>

### States

In addition to the variant, `<sp-close-button>` elements support two different visual states, disabled and pending, which can be applied by adding the attribute `disabled` or `pending` respectively. All `<sp-close-button>` variants support these states.

#### Disabled

While disabled, `<sp-close-button>` elements will not respond to click events and will appear faded.

```html
<sp-close-button-group>
    <sp-close-button variant="primary">Normal</sp-close-button>
    <sp-close-button variant="primary" disabled>Disabled</sp-close-button>
</sp-close-button-group>
```

#### Pending

While in pending state, `<sp-close-button>` elements will not respond to click events and will appear faded with an indeterminate `<sp-progress-circle>`.
The `<sp-close-button>` element's label and icon will be hidden while in pending state.

Note: The pending state of the `<sp-close-button>` element is applied after a 1s delay to avoid flashing the pending state for quick actions. You can override the delay by adding custom css var `--pending-delay` to your css.

```html
<sp-close-button-group>
    <sp-close-button variant="primary">Normal</sp-close-button>
    <sp-close-button variant="primary" pending>Pending</sp-close-button>
</sp-close-button-group>
```

### Behaviors

#### Handling events

Events handlers for clicks and other user actions can be registered on a
`<sp-close-button>` as one would on a standard HTML `<button>` element.

```html
<sp-close-button onclick="spAlert(this, '<sp-close-button> clicked!')">
    Click me
</sp-close-button>
```

In addition to handling events like a native `<button>` HTML element, one can also use a `<sp-close-button>` in place of the `<a>` HTML element by using the `href` and optional `target` attribute.

```html demo
<sp-close-button
    href="https://github.com/adobe/spectrum-web-components"
    target="_blank"
>
    Click me
</sp-close-button>
```

#### Autofocus

The `autofocus` attribute sets focus on the `<sp-close-button>` when the component
mounts. This is useful for setting focus to a specific sp-close-button when a
popover or dialog opens.

```html
<sp-close-button autofocus>Confirm</sp-close-button>
```

### Accessibility

#### Include a label

A button is required to have either a visible text label or a `label` attribute on either the `<sp-close-button>` itself
or on an `<sp-icon*>` element child.

#### Don't override color

Do not use custom colors for buttons. The colors of different button variations have been designed to be consistent and accessible.

#### Don't mix href and non-href buttons in a set of buttons

A screen reader user will not encounter href buttons when navigating by buttons or form controls. While they can both be used in the same page problems could occur if mixing the types in close proximity to each other.

#### Use static black or static white to contrast with backgrounds and images

To ensure maximum contrast with the background, use static black for light backgrounds and images, and static white for dark backgrounds and images. Avoid placing static components on top of busy images with a lot of variance in contrast.

<sp-tabs selected="black" auto label="Static variants for contrast">
<sp-tab value="black">Static black on light background</sp-tab>
<sp-tab-panel value="black">

```html demo
<div style="background-color: #ccffee; padding: 20px">
    <sp-close-button static="black">Click me</sp-close-button>
    <sp-close-button static="black" treatment="outline">
        Click me
    </sp-close-button>
</div>
```

</sp-tab-panel>
<sp-tab value="white">Static white on dark background</sp-tab>
<sp-tab-panel value="white">

```html demo
<div style="background-color: #220033; padding: 20px">
    <sp-close-button static="white">Click me</sp-close-button>
    <sp-close-button static="white" treatment="outline">
        Click me
    </sp-close-button>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Clearly state the action

Make sure that a button’s label clearly states the outcome of the action. Use the same word or phrase as found elsewhere in the experience.
