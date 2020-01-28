## Description

**sp-checkbox** allow users to select multiple items from a list of independent
options, or to mark an individual option as selected.

Should I use a checkbox or a switch? Use a switch when activating something
instead of selecting.

### Installation

```
npm install @spectrum-web-components/checkbox

# or

yarn add @spectrum-web-components/checkbox
```

### Example

<sp-icons-medium></sp-icons-medium>

```html
<sp-checkbox>Web component</sp-checkbox>
```

### Standard checkboxes

Standard checkboxes are the default style for checkboxes. The blue color
provides a visual prominence that is optimal for forms, settings, lists or grids
of assets, etc. where the checkboxes need to be noticed.

```html
<sp-checkbox checked>Web component</sp-checkbox>
```

### Quiet checkboxes

Quiet checkboxes are a secondary style for checkboxes. The gray color provides a
less prominent style than the standard checkboxes. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<sp-checkbox quiet>Web component</sp-checkbox>
```

### States

In addition to the variant, sp-checkboxes have a number of attributes for
controlling their visual state. All checkbox variants support the `disabled`,
`indeterminate`, `invalid` attributes, which applies a disabled style to the
checkbox, and also prevents clicks from activating it.

```html
<div>checked:</div>
<sp-checkbox checked>Web component</sp-checkbox>

<div>indeterminate:</div>
<sp-checkbox indeterminate>Web component</sp-checkbox>

<div>invalid:</div>
<sp-checkbox invalid>Web component</sp-checkbox>

<div>disabled:</div>
<sp-checkbox disabled>Web component</sp-checkbox>
```

### Handling events

Event handlers for clicks and other user actions can be registered on an `sp-checkbox` just as a normal `<input type="checkbox">` element.

```html
<sp-checkbox id="checkbox-example" onclick="javascript:alert('Click')">
    Web component
</sp-checkbox>
```

## Accessibility

Checkboxes are accessible by default, rendered in HTML using the `<input type="checkbox">` element. When the checkbox is set as `indeterminate` or
`invalid`, the appropriate ARIA state attribute will automatically be applied.
