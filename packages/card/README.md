## Description

An `<sp-card>` represents a rectangular card that contains
a variety of text and image layouts. Cards are typically used
to encapsulate units of a data set, such as a gallery of
image/caption pairs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/card?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/card)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/card?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/card)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/gohijqRl7uBMp6qJZsp2/src/index.stories.js)

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
<sp-card heading="Card Heading" subheading="JPG Photo">
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
    <div slot="footer">Footer</div>
</sp-card>
```

```html demo
<sp-card heading="Card Title" subheading="JPG">
    <img slot="preview" src="https://picsum.photos/200/300" alt="Demo Image" />
    <div slot="footer">Footer</div>
</sp-card>
```

## Heading

By default, the heading for an `<sp-card>` is applied via the `heading` attribute, which is restricted to string content only. For HTML content, use the `heading` slot instead.

```html demo
<sp-card
    subheading="JPG Photo"
    style="--spectrum-card-body-header-height: auto;"
>
    <h1 slot="heading">Card Heading</h1>
    <img alt="" slot="cover-photo" src="https://picsum.photos/200/300" />
    <div slot="footer">Footer</div>
</sp-card>
```

## Linking

An `<sp-card>` can be provided with an `href` attribute in order for it to act as one large anchor element. When leveraging the `href` attribute, the `download`, `target` and `rel` attributes customize the card's linking behavior. Use them as follows:

<!-- prettier-ignore -->
```html
<sp-card
    heading="Card Title"
    subheading="JPG"
    href="https://opensource.adobe.com/spectrum-web-components"
    target="_blank"
>
    <img slot="cover-photo" src="https://picsum.photos/200/300" alt="Demo Image" />
</sp-card>
```

## Variants

There are multiple card variants to choose from in Spectrum. The `variant`
attribute controls the main variant of the card.

### Normal

Normal cards can contain a heading, a subheading, a cover photo, and a footer.

```html
<sp-card heading="Card Heading">
    <img alt="" slot="cover-photo" src="https://picsum.photos/200/300" />
    <span slot="subheading">JPG photo</span>
    <div slot="footer">Footer</div>
</sp-card>
```

### Actions

Cards can be supplied an `actions` via a names slot.

```html
<sp-card heading="Card Heading" subheading="JPG Photo">
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
    <div slot="footer">Footer</div>
    <sp-action-menu slot="actions" placement="bottom-end" quiet>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    </sp-action-menu>
</sp-card>
```

### No Preview Image

Cards with no preview image can contain a heading, a subheading, and a footer.

```html demo
<sp-card heading="Card Title" subheading="No Preview Image">
    <div slot="footer">Footer</div>
</sp-card>
```

### Quiet

Quiet cards can contain a heading, a subheading, a cover photo, a description, and a footer.

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" heading="Card Heading" subheading="JPG Photo">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

When leveraging the `asset` attribute, a card can be declared as representing a `file`:

```html
<div style="width: 208px; height: 264px">
    <sp-card
        variant="quiet"
        heading="Card Heading"
        subheading="JPG Photo"
        asset="file"
    >
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="heading">File Name</div>
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

Or a `folder`:

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" subheading="JPG Photo" asset="folder">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="heading">Folder Name</div>
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

Quiet cards will also accept `actions` via a named slot.

```html
<div style="width: 208px; height: 264px">
    <sp-card variant="quiet" heading="Card Heading" subheading="JPG Photo">
        <img alt="" slot="preview" src="https://picsum.photos/200/300" />
        <div slot="description">10/15/18</div>
        <sp-action-menu slot="actions" placement="bottom-end" quiet>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    </sp-card>
</div>
```

### Gallery

Gallery cards can contain a heading, a subheading, an image preview, a description, and a footer.

```html
<div style="width: 532px; max-width: 100%; height: 224px">
    <sp-card variant="gallery" heading="Card Heading" subheading="JPG Photo">
        <img alt="" slot="preview" src="https://picsum.photos/532/192" />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
</div>
```

### Size

`size="s"` will delivery the `<sp-card>` element at a "small" size. It can be leveraged with a standard card:

```html demo
<div style="width: 208px; height: 264px">
    <sp-card size="s" heading="Card Heading" subheading="JPG Photo">
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
<div style="color: var(--spectrum-neutral-content-color-default);">
    <sp-card size="s" horizontal heading="Card Heading" subheading="JPG Photo">
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
    style="color: var(--spectrum-neutral-content-color-default); width: 110px;"
>
    <sp-card
        size="s"
        heading="Card Heading"
        subheading="JPG Photo"
        variant="quiet"
    >
        <img src="https://picsum.photos/110" alt="Demo Image" slot="preview" />
        <div slot="footer">Footer</div>
        <sp-action-menu slot="actions" placement="bottom-end" quiet>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    </sp-card>
</div>
```
