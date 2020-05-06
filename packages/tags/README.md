## Description

`sp-tags` and `sp-tag` elements allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tags?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tags)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tags?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tags)

```
npm install @spectrum-web-components/tags

# or

yarn add @spectrum-web-components/tags
```

## Example

<sp-icons-medium></sp-icons-medium>

```html-live
<sp-tags>
    <sp-tag>Tag 1</sp-tag>
    <sp-tag invalid>Tag 2</sp-tag>
    <sp-tag disabled>Tag 3</sp-tag>
</sp-tags>
```

```html-live
<sp-tags>
    <sp-tag>
        Tag 1
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag invalid>
        Tag 2
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag disabled>
        Tag 3
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
</sp-tags>
```

```html-live
<sp-tags>
    <sp-tag>
        Tag 1
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
    <sp-tag invalid>
        Tag 2
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
    <sp-tag disabled>
        Tag 3
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
</sp-tags>
```

### Deletable

Use the `deletable` attribute to signify `sp-tags` elements that can be removed.

```html-live
<sp-tags>
    <sp-tag deletable>Tag 1</sp-tag>
    <sp-tag invalid deletable>Tag 2</sp-tag>
    <sp-tag disabled deletable>Tag 3</sp-tag>
</sp-tags>
```

```html-live
<sp-tags>
    <sp-tag deletable>
        Tag 1
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag invalid deletable>
        Tag 2
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
    <sp-tag disabled deletable>
        Tag 3
        <sp-avatar
            slot="avatar"
            label="Tag 1"
            src=https://placedog.net/500/500
        ></sp-avatar>
    </sp-tag>
</sp-tags>
```

```html-live
<sp-tags>
    <sp-tag deletable>
        Tag 1
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
    <sp-tag invalid deletable>
        Tag 2
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
    <sp-tag disabled deletable>
        Tag 3
        <sp-icon slot="icon" size="xs" name="ui:Magnifier"></sp-icon>
    </sp-tag>
</sp-tags>
```
