## Description

An `<sp-card>` represents a rectangular card that contains
a variety of text and image layouts. Cards are typically used
to encapsulate units of a data set, such as a gallery of
image/caption pairs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/card?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/card)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/card?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/card)

```
yarn add @spectrum-web-components/card
```

Import the side effectful registration of `<sp-card>` via:

```
import '@spectrum-web-components/card/sp-card.js';
```

When looking to leverage the `Card` base class as a type and/or for extension purposes, do so via:

```
import { Card } from '@spectrum-web-components/card';
```

## Example

```html demo
<sp-card title="Card Title" subtitle="JPG">
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
    <div slot="footer">Footer</div>
</sp-card>
```

## Title

By default, the title for an `sp-card` is applied via the `title` attribute, which is restricted to string content only. When HTML content is desired, a slot named `title` available for applying the title.

```html demo
<sp-card subtitle="JPG" style="--spectrum-card-body-header-height: auto;">
    <h1 slot="title">Card title</h1>
    <img alt="" slot="cover-photo" src="https://picsum.photos/200/300" />
    <div slot="footer">Footer</div>
</sp-card>
```

## Variants

There are multiple card variants to choose from in Spectrum. The `variant`
attribute controls the main variant of the card.

### Normal

Normal cards can contain a title, a subtitle, a cover photo, and a footer.

```html
<sp-card title="Card title">
    <img alt="" slot="cover-photo" src="https://picsum.photos/200/300" />
    <span slot="subtitle">JPG</span>
    <div slot="footer">Footer</div>
</sp-card>
```

### Actions

Cards can be supplied an `actions` via a names slot.

```html
<sp-card title="Card Title" subtitle="JPG">
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
    <div slot="footer">Footer</div>
    <sp-action-menu slot="actions" placement="bottom-end">
        <sp-menu>
            <sp-menu-item>
                Deselect
            </sp-menu-item>
            <sp-menu-item>
                Select Inverse
            </sp-menu-item>
            <sp-menu-item>
                Feather...
            </sp-menu-item>
            <sp-menu-item>
                Select and Mask...
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Save Selection
            </sp-menu-item>
            <sp-menu-item disabled>
                Make Work Path
            </sp-menu-item>
        </sp-menu>
    </sp-action-menu>
</sp-card>
```

### Empty

An empty card will still fill space in a design.

```html
<sp-card></sp-card>
```

### Quiet

Quiet cards can contain a title, a subtitle, a cover photo, a description, and a footer.

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" title="Card title" subtitle="JPG">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

When leveraging the `asset` attribute, a card can be declared as representing a `file`:

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" title="Card title" subtitle="JPG" asset="file">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="title">File Name</div>
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

Or a `folder`:

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" subtitle="JPG" asset="folder">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="title">Folder Name</div>
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

Quiet cards will also accept `actions` via a named slot.

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" title="Card title" subtitle="JPG">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="description">10/15/18</div>
        <sp-action-menu slot="actions" placement="bottom-end">
            <sp-menu>
                <sp-menu-item>
                    Deselect
                </sp-menu-item>
                <sp-menu-item>
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item>
                    Feather...
                </sp-menu-item>
                <sp-menu-item>
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled>
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-action-menu>
    </sp-card>
</div>
```

### Gallery

Gallery cards can contain a title, a subtitle, an image preview, a description, and a footer.

```html
<div style="width: 532px; height: 224px">
    <sp-card variant="gallery" title="Card title" subtitle="JPG">
        <img alt="" slot="preview" src="https://picsum.photos/532/192" />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

### Small

The `small` attriibute can be applied to a standard card:

```html demo
<div style="width: 208px; height: 264px">
    <sp-card small title="Card Title" subtitle="JPG">
        <img
            slot="cover-photo"
            alt="Demo Image"
            src="https://picsum.photos/110"
        />
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

A `horizontal` card:

```html demo
<div
    style="color: var(--spectrum-body-text-color, var(--spectrum-alias-text-color));"
>
    <sp-card small horizontal title="Card Title" subtitle="JPG">
        <sp-icon slot="preview" style="width: 36px; height: 36px;">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                aria-hidden="true"
                role="img"
                fill="currentColor"
            >
                <path d="M20 2v10h10L20 2z" />
                <path
                    d="M19 14a1 1 0 01-1-1V2H7a1 1 0 00-1 1v30a1 1 0 001 1h22a1 1 0 001-1V14zm7 15.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h15a.5.5 0 01.5.5zm0-4a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h15a.5.5 0 01.5.5zm0-4a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h15a.5.5 0 01.5.5z"
                />
            </svg>
        </sp-icon>
    </sp-card>
</div>
```

Or a `quiet` card:

```html demo
<div
    style="color: var(--spectrum-body-text-color, var(--spectrum-alias-text-color)); width: 110px;"
>
    <sp-card small title="Card Title" subtitle="JPG" variant="quiet">
        <img src="https://picsum.photos/110" alt="Demo Image" slot="preview" />
        <div slot="footer">Footer</div>
        <sp-action-menu slot="actions" placement="bottom-end">
            <sp-menu>
                <sp-menu-item>
                    Deselect
                </sp-menu-item>
                <sp-menu-item>
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item>
                    Feather...
                </sp-menu-item>
                <sp-menu-item>
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled>
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-action-menu>
    </sp-card>
</div>
```
