## Overview

**sp-icon** will allow you to render icons that have been supplied to the page via icon sets.

## Example

<sp-icons-medium></sp-icons-medium>

```html
<sp-icon name="ui:Magnifier"></sp-icon>
```

## Variants

Icons are available in various sizes in Spectrum ranging from `xxs` to `xxl`, `m` being the default. We can specify the size via `size` attribute.

### Size variants

<sp-icon size="xxs" name="ui:Magnifier"></sp-icon>
<sp-icon size="xs" name="ui:Magnifier"></sp-icon>
<sp-icon size="s" name="ui:Magnifier"></sp-icon>
<sp-icon size="m" name="ui:Magnifier"></sp-icon>
<sp-icon size="l" name="ui:Magnifier"></sp-icon>
<sp-icon size="xl" name="ui:Magnifier"></sp-icon>
<sp-icon size="xxl" name="ui:Magnifier"></sp-icon>

```
<sp-icon size="xxs" name="ui:Magnifier"></sp-icon>
<sp-icon size="xs" name="ui:Magnifier"></sp-icon>
<sp-icon size="s" name="ui:Magnifier"></sp-icon>
<sp-icon size="m" name="ui:Magnifier"></sp-icon>
<sp-icon size="l" name="ui:Magnifier"></sp-icon>
<sp-icon size="xl" name="ui:Magnifier"></sp-icon>
<sp-icon size="xxl" name="ui:Magnifier"></sp-icon>
```

## Color Icon

Icons apply their color as `currentColor` so change the `color` property of the element for customization.

<sp-icon name="ui:Magnifier" style="color: red;"></sp-icon>

```
<sp-icon name="ui:Magnifier" style="color: red;"></sp-icon>
```

## Accessibility

`aria-hidden` is set to true by default for Icons. The `label` attribute suppresses this and adds the label text as the aria-label of the icon.

<sp-icon name="ui:Magnifier" label="Magnify"></sp-icon>

```
<sp-icon name="ui:Magnifier" label="Magnify"></sp-icon>
```
