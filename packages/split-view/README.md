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

Use the `collapsible` attribute to allow the user to collapse the split view.

#### Label

Use the `label` attribute to set the `aria-lavel` on the `splitter` element.

#### Primary Max

`primary-max` is the maximum size of the primary pane.

#### Primary Min

`primary-min` is the minimum size of the primary pane.

#### Secondary Max

`secondary-max` is the maximum size of the secondary pane.

#### Secondary Min

`secondary-min` is the minimum size of the secondary pane.

#### Splitter Pos

`splitter-pos` is the current splitter position of the split view.

### Variants

#### Horizontal

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
<sp-split-view resizable label="Resize the horizontal collapsible panels">
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

## Accessibility

By default, the `splitter` element within an `<sp-split-view>` is given the label "Resize the panels". A label is required to surface the element and signal the interaction correctly to screen readers. You can customize or internationalize this by setting the `label` attribute.
