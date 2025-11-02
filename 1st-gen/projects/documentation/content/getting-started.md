---
layout: root.njk
title: 'Getting started: Spectrum Web Components'
displayName: Getting started
slug: getting-started
---

# Getting started

There are a couple ways to get started working with Spectrum Web Components:

If you're creating your own project, we recommend using `@open-wc`'s <sp-link target="_blank" href="https://open-wc.org/guides/developing-components/getting-started/">project generator</sp-link>, which will get you started in an environment similar to this repository. `@open-wc` also uses Lit for building components and `@web/test-runner` for their testing framework, making it easier for us to troubleshoot and reproduce any issues you run into, as well as reducing the amount of changes to make to your code if you decide to contribute your work to our library. For specific information on how to configure your `@open-wc` project, click [here](/guides/configuring-openwc).

If you know which components you want to use, you can import those packages directly. We recommend grabbing `@spectrum-web-components/theme` in addition to your chosen components, as `sp-theme` is necessary for styling those components with Spectrum CSS. <sp-link href="../tools/theme">You can click here to learn about the full range of style customization provided by `@spectrum-web-components/theme`.</sp-link>

There is also the `@spectrum-web-components/bundle` package, which includes all of the elements defined by Spectrum Web Components in one easy-to-import entry point. The `@spectrum-web-components/bundle` package is literally _everything_ that Spectrum Web Components has to offer. This is why when bundled, <sp-link target="_blank" href="https://bundlephobia.com/result?p=@spectrum-web-components/bundle">it weighs as large as it does</sp-link>, and is why we DO NOT suggest leveraging this technique in a production application.

Whether you chose to start with the bundle or a selection of components (you'll need `sp-button` and `sp-theme` for the snipped below), copy and paste the following HTML sample, and you’ll be up and running. Have fun!

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

<style>iframe { width: 100%; border: none; background: var(--spectrum-gray-75); border-radius: 6px; }</style>

<iframe src="data:text/html;base64,PHNjcmlwdCBzcmM9Imh0dHBzOi8vanNwbS5kZXYvQHNwZWN0cnVtLXdlYi1jb21wb25lbnRzL2J1bmRsZS9lbGVtZW50cy5qcyIgdHlwZT0ibW9kdWxlIj48L3NjcmlwdD4NCg0KPHNwLXRoZW1lIHNjYWxlPSJsYXJnZSIgY29sb3I9ImRhcmsiPg0KICAgPHNwLWJ1dHRvbiBvbmNsaWNrPSJhbGVydCgnSSB3YXMgY2xpY2tlZCcpOyI+Q2xpY2sgbWUhPC9zcC1idXR0b24+DQo8L3NwLXRoZW1lPg=="></iframe>

### What you can do

Now that you have a starting point, visit the documentation for each package, if you haven't already, and find some components that are right for your project. You can take a look at our overview on <sp-link href="https://webcomponents.dev/workspace/adobe?collection=spectrum-web-components">webcomponents.dev</sp-link> to get an idea of how these components behave in a development environment, or browse through our <sp-link href="https://opensource.adobe.com/spectrum-web-components/storybook/" target="_blank">storybook</sp-link>. Once you start developing, you’ll find that rapid, component-based prototyping brings your designs to life faster than ever.

When you're ready to deploy your app to production, take a look at our <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-rollup" target="_blank">Rollup</sp-link> and/or <sp-link href="https://github.com/adobe/spectrum-web-components/tree/main/projects/example-project-webpack" target="_blank">Webpack</sp-link> example projects for recommendations on how to optimize your project for that environment. Leverage the listings under the “Usage” section on each component’s documentation page to support the patterns you'll find therein. And then, when you're ready... ship, ship, ship! We look forward to seeing what you bring to life.
