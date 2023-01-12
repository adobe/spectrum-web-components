## Description

`sp-theme` applies a Spectrum theme by using CSS custom properties to set default sizes & colors for all of the components in its scope. The Spectrum design system provides four color themes (`lightest`, `light`, `dark`, and `darkest`) and two different scales (`medium` and `large`) to support desktop & mobile UI.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/theme?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/theme)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/theme?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/theme)

```
yarn add @spectrum-web-components/theme
```

#### Quick start

```
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
```

The above import will get you started using the `<sp-theme>` wrapper element, and includes all four (4) color options (`lightest`, `light`, `dark`, and `darkest`) and both (2) scale options (`medium` and `large`) for the Spectrum Classic theme. Having all of these options available together is the easiest way to get a handle on the theming possibilities offered by the package and empower you to prototype and test various deliveries of your application. However, reserving the download and parse time for all of the variants may not be required for all applications. See the "Advanced usage" section below for instructions on tuning the performance of an application that leverages this package. 

Below are more ways to import the different scale and color options you may use in combination with the side effectful registration import statement `import '@spectrum-web-components/theme/sp-theme.js'`. 

The various Classic themes can be imported en masse, as in the example above:

```
import '@spectrum-web-components/theme/src/themes.js';
```

The various Spectrum Express themes can also be imported en masse:

```
import '@spectrum-web-components/theme/src/express/themes.js';
```

Or you can import the themes and scales individually:

```
import '@spectrum-web-components/theme/theme-darkest.js';
import '@spectrum-web-components/theme/theme-dark.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/theme-lightest.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/scale-large.js';
import '@spectrum-web-components/theme/express/theme-darkest.js';
import '@spectrum-web-components/theme/express/theme-dark.js';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/theme-lightest.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/express/scale-large.js';
```

When looking to leverage the `Theme` base class as a type and/or for extension purposes, do so via:

```
import { Theme } from '@spectrum-web-components/theme';
```

## What it's doing

Visually, all Spectrum Web Components are an expression of the design tokens specified by Spectrum, Adobe's design system. On the web, these tokens are applied as CSS Custom Properties. Using `sp-theme` as a parent element for your components ensures that those elements' styles are not only consistent with the color and scale you've specified in your particular instance, but for _all_ the other color, scale, and content direction specifications across Spectrum.

Additionally, the `sp-theme` element manages the content direction applied to the elements in its DOM scope. By default, an `sp-theme` element resolves its initial content direction from the value of its `dir` attribute; otherwise, it matches the specification of the containing `sp-theme` parent or `document`. Subsequent customization of content direction for its children must occur on the `sp-theme` element itself, [REVIEW ME bc idk if this is accurate] either through an inline `style` attribute or in a CSS declaration [END REVIEW ME], to be appropriately tracked by elements in that scope. This means that each part of your document scoped by an `sp-theme` element can specify its own content direction, and that descendent `sp-theme` elements can override the content direction applied by its ancestor elements.

In the example below, notice the usage of `scale="medium"` and `color="lightest"` to outline the scale and color applied to this theme context. You can use the following code sample to get started and see how `sp-theme` works:

<div style="--demo-example-padding-bottom: 0">

```html
<sp-theme
    scale="medium"
    color="lightest"
    style="
        background: var(--spectrum-global-color-gray-75);
        padding: var(--spectrum-global-dimension-size-400);
        display: block;
        margin:
            calc(-1 * var(--spectrum-global-dimension-size-400))
            calc(-1 * var(--spectrum-global-dimension-size-500))
            0;
    "
>
    <!-- Insert content requiring theme application here. -->
    <sp-button onclick="alert('I was clicked');">Click me!</sp-button>
    <!-- End content requiring theme application. -->
</sp-theme>
```

</div>

When you're ready to look into more advanced usage of the components and themes in your application, there are vanilla CSS implementations of these tokens available in the `@spectrum-web-components/styles` package.

## Example

An `<sp-theme>` element expects a value for each of its `color` and `scale` attributes to be provided on the element. While not required, you can also use the `theme` attribute to specify whether the theme you're using is Spectrum Classic (the default) or Spectrum Express. 

```html
<sp-theme
    theme="spectrum"
    color="light"
    scale="medium"
    style="background-color: var(--spectrum-global-color-gray-100)"
>
    <sp-button onclick="spAlert(this, 'Themed <sp-button> clicked!')">
        Click me!
    </sp-button>
</sp-theme>
```

## Advanced usage

Once you've moved beyond the prototype phase of an application, it is likely that you will only use one combination of `color` and `scale` in your application, and even if not, you'll likely benefit from lazily loading the variants you don't leverage by default. For single combination applications, or to power a _default_ theme, the following imports can be used to ensure only the code your application requires is loaded:

### Classic

```js
/**
 * Power a site using
 *
 * <sp-theme
 *      theme="classic"
 *      color="darkest"
 *      scale="large"
 * >
 **/
import '@spectrum-web-components/theme/theme-darkest.js';
import '@spectrum-web-components/theme/scale-large.js';

import '@spectrum-web-components/theme/sp-theme.js';
```

### Express

```js
/**
 * Power a site using
 *
 * <sp-theme
 *      theme="express"
 *      color="light"
 *      scale="medium"
 * >
 **/
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';

import '@spectrum-web-components/theme/sp-theme.js';
```

When subsequent theme variants are needed, you can ensure those are lazily loaded by leveraging dynamic imports via something like:

```js
const themeElement = document.querySelector('sp-theme');

const updateTheme = async (color, scale) => {
    Promise.all([
        import(`@spectrum-web-components/theme/theme-${color}.js`),
        import(`@spectrum-web-components/theme/scale-${scale}.js`),
    ]).then(() => {
        themeElement.color = color;
        themeElement.scale = scale;
    });
};

updateTheme('light', 'medium');
```

When bundling your application, be sure to consult the documentation of your bundler for the correct way to ensure proper packaging of the programatic dependency graph that this will create.

## Light theme

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme theme="express" color="light" scale="medium">
    <hzn-app-stuff></hzn-app-stuff>
</sp-theme>

<express-app>
    <hzn-app-stuff></hzn-app-stuff>
</express-app>
```

## Dark theme

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme theme="express" color="dark" scale="large">
    <hzn-app-stuff></hzn-app-stuff>
</sp-theme>

<express-app>
    <hzn-app-stuff></hzn-app-stuff>
</express-app>
```

## Large scale

The large scale of `<sp-theme>` will switch to using Spectrum's larger mobile [Platform Scale](https://spectrum.adobe.com/page/platform-scale/)

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="darkest" scale="large">
    <div id="example">
        <div>
            <sp-slider
                value="5"
                step="1"
                min="1"
                max="11"
                label="Volume"
                id="volume-slider"
            ></sp-slider>
        </div>
        <div><sp-switch>Overdrive</sp-switch></div>
        <sp-button-group id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="accent">Continue</sp-button>
        </sp-button-group>
    </div>
</sp-theme>
```

## Embedding themes

There are a few cases where it is necessary to embed one theme within another.
For example, if you have an application that is using a dark theme with a left to right text direction that is
previewing or editing content that will be displayed in a light theme with a right to left text direction.

```html
<style type="text/css">
    #outer {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #inner {
        margin-top: 2em;
        padding: 1em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="dark" dir="ltr">
    <div id="outer">
        <div>
            <sp-slider
                value="5"
                step="1"
                min="1"
                max="11"
                label="Volume"
                id="volume-slider"
            ></sp-slider>
        </div>
        <div><sp-switch>Overdrive</sp-switch></div>
        <sp-button-group id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="accent">Continue</sp-button>
        </sp-button-group>
        <sp-theme color="light" dir="rtl">
            <div id="inner">
                <div>
                    <sp-slider
                        value="5"
                        step="1"
                        min="1"
                        max="11"
                        label="Volume"
                        id="volume-slider"
                    ></sp-slider>
                </div>
                <div><sp-switch>Overdrive</sp-switch></div>
                <sp-button-group id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="accent">Continue</sp-button>
                </sp-button-group>
            </div>
        </sp-theme>
    </div>
</sp-theme>
```

## Language Context

The `<sp-theme>` element provides a language context for its descendents in the DOM. Descendents can resolve this context by dispatching an `sp-language-context` DOM event and supplying a `callback(lang: string) => void` method in the `detail` entry of the Custom Event. These callbacks will be reactively envoked when the `lang` attribute on the `<sp-theme>` element is updated. This way, you can control the resolved language in [`<sp-number-field>`](../components/number-field), [`<sp-slider>`](./components/slider), and other elements in one centralized place.