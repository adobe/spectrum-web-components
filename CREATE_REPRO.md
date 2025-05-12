# Spectrum Web Components Repro Template

This template helps you quickly set up a minimal repro case for Spectrum Web Components. Use it to report bugs, test ideas, or showcase usage examples.

## Setup

Use this `package.json` as your base:

```json
{
    "dependencies": {
        "lit": "^3.2.1",
        // always required for theme files
        "@spectrum-web-components/theme": "1.6.0",
        "@spectrum-web-components/button": "1.6.0"
    }
}
```

You can run this in:

- StackBlitz

- A local environment using Vite

## Example Code

```js
// Theme registration
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

// E.g Spectrum components
import '@spectrum-web-components/button/sp-button.js';

// Lit
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
```

## Custom Element

```ts
@customElement('my-element')
export default class MyElement extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-theme color="light" scale="medium">
                <!-- <your component> -->
            </sp-theme>
        `;
    }
}
```

## Share Your Demo

Once you’ve set up your custom use case:

- Run it on StackBlitz.

- Make sure it reproduces the issue clearly.

- Share the URL with the Spectrum team.

## Guidelines

- Keep your demo minimal and self-contained.

- Use only stable versions of components.

- Always wrap your components in <sp-theme> for proper theming.

- Use the component docs for guidance.

## Example

👉 [Live Demo on StackBlitz](https://stackblitz.com/orgs/custom/SWC-Team/collections)

For any questions on repro please ask in #spectrum-web-components slack channel
