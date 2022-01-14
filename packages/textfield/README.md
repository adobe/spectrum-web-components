## Description

`sp-textfield` components are text boxes that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/textfield?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/textfield)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/textfield?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/textfield)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/EcE2Yrwz0MDIGkCzbyvl/src/index.ts)

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

### Types

When inputting URLs, telephone numbers, email addresses, or passwords, specify a `type` to provide
user affordances like mobile keyboards and obscured characters:

-   `url`
-   `tel`
-   `email`
-   `password`
-   `text` (default)

```html
<sp-field-label for="tel-1">Telephone</sp-field-label>
<sp-textfield
    id="tel-1"
    type="tel"
    placeholder="Enter your phone number"
></sp-textfield>
<sp-field-label for="password-1">Password</sp-field-label>
<sp-textfield id="password-1" type="password"></sp-textfield>
```

If the `type` attribute is not specified, or if it does not match any of these values, the default type adopted is "text."

## Help text

Help text can be accessibly associated with an `<sp-textfield>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-textfield>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-textfield>` element. Content within the `help-text` slot will be show by default. When your `<sp-textfield>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

<sp-tabs selected="self" auto label="Help text usage in textfields">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-label for="self">Stay "Positive"</sp-field-label>
<sp-textfield id="self" pattern="[P][o][s][i][t][i][v][e]" value="Positive">
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
    id="managed"
    pattern="[P][o][s][i][t][i][v][e]"
    value="Positive"
    oninput='
        const helpText = this.querySelector(`[slot="help-text"]`);
        helpText.textContent = this.invalid ? `Please be "Positive".` : `Tell us how you are feeling today.`;
        helpText.variant = this.invalid ? `negative` : `neutral`;
    '
>
    <sp-help-text slot="neutral-text">
        Tell us how you're feeling today.
    </sp-help-text>
    <sp-help-text slot="help-text">Please be "Positive".</sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>
