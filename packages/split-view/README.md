## Description

An `sp-split-view` element delivers its first two direct child elements in a horizontal or vertical (`<sp-split-view vertical>`) orientation that distributes the available page real estate as per the supplied attribute API. When leveraging the resizable attribute a pointer and keyboard accessible affordance is provided for the user to customize the distribution of that area between the available children.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/split-view?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/split-view)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/split-view?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/split-view)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/WzGXekJkbnJjUiBjwUEb/src/index.ts)

```
yarn add @spectrum-web-components/split-view
```

Import the side effectful registration of `<sp-split-view>` via:

```
import '@spectrum-web-components/split-view/sp-split-view.js';
```

When looking to leverage the `SplitView` base class as a type and/or for extension purposes, do so via:

```
import { SplitView } from '@spectrum-web-components/split-view';
```

## Variants

### Horizontal

```html
<sp-split-view>
    <div>Left panel</div>
    <div>Right panel</div>
</sp-split-view>
```

### Horizontal Resizable

```html
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

### Horizontal Resizable & Collapsible

```html
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

### Vertical

```html
<sp-split-view vertical>
    <div>Top panel</div>
    <div>Bottom panel</div>
</sp-split-view>
```

### Vertical Resizable

```html
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

### Vertical Resizable & Collapsible

```html
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

### Multiple Levels

```html
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

By default, the "separator" element within an `<sp-split-view>` is given the label "Resize the panels". A label is required to surface the interaction correctly to screen readers. You can customize or internationalize this with the `label` attribute.
