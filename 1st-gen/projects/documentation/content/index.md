---
layout: home.njk
title: Spectrum Web Components
---

<section class="hero">
    <h1 class="spectrum-Heading spectrum-Heading--sizeXXXL spectrum-Heading--serif">
        Spectrum Web Components
    </h1>
    <p class="spectrum-Body spectrum-Body--sizeXXL">
        The Spectrum Web Components project is an implementation of <sp-link href="https://spectrum.adobe.com/">Spectrum, Adobe’s design system</sp-link>. It's designed to work with any web framework — or even without one.
    </p>
    <div id="hero-buttons">
        <sp-button
            href="https://github.com/adobe/spectrum-web-components"
            variant="primary"
            size="xl"
        >
            View on GitHub
        </sp-button>
    </div>
</section>
<section id="features">
    <div class="feature">
        <h2 id="accessible" class="spectrum-Heading spectrum-Heading--sizeS">
            Accessible by default&nbsp;<sp-link class="header-anchor" href="index.html#accessible" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body spectrum-Body--sizeM">
            Developed with existing and emerging browser specifications in mind,
	        our components deliver a high quality experience whether using a screen
            reader, keyboard navigation, and/or customized contrast.
        </p>
    </div>
    <div class="feature">
        <h2 id="light-weight" class="spectrum-Heading spectrum-Heading--sizeS">
            Light weight&nbsp;<sp-link class="header-anchor" href="index.html#light-weight" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body spectrum-Body--sizeM">
            Spectrum Web Components are implemented using the
            <sp-link
                href="https://lit-element.polymer-project.org/"
            >LitElement</sp-link> base class. LitElement is designed for creating web
            components with a minimum amount of overhead.
        </p>
    </div>
    <div class="feature">
        <h2 id="standards-based" class="spectrum-Heading spectrum-Heading--sizeS">
            Standards based&nbsp;<sp-link class="header-anchor" href="index.html#standards-based" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body spectrum-Body--sizeM">
        <sp-link
            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
        >Web Components</sp-link> are a set of technologies that work together, letting
        you create custom elements that work just like the
        standard HTML elements built into your browser.
        </p>
    </div>
    <div class="feature">
        <h2 id="framework-agnostic" class="spectrum-Heading spectrum-Heading--sizeS">
            Framework agnostic&nbsp;<sp-link class="header-anchor" href="index.html#framework-agnostic" aria-label="§" data-js-focus-visible="" tabindex="0">#</sp-link>
        </h2>
        <p class="spectrum-Body spectrum-Body--sizeM">
            You can use web components with any framework, since
            they’re supported and encapsulated at the browser level.
        </p>
    </div>
</section>
<section class="example">

## Sample element usage

```html
<sp-button variant="accent" href="components/button">
    Use Spectrum Web Component buttons
</sp-button>
```

</section>
