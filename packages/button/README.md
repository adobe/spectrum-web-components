## Description

An `<sp-button>` represents an action a user can take. sp-buttons can be clicked
or tapped to perform an action or to navigate to another page. sp-buttons in
Spectrum have several variations for different uses and multiple levels of
loudness for various attention-getting needs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Zjc3o94DWuBkT4ve3dny/src/index.ts)

```
yarn add @spectrum-web-components/button
```

Import the side effectful registration of `<sp-button>` or `<sp-clear-button>` as follows:

```
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/button/sp-close-button.js';
```

When looking to leverage the `Button`, `ClearButton`, or `CloseButton` base classes as a type and/or for extension purposes, do so via:

```
import { Button, ClearButton, CloseButton } from '@spectrum-web-components/button';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
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

## Content

`<sp-button>` elements can be provided a visible label, a label with an icon, or just an icon (a non-visible label can be prived via the `label` attribute on an `<sp-button>` or on an `<sp-icon*>` element child to appropriately fulfill the accessibility contract of the button). An icon is provided by
placing an icon element to the `icon` slot.

```html
<sp-button-group>
    <sp-button variant="primary">Label only</sp-button>
    <sp-button variant="primary">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
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
    <sp-button variant="primary" label="Icon only">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

## Variants

There are many button variants to choose from in Spectrum. The `variant`
attribute defaults to `accent` but also accepts the following value: `accent`, `primary`, `secondary`, `negative`, `white`, and `black`. They display as follows:

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
    <sp-button variant="accent" label="Icon only">
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
    <sp-button variant="primary" label="Icon only">
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
    <sp-button variant="secondary" label="Icon only">
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
    <sp-button variant="negative" label="Icon only">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="black">Black</sp-tab>
<sp-tab-panel value="black">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button static="black">Label only</sp-button>
    <sp-button static="black">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button static="black" label="Icon only">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
<sp-tab value="white">White</sp-tab>
<sp-tab-panel value="white">

```html demo
<sp-button-group style="min-width: max-content">
    <sp-button static="white">Label only</sp-button>
    <sp-button static="white">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button static="white" label="Icon only">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
</sp-tabs>

### Treatment

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
    <sp-button treatment="outline" static="black">Label only</sp-button>
    <sp-button treatment="outline" static="black">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button treatment="outline" static="black" label="Icon only">
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
    <sp-button treatment="outline" static="white">Label only</sp-button>
    <sp-button treatment="outline" static="white">
        <sp-icon-help slot="icon"></sp-icon-help>
        Icon + Label
    </sp-button>
    <sp-button treatment="outline" static="white" label="Icon only">
        <sp-icon-help slot="icon"></sp-icon-help>
    </sp-button>
</sp-button-group>
```

</sp-tab-panel>
</sp-tabs>

## States

In addition to the variant, `<sp-button>` elements have a disabled state visual state
which can be applied by adding the attribute `disabled`. All `<sp-button>`
variants support this. In addition to affectng the visual state, the `disabled`
attribute prevents focus and disallows `click` events.

```html
<sp-button-group>
    <sp-button variant="primary">Normal</sp-button>
    <sp-button variant="primary" disabled>Disabled</sp-button>
</sp-button-group>
```

## Handling events

Events handlers for clicks and other user actions can be registered on a
`<sp-button>` as on a standard HTML `<button>` element.

```html
<sp-button onclick="spAlert(this, '<sp-button> clicked!')">Click me</sp-button>
```

In addition to handling events like a native `<button>` HTML element, one can also use a `<sp-button>` in place of the `<a>` element by using the `href` and optional `target` attribute.

```html
<sp-button
    href="https://github.com/adobe/spectrum-web-components"
    target="_blank"
>
    Click me
</sp-button>
```

### Autofocus

The `autofocus` attribute sets focus to the `<sp-button>` when the component
mounts. This is useful for setting focus to a specific sp-button when a
popover or dialog opens.

```html
<sp-button autofocus>Confirm</sp-button>
```
