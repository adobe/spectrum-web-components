## Overview

The `LanguageResolutionController` is a Lit reactive controller that automatically resolves and tracks the language/locale context of a web component. It detects language changes up the DOM tree, including across shadow DOM boundaries, making it essential for internationalized applications.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `LanguageResolutionController` via:

```typescript
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
```

### Key features

- **Automatic language detection**: Resolves `lang` attribute from DOM tree
- **Locale change tracking**: Triggers updates when language context changes
- **Shadow DOM support**: Works across shadow boundaries via event bubbling
- **Fallback handling**: Uses `navigator.language` or defaults to `en-US`
- **Validation**: Ensures locale is supported by `Intl` APIs

### When to use

Use `LanguageResolutionController` when your component needs to:

- Format numbers based on locale
- Format dates and times according to locale conventions
- Display localized content or messages
- Determine text direction (RTL/LTR)
- Apply locale-specific formatting rules

### Examples

#### Automatic language detection

The controller automatically detects the language from the DOM tree without requiring manual configuration:

```typescript
import { LitElement, html } from 'lit';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

class LocalizedGreeting extends LitElement {
    private languageResolver = new LanguageResolutionController(this);

    render() {
        const greetings = {
            en: 'Hello',
            es: 'Hola',
            fr: 'Bonjour',
            de: 'Guten Tag',
            ja: 'こんにちは',
        };

        // Get base language code (e.g., 'en' from 'en-US')
        const lang = this.languageResolver.language.split('-')[0];
        const greeting = greetings[lang] || greetings['en'];

        return html`
            <p>
                ${greeting}, World!
                <span class="locale">(${this.languageResolver.language})</span>
            </p>
        `;
    }
}

customElements.define('localized-greeting', LocalizedGreeting);
```

Usage:

```html-no-demo
<!-- Spanish context -->
<div lang="es-ES">
    <localized-greeting></localized-greeting>
    <!-- Renders: Hola, World! (es-ES) -->
</div>
```

#### Locale change tracking

The controller automatically re-renders components when the language context changes:

```typescript
import { LitElement, html } from 'lit';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

class LanguageTracker extends LitElement {
    private languageResolver = new LanguageResolutionController(this);
    private updateCount = 0;

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        // Detect when language has changed
        if (changedProperties.has(languageResolverUpdatedSymbol)) {
            this.updateCount++;
            console.log('Language changed to:', this.languageResolver.language);
        }
    }

    render() {
        return html`
            <div>
                <p>
                    Current language:
                    <strong>${this.languageResolver.language}</strong>
                </p>
                <p>Change count: ${this.updateCount}</p>
            </div>
        `;
    }
}

customElements.define('language-tracker', LanguageTracker);
```

#### Supports shadow DOM

The controller works across shadow DOM boundaries using event bubbling:

```typescript
import { LitElement, html } from 'lit';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

// Component with shadow DOM
class LocalizedCard extends LitElement {
    private languageResolver = new LanguageResolutionController(this);

    render() {
        const lang = this.languageResolver.language;

        return html`
            <div class="card">
                <h3>Language: ${lang}</h3>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('localized-card', LocalizedCard);
```

#### Bubbles up DOM tree

The controller searches up through parent elements to find language context:

```html-no-demo
<!-- Finds lang attribute several levels up -->
<article lang="ja-JP">
    <section>
        <div>
            <aside>
                <localized-greeting></localized-greeting>
                <!-- Output: こんにちは, World! (ja-JP) -->
            </aside>
        </div>
    </section>
</article>

<!-- Uses closest ancestor with lang attribute -->
<div lang="en-US">
    <section lang="es-ES">
        <localized-greeting></localized-greeting>
        <!-- Output: Hola, World! (es-ES) - uses closest lang -->
    </section>
</div>

<!-- Bubbles through custom elements -->
<sp-theme lang="de-DE">
    <sp-card>
        <sp-dialog>
            <localized-greeting></localized-greeting>
            <!-- Output: Guten Tag, World! (de-DE) -->
        </sp-dialog>
    </sp-card>
</sp-theme>
```

### How it works

The controller follows this resolution process:

1. **On connection**: Dispatches `sp-language-context` event that bubbles up the DOM
2. **Theme provider response**: `<sp-theme>` or other context providers respond with their `lang` value
3. **Callback registration**: Provider calls the callback with language and unsubscribe function
4. **Validation**: Language is validated using `Intl.DateTimeFormat.supportedLocalesOf()`
5. **Fallback**: If validation fails, falls back to `document.documentElement.lang`, `navigator.language`, or `en-US`
6. **Updates**: When language changes, triggers a component update via `requestUpdate()`

### Related components

Components in Spectrum Web Components that use `LanguageResolutionController`:

- [`<sp-number-field>`](../../components/number-field/) - Number input with locale formatting
- [`<sp-slider>`](../../components/slider/) - Slider with localized values
- [`<sp-meter>`](../../components/meter/) - Meter with formatted values
- [`<sp-progress-bar>`](../../components/progress-bar/) - Progress with formatted percentage
- [`<sp-color-wheel>`](../../components/color-wheel/) - Color picker with locale support
- [`<sp-color-slider>`](../../components/color-slider/) - Color slider with formatted values
- [`<sp-color-area>`](../../components/color-area/) - Color area with locale support

### Resources

- [Intl.NumberFormat - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [Intl.DateTimeFormat - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [Language tags (BCP 47)](https://www.w3.org/International/articles/language-tags/)
- [WCAG - Language of Page](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html)
