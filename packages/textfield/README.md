## Overview

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

```js
import { Textfield } from '@spectrum-web-components/textfield';
```

### Anatomy

```html
<sp-textfield id="basic" label="Name"></sp-textfield>
```

#### Label

A text field must have a label in order to be accessible. A label can be provided either via the `label` attribute, like the previous example or with an `<sp-field-label>` element.

```html
<sp-field-label for="with-field-label">Name</sp-field-label>
<sp-textfield id="with-field-label"></sp-textfield>
```

#### Placeholder

Use the `placeholder` attribute to include placeholder text. **Note**: Placeholder text should not be used as a replacement for a label or help help text.

```html
<sp-field-label for="has-placeholder">Name</sp-field-label>
<sp-textfield id="has-placeholder" placeholder="ex., John Doe"></sp-textfield>
```

#### Help text

Help text can be accessibly associated with an `<sp-textfield>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-textfield>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-textfield>` element. Content within the `help-text` slot will be show by default. When your `<sp-textfield>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

See [help text](../help-text) for more information.

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

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-field-label size="s" for="name-0-s">Name</sp-field-label>
<sp-textfield
    size="s"
    id="name-0-s"
    placeholder="Enter your name"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-field-label for="name-0-m">Name</sp-field-label>
<sp-textfield id="name-0-m" placeholder="Enter your name"></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-field-label size="l" for="name-0-l">Name</sp-field-label>
<sp-textfield
    size="l"
    id="name-0-l"
    placeholder="Enter your name"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-field-label size="xl" for="name-0-xl">Name</sp-field-label>
<sp-textfield
    size="xl"
    id="name-0-xl"
    placeholder="Enter your name"
></sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

#### Types

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

#### Quiet

The quiet style works best when a clear layout (vertical stack, table, grid) assists in a user's ability to parse the element. Too many quiet components in a small space can be hard to read.

```html
<sp-field-label for="name-3">Name (quietly)</sp-field-label>
<sp-textfield id="name-3" placeholder="Enter your name" quiet></sp-textfield>
```

### States

Use the `required` attribute to indicate a textfield value is required. Dictate the validity or invalidity state of the text entry with the `valid` or `invalid` attributes.

```html
<sp-field-label for="name-1" required>Name</sp-field-label>
<sp-textfield
    id="name-1"
    placeholder="Enter your name"
    valid
    value="My Name"
></sp-textfield>
<br />
<sp-field-label for="name-2" required>Name</sp-field-label>
<sp-textfield id="name-2" invalid placeholder="Enter your name"></sp-textfield>
```

### Accessibility

#### Include a label

Every text field should have a label. A field without a label is ambiguous and not accessible.

#### Include help text

The description in the help text is flexible and encompasses a range of guidance. Sometimes this guidance is about what to input, and sometime it’s about how to input. This includes information such as:

-   An overall description of the input field
-   Hints for what kind of information needs to be input
-   Specific formatting examples or requirements

Learn more about [using help text](https://spectrum.adobe.com/page/text-field/#Use-help-text-to-show-hints,-formatting,-and-requirements).

#### Include negative help text

Write error messaging in a human-centered way by guiding a user and showing them a solution — don’t simply state what’s wrong and then leave them guessing as to how to resolve it. Ambiguous error messages can be frustrating and even shame-inducing for users. Also, keep in mind that something that a system may deem an error may not actually be perceived as an error to a user.

Learn more about [writing error messages](https://spectrum.adobe.com/page/text-field/#Write-error-text-that-shows-a-solution).

#### Do not us a placeholder as a replacement for a label or help-text

Putting instructions for how to complete an input, requirements, or any other essential information into placeholder text is not accessible. Once a value is entered, placeholder text is no longer viewable; if someone is using an automatic form filler, they will never get the information in the placeholder text.

Instead, use the help text description to convey requirements or to show any formatting examples that would help user comprehension. If there's placeholder text and help text at the same time, it becomes redundant and distracting, especially if they're communicating the same thing.
