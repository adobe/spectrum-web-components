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

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-field-label size="s" for="story-0-s">Background</sp-field-label>
<sp-textfield
    size="s"
    id="story-0-s"
    multiline
    placeholder="Enter your life story"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-field-label for="story-0-m">Background</sp-field-label>
<sp-textfield
    id="story-0-m"
    multiline
    placeholder="Enter your life story"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-field-label size="l" for="story-0-l">Background</sp-field-label>
<sp-textfield
    size="l"
    id="story-0-l"
    multiline
    placeholder="Enter your life story"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-field-label size="xl" for="story-0-xl">Background</sp-field-label>
<sp-textfield
    size="xl"
    id="story-0-xl"
    multiline
    placeholder="Enter your life story"
></sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

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

By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accommodate the full content of the element.

```html
<div style="display: flex; flex-wrap: wrap;">
    <div>
        <sp-field-label for="story-4">Background</sp-field-label>
        <sp-textfield
            id="story-4"
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accommodate the full content of the element."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="story-5">Background</sp-field-label>
        <sp-textfield
            id="story-5"
            grows
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accommodate the full content of the element."
        ></sp-textfield>
    </div>
    <div>
        <sp-field-label for="story-6">Background (quietly)</sp-field-label>
        <sp-textfield
            id="story-6"
            grows
            multiline
            placeholder="Enter your name"
            value="By default the text area has a fixed height and will scroll when text entry goes beyond the available space. With the use of the `grows` attribute the text area will grow to accommodate the full content of the element."
            quiet
        ></sp-textfield>
    </div>
</div>
```

## Help text

Help text can be accessibly associated with an `<sp-textfield multiline>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-textfield multiline>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-textfield multiline>` element. Content within the `help-text` slot will be show by default. When your `<sp-textfield multiline>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

<sp-tabs selected="self" auto label="Help text usage in multiline textfields">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-label for="self">Stay "Positive"</sp-field-label>
<sp-textfield
    multiline
    id="self"
    pattern="[P][o][s][i][t][i][v][e]"
    value="Positive"
>
    <sp-help-text slot="help-text">
        Tell us how you are feeling today.
    </sp-help-text>
    <sp-help-text slot="negative-help-text">Please be "Positive".</sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="managed">Stay "Positive"</sp-field-label>
<sp-textfield
    multiline
    id="managed"
    pattern="[P][o][s][i][t][i][v][e]"
    value="Positive"
    oninput='
        const helpText = this.querySelector(`[slot="help-text"]`);
        helpText.textContent = this.invalid ? `Please be "Positive".` : `Tell us how you are feeling today.`;
        helpText.variant = this.invalid ? `negative` : `neutral`;
    '
>
    <sp-help-text slot="help-text">
        Tell us how you're feeling today.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>
