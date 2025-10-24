## Overview

The `FieldLabelMixin` provides a consistent way to render accessible, visually integrated labels for form controls within custom elements. It handles label visibility, required field indicators, disabled states, and label positioning.

Spectrum Web Components leverages the `FieldLabelMixin` to power elements like `[sp-textfield](./textfield)`, `[sp-combobox](./combobox)`, `[sp-number-field](./number-field)`, and `[sp-color-field](./color-field)`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-label?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-label)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-label?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-label)

```zsh
yarn add @spectrum-web-components/field-label
```

Import `FieldLabelMixin` via:

```js
import { FieldLabelMixin } from '@spectrum-web-components/field-label/src/FieldLabelMixin.js';
```

### Anatomy

`FieldLabelMixin` mixes several properties and a render method into your class:

- `disabled`: whether the label appears in a disabled state
- `required`: whether to display a required indicator (asterisk icon)
- `sideAligned`: controls label positioning (`'start'` | `'end'` | `undefined`)
- `slotHasContent`: whether the label slot contains content (inherited from `ObserveSlotText`)
- `renderFieldLabel(fieldId?: string)`: a method that returns a `TemplateResult` with the label element. The `fieldId` parameter must match the `id` attribute of your form control element to ensure proper label association for accessibility

The mixin accepts optional parameters:

- `slotName`: the name of the slot to observe for label content (defaults to unnamed/default slot)
- `excludedSelectors`: an array of selectors to exclude when observing slot content

### Options

#### Default slotted label

To add a field label to your custom element, apply the mixin and call `renderFieldLabel()` in your render method. Pass the ID of your form control element as the argument to ensure proper accessibility association:

```js
import { SpectrumElement, html } from '@spectrum-web-components/base';
import { FieldLabelMixin } from '@spectrum-web-components/field-label/src/FieldLabelMixin.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

export class MyInput extends FieldLabelMixin(Focusable) {
    render() {
        return html`
            ${this.renderFieldLabel('my-input-field')}
            <input id="my-input-field" type="text" />
        `;
    }
}
```

#### Named slotted label

To use a named slot for the label content, pass the slot name as a parameter to the mixin:

```js
export class MyCombobox extends FieldLabelMixin(MyBaseClass, 'field-label') {
    render() {
        return html`
            ${this.renderFieldLabel('combo-input')}
            <div id="textfield">
                <input id="combo-input" type="text" role="combobox" />
            </div>
            <slot name="field-label"></slot>
        `;
    }
}
```

This allows consumers to provide label content via:

```html
<my-combobox>
    <span slot="field-label">Choose an option</span>
</my-combobox>
```

#### Side-aligned labels

Use the `sideAligned` property to position labels inline with the form control:

```js
export class MyField extends FieldLabelMixin(Focusable) {
    // The mixin already provides sideAligned property
    // It can be set via attribute: side-aligned="start" or side-aligned="end"

    render() {
        return html`
            ${this.renderFieldLabel('field')}
            <input id="field" type="text" />
        `;
    }
}
```

Usage:

```html
<my-field side-aligned="end">Label text</my-field>
```

### States

#### Required

When the `required` property is set to `true`, the mixin automatically renders an asterisk icon next to the label:

```js
export class MyField extends FieldLabelMixin(Focusable) {
    @property({ type: Boolean, reflect: true })
    public required = false;

    render() {
        return html`
            ${this.renderFieldLabel('field')}
            <input id="field" type="text" ?required=${this.required} />
        `;
    }
}
```

#### Disabled

The `disabled` property controls the visual state of the label:

```js
export class MyField extends FieldLabelMixin(Focusable) {
    // The mixin already provides disabled property

    render() {
        return html`
            ${this.renderFieldLabel('field')}
            <input id="field" type="text" ?disabled=${this.disabled} />
        `;
    }
}
```
