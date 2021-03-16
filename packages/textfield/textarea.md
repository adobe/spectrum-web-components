## Description

`sp-textfield[multiline]` components are text areas that allow users to input custom multiline text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/textfield?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/textfield)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/textfield?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/textfield)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/0zJJ7Z37pcM8wO6lYt8y/src/index.ts)

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
<sp-field-label for="story-0">Background</sp-field-label>
<sp-textfield
    id="story-0"
    multiline
    placeholder="Enter your life story"
></sp-textfield>
```

## Variants

### Valid

Dictate the validity state of the text entry with the `valid` attribute.

```html
<sp-field-label for="story-1" required>Background</sp-field-label>
<sp-textfield
    id="story-1"
    multiline
    placeholder="Enter your name"
    valid
></sp-textfield>
```

### Invalid

Dictate the invalidity state of the text entry with the `invalid` attribute.

```html
<sp-field-label for="story-2" required>Background</sp-field-label>
<sp-textfield
    id="story-2"
    invalid
    multiline
    placeholder="Enter your name"
></sp-textfield>
```

### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) assists in a user's ability to parse the element. Too many quiet components in a small space can be hard to read.

```html
<sp-field-label for="story-3">Background (quietly)</sp-field-label>
<sp-textfield
    id="story-3"
    multiline
    placeholder="Enter your name"
    quiet
></sp-textfield>
```

### Grows

By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element.

Note: When leveraging the `quiet` attribute, the `grows` attribute does not effect the final delivery of the element.

```html
<div style="display: flex; flex-wrap: wrap;">
    <div>
        <sp-field-label for="story-4">Background</sp-field-label>
        <sp-textfield
            id="story-4"
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="story-5">Background</sp-field-label>
        <sp-textfield
            id="story-5"
            grows
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="story-6">Background (quietly)</sp-field-label>
        <sp-textfield
            id="story-6"
            grows
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accomidate the full content of the element."
            quiet
        ></sp-textfield>
    </div>
</div>
```
