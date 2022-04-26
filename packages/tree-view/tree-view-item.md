## Description

Populate an `<sp-tree-view>` element with `<sp-tree-view-item>` elements to visualize both hierarchical and list content.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tree-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tree-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tree-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tree-view)

```
yarn add @spectrum-web-components/tree-view
```

Import the side effectful registration of `<sp-tree-view-item>` via:

```
import '@spectrum-web-components/tree-view/sp-tree-view-item.js';
```

When looking to leverage the `TreeViewItem` base class as a type and/or for extension purposes, do so via:

```
import { TreeViewItem } from '@spectrum-web-components/tree-view';
```

## Example

```html
<sp-tree-view selects="single" style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

## Disabled

The `disabled` attribute can be provided to an `<sp-tree-view-item>` to clarify that the icon in question will not accept interactions.

```html
<sp-tree-view style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item disabled>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

### Drop Target

An `<sp-tree-view-item>` can be displayed as a drop target with the application of the `drop-target` attribute.

```html
<sp-tree-view style="width: 250px;">
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item drop-target>Layer 2</sp-tree-view-item>
</sp-tree-view>
```

## Selected

The `selected` attribute can be provided to an `<sp-tree-view-item>` element to identify it as the selected item or one of the selected items in an `<sp-tree-view>`.

```html
<sp-tree-view selects="single" style="width: 250px;">
    <sp-tree-view-heading>selects="single"</sp-tree-view-heading>
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
</sp-tree-view>

<sp-divider style="margin: 2em 0"></sp-divider>

<sp-tree-view selects="multiple" style="width: 250px;">
    <sp-tree-view-heading>selects="multiple"</sp-tree-view-heading>
    <sp-tree-view-item selected>Layer 1</sp-tree-view-item>
    <sp-tree-view-item>Layer 2</sp-tree-view-item>
    <sp-tree-view-item selected>Layer 3</sp-tree-view-item>
</sp-tree-view>
```

## Icons

An icon element can be provided to an `<sp-tree-view-item>` element by addressing that element to the `icon` slot.

```html
<sp-tree-view>
    <sp-tree-view-item>
        <sp-icon-layers slot="icon"></sp-icon-layers>
        Layer 1
    </sp-tree-view-item>
</sp-tree-view>
```

With the `<sp-icon-layers>` and `<sp-icon-folder>` icons you can leverage this slot in order to outline that the content in you `<sp-tree-view>` element represents files and folders:

```html
<sp-tree-view>
    <sp-tree-view-item open>
        <sp-icon-folder slot="icon"></sp-icon-folder>
        Design Files
        <sp-tree-view slot="children">
            <sp-tree-view-item>
                <sp-icon-folder slot="icon"></sp-icon-folder>
                Production Ready
                <sp-tree-view slot="children">
                    <sp-tree-view-item>
                        <sp-icon-folder slot="icon"></sp-icon-folder>
                        Unopened Child
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
            <sp-tree-view-item open>
                <sp-icon-folder slot="icon"></sp-icon-folder>
                Work in Progress
                <sp-tree-view slot="children">
                    <sp-tree-view-item open>
                        <sp-icon-folder slot="icon"></sp-icon-folder>
                        Branding
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>
                                <sp-icon-folder slot="icon"></sp-icon-folder>
                                Assets
                                <sp-tree-view slot="children">
                                    <sp-tree-view-item>
                                        <sp-icon-folder
                                            slot="icon"
                                        ></sp-icon-folder>
                                        Unopened Child
                                    </sp-tree-view-item>
                                </sp-tree-view>
                            </sp-tree-view-item>
                            <sp-tree-view-item open>
                                <sp-icon-folder slot="icon"></sp-icon-folder>
                                Explorations
                                <sp-tree-view slot="children">
                                    <sp-tree-view-item>
                                        <sp-icon-document
                                            slot="icon"
                                        ></sp-icon-document>
                                        CocaCola_01.ai
                                    </sp-tree-view-item>
                                    <sp-tree-view-item>
                                        <sp-icon-document
                                            slot="icon"
                                        ></sp-icon-document>
                                        CocaCola_02.ai
                                    </sp-tree-view-item>
                                </sp-tree-view>
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
            <sp-tree-view-item>
                <sp-icon-folder slot="icon"></sp-icon-folder>
                Archive
                <sp-tree-view slot="children">
                    <sp-tree-view-item>
                        <sp-icon-folder slot="icon"></sp-icon-folder>
                        Unopened Child
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
    <sp-tree-view-item>
        <sp-icon-folder slot="icon"></sp-icon-folder>
        References
        <sp-tree-view slot="children">
            <sp-tree-view-item>
                <sp-icon-folder slot="icon"></sp-icon-folder>
                Unopened Child
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```

## Thumbnails

An `<sp-thumbnail>` element can be provided to an `<sp-tree-view-item>` element by addressing that element to the `thumbnail` slot.

```html
<sp-tree-view>
    <sp-tree-view-item open>
        <sp-thumbnail slot="thumbnail">
            <img src="https://place.dog/100/100" alt="Demo Image" />
        </sp-thumbnail>
        Composition
        <sp-tree-view slot="children">
            <sp-tree-view-item>
                <sp-thumbnail slot="thumbnail">
                    <img src="https://place.dog/100/100" alt="Demo Image" />
                </sp-thumbnail>
                Flowers
            </sp-tree-view-item>
            <sp-tree-view-item>
                <sp-thumbnail slot="thumbnail">
                    <img src="https://place.dog/100/100" alt="Demo Image" />
                </sp-thumbnail>
                Figure
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```

## Hierarchy

When representing hierarchical data, an `<sp-tree-view-item>` can accept `<sp-tree-view>` elements containing groups of child items. Sibling items leveraging the `indent` attribute can also be provided. This can be particularly useful when applying advanced delivery techniques like infinite scrolling.

### Nesting

When nesting content, supply the children in an `<sp-tree-view>` element addressed the the `children` slot, as follows:

```html
<sp-tree-view>
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item open>
        Layer 2
        <sp-tree-view slot="children">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```

### Flat

When leveraging a flat list of `<sp-tree-view-item>` elements, items with children should be provided the `can-open` attribute so that the correct UI can be afforded to those elements.

```html
<sp-tree-view>
    <sp-tree-view-item>Layer 1</sp-tree-view-item>
    <sp-tree-view-item open can-open>Layer 2</sp-tree-view-item>
    <sp-tree-view-item indent="1">Layer 1</sp-tree-view-item>
    <sp-tree-view-item indent="1">Layer 3</sp-tree-view-item>
</sp-tree-view>
```
