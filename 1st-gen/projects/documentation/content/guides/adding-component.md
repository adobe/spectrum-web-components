---
layout: guide.njk
title: 'Developing a Component: Spectrum Web Components'
displayName: Developing a Component
slug: developing-component
---

# Developing a Component

This guide explains the techniques involved in the ongoing development a Spectrum control
as a <sp-link href="https://github.com/adobe/spectrum-web-components">spectrum-web-components</sp-link>.

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

- <sp-link href="https://developers.google.com/web/fundamentals/web-components/customelements">Web Components</sp-link>: Standards based method for adding new HTML tags to a browser
- <sp-link href="https://developers.google.com/web/fundamentals/web-components/shadowdom">Shadow DOM</sp-link>: The part of the Web Component spec that allows for encapsulation of component styles and child nodes
- <sp-link href="https://lit-element.polymer-project.org/guide">lit-element</sp-link>: A simple base class for creating fast, lightweight web components
- <sp-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS custom properties</sp-link>: CSS variables that can be used throughout a document
- <sp-link href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html">Typescript</sp-link>: A typesafe variant of JavaScript

## Setting up the styling

The most complicated part of implementing a Spectrum web component is getting
the styles set up correctly. The <sp-link href="https://developers.google.com/web/fundamentals/web-components/shadowdom">shadow
DOM</sp-link> is
the heart of a web component. It isolates the component from the styles and DOM
of the containing page. While this offers many benefits, it also means that we
must structure our CSS very differently.

For more information on how to structure your CSS, see the [Styling](/guides/styling-components) guide.

## Structure of a Spectrum Web Component

If you look at an `sp-button` in the Chrome developer tools, you will see a DOM
structure that looks like this.

```bash
▼<sp-button tabindex="0" variant="accent">
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

#### Documentation standards

Each component's `packages/_componentname_/README.md`. These files must meet our standards below:

- Heading structure must communicate the organization of the docs page. See W3C WAI's Tutorial on [Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/).
- Main headings (level 2 and 3) should be consistent from component to component. See W3C WAI's [Understanding SC 3.2: Predictable](https://www.w3.org/WAI/WCAG21/Understanding/predictable.html) and the [Documentation structure](#documentation-structure) section below.
- Consider using `<sp-tabs>` for related sections/examples, such as tabs for each of the sizes, states, types, or variants.
- Consider using an `<sp-table>` to make content like keyboard actions easiert to read.
- Use the `<kbd>` tag to semantically indicate keyboard input and make keyboard actions easier to read.
- Use the plain language to make the docs easier to understand.
- All examples code must be accessible.
- The example code must show the component with enough context to demonstrate how to use it with other elements in an accessible way. See how the examples in [`packages/help-text/README.md`](https://github.com/adobe/spectrum-web-components/blob/main/packages/help-text/README.md) show the component used with field elements.
- The "Accessibility" section contains tips on how to use the component accessibly. See the Accessibility section of [`packages/picker/README.md`](https://github.com/adobe/spectrum-web-components/blob/main/packages/menu/README.md).
- The "Accessibility" section contains notes on any accessibility considerations that affect the component's development. See the notes on cross-root ARIA in Accessibility section of [`packages/help-text/README.md`](https://github.com/adobe/spectrum-web-components/blob/main/packages/help-text/README.md).
- Check out the [Spectrum Design System documentation](https://spectrum.adobe.com/) to ensure our documentation is uses consistent langauge and component recommendations.

##### Cursor rules

If you're using [Cursor](https://cursor.sh/), the repository includes rules that help enforce these documentation standards automatically. When editing component README files, Cursor's AI assistant will follow the guidelines in `.cursor/rules/component-readme.mdc` to ensure consistent structure, accessible code examples, and proper heading hierarchy.

#### Documentation structure

Our component documentation should follow the structure below. See [`packages/menu/README.md`](https://github.com/adobe/spectrum-web-components/blob/main/packages/menu/README.md) and [`packages/help-text/README.md`](https://github.com/adobe/spectrum-web-components/blob/main/packages/help-text/README.md) for overview.

```md
## Overview

### Usage

<--
Information on how to import the component.
-->

### Anatomy

<--
Information and examples about the parts of the component
(eg., labels, icons, etc.)
of the component. -->

### Options

<--
Information and examples about options
(eg., sizes, variants, states, etc.)
of the component.
-->

### States

<--
Information and examples about states
(eg., disabled, loading, etc.)
of the component.
-->

### Behaviors

<--
Information and examples about
values, events, and methods
of the component.
-->

### Accessibility

<--
Tips and examples on how to use the component accessibly
with notes how accessibility considerations
for how the component was developed.
-->
```

### Working with Storybook

We use <sp-link href="https://storybook.js.org/">Storybook</sp-link> for developing our components.
This gives us a rapid way to test our components in various configurations. The
best way to start is to copy <sp-link href="https://github.com/adobe/spectrum-web-components/blob/main/packages/button/stories/button.stories.ts">one of the existing
stories</sp-link>.

To run Storybook, use the command:

```bash
yarn storybook
```
