## Description

An `<sp-picker-button>` is used as a sub-component of patterns like the `<sp-combobox>` (release pending) to pair a button interface with a text input. With its many custom states and alterations, it isn't likely to be leveraged directly outside of more complex UIs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/picker-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/picker-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/picker-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/picker-button)

```
yarn add @spectrum-web-components/picker-button
```

Import the side effectful registration of `<sp-picker-button>` via:

```
import '@spectrum-web-components/picker-button/sp-picker-button.js';
```

When looking to leverage the `PickerButton` base class as a type and/or for extension purposes, do so via:

```
import { PickerButton } from '@spectrum-web-components/picker-button';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-picker-button size="s"></sp-picker-button>
<br />
<sp-picker-button size="s"><span slot="label">All</span></sp-picker-button>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-picker-button size="m"></sp-picker-button>
<br />
<sp-picker-button size="m"><span slot="label">All</span></sp-picker-button>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-picker-button size="l"></sp-picker-button>
<br />
<sp-picker-button size="l"><span slot="label">All</span></sp-picker-button>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-picker-button size="xl"></sp-picker-button>
<br />
<sp-picker-button size="xl"><span slot="label">All</span></sp-picker-button>
```

</sp-tab-panel>
</sp-tabs>

## Text and icon

With the use of the `label` slot, you can deliver an `<sp-picker-button>` with both an icon and a text label:

```html
<sp-picker-button><span slot="label">All</span></sp-picker-button>
```

## Icon only

Without content addressed to the `label` slot, the `<sp-picker-button>` with both an icon and a text label:

```html
<sp-picker-button></sp-picker-button>
```

### Custom icon

You can customize the icon in an `<sp-picker-button>` by addressing a new icon to the `icon` slot:

```html
<sp-picker-button><sp-icon-add slot="icon"></sp-icon-add></sp-picker-button>
```

## Modifying attributes

### Rounded

When delivered as part of the `express` theme, an `<sp-picker-button>` with the `rounded` attribute will be given deeply rounded corners:

```html
<sp-picker-button rounded></sp-picker-button>
<br />
<sp-picker-button rounded><span slot="label">All</span></sp-picker-button>
```

### Quiet

When delivered with the `quiet` attribute, the `<sp-picker-button>` will take a less pronounced visual delivery:

```html
<sp-picker-button quiet></sp-picker-button>
<br />
<sp-picker-button quiet><span slot="label">All</span></sp-picker-button>
```

### Position

By default the `<sp-picker-button>` will be given a `position` attribute with the value `right`, which is best leveraged at the right edge of an associated `<sp-textfield>` element. If your UI desires that the `<sp-picker-button>` be placed to the left of the related input, use the `position` attribute and set it to `left`:

```html
<sp-picker-button position="left"></sp-picker-button>
<br />
<sp-picker-button position="left">
    <span slot="label">All</span>
</sp-picker-button>
```

### Open

When paired with an expanded UI, e.g. an `<sp-combobox>` with its autocomplete options visible, an `<sp-picker-button>` should be given the `open` attribute to visual match the delivered state in the larger UI:

```html
<sp-picker-button open></sp-picker-button>
<br />
<sp-picker-button open><span slot="label">All</span></sp-picker-button>
```

### Disabled

Leveraging the `disabled` attribute will dim the `<sp-picker-button>` and alter its presentation in the accessibility tree:

```html
<sp-picker-button disabled></sp-picker-button>
<br />
<sp-picker-button disabled><span slot="label">All</span></sp-picker-button>
```

### Invalid

When delivered as part of the `spectrum` theme, an `<sp-picker-button>` with the `invalid` attribute will be given a red border:

```html
<sp-picker-button invalid></sp-picker-button>
<br />
<sp-picker-button invalid><span slot="label">All</span></sp-picker-button>
```
