## Description

`sp-theme` sets the rendering theme for all child components, and also sets a number of default sizes & colors for any child content. The Spectrum design system provides four color themes (`lightest`, `light`, `dark`, and `darkest`) and two different scales (`medium` and `large`) to support desktop & mobile UI.

When leveraging an `sp-theme` element, it will assume the role of managing the content direction applied to elements in its DOM scope from the `document`. By default, an `sp-theme` element will resolve its initial content direction from value of its `dir` attribute or to be e the same as its containing `sp-theme` parent or the `document`. Subsequent customization of content direction for that content will need to happen on the `sp-theme` element to be appropriately tracked by elements in that scope. This means that each part of your document scoped by an `sp-theme` element can specify individual content directions and that decedent `sp-theme` elements can override the content direction applied by ancestor elements.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@lliad-ui/theme?style=for-the-badge)](https://www.npmjs.com/package/@lliad-ui/theme)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@lliad-ui/theme?style=for-the-badge)](https://bundlephobia.com/result?p=@lliad-ui/theme)

```
yarn add @lliad-ui/theme
```

Import the side effectful registration of `<sp-theme>` via:

```
import '@lliad-ui/theme/sp-theme.js';
```

When looking to leverage the `Theme` base class as a type and/or for extension purposes, do so via:

```
import { Theme } from '@lliad-ui/theme';
```

The various themes can be imported en masse:

```
import '@lliad-ui/theme/src/themes.js';
```

Or, individually:

```
import '@lliad-ui/theme/theme-darkest.js';
import '@lliad-ui/theme/theme-dark.js';
import '@lliad-ui/theme/theme-light.js';
import '@lliad-ui/theme/theme-lightest.js';
import '@lliad-ui/theme/scale-medium.js';
import '@lliad-ui/theme/scale-large.js';
```

## Quick start

```
import '@lliad-ui/theme/sp-theme.js';
import '@lliad-ui/theme/src/themes.js';
```

The above import will get you started using the `<sp-theme>` wrapper element, and includes all four (4) color options (`lightest`, `light`, `dark`, and `darkest`) and both (2) scale options (`medium` and `large`). Having all of these options available together is the easiest way to get a handle on the theming possibilities offered by the package and empower you to prototype and test various deliveries of your application. However, reserving the download and parse time for all of the variants may not be required for all applications. See "Advanced usage" below for instructions on tuning the performance of an application that leverages this package.

## Advanced usage

Once you've moved beyond the prototype phases of an application, it is likely that you will only use one combinatin of `color` and `scale` in your application, and even when you don't you will likely benefit from lazily loading variants that you don't leverage by default. For single combination applications or to power a _default_ theme, the following imports can be used to ensure only the code your application requires is loaded:

```js
// Power a site using <sp-theme color="darkest" scale="large">
import '@lliad-ui/theme/theme-darkest.js';
import '@lliad-ui/theme/scale-large.js';

import '@lliad-ui/theme/sp-theme.js';
```

When subsequent theme variants are needed you can ensure those are lazily loaded by leveraging dynamic imports via something like the following:

```js
const themeElement = document.querySelector('sp-theme');

const updateTheme = async (color, scale) => {
    Promise.all([
        import(`@lliad-ui/theme/theme-${color}.js`),
        import(`@lliad-ui/theme/scale-${scale}.js`),
    ]).then(() => {
        themeElement.color = color;
        themeElement.scale = scale;
    });
};

updateTheme('light', 'medium');
```

When bundling your application, be sure to consult the documentation of your bundler for the correct way to ensure proper packaging of the sort of programattic dependancy graph that this will create.

### Language Context

The `<sp-theme>` element provides a language context for its descendents in the DOM. Descendents can resolve this context by dispatching a `sp-language-context` DOM event and supplying a `callback(lang: string) => void` method in the `detail` entry of the Custom Event. These callbacks will be reactively envoked when the `lang` attribute on the `<sp-theme>` element is updated. In this way you can control the resolved language in [`<sp-number-field>`](./components/number-field), [`<sp-slider>`](./components/slider), and more elements in one centralized place.

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
<sp-theme color="light">
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
            <sp-button variant="cta">Continue</sp-button>
        </sp-button-group>
    </div>
</sp-theme>
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
<sp-theme color="dark">
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
            <sp-button variant="cta">Continue</sp-button>
        </sp-button-group>
    </div>
</sp-theme>
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
            <sp-button variant="cta">Continue</sp-button>
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
            <sp-button variant="cta">Continue</sp-button>
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
                    <sp-button variant="cta">Continue</sp-button>
                </sp-button-group>
            </div>
        </sp-theme>
    </div>
</sp-theme>
```
