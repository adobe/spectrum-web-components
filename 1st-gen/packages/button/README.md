## Overview

An `<sp-button>` represents an action a user can take. sp-buttons can be clicked
or tapped to perform an action or to navigate to another page. Buttons in
Spectrum have several variations for different uses and multiple levels of
loudness for various attention-getting needs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-rgg7nx1d)

```zsh
yarn add @spectrum-web-components/button
```

Import the side effectful registration of `<sp-button>` as follows:

```ts
import '@spectrum-web-components/button/sp-button.js';
```

When looking to leverage the `Button` base classes as a type and/or for extension purposes, do so via:

```ts
import { Button } from '@spectrum-web-components/button';
```

### Anatomy

```html
<sp-button>Try me</sp-button>
```

#### Content

`<sp-button>` elements can be provided a visible label,
a label and an icon, or just an icon.

An icon is provided by placing an icon element in the `icon` slot.

If the button is `icon-only`, a non-visible label
can be provided via the `label` attribute on an `<sp-button>`
or on an `<sp-icon*>` element child to appropriately
fulfill the accessibility contract of the button.

<sp-tabs selected="label" auto label="Labelling a button">
<sp-tab value="label">Label only</sp-tab>
<sp-tab-panel value="label">

```html demo
<sp-button variant="primary">Label only</sp-button>
```

</sp-tab-panel>
<sp-tab value="icon-label">Icon + label</sp-tab>
<sp-tab-panel value="icon-label">

```html demo
<sp-button variant="primary">
    <sp-icon-help slot="icon"></sp-icon-help>
    Icon + Label
</sp-button>
```

</sp-tab-panel>
<sp-tab value="svg-label">SVG Icon + label</sp-tab>
<sp-tab-panel value="svg-label">

```html demo
<sp-button variant="primary">
    <svg
        slot="icon"
        viewBox="0 0 36 36"
        focusable="false"
        aria-hidden="true"
        role="img"
    >
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
    SVG Icon + Label
</sp-button>
```

</sp-tab-panel>
<sp-tab value="icon-only">Icon only</sp-tab>
<sp-tab-panel value="icon-only">

```html demo
<sp-button variant="primary" label="Icon only">
    <sp-icon-help slot="icon"></sp-icon-help>
</sp-button>
```

</sp-tab-panel>
</sp-tabs>

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size attribute options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-button size="s">Small</sp-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-button size="m">Medium</sp-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-button size="l">Large</sp-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-button size="xl">Extra Large</sp-button>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

There are many button variants to choose from in Spectrum. The `variant`
attribute defaults to `accent`, but also accepts the following value: `accent`, `primary`, `secondary`, `negative`. They display as follows:

<sp-tabs selected="accent" auto label="Variant Attribute Options">
<sp-tab value="accent">Accent</sp-tab>
<sp-tab-panel value="accent">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button variant="accent">Label only</sp-button>
    <sp-button variant="accent">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button variant="accent" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="primary">Primary</sp-tab>
<sp-tab-panel value="primary">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button variant="primary">Label only</sp-button>
    <sp-button variant="primary">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button variant="primary" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="secondary">Secondary</sp-tab>
<sp-tab-panel value="secondary">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button variant="secondary">Label only</sp-button>
    <sp-button variant="secondary">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button variant="secondary" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="negative">Negative</sp-tab>
<sp-tab-panel value="negative">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button variant="negative">Label only</sp-button>
    <sp-button variant="negative">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button variant="negative" label="Icon only" icon-only>
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
</sp-tabs>

#### Treatment

The `treatment` attribute accepts `fill` and `outline` as values, and defaults to `fill`. These display as follows:

<sp-tabs selected="fill" auto label="Treatment Attribute Options">
<sp-tab value="fill">Fill</sp-tab>
<sp-tab-panel value="fill">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button treatment="fill" variant="primary">Primary, Fill</sp-button>
    <sp-button treatment="fill" variant="secondary">Secondary, Fill</sp-button>
    <sp-button treatment="fill" variant="negative">Negative, Fill</sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="outline">Outline</sp-tab>
<sp-tab-panel value="outline">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button treatment="outline" variant="primary">
        Primary, Outline
    </sp-button>
    <sp-button treatment="outline" variant="secondary">
        Secondary, Outline
    </sp-button>
    <sp-button treatment="outline" variant="negative">
        Negative, Outline
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="outline-black">Outline, black</sp-tab>
<sp-tab-panel value="outline-black">

```html demo
<sp-button-group
    style="background: var(--spectrum-seafoam-600); padding: 0.5em; min-width: max-content"
>
    <sp-button treatment="outline" static-color="black">Label only</sp-button>
    <sp-button treatment="outline" static-color="black">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button
        treatment="outline"
        static-color="black"
        label="Icon only"
        icon-only
    >
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="outline-white">Outline, white</sp-tab>
<sp-tab-panel value="outline-white">

```html demo
<sp-button-group
    style="background: var(--spectrum-seafoam-600); padding: 0.5em; min-width: max-content"
>
    <sp-button treatment="outline" static-color="white">Label only</sp-button>
    <sp-button treatment="outline" static-color="white">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button
        treatment="outline"
        static-color="white"
        label="Icon only"
        icon-only
    >
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
</sp-tabs>

### States

In addition to the variant, `<sp-button>` elements support two different visual states, disabled and pending, which can be applied by adding the attribute `disabled` or `pending` respectively. All `<sp-button>` variants support these states.

#### Disabled

While disabled, `<sp-button>` elements will not respond to click events and will appear faded.

```html
<sp-button-group>
    <sp-button variant="primary">Normal</sp-button>
    <sp-button variant="primary" disabled>Disabled</sp-button>
</sp-button-group>
```

#### Pending

While in pending state, `<sp-button>` elements will not respond to click events and will appear faded with an indeterminate `<sp-progress-circle>`.
The `<sp-button>` element's label and icon will be hidden while in pending state.

Note: The pending state of the `<sp-button>` element is applied after a 1s delay to avoid flashing the pending state for quick actions. You can override the delay by adding custom css var `--pending-delay` to your css.

```html
<sp-button-group>
    <sp-button variant="primary">Normal</sp-button>
    <sp-button variant="primary" pending>Pending</sp-button>
</sp-button-group>
```

### Behaviors

#### Handling events

Events handlers for clicks and other user actions can be registered on a
`<sp-button>` as one would on a standard HTML `<button>` element.

```html
<sp-button onclick="spAlert(this, '<sp-button> clicked!')">Click me</sp-button>
```

In addition to handling events like a native `<button>` HTML element, one can also use a `<sp-button>` in place of the `<a>` HTML element by using the `href` and optional `target` attribute.

```html demo
<sp-button
    href="https://github.com/adobe/spectrum-web-components"
    target="_blank"
>
    Click me
</sp-button>
```

#### Autofocus

The `autofocus` attribute sets focus on the `<sp-button>` when the component
mounts. This is useful for setting focus to a specific sp-button when a
popover or dialog opens.

```html
<sp-button id="trigger">Open</sp-button>
<sp-overlay trigger="trigger@click" placement="bottom">
    <sp-popover>
        <!-- Button will autofocus when open -->
        <sp-button autofocus>Confirm</sp-button>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Include a label

A button is required to have either a visible text label or a `label` attribute on either the `<sp-button>` itself
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
<div
    style="background-color: var(--spectrum-docs-static-black-background-color); padding: 20px"
>
    <sp-button static-color="black">Click me</sp-button>
    <sp-button static-color="black" treatment="outline">Click me</sp-button>
</div>
```

</sp-tab-panel>
<sp-tab value="white">Static white on dark background</sp-tab>
<sp-tab-panel value="white">

```html demo
<div
    style="background-color: var(--spectrum-docs-static-white-background-color); padding: 20px"
>
    <sp-button static-color="white">Click me</sp-button>
    <sp-button static-color="white" treatment="outline">Click me</sp-button>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Clearly state the action

Make sure that a button’s label clearly states the outcome of the action. Use the same word or phrase as found elsewhere in the experience.
