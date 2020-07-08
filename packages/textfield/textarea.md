## Description

`sp-textfield[multiline]` components are text areas that allow users to input custom multiline text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/textfield?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/textfield)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/textfield?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/textfield)

```
yarn add @spectrum-web-components/textfield
```

Import the side effectful registration of `<sp-textfield>` via:

```
import '@spectrum-web-components/textfield/sp-textfield.js';
```

When looking to leverage the `Textfield` base class as a type and/or for extension purposes, do so via:

```
import { Textfield } from '@spectrum-web-components/textfield';
```

## Example

```html
<sp-textfield placeholder="Enter your name" multiline></sp-textfield>
```

## Variants

### Valid

Dictate the validity state of the text entry with the `valid` attribute.

```html
<sp-textfield placeholder="Enter your name" valid multiline></sp-textfield>
```

### Invalid

Dictate the invalidity state of the text entry with the `invalid` attribute.

```html
<sp-textfield placeholder="Enter your name" invalid multiline></sp-textfield>
```

### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) makes it easy to parse. Too many quiet components in a small space can be hard to read.

```html
<sp-textfield placeholder="Enter your name" quiet multiline></sp-textfield>
```

### Grows

By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element.

```html
<sp-textfield
    multiline
    placeholder="Enter your name"
    value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element."
></sp-textfield>
<sp-textfield
    multiline
    grows
    placeholder="Enter your name"
    value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element."
></sp-textfield>
```
