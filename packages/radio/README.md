## Overview

**sp-radio** and **sp-radio-group** allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.

**sp-radio-group** holds a list of **sp-radio** elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. **sp-radio** is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.

### Installation

```
npm install @spectrum-web-components/radio

# or

yarn add @spectrum-web-components/radio
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

## Variants

### Standard Radio

Standard radio buttons are the default style for radio buttons. The blue color provides a visual prominence that is optimal for forms, settings, etc. where the radio buttons need to be noticed.

```html
<sp-radio>Standard Radio Button</sp-radio>
```

### Quiet Radio

Quiet radio buttons are a secondary style for radio buttons. The gray color provides a
less prominent style than the standard radioes. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<sp-radio quiet>Quiet Radio Button</sp-radio>
```

## States

In addition to the variant, **sp-radio** buttons have a number of attributes for
controlling their visual state. All radio variants support the `disabled` and `invalid` attributes. Invalid which applies a disabled style to the
radio, and also prevents clicks from activating it.

### Checked

When the radio is selected. Can be deselected only by selecting another radio in the group or by manually setting checked property

```html
<sp-radio checked>Checked Radio Button</sp-radio>
```

### Invalid

Indicates some error state related to the radio button. Can still be checked.

```html
<sp-radio invalid>Invalid Radio Button</sp-radio>
```

### Disabled

When the radio button is no longer interactable. The button cannot be checked.

```html
<sp-radio disabled>Disabled Radio Button</sp-radio>
```

### Handling Events

Event handlers for clicks and other user actions can be registered on an `sp-radio` just as a normal `<input type="radio">` element.

```html
<sp-radio id="radio-example" onclick="javascript:alert('Click')">
    Web component
</sp-radio>
```

## Accessibility

Radio buttons are accessible by default, rendered in HTML using the `<input type="radio">` element. Tabbing into a group of radio buttons places the focus on the first radio button selected. If none of the radio buttons are selected, the focus is set on the first one in the group. Space selects the radio button in focus (if not already selected). Using the arrow keys moves focus and selection to the previous or next radio button in the group (last becomes first, and first becomes last). The new radio button in focus gets selected even if the previous one was not.
