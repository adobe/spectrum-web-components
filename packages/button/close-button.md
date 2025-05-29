## Overview

An `<sp-close-button>` is a special extension of the `ButtonBase` class that includes icons and styling for buttons used to close a modal or dialog.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button)

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

The close button is a button with only close icon.

```html
<sp-close-button>Close Dialog</sp-close-button>
```

#### Label

The label for an `<sp-close-button>` element can be set via it's default slot or with the `label` attribute. With either method, the label will not be visible but still read by screenreaders.

<sp-tabs selected="attribute" auto label="Labelling a button">
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

### States

In addition to the variant, the `<sp-close-button>` element supports a disabled state, which can be applied by adding the attribute `disabled`.

#### Disabled

While disabled, the `<sp-close-button>` element will not respond to click events and will appear faded.

```html
<sp-button-group>
    <sp-close-button>Normal</sp-close-button>
    <sp-close-button disabled>Disabled</sp-close-button>
</sp-button-group>
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

#### Autofocus

The `autofocus` attribute sets focus on the `<sp-close-button>` when the component
mounts. This is useful for setting focus to a specific `sp-close-button` when a
popover or dialog opens.

```html
<sp-button id="trigger">Open</sp-button>
<sp-overlay trigger="trigger@click" placement="bottom">
    <sp-popover>
        <!-- Button will autofocus when open -->
        <sp-close-button autofocus>Close</sp-close-button>
    </sp-popover>
</sp-overlay>
```

### Accessibility

#### Include a label

A button is required to have either text in the default slot or a `label` attribute on the `<sp-close-button>`.
