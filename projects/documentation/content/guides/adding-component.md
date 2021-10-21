---
layout: guide.njk
title: 'Developing a Component: Spectrum Web Components'
displayName: Developing a Component
slug: developing-component
---

# Developing a Component

This guide explains the techniques involved in the ongoing development a Spectrum control
as a <sp-link href="https://github.com/adobe/spectrum-web-components">spectrum-web-components</sp-link>.

The components in spectrum-web-components are based on the CSS definitions in
<sp-link href="https://github.com/adobe/spectrum-css">spectrum-css</sp-link>. Typically, component
implementations contain very little code. The CSS from the `spectrum-css`
project typically specifies most, if not all, of the presentation details.

## What is a web component?

According to <sp-link href="https://www.webcomponents.org/introduction">webcomponents.org</sp-link>,
web components are:

> ... a set of web platform APIs that allow you to create new custom, reusable,
> encapsulated HTML tags to use in web pages and web apps. Custom components and
> widgets build on the Web Component standards, will work across modern
> browsers, and can be used with any JavaScript library or framework that works
> with HTML.

In order to add a new component to this library, you will need to develop a
working knowledge of the following technologies:

-   <sp-link href="https://github.com/adobe/spectrum-css">Spectrum CSS</sp-link>: A CSS implementation of the Spectrum design language
-   <sp-link href="https://developers.google.com/web/fundamentals/web-components/customelements">Web Components</sp-link>: Standards based method for adding new HTML tags to a browser
-   <sp-link href="https://developers.google.com/web/fundamentals/web-components/shadowdom">Shadow DOM</sp-link>: The part of the Web Component spec that allows for encapsulation of component styles and child nodes
-   <sp-link href="https://lit-element.polymer-project.org/guide">lit-element</sp-link>: A simple base class for creating fast, lightweight web components
-   <sp-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS custom properties</sp-link>: CSS variables that can be used throughout a document
-   <sp-link href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html">Typescript</sp-link>: A typesafe variant of JavaScript

## Setting up the styling

The most complicated part of implementing a Spectrum web component is getting
the styles set up correctly. The <sp-link href="https://developers.google.com/web/fundamentals/web-components/shadowdom">shadow
DOM</sp-link> is
the heart of a web component. It isolates the component from the styles and DOM
of the containing page. While this offers many benefits, it also means that we
must structure our CSS very differently.

The CSS from the <sp-link href="https://github.com/adobe/spectrum-css">spectrum-css</sp-link> project
is intended to be installed globally on a web page. Using it in the context of a
web component requires that we modify it. To facilitate that, this project comes
with a <sp-link href="https://github.com/adobe/spectrum-web-components/blob/master/scripts/process-spectrum-postcss-plugin.js">config-driven processor</sp-link> that can transform the Spectrum CSS into a format
that can be consumed in a web component.

The first step is to create a directory and a `spectrum-config.js` file for your
new component. This config file contains information about the structure of
the web component in relation to the Spectrum CSS classes.

Below is a fragment of the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js">`spectrum-config.js` file for `sp-button`</sp-link>.

```javascript
module.exports = {
    spectrum: 'button',
    components: [
        {
            name: 'button',
            host: {
                selector: '.spectrum-Button',
                shadowSelector: '#button',
            },
            focus: '#button',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--quiet',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Button--cta',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        {
                            name: 'negative',
                            selector: '.spectrum-Button--warning',
                        },
                        '.spectrum-Button--overBackground',
                        '.spectrum-Button--secondary',
                    ],
                },
            ],
            ids: ['.spectrum-Button-label'],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/\.is-disabled/],
        },
    ],
};
```

If we wanted to create a button component using this config file, the steps would be as
follows:

1. Make the directory <sp-link href="https://github.com/adobe/spectrum-web-components/tree/master/src/button">`src/components/button`</sp-link>
2. In that new directory, create a <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-config.js">`spectrum-config.js`</sp-link>
   file with the above contents
3. Run the command `yarn process-spectrum` to create the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-button.css">CSS file</sp-link>

When you do the above, the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/scripts/process-spectrum-postcss-plugin.js">config-driven processor</sp-link>
will look in the <sp-link href="https://github.com/adobe/spectrum-css">`spectrum-css`</sp-link> project
for the <sp-link href="https://unpkg.com/@spectrum-css/button/dist/index-vars.css">matching CSS file</sp-link>.
It will parse that file and restructure the CSS as per the configuration
instructions.

## Structure of a Spectrum Web Component

If you look at an `sp-button` in the Chrome developer tools, you will see a DOM
structure that looks like this.

```bash
▼<sp-button tabindex="0" variant="cta">
    ▼ #shadow-root (open)
        ▼ <button id="button" tabindex="0">
            ▼ <div id="label>
                ▼ <slot>
                    ↳ #text
                </slot>
            </div>
        </button>
    "Click Me"
</sp-button>
```

If anything here looks unfamiliar, it is probably a good time to do some reading
about <sp-link href="https://developers.google.com/web/fundamentals/web-components/customelements">web components</sp-link>.

You can compare this markup with the <sp-link href="http://opensource.adobe.com/spectrum-css/2.13.0/docs/#button---cta">reference markup in the `spectrum-css` documentation</sp-link>

### Host Class Mapping

We need to determine what the main CSS class is for our component in the
original `spectrum-css`. In the case of `sp-button`, we can see that the
top-level class is `.Spectrum-Button`. We then need to determine where we want
that CSS to be applied. In many cases, you will want that CSS to be applied to
the actual web component via the `:host` selector. That is the default behaviour
of the conversion script. In this case, we wanted to preserve all of the default
behaviour of the `button` element in HTML. So, we want the main CSS to be
applied to our `<button>` instead. If you look at the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-config.js">`host` definition in
`spectrum-config.js`</sp-link>
you can see that we have supplied a `shadowSelector` option. That tells the
script to move all of the CSS for `.Spectrum-Button` to the `#button` element in
the shadow DOM.

```javascript
host: {
    selector: '.spectrum-Button',
    shadowSelector: '#button',
},
```

### Shadow DOM Structure

The next step is to fill out the remaining structure of the shadow DOM portion
of the component. Note that, in the shadow DOM, we are using ids instead of long
class names. We can do that because the namespace of each instance of our web
component has it's own DOM scope. So, there can never be an id name collision.

Typically, you will reference the <sp-link href="http://opensource.adobe.com/spectrum-css/2.13.0/docs/#checkbox">sample code from the
`spectrum-css`</sp-link>
documentation and <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/checkbox/src/Checkbox.ts">recreate that structure in the shadow DOM of your
component</sp-link>.

In the case of `sp-checkbox`, we turn this sample DOM code:

```html-no-demo
<label class="spectrum-Checkbox">
    <input type="checkbox" class="spectrum-Checkbox-input" id="checkbox-0">
    <span class="spectrum-Checkbox-box">
        <svg class="spectrum-Icon spectrum-UIIcon-CheckmarkSmall spectrum-Checkbox-checkmark" focusable="false" aria-hidden="true">
            <use xlink:href="#spectrum-css-icon-CheckmarkSmall" />
        </svg>
        <svg class="spectrum-Icon spectrum-UIIcon-DashSmall spectrum-Checkbox-partialCheckmark" focusable="false" aria-hidden="true">
            <use xlink:href="#spectrum-css-icon-DashSmall" />
        </svg>
    </span>
    <span class="spectrum-Checkbox-label">Checkbox</span>
</label>
```

into this code in our component's render method (actually implementation is
slightly different):

```javascript
return html`
    <label id="root">
        <input
            id="input"
            type="checkbox"
            ?checked=${this.checked}
            @change=${this.handleChange}
        <span id="box">
            <sp-icon
                id="checkmark"
                size="s"
                name="ui:CheckmarkSmall"
                aria-hidden="true"
            ></sp-icon>
            <sp-icon
                id="partialCheckmark"
                size="s"
                name="ui:DashSmall"
                aria-hidden="true"
            ></sp-icon>
        </span>
        <span id="label"><slot></slot></span>
    </label>
`;
```

You will notice that many of the `spectrum-css` classes are mapped to ids in the
web component. For example, `.spectrum-Checkbox-input` and
`.spectrum-Checkbox-box` become `#input` and `#box`. Those transformations are
described in the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/checkbox/src/spectrum-config.js">`ids` section of the `spectrum-config.js`
file</sp-link>.

```javascript
ids: [
    {
        selector: '.spectrum-Checkbox-input',
        name: 'input',
    },
    {
        selector: '.spectrum-Checkbox-box',
        name: 'box',
    },
    {
        selector: '.spectrum-Checkbox-checkmark',
        name: 'checkmark',
    },
    {
        selector: '.spectrum-Checkbox-partialCheckmark',
        name: 'partialCheckmark',
    },
    {
        selector: '.spectrum-Checkbox-label',
        name: 'label',
    },
],
```

### Properties and Attributes

Most of our controls have options that affect how they are rendered. For
example, Spectrum supports a number of different kinds of buttons (e.g primary,
secondary or call-to-action). `spectrum-css` supports these visual styles using
CSS classes. In web components, we typically support these options using
attributes/properties on the component. For example, here is a call-to-action
style button.

```html
<sp-button variant="cta">CTA</sp-button>
```

We could conditionally add CSS classes to the elements of the shadow DOM during
rendering, but it is much easier to just let the attributes on the DOM node
drive the styling directly. In order to facilitate that, the
<sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-config.js">`spectrum-config.js` file lets you specify how to map the various
`spectrum-css` classes to CSS that is based on the attributes on the `:host` of
the web
component</sp-link>.

```javascript
attributes: [
    {
        type: 'boolean',
        selector: '.spectrum-Button--quiet',
    },
    {
        type: 'boolean',
        selector: ':disabled',
    },
    {
        type: 'enum',
        name: 'variant',
        values: [
            '.spectrum-Button--cta',
            '.spectrum-Button--primary',
            '.spectrum-Button--secondary',
            {
                name: 'negative',
                selector: '.spectrum-Button--warning',
            },
            '.spectrum-Button--overBackground',
            '.spectrum-Button--secondary',
        ],
    },
],
```

We support two different kinds of attributes, booleans and enums. Booleans are
turned on or off by the presence or absence of the attribute. Enum attributes
must be set to one of the allowed values. The <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-button.css">CSS generated will reference the
attributes on the `host:` element
directly</sp-link>.

### Class to Class Mapping

In some cases, you will need to retain the `spectrum-css` classes as classes. An
example of that is when you need to apply CSS rules to multiple items in the
shadow DOM. In that case, we simply map class names to shorter classnames. There
is an <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/slider/src/spectrum-config.js">example of remapping classes in the slider
component</sp-link>.

```javascript
classes: [
    {
        selector: '.spectrum-Slider-track',
        name: 'track',
    },
],
```

### Slots

<sp-link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">Slot tags</sp-link> are
how we host our child content (light DOM) in our component's shadow DOM. The
`spectrum-css` for a component sometimes contains rules for laying out the child
content. There is a <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-config.js">`slots`
section</sp-link>
in the `spectrum-config.js` file for mapping those rules to the slotted content.

```javascript
slots: [
    {
        name: 'icon',
        selector: '.spectrum-Icon',
    },
],
```

The above section tells our CSS processor to map CSS for the `.spectrum-Icon`
class to the content that is being hosted in the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/spectrum-button.css">slot with the name
`icon`</sp-link>.

## Coding the Component

All of the `spectrum-web-components` are written using the
<sp-link href="https://lit-element.polymer-project.org/guide">lit-element</sp-link> framework and
<sp-link href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html">Typescript</sp-link>.
Your best bet is to look at <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/packages">similar
components</sp-link>
and match the style.

We have a working specification for the APIs for each of the Spectrum components.
If you file an issue for the component that you want to implement, we can provide
the necessary specifications for it.

### Documenting the component

The documentation for each component in the documentation site is adopted from the `README.md` in said package. The pages are
written in <sp-link href="https://www.markdownguide.org/cheat-sheet">Markdown</sp-link>. See one of
the <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/README.md">existing pages</sp-link> for an example.

To run the local documentation server, use the command:

```bash
yarn docs:start
```

The documentation automatically extracts the properties and attributes from the
source code. You should document your component using the <sp-link href="https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc">appropriate jsdoc
tags</sp-link>.
See
<sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/src/Button.ts">Button.ts</sp-link>
for an example.

### Working with Storybook

We use <sp-link href="https://storybook.js.org/">Storybook</sp-link> for developing our components.
This gives us a rapid way to test our components in various configurations. The
best way to start is to copy <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/stories/button.stories.ts">one of the existing
stories</sp-link>.

To run Storybook, use the command:

```bash
yarn storybook
```
