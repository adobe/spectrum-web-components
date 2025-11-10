## Overview

The `MatchMediaController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that binds a CSS media query to a reactive element, automatically updating when the query matches or stops matching. It leverages the [match media API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to query the state of CSS media queries from JavaScript while providing an event-based API to listen for changes.

### Features

- **Reactive media query monitoring**: Automatically updates the host element when media query state changes
- **Event-driven**: Listens for changes and triggers host updates
- **Multiple instances**: Support multiple controllers on a single host for complex responsive layouts
- **Performance optimized**: Uses native browser APIs for efficient media query observation

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `MatchMediaController` via:

```typescript
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
```

### Examples

#### Basic usage

A `Host` element that renders different content based on window orientation:

```typescript
import { html, LitElement } from 'lit';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

class ResponsiveElement extends LitElement {
    orientationLandscape = new MatchMediaController(
        this,
        '(orientation: landscape)'
    );

    render() {
        if (this.orientationLandscape.matches) {
            return html`
                <p>The orientation is landscape.</p>
            `;
        }
        return html`
            <p>The orientation is portrait.</p>
        `;
    }
}

customElements.define('responsive-element', ResponsiveElement);
```

#### Multiple media queries

Use multiple `MatchMediaController` instances to create complex responsive layouts:

```typescript
import { html, LitElement, css } from 'lit';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

class ResponsiveLayout extends LitElement {
    isMobile = new MatchMediaController(this, '(max-width: 768px)');
    isTablet = new MatchMediaController(
        this,
        '(min-width: 769px) and (max-width: 1024px)'
    );
    isDesktop = new MatchMediaController(this, '(min-width: 1025px)');

    static styles = css`
        :host {
            display: block;
            padding: var(--spacing, 16px);
        }

        .mobile {
            font-size: 14px;
        }
        .tablet {
            font-size: 16px;
        }
        .desktop {
            font-size: 18px;
        }
    `;

    render() {
        const deviceClass = this.isMobile.matches
            ? 'mobile'
            : this.isTablet.matches
              ? 'tablet'
              : 'desktop';

        return html`
            <div
                class=${deviceClass}
                role="region"
                aria-label="Responsive content"
            >
                <h1>Current viewport: ${deviceClass}</h1>
                <p>Content adapts to your screen size.</p>
            </div>
        `;
    }
}

customElements.define('responsive-layout', ResponsiveLayout);
```

#### Dark mode detection

Detect and respond to user's color scheme preference:

```typescript
import { html, LitElement, css } from 'lit';
import {
    MatchMediaController,
    DARK_MODE,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

class ThemeAwareComponent extends LitElement {
    darkMode = new MatchMediaController(this, DARK_MODE);

    static styles = css`
        :host {
            display: block;
            padding: 20px;
            transition:
                background-color 0.3s,
                color 0.3s;
        }

        .light-theme {
            background-color: #ffffff;
            color: #000000;
        }

        .dark-theme {
            background-color: #1a1a1a;
            color: #ffffff;
        }
    `;

    render() {
        const theme = this.darkMode.matches ? 'dark-theme' : 'light-theme';
        const themeLabel = this.darkMode.matches ? 'dark mode' : 'light mode';

        return html`
            <div
                class=${theme}
                role="region"
                aria-label="Theme-aware content in ${themeLabel}"
            >
                <h2>Current theme: ${themeLabel}</h2>
                <p>
                    This component automatically adapts to your system theme
                    preference.
                </p>
            </div>
        `;
    }
}

customElements.define('theme-aware-component', ThemeAwareComponent);
```

#### Mobile detection

Detect mobile devices with touch input:

```typescript
import { html, LitElement } from 'lit';
import {
    MatchMediaController,
    IS_MOBILE,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import '@spectrum-web-components/button/sp-button.js';

class TouchOptimizedElement extends LitElement {
    isMobile = new MatchMediaController(this, IS_MOBILE);

    render() {
        const buttonSize = this.isMobile.matches ? 'xl' : 'm';
        const instructions = this.isMobile.matches
            ? 'Tap to continue'
            : 'Click to continue';

        return html`
            <div role="region" aria-label="Touch-optimized interface">
                <sp-button size=${buttonSize} aria-label="${instructions}">
                    ${instructions}
                </sp-button>
            </div>
        `;
    }
}

customElements.define('touch-optimized-element', TouchOptimizedElement);
```

### Accessibility

When using `MatchMediaController` to create responsive designs, consider these accessibility best practices:

#### Content parity

- Ensure that content available on one screen size is also available on others, even if the presentation differs.
- Don't hide critical information or functionality based solely on screen size.

#### Touch targets

- On mobile devices (detected via media queries), ensure interactive elements meet the minimum touch target size of 44x44 pixels as per [WCAG 2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html).
- Increase spacing between interactive elements on touch devices.

#### Responsive text

- Ensure text remains readable at all breakpoints.
- Allow text to reflow naturally without horizontal scrolling (required by [WCAG 1.4.10 Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)).

#### Keyboard navigation

- Responsive layouts must maintain logical keyboard navigation order.
- Ensure focus indicators remain visible and clear at all breakpoints.

#### ARIA labels

- Update ARIA labels when content significantly changes based on media queries.
- Use `aria-label` to describe the current layout state when it affects user interaction.

#### Screen reader announcements

- Consider using `aria-live` regions to announce significant layout changes.
- Avoid disorienting users with unexpected content shifts.

#### Color scheme preferences

When using `DARK_MODE` or other color scheme media queries:

- Respect user preferences for reduced motion ([`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)).
- Maintain sufficient contrast ratios in both light and dark modes.
- Test with high contrast modes.

### References

- [WCAG 2.1 - Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)
- [WCAG 2.1 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [MDN: Using media queries for accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#targeting_media_features)
- [Adobe Accessibility Guidelines](https://www.adobe.com/accessibility/products/spectrum.html)

### Resources

- [MDN: Window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [CSS Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/) - Specification
