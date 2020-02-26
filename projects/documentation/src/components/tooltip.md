---
layout: layout.njk
title: 'Tooltip: Spectrum Web Components'
---
## Description

`sp-tooltip` allow users to get contextual help or information about specific components when hovering or focusing on them.

### Installation

```
npm install @spectrum-web-components/tooltip

# or

yarn add @spectrum-web-components/tooltip
```

### Example

Tooltips can be top, bottom, left, or right.

```html
<sp-tooltip open placement="top">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="bottom">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="left">Label</sp-tooltip>
<br />
<br />
<sp-tooltip open placement="right">Label</sp-tooltip>
```

### Variants

#### Informative

This is the informative or info variant of Tooltip
<sp-icons-medium></sp-icons-medium>

```html
<sp-tooltip open placement="top" variant="info">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    <sp-icon size="s" name="ui:InfoSmall" slot="icon"></sp-icon>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="info">
    <sp-icon size="s" name="ui:InfoSmall" slot="icon"></sp-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

#### Positive

This is the postive (a.k.a.) success variant of Tooltip

```html
<sp-tooltip open placement="top" variant="positive">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    <sp-icon size="s" name="ui:CheckmarkSmall" slot="icon"></sp-icon>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="positive">
    <sp-icon size="s" name="ui:CheckmarkSmall" slot="icon"></sp-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

#### Negative

This is the negative a.k.a. error variant of Tooltip

```html
<sp-tooltip open placement="top" variant="negative">Label</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    <sp-icon size="s" name="ui:AlertSmall" slot="icon"></sp-icon>
    Label
</sp-tooltip>
<sp-tooltip open placement="top" variant="negative">
    <sp-icon size="s" name="ui:AlertSmall" slot="icon"></sp-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
</sp-tooltip>
```

