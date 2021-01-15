## Description

`sp-textfield` components are text boxes that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

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
<sp-field-label for="name-0">Name</sp-field-label>
<sp-textfield id="name-0" placeholder="Enter your name"></sp-textfield>
```

## Variants

### Valid

Dictate the validity state of the text entry with the `valid` attribute.

```html
<sp-field-label for="name-1" required>Name</sp-field-label>
<sp-textfield
    id="name-1"
    placeholder="Enter your name"
    valid
    value="My Name"
></sp-textfield>
```

### Invalid

Dictate the invalidity state of the text entry with the `invalid` attribute.

```html
<sp-field-label for="name-2" required>Name</sp-field-label>
<sp-textfield id="name-2" invalid placeholder="Enter your name"></sp-textfield>
```

### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) assists in a user's ability to parse the element. Too many quiet components in a small space can be hard to read.

```html
<sp-field-label for="name-3">Name (quietly)</sp-field-label>
<sp-textfield id="name-3" placeholder="Enter your name" quiet></sp-textfield>
```
