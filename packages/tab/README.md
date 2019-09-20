## Overview

The `<sp-tab>` component is intended to be the child of an `<sp-tab-list>` element and accepts both a `label` attribute and a `[slot="icon"]` child to define its contents. Those contents can be further customized with the `vertical` attribute which stacks them in the UI rather than listing them in a row.

## Example

```html
<sp-tab-list selected="1">
    <sp-tab label="Tab 1" value="1" tabindex="1"></sp-tab>
    <sp-tab label="Tab 2" value="2" tabindex="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" tabindex="3"></sp-tab>
    <sp-tab label="Tab 4" value="4" tabindex="4"></sp-tab>
</sp-tab-list>
```

## Variants

### Icon

```html
<sp-icons-medium></sp-icons-medium>
<sp-tab label="Tab 1" value="1" tabindex="1">
    <sp-icon slot="icon" size="m" name="ui:CheckmarkSmall"></sp-icon>
</sp-tab>
```

### Vertical w/ Icon

```html
<sp-tab label="Tab 1" value="1" tabindex="1" vertical>
    <sp-icon slot="icon" size="m" name="ui:CheckmarkSmall"></sp-icon>
</sp-tab>
```
