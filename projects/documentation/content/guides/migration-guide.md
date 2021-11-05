---
layout: guide.njk
title: 'Migration Guide: Spectrum Web Components'
displayName: Migration Guide
slug: migration-guide
---

## Migration: 8/11/2021

As of Nov 8, 2021, Spectrum Web Components will upgrade to [Lit 2.0](https://lit.dev/blog/2021-09-21-announcing-lit-2/) and will cease depending on separate `lit-element` and `lit-html` modules internally. This will only require action from you if:

1. You embed icons as template literals (`<sp-icon>${RedoIcon()}</sp-icon>`) in a project that uses `lit-html@1.x` or `lit-element@2.x`.
2. You wish to combine Spectrum component versions from pre-Lit 2.0 with those from post-Lit 2.0.

Otherwise, you can safely upgrade to the latest versions of Spectrum Web Components, shrinking your bundle size and improving your project's performance.

If you embed icons as template literals, please reference the icon migration guide below while upgrading.

Combining components based on Lit 2.0 with older versions of components may increase your bundle size, since both versions of the underlying LitElement libraries will be required, while the practice of elements registering sub-elements increasing the possibility of JS errors from attempting to register the same tab name more than once. Because of this, we recommend simultaneously upgrading all components in your project to at least the versions listed here:

<details>
	<summary><strong>Package Versions</strong></summary>
	<div class="table-container">
		<table class="spectrum-Table spectrum-Table--sizeM">
			<thead class="spectrum-Table-head">
				<tr>
					<th class="spectrum-Table-headCell">Package</th>
					<th class="spectrum-Table-headCell">Version</th>
				</tr>
			</thead>
			<tbody class="spectrum-Table-body">
				{% for pkg in versions %}<tr class="spectrum-Table-row">
					<td class="spectrum-Table-cell">
						<a href="{{ pkg.dir }}">{{ pkg.name }}</a>
					</td>
					<td class="spectrum-Table-cell">
						<a href="https://www.npmjs.com/package/{{ pkg.name }}/bundle/v/{{ pkg.version }}">{{ pkg.version }}</a>
					</td>
				<tr>{% endfor %}
			</tbody>
		</table>
	</div>
</details>

### Using `lit@2.0` inside of `lit-html` and/or `LitElement`

If you use `lit-html@1.x` or `lit-element@2.x`, embed icons as template literals, _and_ plan to use the latest Spectrum Web Components without updating your project to Lit 2.0, you'll need to adjust icon usage to avoid templating errors.

Here's an example illustrating that combination of factors:

```js
import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@spectrum-web-components/icon/sp-icon.js';
import { RedoIcon } from '@spectrum-web-components/icons-workflow';

export class ElementWithicon extends LitElement {
    render() {
        return html`
            // ...
            <sp-icon>${RedoIcon()}</sp-icon>
            // ...
        `;
    }
}
```

Here, `RedoIcon()` returns a value built with the `html` dependency of `@spectrum-web-components/icons-workflow`. After this update, that value will no longer be compatible with the `html` tag in the `render()` function here, which is still built with the `lit-html` module.

There are two ways to correct this. We recommend replacing template-literal icons with icon elements, resulting in better performance and decoupled dependencies:

```js
import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-redo.js';

export class ElementWithicon extends LitElement {
    render() {
        return html`
            // ...
            <sp-icon-redo></sp-icon-redo>
            // ...
        `;
    }
}
```

Alternatively, provide your local value for `html` to the icon templates via `setCustomTemplateLiteralTag`:

```js
import { html } from 'lit-html';
import {
    RedoIcon,
    setCustomTemplateLiteralTag,
} from '@spectrum-web-components/icons-workflow';

setCustomTemplateLiteralTag(html);
```

### Javascript re-exports

Previously, `@spectrum-web-components/base` re-exported a number of things from the `lit-element` and `lit-html` packages like so:

```js
// @spectrum-web-components/base
export * from 'lit-element';
export { nothing } from 'lit-html';
export { ifDefined } from 'lit-html/directives/if-defined.js';
export { repeat } from 'lit-html/directives/repeat.js';
export { classMap } from 'lit-html/directives/class-map.js';
export { styleMap } from 'lit-html/directives/style-map.js';
export { until } from 'lit-html/directives/until.js';
export { live } from 'lit-html/directives/live.js';
```

With the move the `lit` greater care is being taken to ensure that importing JS from this package delivers only what you might need in your application, so we have updated the entrypoints on this package to the following: `@spectrum-web-components/base`, `@spectrum-web-components/base/decorators.js`, `@spectrum-web-components/base/html.js`, and `@spectrum-web-components/base/directives.js`. These files will re-export `lit` values as follows:

```js
// @spectrum-web-components/base
export * from 'lit';
```

```js
// @spectrum-web-components/base/decorators.js
export * from 'lit/decorators.js';
```

```js
// @spectrum-web-components/base/html.js
export { nothing, render } from 'lit/html.js';
```

```js
// @spectrum-web-components/base/directives.js
export { ifDefined } from 'lit/directives/if-defined.js';
export { repeat } from 'lit/directives/repeat.js';
export { classMap } from 'lit/directives/class-map.js';
export type { ClassInfo } from 'lit/directives/class-map.js';
export { styleMap } from 'lit/directives/style-map.js';
export type { StyleInfo } from 'lit/directives/style-map.js';
export { until } from 'lit/directives/until.js';
export { live } from 'lit/directives/live.js';
```

Additional `lit` exports can be acquired directly from the `lit` package.

With Lit 2.0 bringing same-document library-version flexibility, re-exporting from shared base libraries is less critical. We may eventually recommend direct imports from `lit` as the preferred path towards acquiring these values.
