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
```

When looking to leverage the `Button` or `ClearButton` base classes as a type and/or for extension purposes, do so via:

```
import { Button, ClearButton } from '@spectrum-web-components/button';
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

## Variants

There are many button variants to choose from in Spectrum. The `variant`
attribute controls the main variant of the button, and a few other boolean
attributes can be combined to apply sub-variants, e.g. `quiet`.

### Normal

```html
<sp-button-group>
    <sp-button variant="cta">CTA</sp-button>
    <sp-button variant="primary">Primary</sp-button>
    <sp-button variant="secondary">Secondary</sp-button>
    <sp-button variant="negative">Negative</sp-button>
</sp-button-group>
```

### Quiet

```html
<sp-button-group>
    <sp-button quiet variant="primary">Quiet Primary</sp-button>
    <sp-button quiet variant="secondary">Quiet Secondary</sp-button>
    <sp-button quiet variant="negative">Quiet Negative</sp-button>
</sp-button-group>
```

## Content

`<sp-buttons>` can have a label, or a label with an icon. An icon is provided by
placing an icon component to the `icon` slot. The icon may be an `sp-icon` or an
SVG.

```html
<sp-icons-medium></sp-icons-medium>
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
</sp-button-group>
```

## States

In addition to the variant, `<sp-buttons>` have a disabled state visual state
which can be applied by adding the attribute `disabled`. All spectrum-button
variants support the In addition to affectng the visual state, the `disabled`
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

### Autofocus

The `autofocus` attribute sets focus to the `<sp-button>` when the component
mounts. This is useful for setting focus to a specific sp-button when a
popover or dialog opens.

```html
<sp-button autofocus>Confirm</sp-button>
```
