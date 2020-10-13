# Getting started

For the fastest possible start, check out the `@spectrum-web-components/bundle` package which includes all of the elements defined by Spectrum Web Components in one easy to import entry point. Copy and paste the following HTML sample, and you can be off and running.

```
<script
    src="https://jspm.dev/@spectrum-web-components/bundle/elements.js"
    type="module"
></script>

<sp-theme scale="large" color="dark">
    <!-- Insert content requiring theme application here. -->
    <sp-button
        onclick="alert('I was clicked');"
    >Click me!</sp-button>
    <!-- End content requiring theme application. -->
</sp-theme>
```

The code above renders to the browser as follows (be patient while the JS is loaded from the JSPM CDN...):

<style>iframe { width: 100%; border: none; background: var(--spectrum-global-color-gray-75); border-radius: 6px; }</style>

<iframe src="data:text/html;base64,PHNjcmlwdCBzcmM9Imh0dHBzOi8vanNwbS5kZXYvQHNwZWN0cnVtLXdlYi1jb21wb25lbnRzL2J1bmRsZS9lbGVtZW50cy5qcyIgdHlwZT0ibW9kdWxlIj48L3NjcmlwdD4NCg0KPHNwLXRoZW1lIHNjYWxlPSJsYXJnZSIgY29sb3I9ImRhcmsiPg0KICAgPHNwLWJ1dHRvbiBvbmNsaWNrPSJhbGVydCgnSSB3YXMgY2xpY2tlZCcpOyI+Q2xpY2sgbWUhPC9zcC1idXR0b24+DQo8L3NwLXRoZW1lPg=="></iframe>

## What you're getting...

The `@spectrum-web-components/bundle` package is _litterally_ everything that Spectrum Web Components has to offer. This is why bundled it <sp-link href="https://bundlephobia.com/result?p=@spectrum-web-components/bundle">weighs in as (quite) large</sp-link> as it does and is why we DO NOT suggest leveraging this technique in a production application. However, it is the shortest path to getting right into developing with Spectrum Web Components, so dive right. Good luck, have fun!

## What it's doing

Visually, all Spectrum Web Components are an expression of the design tokens that are specified by Spectrum, Adobe's design system. On the web, these tokens are applied as CSS Custom Properties. Not only do they ensure that a component pattern is delivered as specified in a single color/scale/content direction combination, but they ensure this is so in all color/scale/content direction combinations. When you're ready to look into more advanced usage of the components and themes in your application, there are vanilla CSS implementations of these tokens available in the `@spectrum-web-components/styles` package. However, to get started immediately, the `<sp-theme>` element delivers these tokens to a scoped HTML context and is what is applied in the code above. You'll notice the usage of `scale="large"` and `color="dark"` to outline the scale and color applied to this theme context respectively. To make a theme context with `scale="medium"` and `color="lighest"` you can use the following code sample:

```html
<sp-theme
    scale="medium"
    color="lightest"
    style="background: var(--spectrum-global-color-gray-75); padding: var(--spectrum-global-dimension-size-400);"
>
    <!-- Insert content requiring theme application here. -->
    <sp-button onclick="alert('I was clicked');">Click me!</sp-button>
    <!-- End content requiring theme application. -->
</sp-theme>
```

<sp-link href="components/theme">Read about the full range of style customization provided by `@spectrum-web-components/theme`.</sp-link>

## What you can do

From this baseline, visit the documentation for each individual component package and find one, some, or all of those that are right for your project. Start building today and use rapid, component-based prototyping to bring your designs to life faster than ever.

When you start to find something your happy with, visit our <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-rollup" target="_blank">Rollup</sp-link> and/or <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-webpack" target="_blank">Webpack</sp-link> example projects for recommendations on how to start preparing your project for production. Leverage the "Usage" listings on each of the individual components to support the patterns you'll find therein. And then, when you're ready... ship, ship, ship. We look forward to seeing what you bring to life!
