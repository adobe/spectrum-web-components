## Description

An `<sp-tree-view>` provides users with a way to navigate nested hierarchical information.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tree-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tree-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tree-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tree-view)

```
yarn add @spectrum-web-components/tree-view
```

Import the side effectful registration of `<sp-tree-view>` via:

```
import '@spectrum-web-components/tree-view/sp-tree-view.js';
```

When looking to leverage the `TreeView` base class as a type and/or for extension purposes, do so via:

```
import { TreeView } from '@spectrum-web-components/tree-view';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-tree-view selects="single" style="width: 250px;" size="s">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-tree-view selects="single" style="width: 250px;" size="m">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-tree-view selects="single" style="width: 250px;" size="l">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-tree-view selects="single" style="width: 250px;" size="xl">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

</sp-tab-panel>
</sp-tabs>

## Standard

Standard `<sp-tree-view>` elements span the entire width of their parent container and are used within panels.

```html
<sp-tree-view>
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item open>
        Design Files
        <sp-tree-view slot="children">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
    <sp-tree-view-item>Layer 3</sp-tree-view-item>
    <sp-tree-view-item>Layer 4</sp-tree-view-item>
    <sp-tree-view-item open>
        Group 2
        <sp-tree-view slot="children">
            <sp-tree-view-item open>
                Group 3
                <sp-tree-view slot="children">
                    <sp-tree-view-item>
                        Group 4
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>
                                Layer 6
                                <sp-tree-view slot="children">
                                    <sp-tree-view-item>
                                        Group 5
                                        <sp-tree-view
                                            slot="children"
                                        ></sp-tree-view>
                                    </sp-tree-view-item>
                                </sp-tree-view>
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```

## Selection

An `<sp-tree-view>` element can manage a selection that features a `single` child item or `multiple` child items:

### Single

```html
<sp-tree-view selects="single" style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

### Multiple

```html
<sp-tree-view selects="multiple" style="width: 250px;">
    <sp-tree-view-item selected>Layer 1</sp-tree-view-item>
    <sp-tree-view-item>Layer 2</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 3</sp-tree-view-item>
</sp-tree-view>
```

## Standalone

Standalone `<sp-tree-view>` elements are meant to be used outside of a panel. `<sp-tree-view-item>` elements in a standalone `<sp-tree-view>` have rounded corners.

```html
<sp-tree-view standalone selects="single" style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

## Quiet

The `quiet` attribute can be applied to an `<sp-tree-view>` element to reduce the visual impact of the selection of Item in the Tree View.

```html
<sp-tree-view quiet selects="single" style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

### Standalone

```html
<sp-tree-view standalone quiet style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

### Thumbnail

```html
<sp-tree-view quiet>
    <sp-tree-view-item open>
        <sp-thumbnail slot="thumbnail">
            <img src="${thumbnail}" alt="Woman crouching" />
        </sp-thumbnail>
        Composition
        <sp-tree-view slot="children" quiet>
            <sp-tree-view-item>
                <sp-thumbnail slot="thumbnail">
                    <img src="${thumbnail}" alt="Woman crouching" />
                </sp-thumbnail>
                Flowers
            </sp-tree-view-item>
            <sp-tree-view-item selected>
                <sp-thumbnail slot="thumbnail">
                    <img src="${thumbnail}" alt="Woman crouching" />
                </sp-thumbnail>
                Figure
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```

### Flat

An `<sp-tree-view>` drawn without nesting, suitable for infinite scrolling.

```html
<sp-tree-view>
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item open can-open>Design Files</sp-tree-view-item>
    <sp-tree-view-item indent="1">Layer 1</sp-tree-view-item>
    <sp-tree-view-item indent="1">Layer 3</sp-tree-view-item>
    <sp-tree-view-item>Layer 3</sp-tree-view-item>
    <sp-tree-view-item>Layer 4</sp-tree-view-item>
    <sp-tree-view-item open can-open>Group 2</sp-tree-view-item>
    <sp-tree-view-item open indent="1" can-open>Group 3</sp-tree-view-item>
    <sp-tree-view-item indent="2" can-open>Group 4</sp-tree-view-item>
</sp-tree-view>
```
