## Description

An **sp-switch** is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.

### Installation

```
npm install @spectrum-web-components/switch

# or

yarn add @spectrum-web-components/switch
```

## Example

```html
<sp-switch label="Switch" onclick="javascript:alert('Click')">Switch</sp-switch>
```

## Variants

### Standard switches

Standard switches are the default style for switches. The blue color provides a
visual prominence that is optimal for forms, settings, etc. where the switches
need to be noticed.

```html
<sp-switch checked>Web component</sp-switch>
```

### Quiet switches

Quiet switches are a secondary style for switches. The gray color provides a
less prominent style than the standard switches. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<sp-switch checked quiet>Web component</sp-switch>
```

## State

### Checked (controlled)

```html
<sp-switch checked>Checked true</sp-switch>
```

### Disabled

```html
<sp-switch disabled>Disabled switch</sp-switch>
```

## Accessibility

Switch are accessible by default, rendered in HTML using the `<input type="checkbox">` element with the appropriate accessibility role, `switch`. When the Switch is `checked` or `invalid`, the appropriate ARIA state attribute will automatically be applied.
