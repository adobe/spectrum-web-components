---
layout: layout.njk
title: 'Sidenav: Spectrum Web Components'
---
## Description

Side navigation allows users to locate information and features within the UI.
It can be used for either hierarchical or flat navigation, and gives the ability
to group navigable items categorically. Side navigation is an opportunity to
prioritize content or features based on your users’ needs in a way that
maintains clear, persistent visibility. Use side navigation within the context
of larger elements and mechanisms within the app frame.

### Installation

```
npm install @spectrum-web-components/sidenav

# or

yarn add @spectrum-web-components/sidenav
```

## Example

```html
<sp-sidenav defaultValue="Docs">
    <sp-sidenav-item
        value="Docs"
        label="Docs"
        href="/components/SideNav"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Guides"
        label="Guides"
        href="/guides/getting_started"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Community"
        label="Community"
        href="/community"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Storybook"
        label="Storybook"
        href="/storybook"
        target="_blank"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Releases"
        label="Releases"
        href="http://git.corp.adobe.com/React/react-spectrum/releases"
        target="_blank"
        disabled
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="GitHub"
        label="GitHub"
        href="http://git.corp.adobe.com/React/react-spectrum"
        target="_blank"
    ></sp-sidenav-item>
</sp-sidenav>
```

## Multi-level

Use this variation when you have multiple layers of hierarchical navigation. The
headers are styled differently and possess the same interactive behavior as a
treeview; clicking the header opens and collapses the children navigation items.
In the instances where a top-level navigation item has no children, clicking
will send the user to the location of the item.

```html
<sp-sidenav variant="multilevel" defaultValue="Layout">
    <sp-sidenav-item value="Guidelines" label="Guidelines"></sp-sidenav-item>
    <sp-sidenav-item value="Styles" label="Styles">
        <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid">
            <sp-sidenav-item value="Layout" label="Layout"></sp-sidenav-item>
            <sp-sidenav-item value="Responsive" label="Responsive"></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-item value="Typography" label="Typography"></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Elements" label="Elements"></sp-sidenav-item>
    <sp-sidenav-item value="Patterns" label="Patterns"></sp-sidenav-item>
</sp-sidenav-itm>
```

## Accessibility

When the `manage-tab-index` attribute is set on an `sp-sidenav` element then it will presents its child `sp-sidenav-item` children with a single tab-stop. This will leave items beyond the selected item, or first when there is no focusable selected item, will be accessibile via the up and down arrow keys.

