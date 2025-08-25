## Description

It is [not currently possible](https://w3c.github.io/webcomponents-cg/#cross-root-aria) to provide accessible ARIA references between elements in different shadow roots. When creating your own components, use the `ManageHelpText` mixin to associate slotted `<sp-help-text>` elements with the elements they describe. This functionality is also surfaced as a base class `HelpTextManagedElement` if you prefer to extend from there, instead.

Spectrum Web Components leverages the `ManageHelpText` mixin to power elements like `sp-field-group`, `sp-number-field`, `sp-radio-group`, `sp-search` and `sp-textfield`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/help-text?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/help-text)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/help-text?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/help-text)

```
yarn add @spectrum-web-components/help-text
```

Import `ManageHelpText` via:

```
import { ManageHelpText } from '@spectrum-web-components/help-text/mange-help-text.js';
```

When looking to leverage the `HelpTextManagedElement` base class as a type and/or for extension purposes, do so via:

```
import { HelpTextManagedElement } from '@spectrum-web-components/help-text/HelpTextManagedElement.js';
```

The `HelpTextManager` class is also available for import as:

```
import { HelpTextManager } from '@spectrum-web-components/help-text/HelpTextManager.js';
```

## ManageHelpText mixin

`ManageHelpText` mixes two properties into your class:

- `helpTextId`: the `id` attribute of the associated `<sp-help-text>`
- `renderHelpText(negative?: boolean)`: a method that returns a `TemplateResult` with the `help-text` and `negative-help-text` slots

## Internal

To describe an element within your custom element's shadow root, use `mode: 'internal'` (the default) and set `aria-describedby` on the target element:

```js
import { SpectrumElement, html } from '@spectrum-web-components/base';
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-hep-text.js';

export class MyElement extends ManageHelpText(SpectrumElement) {
    invalid = false;

    render() {
        return html`
            <input aria-describedby=${this.helpTextId} />
            ${this.renderHelpText(this.invalid)}
        `;
    }
}
```

## External

To describe the custom element itself, use `mode: 'external'`. This will automatically manage the application of the `aria-describedby` atribute on `MyElement`:

```js
import { SpectrumElement, html } from '@spectrum-web-components/base';
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';

export class MyElement extends ManageHelpText(SpectrumElement, {
    mode: 'external',
}) {
    invalid = false;

    render() {
        return html`
            ${this.renderHelpText(this.invalid)}
        `;
    }
}
```

This functionality is powered by the `HelpTextManager` class which is also exported from this package and can be leveraged directly. It accepts the root element on which it will manage help text and an options object that accepts the `mode` by which that help text will be managed at construction time. Leveraged at render time, it surfaces an `id` property and a `render(invalid?: boolean)` method for use in your template.

## Usage with self-managed validity

Spectrum Web Components that have an `invalid` attribute, like `<sp-fieldgroup>` and `<sp-textfield>`, automatically render either the `help-text` or `negative-help-text` slot based on validity. Provide both, and the appropriate `<sp-help-text>` element will be surfaced:

<sp-tabs selected="textfield" auto label="Help text usage in form elements">
<sp-tab value="field">Field group</sp-tab>
<sp-tab-panel value="field">

```html
<sp-field-label for="fruit">What are your favorite fruits?</sp-field-label>
<sp-field-group horizontal id="fruit">
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
<sp-tab value="radio">Radio group</sp-tab>
<sp-tab-panel value="radio">

```html
<sp-field-label for="icecream">
    What is your favorite ice cream flavor?
</sp-field-label>
<sp-radio-group
    is="icecream"
    onchange="
        this.invalid = this.value === 'fourth';
    "
>
    <sp-radio value="first">Vanilla</sp-radio>
    <sp-radio value="second">Chocolate</sp-radio>
    <sp-radio value="third">Strawberry</sp-radio>
    <sp-radio value="fourth">I don't like ice cream</sp-radio>
    <sp-help-text slot="help-text">Everyone likes ice cream.</sp-help-text>
    <sp-help-text slot="negative-help-text" icon>
        You can't not like ice cream.
    </sp-help-text>
</sp-radio-group>
```

</sp-tab-panel>
<sp-tab value="textarea">Textarea</sp-tab>
<sp-tab-panel value="textarea">

```html
<sp-field-label for="textarea">Stay "Positive"</sp-field-label>
<sp-textfield
    multiline
    id="textarea"
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
<sp-tab value="textfield">Textfield</sp-tab>
<sp-tab-panel value="textfield">

```html
<sp-field-label for="textfield">Stay "Positive"</sp-field-label>
<sp-textfield
    id="textfield"
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
</sp-tabs>

## Usage with validity managed from above

When the parent element does not manage its own validity, or you would prefer to leverage the parent application in deciding what content and when to deliver within your `<sp-help-text>` element, place your content in the `help-text` slot to ensure that it is available for receiving stateful content/properties across the lifecycle of the parent element in question.

<sp-tabs selected="textfield" auto label="Help text usage in form elements">
<sp-tab value="field">Field group</sp-tab>
<sp-tab-panel value="field">

```html
<sp-field-label for="fruit">What are your favorite fruits?</sp-field-label>
<sp-field-group horizontal id="fruit">
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
<sp-tab value="radio">Radio group</sp-tab>
<sp-tab-panel value="radio">

```html
<sp-field-label for="icecream">
    What is your favorite ice cream flavor?
</sp-field-label>
<sp-radio-group
    is="icecream"
    onchange="
        const helpText = this.querySelector(`[slot='help-text']`);
        const isInvalid = this.selected === 'fourth';
        helpText.icon = isInvalid;
        helpText.textContent = isInvalid ? 'You can\'t not like ice cream.' : 'Everyone likes ice cream.';
        helpText.variant = isInvalid ? 'negative' : 'neutral';
    "
>
    <sp-radio value="first">Vanilla</sp-radio>
    <sp-radio value="second">Chocolate</sp-radio>
    <sp-radio value="third">Strawberry</sp-radio>
    <sp-radio value="fourth">I don't like ice cream</sp-radio>
    <sp-help-text slot="help-text">Everyone likes ice cream.</sp-help-text>
</sp-radio-group>
```

</sp-tab-panel>
<sp-tab value="textarea">Textarea</sp-tab>
<sp-tab-panel value="textarea">

```html
<sp-field-label for="textarea">Stay "Positive"</sp-field-label>
<sp-textfield
    multiline
    id="textarea"
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
<sp-tab value="textfield">Textfield</sp-tab>
<sp-tab-panel value="textfield">

```html
<sp-field-label for="textfield">Stay "Positive"</sp-field-label>
<sp-textfield
    id="textfield"
    pattern="[P][o][s][i][t][i][v][e]"
    value="Positive"
    oninput='
        const helpText = this.querySelector(`[slot="help-text"]`);
        helpText.textContent = this.invalid ? `Please be "Positive".` : `Tell us how you are feeling today.`;
        helpText.variant = this.invalid ? `negative` : `neutral`;
    '
>
    <sp-help-text slot="help-text">
        Tell us how you are feeling today.
    </sp-help-text>
</sp-textfield>
```

</sp-tab-panel>
</sp-tabs>
