## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)

```
yarn add @spectrum-web-components/breadcrumbs
```

Import the side effectful registration of `<sp-breadcrumbs>` and `<sp-breadcrumb-item>`via:

```
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
```

When looking to leverage the `Breadcrumbs` or `BreadcrumbItem`base class as a type and/or for extension purposes, do so via:

```
import { Breadcrumbs } from '@spectrum-web-components/breadcrumbs';
```

## Example

```html
<sp-breadcrumbs >
       <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 1
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 2
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 3
        </sp-breadcrumb-item>
</sp-breadcrumbs>
```

As recommended by [Spectrum Design](https://spectrum.adobe.com/page/breadcrumbs/#Don%E2%80%99t-show-too-many-breadcrumbs-at-once), by default the maximum visible breadcrumbs is 4. If you want to override this, you can use the `max-visible` attribute.

## Variants

### Default
Setting no variant will render the default `<sp-breadcrumbs>` component. 

```html
<sp-breadcrumbs>
       <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 1
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 2
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 3
        </sp-breadcrumb-item>
</sp-breadcrumbs>
```


### Compact
When needing to optimize for functional space, the compact option is useful for reducing the height of the breadcrumbs while still maintaining the proper user context.
The compact variant will render an inline list of breadcrumb elements with a smaller font size. 

```html
<sp-breadcrumbs compact>
       <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 1
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 2
        </sp-breadcrumb-item>
         <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                    Breadcrumb 3
        </sp-breadcrumb-item>
</sp-breadcrumbs>
```

### Multiline
The multiline variation places emphasis on the selected breadcrumb item as a page title, helping a user to more clearly identify their current location. 

```html
        <sp-breadcrumbs multiline>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 1
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 2
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 3
                </sp-breadcrumb-item>
        </sp-breadcrumbs>
```

## Overflowing
When the space is limited or the maximum number of visible items is reached, the component will render the first breadcrumbs inside an action menu. If needed, the last breadcrumb item will be truncated and will render a tooltip with the full text.

```html
        <sp-breadcrumbs compact>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 1
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 2
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 3
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 4
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 5
                </sp-breadcrumb-item>
        </sp-breadcrumbs>
```

### Show Root 
The `show-root` attribute will always render the root breadcrumb item, even if the breadcrumbs are overflowing. 

```html
        <sp-breadcrumbs compact show-root>
        <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 1
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 2
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 3
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 4
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 5
                </sp-breadcrumb-item>
        </sp-breadcrumbs>
```

## Custom Action Menu
The component offers the possibility to replace the action menu's icon with a custom one using the `icon` slot. Moreover, for accesibility purposes you can provide an internationalized string for the menu label using the `menu-label` attribute.

```html
        <sp-breadcrumbs>
            <sp-icon-settings slot="icon" menu-label="More Items"></sp-icon-settings>

              <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 1
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 2
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 3
                </sp-breadcrumb-item>
        </sp-breadcrumbs>
```

## Disabled state
The `<sp-breadcrumbs>` component supports a disabled state that will prevent the user from tabbing through the list. This state informs the user that the navigation is not possible at the moment. 

```html
        <sp-breadcrumbs disabled multiline>
        <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 1
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 2
                </sp-breadcrumb-item>
                <sp-breadcrumb-item href="https://opensource.adobe.com/spectrum-web-components/components/breadcrumbs/">
                        Breadcrumb 3
                </sp-breadcrumb-item>
        </sp-breadcrumbs>
```