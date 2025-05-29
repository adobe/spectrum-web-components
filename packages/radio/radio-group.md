## Overview

[`<sp-radio>`](../radio) and `<sp-radio-group>` allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/radio?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/radio)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/radio?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/radio)

```zsh
yarn add @spectrum-web-components/radio
```

Import the side effectful registration of `<sp-radio>` or `<sp-radio-group>` via:

```js
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
```

When looking to leverage the `Radio` or `RadioGroup` base classes as a type and/or for extension purposes, do so via:

```js
import { Radio, RadioGroup } from '@spectrum-web-components/radio';
```

### Anatomy

`<sp-radio-group>` holds a list of `<sp-radio>` elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. `<sp-radio>` is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.

```html
<sp-radio-group label="Choose an option" name="anatomy">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

#### Label

The `<sp-radio-group>` element can be labeled with the `label` attribute or with an <`sp-field-label>` element:

<sp-tabs selected="property" auto label="Label Anatomy">
<sp-tab value="attribute">`label` attribute</sp-tab>
<sp-tab-panel value="attribute">

```html
<sp-radio-group label="Choose an option" name="anatomy">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

</sp-tab-panel>
<sp-tab value="sp-field-label">Using a field label</sp-tab>
<sp-tab-panel value="sp-field-label">

```html
<sp-field-label for="options">Choose an option</sp-field-label>
<sp-radio-group id="options" name="anatomy">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

</sp-tab-panel>
</sp-tabs>

#### Help Text

Help text can be accessibly associated with an `<sp-radio-group>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-radio-group>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-radio-group>` element. Content within the `help-text` slot will be show by default. When your `<sp-radio-group>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

Read more about using [help text](../help-text).

<sp-tabs selected="self" auto label="Help text usage in radio groups">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-label for="self">
    What is your favorite ice cream flavor?
</sp-field-label>
<sp-radio-group
    id="self"
    onchange="
        this.invalid = this.selected === 'fourth';
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
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="managed">
    What is your favorite ice cream flavor?
</sp-field-label>
<sp-radio-group
    id="managed"
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
</sp-tabs>

### States

Standard radio buttons are the default style for radio buttons. They are optimal for application panels where all visual elements are monochrome in order to direct focus to the content.

**Emphasized** radio buttons are a secondary style for radio buttons. The blue color provides a visual prominence that is optimal for forms, settings, etc. where the radio buttons need to be noticed.

<sp-tabs selected="default" auto label="States">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-1" size="l">
            <h5 class="spectrum-Heading--subtitle1">Standard</h5>
        </sp-field-label>
        <sp-radio-group id="example-1" name="example" vertical>
            <sp-radio value="kittens">Kittens</sp-radio>
            <sp-radio value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-a" size="l">
            <h5 class="spectrum-Heading--subtitle1">Emphasized</h5>
        </sp-field-label>
        <sp-radio-group id="example-a" name="example" vertical>
            <sp-radio emphasized value="kittens">Kittens</sp-radio>
            <sp-radio emphasized value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>
</div>
```

</sp-tab-panel>
<sp-tab value="invalid">Invalid</sp-tab>
<sp-tab-panel value="invalid">

```html
<div style="display: flex; justify-content: space-around;">
    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-2" size="l">
            <h5 class="spectrum-Heading--subtitle1">Standard</h5>
        </sp-field-label>
        <sp-radio-group invalid id="example-2" name="example" vertical>
            <sp-radio invalid value="kittens">Kittens</sp-radio>
            <sp-radio invalid value="puppies" checked>Puppies</sp-radio>
            <sp-help-text slot="negative-help-text" icon>
                This selection is invalid.
            </sp-help-text>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-b" size="l">
            <h5 class="spectrum-Heading--subtitle1">Emphasized</h5>
        </sp-field-label>
        <sp-radio-group invalid id="example-b" name="example" vertical>
            <sp-radio emphasized invalid value="kittens">Kittens</sp-radio>
            <sp-radio emphasized invalid value="puppies" checked>
                Puppies
            </sp-radio>
            <sp-help-text slot="negative-help-text" icon>
                This selection is invalid.
            </sp-help-text>
        </sp-radio-group>
    </div>
</div>
```

</sp-tab-panel>
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

```html
<div style="display: flex; justify-content: space-around;">
    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-3" size="l">
            <h5 class="spectrum-Heading--subtitle1">Standard</h5>
        </sp-fieldlabel>
        <sp-radio-group id="example-3" name="example" vertical>
            <sp-radio disabled value="kittens">Kittens</sp-radio>
            <sp-radio disabled value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <sp-field-label for="example-c" size="l">
            <h5 class="spectrum-Heading--subtitle1">Emphasized</h5>
        </sp-fieldlabel>
        <sp-radio-group id="example-c" name="example" vertical>
            <sp-radio emphasized disabled value="kittens">Kittens</sp-radio>
            <sp-radio emphasized disabled value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>
</div>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Handling events

Event handlers for changes can be registered on an `<sp-radio-group>` element.

```html
<sp-radio-group
    label="Choose an option"
    name="onchange"
    onchange="spAlert(this, '<sp-radio-group> changes!')"
>
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second" checked>Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

### Accessibility

Tabbing into a group of radio buttons places the focus on the first radio button selected. If none of the radio buttons are selected, the focus is set on the first one in the group. Space selects the radio button in focus (if not already selected). Using the arrow keys moves focus and selection to the previous or next radio button in the group (last becomes first, and first becomes last). The new radio button in focus gets selected even if the previous one was not.

#### Provide a label

Radio groups and radio items should always have labels.

#### Provide help text in the correct location

Radio groups should use help text for error messaging and descriptions. Descriptions are valuable for giving context behind why a selection is required, or for clarifying the options.

It is [not currently possible](https://w3c.github.io/webcomponents-cg/#cross-root-aria) to provide accessible ARIA references between elements in different shadow roots. To ensure proper association between elements, help text must be included via the `slot="help-text"` or `slot="help-text-negative"`.

See [help text](../help-text) for more information.
