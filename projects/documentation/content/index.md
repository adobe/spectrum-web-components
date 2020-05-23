---
layout: home.njk
title: Spectrum Web Components
---

<section id="hero">
    <div class="spectrum-Article">
        <h1 class="spectrum-Heading1--display">
            Spectrum Web Components
        </h1>
    </div>
    <p class="spectrum-Body3">
        The Spectrum Web Components project is an implementation of <sp-link href="https://spectrum.adobe.com/">Spectrum, Adobe’s design system</sp-link>. It's designed to work with any web framework — or even without one.
    </p>
    <div id="hero-buttons">
        <sp-button
            href="https://github.com/adobe/spectrum-web-components"
            variant="primary"
        >
            View on GitHub
        </sp-button>
    </div>
</section>
<section id="features">
    <div class="feature">
        <h2 id="standards-based" class="spectrum-Heading2">
            Standards based
            <sp-link class="header-anchor" href="index.html#standards-based" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body3">
        <sp-link
            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
        >Web Components</sp-link> are a set of technologies that work together, letting
        you create custom elements that work just like the
        standard HTML elements built into your browser.
        </p>
    </div>
    <div class="feature">
        <h2 id="light-weight" class="spectrum-Heading2">
            Light weight
            <sp-link class="header-anchor" href="index.html#light-weight" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body3">
            Spectrum Web Components are implemented using the
            <sp-link
                href="https://lit-element.polymer-project.org/"
            >LitElement</sp-link> base class. LitElement is designed for creating web
            components with a minimum amount of overhead.
        </p>
    </div>
    <div class="feature">
        <h2 id="framework-agnostic" class="spectrum-Heading2">
            Framework agnostic
            <sp-link class="header-anchor" href="index.html#framework-agnostic" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body3">
            You can use web components with any framework, since
            they’re supported and encapsulated at the browser level.
        </p>
    </div>
</section>
<section class="example">

## Sample element usage

```html
<sp-button variant="cta" href="/components/button.html">
    Use Spectrum Web Component buttons
</sp-button>
```

</section>
