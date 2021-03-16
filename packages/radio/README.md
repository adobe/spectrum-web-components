## Description

`<sp-radio>` and `<sp-radio-group>` allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.

`<sp-radio-group>` holds a list of `<sp-radio>` elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. `<sp-radio>` is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/radio?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/radio)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/radio?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/radio)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/vUinRWkhayMTAmr9AK9J/src/index.ts)

```
yarn add @spectrum-web-components/radio
```

Import the side effectful registration of `<sp-radio>` or `<sp-radio-group>` via:

```
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
```

When looking to leverage the `Radio` or `RadioGroup` base classes as a type and/or for extension purposes, do so via:

```
import {
    Radio,
    RadioGroup
} from '@spectrum-web-components/radio';
```

### Example

```html
<sp-radio-group selected="first" name="example">
    <sp-radio value="first">Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third">Option 3</sp-radio>
    <sp-radio value="fourth">Option 4</sp-radio>
</sp-radio-group>
```

### Standard radio buttons

Standard radio buttons are the default style for radio buttons. They are optimal for application panels where all visual elements are monochrome in order to direct focus to the content.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio value="kittens">Kittens</sp-radio>
            <sp-radio value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Invalid</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio invalid value="kittens">Kittens</sp-radio>
            <sp-radio invalid value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio disabled value="kittens">Kittens</sp-radio>
            <sp-radio disabled value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>
</div>
```

### Emphasized radio buttons

Emphasized radio buttons are a secondary style for radio buttons. The blue color provides a visual prominence that is optimal for forms, settings, etc. where the radio buttons need to be noticed.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio emphasized value="kittens">Kittens</sp-radio>
            <sp-radio emphasized value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Invalid</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio emphasized invalid value="kittens">Kittens</sp-radio>
            <sp-radio emphasized invalid value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-radio-group name="example" vertical>
            <sp-radio emphasized disabled value="kittens">Kittens</sp-radio>
            <sp-radio emphasized disabled value="puppies" checked>Puppies</sp-radio>
        </sp-radio-group>
    </div>
</div>
```

### Label Below

```html
<sp-radio label-below>A label</sp-radio>
```

### Wrapping behavior

```html
<sp-radio label-below>
    Radio with an extraordinarily long label please don't do this but if you did
    it should wrap text when it gets longer than the container which contains
    the radio which has an unacceptably long label
</sp-radio>
```

### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-radio>` similar to a standard `<input type="radio">` element.

```html
<sp-radio id="radio-example" onclick="spAlert(this, '<sp-radio> clicked!')">
    Web component
</sp-radio>
```

## Accessibility

Radio buttons are accessible by default, rendered in HTML using the `<input type="radio">` element. Tabbing into a group of radio buttons places the focus on the first radio button selected. If none of the radio buttons are selected, the focus is set on the first one in the group. Space selects the radio button in focus (if not already selected). Using the arrow keys moves focus and selection to the previous or next radio button in the group (last becomes first, and first becomes last). The new radio button in focus gets selected even if the previous one was not.
