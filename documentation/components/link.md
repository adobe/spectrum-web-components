## Overview

An **sp-link** is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.

## Example

```html
This is an
<sp-link ref>example link</sp-link>
.
```

## Variants

### Standard Switches

Standard switches are the default style for switches. The blue color provides a
visual prominence that is optimal for forms, settings, etc. where the switches
need to be noticed.

```html
This is a
<sp-link href="#">standard link</sp-link>
.
```

### Quiet Links

Quiet switches are a secondary style for switches. The gray color provides a
less prominent style than the standard switches. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
This is a
<sp-link quiet href="#">quiet link</sp-link>
.
```

### Links Over Backgrounds

Quiet switches are a secondary style for switches. The gray color provides a
less prominent style than the standard switches. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<div
    style="background-color: rgb(255, 160, 175); padding: 15px 20px; display: inline-block;"
>
    <p style="color: rgb(240, 240, 240);">
        This
        <sp-link over-background href="#">link</sp-link>
        is over a background.
    </p>
</div>
```
