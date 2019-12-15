## Overview

An **sp-theme** sets the rendering theme for all child components.
The Spectrum design system supports four color themes and two different
scales. `spectrum-web-components` currently supports two of the four
color themes (dark and light) one one of the scales (medium).

### Installation

```
npm install @spectrum-web-components/themes

# or

yarn add @spectrum-web-components/themes
```

## Light theme

```html demo
<style type="text/css">
    #example {
        width: 500px;
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
    </div>
</sp-theme>
```

## Dark theme

```html demo
<style type="text/css">
    #example {
        width: 500px;
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
    </div>
</sp-theme>
```

## Embedding themes

There are a few cases where it is necessary to embed one theme within another.
For example, if you have an application that is using a dark theme that is
previewing or editing content that will be displayed in a light theme.

If you only want to change colors, you can use the `sp-theme-dark` or
`sp-theme-light` class instead. They are a little lighter weight than
the full `sp-theme` class. You should still use `sp-theme` at the root
because it installs extra styles that do not change between colors.

```html
<style type="text/css">
    #outer {
        width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #inner {
        margin-top: 2em;
        padding: 2em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="dark">
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
        <sp-theme-light>
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
                <div id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="cta">Continue</sp-button>
                </div>
            </div>
        </sp-theme-light>
    </div>
</sp-theme>
```
