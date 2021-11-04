---
layout: guide.njk
title: 'Migration Guide: Spectrum Web Components'
displayName: Migration Guide
slug: migration-guide
---

## Migration: 8/11/2021

As of 8/11/2021, Spectrum Web Components will cease to leverage `lit-element` and `lit-html` dependencies directly in favor of [`lit2.0`](https://lit.dev/blog/2021-09-21-announcing-lit-2/). For most of you this will be a 100% transparent change as the usage of these libraries is encapsulated within our elements and consuming these new versions within your HTML of Javascript application should do little more than pass the bundle size and performance benefits of this change on to your applications. If you are currently using any of the following package version you should be seeing these benefits in your applications today. In the case that you are using those packages in concert with versions before those listed below we highly suggest that you align your version consumption to the most recent versions as soon as is comfortable for your project.

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

If you are currently using `lit-html@1.x` and/or `lit-element@2.x` within your project and are looking to consume these new package versions without updating to `lit` as well, you should generally have no issue. Manual migration may be required in the case that your application is consuming template literal versions of the icons available in `@spectrum-web-components/icons-ui` or `@spectrum-web-components/icons-workflow` directly from their default exports as follows:

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

In this case the `RedoIcon()` literal will be wrapped in the `html` template literal tag as supplied by `@spectrum-web-components/icons-workflow`. After this update, the version of this tag will no longer be compatible with the `html` template literal tag applied in the `render()` method of your custom element. You can correct this by applying your local value for `html` to the icon literals:

```js
import { html } from 'lit-html';
import {
    RedoIcon,
    setCustomTemplateLiteralTag,
} from '@spectrum-web-components/icons-workflow';

setCustomTemplateLiteralTag(html);
```

Or, you can avoid running into issues like this in the future, while leveraging more performant icon delivery, by leveraging fully registered icon elements instead:

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

Additional `lit` exports can be acquired directly from that package and with the reduction of `instanceof`-centric checking within the `lit-html` library it is possible that overtime we lean towards that being the preferred path towards acquiring this values.
