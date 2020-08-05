## Description

`sp-action-group` delivers a set of action buttons in horizontal or vertical orientation while ensuring the appropriate spacing between those buttons. The `compact` attribute merges these buttons so that they are visually joined to clarify their relationship to each other and their distance from other buttons/groups.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-group)

```
npm install @spectrum-web-components/action-group

# or

yarn add @spectrum-web-components/action-group
```

## Horizontal

<sp-icons-medium></sp-icons-medium>

```html
<sp-action-group>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</sp-action-group>
```

## Vertical

```html
<div style="display: flex; justify-content: space-around;">
    <sp-action-group vertical>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Button 1
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Longer Button 2
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Short 3
        </sp-action-button>
    </sp-action-group>
    <sp-action-group vertical compact>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Button 1
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Longer Button 2
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
            Short 3
        </sp-action-button>
    </sp-action-group>
    <sp-action-group vertical>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
    </sp-action-group>
    <sp-action-group compact vertical>
        <sp-action-button label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
    </sp-action-group>
</div>
```

## Justified

```html
<sp-action-group justified>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group justified compact>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group justified>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact justified>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</sp-action-group>
```
