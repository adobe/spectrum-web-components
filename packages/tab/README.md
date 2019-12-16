## Overview

The `<sp-tab>` component is intended to be the child of an `<sp-tab-list>` element and accepts both a `label` attribute and a `[slot="icon"]` child to define its contents. Those contents can be further customized with the `vertical` attribute which stacks them in the UI rather than listing them in a row.

## Example

```html
<sp-tab-list selected="1">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
</sp-tab-list>
```

## Variants

### Icon

```html
<sp-icons-medium></sp-icons-medium>
<sp-tab label="Tab 1" value="1">
    <sp-icon slot="icon" size="m" name="ui:CheckmarkSmall"></sp-icon>
</sp-tab>
```

### Vertical w/ Icon

```html
<sp-tab label="Tab 1" value="1" vertical>
    <sp-icon slot="icon" size="m" name="ui:CheckmarkSmall"></sp-icon>
</sp-tab>
```

## Accessibility

By default, an `<sp-tab>` element has `[tabindex="-1"]` so that it can be focused programmatically. When an `<sp-tab>` element is `[selected]` or isthe first `<sp-tab>` in an `<sp-tab-list>` element with no `selected` value, it will be given `[tabindex="0"]`.
