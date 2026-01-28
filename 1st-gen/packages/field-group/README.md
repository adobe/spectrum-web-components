## Overview

An `<sp-field-group>` element is used to layout a group of fields, usually `<sp-checkbox>` elements. It can be leveraged for `vertical` or `horizontal` organization of the fields that are supplied as its children.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-group)

```zsh
yarn add @spectrum-web-components/field-group
```

Import the side effectful registration of `<sp-field-group>` via:

```js
import '@spectrum-web-components/field-group/sp-field-group.js';
```

When looking to leverage the `FieldGroup` base class as a type and/or for extension purposes, do so via:

```js
import { FieldGroup } from '@spectrum-web-components/field-group';
```

### Anatomy

```html
<sp-field-group horizontal label="Choose from horizontally placed options">
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox checked>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox>Checkbox 5</sp-checkbox>
</sp-field-group>
```

#### Label

A field group must have a label in order to be accessible. A label can be provided either via the `label` attribute, like the previous example or with an `<sp-field-label>` element.

```html
<sp-field-label for="horizontal">
    Choose from horizontally placed options
</sp-field-label>
<sp-field-group horizontal id="horizontal">
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox checked>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox>Checkbox 5</sp-checkbox>
</sp-field-group>
```

#### Help text

Help text can be accessibly associated with an `<sp-field-group>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-field-group>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-field-group>` element. Content within the `help-text` slot will be show by default. When your `<sp-field-group>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

<sp-tabs selected="self" auto label="Help text usage in field groups">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-group horizontal id="self" label="What are your favorite fruits?">
    <sp-checkbox value="apple">Apple</sp-checkbox>
    <sp-checkbox
        value="not-a-fruit"
        onchange="javascript:this.parentElement.invalid = this.checked"
    >
        Lettuce
    </sp-checkbox>
    <sp-checkbox value="strawberry" checked>Strawberry</sp-checkbox>
    <sp-help-text slot="help-text">One of these is not a fruit.</sp-help-text>
    <sp-help-text slot="negative-help-text" icon>
        Choose actual fruit(s).
    </sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="above">What are your favorite fruits?</sp-field-label>
<sp-field-group horizontal id="above">
    <sp-checkbox value="apple">Apple</sp-checkbox>
    <sp-checkbox
        value="not-a-fruit"
        onchange="
            const helpText = this.parentElement.querySelector(`[slot='help-text']`);
            helpText.icon = this.checked;
            helpText.textContent = this.checked ? 'Choose actual fruit(s).' : 'One of these is not a fruit.';
            helpText.variant = this.checked ? 'negative' : 'neutral';
        "
    >
        Lettuce
    </sp-checkbox>
    <sp-checkbox value="strawberry" checked>Strawberry</sp-checkbox>
    <sp-help-text slot="help-text">One of these is not a fruit.</sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
</sp-tabs>

### Options

#### Vertical

```html
<sp-field-label for="vertical">
    Choose from vertically placed options
</sp-field-label>
<sp-field-group vertical id="vertical">
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox checked>Checkbox 5</sp-checkbox>
</sp-field-group>
```

### States

#### Invalid

When a group of checkboxes fails validation, use the `invalid` attribute on the field group along with `negative-help-text` to explain the error. Set the `invalid` attribute on individual checkboxes as well to apply the appropriate visual styling.

```html
<sp-field-group vertical label="Required selections" invalid>
    <sp-checkbox invalid>Option A</sp-checkbox>
    <sp-checkbox invalid>Option B</sp-checkbox>
    <sp-checkbox invalid>Option C</sp-checkbox>
    <sp-help-text slot="negative-help-text" icon>
        Select at least one option to continue.
    </sp-help-text>
</sp-field-group>
```

### Accessibility

#### Include a label

Every field group should have a label. A field without a label is ambiguous and not accessible.

#### Include help text

The description in the help text is flexible and encompasses a range of guidance. Sometimes this guidance is about what to input, and sometime it’s about how to input. This includes information such as:

- An overall description of the input field
- Hints for what kind of information needs to be input
- Specific formatting examples or requirements

Learn more about [using help text](https://spectrum.adobe.com/page/text-field/#Use-help-text-to-show-hints,-formatting,-and-requirements).

#### Include negative help text

Write error messaging in a human-centered way by guiding a user and showing them a solution — don’t simply state what’s wrong and then leave them guessing as to how to resolve it. Ambiguous error messages can be frustrating and even shame-inducing for users. Also, keep in mind that something that a system may deem an error may not actually be perceived as an error to a user.

Learn more about [writing error messages](https://spectrum.adobe.com/page/text-field/#Write-error-text-that-shows-a-solution).

#### Do not us a placeholder as a replacement for a label or help-text

Putting instructions for how to complete an input, requirements, or any other essential information into placeholder text is not accessible. Once a value is entered, placeholder text is no longer viewable; if someone is using an automatic form filler, they will never get the information in the placeholder text.

Instead, use the help text description to convey requirements or to show any formatting examples that would help user comprehension. If there's placeholder text and help text at the same time, it becomes redundant and distracting, especially if they're communicating the same thing.
