## Description

`sp-rule` bring clarity to a layout by grouping and dividing content in close proximity. They can also be used to establish rhythm and hierarchy.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/rule?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/rule)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/rule?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/rule)

```
npm install @spectrum-web-components/rule

# or

yarn add @spectrum-web-components/rule
```

## Examples

### Large

```html-live
<h2 class="spectrum-Heading--subtitle1">Large</h2>
<sp-rule size="large"></sp-rule>
<p class="spectrum-Body">Page or Section Titles.</p>
```

### Medium

```html-live
<h3 class="spectrum-Heading--subtitle2">Medium</h3>
<sp-rule size="medium"></sp-rule>
<p class="spectrum-Body">
    Divide subsections, or divide different groups of elements (between panels,
    rails, etc.)
</p>
```

### Small

```html-live
<h4 class="spectrum-Heading--subtitle3">Small</h4>
<sp-rule size="small"></sp-rule>
<p class="spectrum-Body">
    Divide like-elements (tables, tool groups, elements within a panel, etc.)
</p>
```

### Vertical, Small

When a vertical Rule is used inside of a flex container, use `align-self: stretch; height: auto;` on the Rule.

<sp-icons-medium></sp-icons-medium>

```html-live
<div style="height: 32px; display: flex;">
    <sp-action-button quiet>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-rule size="small" vertical></sp-rule>
    <sp-action-button quiet>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</div>
```

### Vertical, Medium

```html-live
<div style="height: 32px; display: flex;">
    <sp-action-button quiet>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-rule size="medium" vertical></sp-rule>
    <sp-action-button quiet>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</div>
```
