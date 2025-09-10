## Overview

An `sp-split-view` element displays its first two direct child elements side by side (horizontal) or stacked (vertical with `vertical` attribute). The component automatically distributes the available space between the two panels. When the `resizable` attribute is added, users can drag the splitter or use keyboard controls to adjust the panel sizes.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/split-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/split-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/split-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/split-view)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-2ilo6nmh)

```zsh
yarn add @spectrum-web-components/split-view
```

Import the side effectful registration of `<sp-split-view>` via:

```js
import '@spectrum-web-components/split-view/sp-split-view.js';
```

When looking to leverage the `SplitView` base class as a type and/or for extension purposes, do so via:

```js
import { SplitView } from '@spectrum-web-components/split-view';
```

### Options

#### Collapsible

Use the `collapsible` attribute to allow the user to collapse the split view. The `collapsible` attribute requires the `resizable` attribute to be set. When `collapsible` is set, primary and secondary min and max sizes are ignored.

#### Resizable

Use the `resizable` attribute to allow the user to resize the split view. When `resizable` is set, it is recommended that you set preferred primary and secondary min and max sizes. If primary and/or secondary sizes, the `resize` behavior will resemble the `collapsible` behavior.

#### Label

Use the `label` attribute to set the `aria-label` on the `splitter` element.

#### Primary Size

`primary-size` sets starting size of the primary pane. It can be a real pixel number|string, percentage or "auto". For example: "100", "120px", "75%" or "auto" are valid values

#### Primary Min/Max

`primary-min` is the minimum size of the primary pane, while `primary-max` is the maximum size of the primary pane.

#### Secondary Min/Max

`secondary-min` is the minimum size of the secondary pane, while `secondary-max` is the maximum size of the secondary pane.

#### Splitter Position

`splitter-pos` is the current splitter position of the split view.

### Variants

#### Horizontal

Horizontal is the default orientation for the split view and does not require an attribute to be set.

<sp-tabs selected="basic" auto label="Horizontal Split View Variants">
<sp-tab value="basic">Basic</sp-tab>
<sp-tab-panel value="basic">

```html demo
<sp-split-view>
    <div>Left panel</div>
    <div>Right panel</div>
</sp-split-view>
```

</sp-tab-panel>
<sp-tab value="resizable">Resizable</sp-tab>
<sp-tab-panel value="resizable">

```html demo
<sp-split-view
    resizable
    primary-min="50"
    secondary-min="50"
    primary-size="100"
    label="Resize the horizontal panels"
>
    <div>
        <h1>Left panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div>
        <h2>Right panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

</sp-tab-panel>
<sp-tab value="collapsible">Resizable & collapsible</sp-tab>
<sp-tab-panel value="collapsible">

```html demo
<sp-split-view
    resizable
    collapsible
    label="Resize the horizontal collapsible panels"
>
    <div>
        <h1>Left panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div>
        <h2>Right panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

</sp-tab-panel>
</sp-tabs>

#### Vertical

Vertical split view requires the `vertical` attribute to be set.

<sp-tabs selected="basic" auto label="Vertical Split View Variants">
<sp-tab value="basic">Basic</sp-tab>
<sp-tab-panel value="basic">

```html demo
<sp-split-view vertical>
    <div>Top panel</div>
    <div>Bottom panel</div>
</sp-split-view>
```

</sp-tab-panel>
<sp-tab value="resizable">Resizable</sp-tab>
<sp-tab-panel value="resizable">

```html demo
<sp-split-view
    vertical
    resizable
    primary-min="50"
    primary-max="150"
    secondary-min="50"
    label="Resize the vertical panels"
>
    <div>
        <h1>Top panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div>
        <h2>Bottom panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

</sp-tab-panel>
<sp-tab value="collapsible">Resizable & collapsible</sp-tab>
<sp-tab-panel value="collapsible">

```html demo
<sp-split-view
    vertical
    resizable
    collapsible
    style="height: 300px;"
    label="Resize the vertical collapsible panels"
>
    <div>
        <h1>Top panel</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </p>
    </div>
    <div>
        <h2>Bottom panel</h2>
        <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
        </p>
    </div>
</sp-split-view>
```

</sp-tab-panel>
</sp-tabs>

#### Multiple Levels

```html demo
<sp-split-view
    resizable
    primary-min="50"
    primary-max="200"
    secondary-min="50"
    style="height: 400px; width: 600px;"
>
    <div>
        <h1>First panel - Level 1</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
        </p>
    </div>
    <div>
        <h2>Second panel - Level 1</h2>
        <sp-split-view
            vertical
            resizable
            primary-min="50"
            primary-size="100"
            secondary-min="50"
            style="height: 300px;"
        >
            <div>
                <h3>First panel - Level 2</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
            </div>
            <div>
                <h4>Second panel - Level 2</h4>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                </p>
            </div>
        </sp-split-view>
    </div>
</sp-split-view>
```

### Accessibility

The `label` attribute is used to set the `aria-label` on the `splitter` element. By default, the `splitter` element within an `<sp-split-view>` is given the label "Resize the panels". A label is required to surface the element and signal the interaction correctly to screen readers. You can customize or internationalize this by setting the `label` attribute.

#### role

The splitter element is given the role `separator` to indicate that it is a divider separating sections of content in the split view panels.

#### aria-controls

The `aria-controls` attribute is set to the id of the controlled element. This is used to indicate that the splitter is controlling the size of the primary and secondary panes.

#### aria-orientation

`aria-orientation` is set to `horizontal` or `vertical` to indicate the orientation of the split view.

#### aria-valuenow

`aria-valuenow` is used to indicate the current size of the primary pane as a percentage of the total size of the split view.

#### Keyboard navigation

The splitter has an explicit `tabindex` of `0` when `resizable` is set. This allows the splitter to be focused and and navigable using the keyboard. The arrow keys can be used to move the splitter left and right or up and down depending on the orientation of the split view.
