## Overview

**sp-radio** and **sp-radio-group** allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.

**sp-radio-group** holds a list of **sp-radio** elements, and is responsible for deselecting radio buttons when a new one is selected, which in turn makes it responsible for keeping track of which one is selected. **sp-radio** is responsible for handling user interactions and for visually reflecting if it is the one that is checked or not.

### Example

<sp-icons-medium></sp-icons-medium>

```html
<sp-checkbox>Web component</sp-checkbox>
```

## Variants

### Standard Radio

Standard radio buttons are the default style for radio buttons. The blue color provides a visual prominence that is optimal for forms, settings, etc. where the radio buttons need to be noticed.

<Checkbox label="React" defaultChecked />

```html
<sp-checkbox checked>Web component</sp-checkbox>
```

### Quiet Radio

Quiet checkboxes are a secondary style for checkboxes. The gray color provides a
less prominent style than the standard checkboxes. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<sp-checkbox quiet>Web component</sp-checkbox>
```

## States

In addition to the variant, sp-checkboxes have a number of attributes for
controlling their visual state. All checkbox variants support the `disabled`,
`indeterminate`, `invalid` attributes, which applies a disabled style to the
checkbox, and also prevents clicks from activating it.

### Checked

```html
<div>checked:</div>
<sp-checkbox checked>Web component</sp-checkbox>

### Invalid

<div>invalid:</div>
<sp-checkbox invalid>Web component</sp-checkbox>

### Disabled

<div>disabled:</div>
<sp-checkbox disabled>Web component</sp-checkbox>
```

### Handling Events

Event handlers for clicks and other user actions can be registered on an `sp-checkbox` just as a normal `<input type="checkbox">` element.

```html
<sp-checkbox id="checkbox-example" onclick="javascript:alert('Click')">
    Web component
</sp-checkbox>
```

## Accessibility

Checkboxes are accessible by default, rendered in HTML using the `<input type="checkbox">` element. When the checkbox is set as `indeterminate` or
`invalid`, the appropriate ARIA state attribute will automatically be applied.
