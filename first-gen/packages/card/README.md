## Overview

An `<sp-card>` represents a rectangular card that contains
a variety of text and image layouts. Cards are typically used
to encapsulate units of a data set, such as a gallery of
image/caption pairs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/card?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/card)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/card?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/card)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-gk9u4xqr)

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

### Anatomy

Normal cards can contain a heading, a subheading, a cover photo, and a footer.

```html demo
<sp-card heading="Card Heading">
    <img alt="" slot="cover-photo" src="https://picsum.photos/250/300" />
    <span slot="subheading">JPG photo</span>
    <div slot="footer">Footer</div>
</sp-card>
```

#### Heading

By default, the heading for an `<sp-card>` is applied via the `heading` attribute, which is restricted to string content only. For HTML content, use the `heading` slot instead.

<sp-tabs selected="heading-attribute" auto label="Heading">
<sp-tab value="heading-attribute">attribute</sp-tab>
<sp-tab-panel value="heading-attribute">

```html demo
<sp-card
    heading="Card Heading"
    subheading="JPG Photo"
    style="--spectrum-card-body-header-height: auto;"
>
    <img alt="" slot="cover-photo" src="https://picsum.photos/250/300" />
    <div slot="footer">Footer</div>
</sp-card>
```

</sp-tab-panel>
<sp-tab value="heading-slot">slot</sp-tab>
<sp-tab-panel value="heading-slot">

```html demo
<sp-card
    subheading="JPG Photo"
    style="--spectrum-card-body-header-height: auto;"
>
    <h1 slot="heading">Card Heading</h1>
    <img alt="" slot="cover-photo" src="https://picsum.photos/250/300" />
    <div slot="footer">Footer</div>
</sp-card>
```

</sp-tab-panel>
</sp-tabs>

#### Linking

An `<sp-card>` can be provided with an `href` attribute in order for it to act as one large anchor element. When leveraging the `href` attribute, the `download`, `target` and `rel` attributes customize the card's linking behavior. Use them as follows:

```html demo
<sp-card
    heading="Card Title"
    subheading="JPG"
    href="https://opensource.adobe.com/spectrum-web-components"
    target="_blank"
>
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
</sp-card>
```

#### Cover Photo

Use `slot="cover-photo"` on an image to set it as the card's cover photo.

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

#### Preview Image

Use `slot="preview"` on an image to set it as the card's preview image.

```html demo
<sp-card heading="Card Title" subheading="JPG">
    <img slot="preview" src="https://picsum.photos/200/300" alt="Demo Image" />
    <div slot="footer">Footer</div>
</sp-card>
```

#### No Preview Image

Cards with no preview image can contain a heading, a subheading, and a footer.

```html demo
<sp-card heading="Card Title" subheading="No Preview Image">
    <div slot="footer">Footer</div>
</sp-card>
```

#### Actions

Cards can be supplied an `actions` via a names slot.

```html
<sp-card heading="Card Heading" subheading="JPG Photo">
    <img
        slot="cover-photo"
        src="https://picsum.photos/200/300"
        alt="Demo Image"
    />
    <div slot="footer">Footer</div>
    <sp-action-menu
        label="More Actions"
        slot="actions"
        placement="bottom-end"
        quiet
    >
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

### Options

#### Horizontal

Cards with a `horizontal` attribute can contain a heading, a subheading, a cover photo, and a description.

```html
<sp-card horizontal heading="Card Heading" subheading="JPG Photo">
    <img alt="" slot="cover-photo" src="https://picsum.photos/200/250" />
    <div slot="description">10/15/18</div>
</sp-card>
```

#### Variant

There are multiple card variants to choose from in Spectrum. The `variant`
attribute controls the main variant of the card.

Cards with `variant="quiet"` can contain a heading, a subheading, a cover photo, a description, and a footer. Quiet cards will also accept `actions` via a named slot.

<!--
TODO: Address example below when https://github.com/adobe/spectrum-web-components/issues/4945 is addressed.
-->

```html
<sp-card variant="quiet" heading="Card Heading" subheading="JPG Photo">
    <img alt="" slot="preview" src="https://picsum.photos/200/350" />
    <div slot="description">10/15/18</div>
    <sp-action-menu
        label="More Actions"
        slot="actions"
        placement="bottom-end"
        quiet
    >
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

Cards with `variant="gallery"` can contain a heading, a subheading, an image preview, a description, and a footer.

```html
<sp-card variant="gallery" heading="Card Heading" subheading="JPG Photo">
    <img alt="" slot="preview" src="https://picsum.photos/532/192" />
    <div slot="description">10/15/18</div>
    <div slot="footer">Footer</div>
</sp-card>
```

#### Asset

When leveraging the `asset` attribute, a card can be declared as representing a `file` or a `folder`:

```html
<sp-card heading="Card Heading" subheading="JPG Photo" asset="file">
    <div slot="heading">File Name</div>
    <div slot="description">10/15/18</div>
    <div slot="footer">Footer</div>
</sp-card>
<sp-card subheading="JPG Photo" asset="folder">
    <div slot="heading">Folder Name</div>
    <div slot="description">10/15/18</div>
    <div slot="footer">Footer</div>
</sp-card>
```

#### Toggles

When the `toggles` boolean attribute set to `true`, the card can be toggled between selected and unselected states.
A checkbox will be rendered on hover, focus within, and when the card is selected.

```html
<sp-card toggles variant="quiet" heading="Card Heading" subheading="JPG Photo">
    <img alt="" slot="preview" src="https://picsum.photos/200/350" />
    <div slot="description">10/15/18</div>
</sp-card>
```

### Accessibility

#### Be concise

Heading text should be no more than 5-7 words. If the card has an `href`, the heading is used as a link and should ideally be no more than 3 words. For buttons, 1-2 words.

#### Use descriptive heading, link, and button text

Be descriptive. Set expectations on what someone will find and where they will go once they interact with a card. Avoid using the same text on more than one interactive element, unless both elements go to the same place.

#### Make the first word in a heading meaningful

Consider making the first word of links, buttons and headings something an assistive technology user might search for when headings and links are listed alphabetically.
