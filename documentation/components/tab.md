## Overview

The sp-tab-list component contains set of tab-item elements. This is typically used as the interface for controlling a set of layered sections of content that display one panel of content at a time

## Example

```html
<sp-tab-list selected="1">
    <sp-tab label="Tab 1" value="1" tabindex="1"></sp-tab>
    <sp-tab label="Tab 2" value="2" tabindex="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" tabindex="3"></sp-tab>
    <sp-tab label="Tab 4" value="4" tabindex="4"></sp-tab>
</sp-tab-list>
```

### Vertical

```html
<sp-tab-list selected="1" direction="vertical">
    <sp-tab label="Tab 1" value="1" tabindex="1"></sp-tab>
    <sp-tab label="Tab 2" value="2" tabindex="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" tabindex="3"></sp-tab>
    <sp-tab label="Tab 4" value="4" tabindex="4"></sp-tab>
</sp-tab-list>
```

## Variants

### Quiet

```html
<sp-tab-list selected="1" quiet>
    <sp-tab label="Tab 1" value="1" tabindex="1"></sp-tab>
    <sp-tab label="Tab 2" value="2" tabindex="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" tabindex="3"></sp-tab>
    <sp-tab label="Tab 4" value="4" tabindex="4"></sp-tab>
</sp-tab-list>
```

### Compact

```html
<sp-tab-list selected="1" compact>
    <sp-tab label="Tab 1" value="1" tabindex="1"></sp-tab>
    <sp-tab label="Tab 2" value="2" tabindex="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" tabindex="3"></sp-tab>
    <sp-tab label="Tab 4" value="4" tabindex="4"></sp-tab>
</sp-tab-list>
```

## With Icons

```html
<div>
    <sp-icons-medium></sp-icons-medium>
    <sp-tab-list selected="1" direction="${type}">
        <sp-tab label="Tab 1" value="1" tabindex="1">
            <sp-icon slot="icon" size="m" name="ui:CheckmarkSmall"></sp-icon>
        </sp-tab>
        <sp-tab label="Tab 2" value="2" tabindex="2">
            <sp-icon slot="icon" size="m" name="ui:CrossSmall"></sp-icon>
        </sp-tab>
        <sp-tab label="Tab 3" value="3" tabindex="3">
            <sp-icon slot="icon" size="m" name="ui:ChevronDownSmall"></sp-icon>
        </sp-tab>
        <sp-tab label="Tab 4" value="4" tabindex="4">
            <sp-icon slot="icon" size="m" name="ui:HelpSmall"></sp-icon>
        </sp-tab>
    </sp-tab-list>
</div>
```

## Keyboard Focus

By default, the first tab in tab-list automatically becomes selected when the tab-list receives focus.
