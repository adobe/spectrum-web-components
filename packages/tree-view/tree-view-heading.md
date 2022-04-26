## Description

An `<sp-tree-view-heading>` elements allow you to break the content in an `<sp-tree-view>` into sections.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tree-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tree-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tree-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tree-view)

```
yarn add @spectrum-web-components/tree-view
```

Import the side effectful registration of `<sp-tree-view-heading>` via:

```
import '@spectrum-web-components/tree-view/sp-tree-view-heading.js';
```

When looking to leverage the `TreeViewHeading` base class as a type and/or for extension purposes, do so via:

```
import { TreeViewHeading } from '@spectrum-web-components/tree-view';
```

### Example

```html
<sp-tree-view>
    <sp-tree-view-heading>Section 1</sp-tree-view-heading>
    <sp-tree-view-item>
        Group 1
        <sp-tree-view slot="children">
            <sp-tree-view-item>Layer 2</sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
    <sp-tree-view-item>Layer 4</sp-tree-view-item>
    <sp-tree-view-item>Layer 5</sp-tree-view-item>
    <sp-tree-view-heading>Section 2</sp-tree-view-heading>
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
                                Unopened Child
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    </sp-tree-view-item>
</sp-tree-view>
```
