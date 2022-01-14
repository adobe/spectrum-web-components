---
layout: root.njk
title: 'Getting started: Spectrum Web Components'
displayName: Getting started
slug: getting-started
---

# Getting started

For the fastest possible start, check out the `@spectrum-web-components/bundle` package, which includes all of the elements defined by Spectrum Web Components in one easy-to-import entry point.

## What you're getting

The `@spectrum-web-components/bundle` package is literally _everything_ that Spectrum Web Components has to offer. This is why when bundled, <sp-link target="_blank" href="https://bundlephobia.com/result?p=@spectrum-web-components/bundle">it weighs as large as it does</sp-link>, and is why we DO NOT suggest leveraging this technique in a production application. That being said, it is the shortest path to getting right into developing with Spectrum Web Components, so dive right in. Copy and paste the following HTML sample, and you’ll be up and running. Good luck, and have fun!

```html
<!-- remove comments for purposes beyond this documentation site
<script
    src="https://jspm.dev/@spectrum-web-components/bundle/elements.js"
    type="module"
></script>
-->

<sp-theme scale="large" color="dark">
    <!-- Insert content requiring theme application here. -->
    <sp-button onclick="alert('I was clicked');">Click me!</sp-button>
    <!-- End content requiring theme application. -->
</sp-theme>
```

The code above (with the comments around`<script>` tag removed) renders to the browser as follows (be patient while the JS for the `<iframe>` is loaded from the JSPM CDN...):

<style>iframe { width: 100%; border: none; background: var(--spectrum-global-color-gray-75); border-radius: 6px; }</style>

<iframe src="data:text/html;base64,PHNjcmlwdCBzcmM9Imh0dHBzOi8vanNwbS5kZXYvQHNwZWN0cnVtLXdlYi1jb21wb25lbnRzL2J1bmRsZS9lbGVtZW50cy5qcyIgdHlwZT0ibW9kdWxlIj48L3NjcmlwdD4NCg0KPHNwLXRoZW1lIHNjYWxlPSJsYXJnZSIgY29sb3I9ImRhcmsiPg0KICAgPHNwLWJ1dHRvbiBvbmNsaWNrPSJhbGVydCgnSSB3YXMgY2xpY2tlZCcpOyI+Q2xpY2sgbWUhPC9zcC1idXR0b24+DQo8L3NwLXRoZW1lPg=="></iframe>

## What it's doing

Visually, all Spectrum Web Components are an expression of the design tokens that are specified by Spectrum, Adobe's design system. On the web, these tokens are applied as CSS Custom Properties. Not only do these properties ensure that each element is delivered according to your application’s specifications, but for all color/scale/content direction specifications across Spectrum.
When you're ready to look into more advanced usage of the components and themes in your application, there are vanilla CSS implementations of these tokens available in the `@spectrum-web-components/styles` package. However, to get started immediately, the `<sp-theme>` element delivers these tokens to a scoped HTML context and is what is used in the code above. You'll notice the usage of `scale="large"` and `color="dark"` to outline the scale and color applied to this theme context, respectively. To make a theme context with `scale="medium"` and `color="lightest"`, you can use the following code sample:

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

<sp-link href="components/theme">Read about the full range of style customization provided by `@spectrum-web-components/theme`.</sp-link>

### What you can do

Now that you have a starting point, visit the documentation for each package and find some components that are right for your project. You can take a look at our examples on <sp-link href="https://webcomponents.dev/workspace/adobe?collection=spectrum-web-components">webcomponents.dev</sp-link> to get an idea of how these components behave in a development environment, or browse through our <sp-link href="https://opensource.adobe.com/spectrum-web-components/storybook/" target="_blank">storybook</sp-link>. Once you start developing, you’ll find that rapid, component-based prototyping brings your designs to life faster than ever.

When you're ready to deploy your app to production, take a look at our <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-rollup" target="_blank">Rollup</sp-link> and/or <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-webpack" target="_blank">Webpack</sp-link> example projects for recommendations on how to optimize your project for that environment. Leverage the listings under the “Usage” section on each component’s documentation page to support the patterns you'll find therein. And then, when you're ready... ship, ship, ship! We look forward to seeing what you bring to life.
