## When to use trigger directive

Use the `trigger()` directive when working in **Lit-based applications**. This directive excels at:

- **Reactive content**: Automatically updates overlay content when template data changes
- **Template composition**: Leverage Lit's template system for overlay content
- **Clean syntax**: Declarative overlay management within Lit templates
- **Lazy rendering**: Content is only rendered when overlay is open

**Don't use trigger directive when:**

- **Not using Lit**: This directive only works with Lit templates
- **Static HTML**: Use [`<sp-overlay>`](./README.md) or [`<overlay-trigger>`](./overlay-trigger.md) for static content
- **Multiple interactions**: For hover + click, use [`<overlay-trigger>`](./overlay-trigger.md)

See the [Getting Started Guide](./GETTING-STARTED.md) for a complete comparison of entry points.

## Overview

To support consumers that leverage `lit-html`, Spectrum Web Components also vends a [directive](https://lit.dev/docs/api/directives/) to further simplify the management of content conditional to whether or not the Overlay is currently visible.

### Usage

```zsh
yarn add @spectrum-web-components/overlay
```

Import the `trigger` directive as follows:

```ts
import { trigger } from '@spectrum-web-components/overlay';
```

### Example

Pass a `TemplateResult` into the `trigger()` directive, as follows in order to have it rendered to the DOM when the associated Overlay is about to open and the removed after the Overlay has closed.

```html-live
<div id="root"></div>

<script type="module">
    import { trigger } from '@spectrum-web-components/overlay';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <sp-popover>
            <p>
                This content will display within the Overlay and
                <em>only</em>
                be on the DOM when the Overlay is open.
            </p>
        </sp-popover>
    `;

    const template = html`
        <sp-button
            ${trigger(renderOverlayContent, {
                open: false,
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom',
                    offset: 6,
                },
            })}
        >
            Trigger
        </sp-button>
    `;

    customElements.whenDefined('code-example').then(() => {
        Promise.all(
            [...document.querySelectorAll('code-example')].map(
                (example) => example.updateComplete
            )
        ).then(() => {
            const appRoot = document.querySelector('#root');
            appRoot.innerHTML = '';
            render(template, appRoot);
        });
    });
</script>
```

<script type="module">
    import { trigger } from '@spectrum-web-components/overlay';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <sp-popover>
            <p>
                This content will display within the Overlay and
                <em>only</em>
                be on the DOM when the Overlay is open.
            </p>
        </sp-popover>
    `;

    const template = html`
        <sp-button ${trigger(renderOverlayContent, {
            open: false,
            triggerInteraction: 'click',
            overlayOptions: {
                placement: 'bottom',
                offset: 6,
            }
        })}>Trigger</sp-button>
    `;

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            const appRoot = document.querySelector('#root');
            appRoot.innerHTML = '';
            render(template, appRoot);
        });
    });
</script>

### Options

The `trigger()` directive accepts two arguments:

- a required method returning the `TemplateResult` defining the content of the open overlay

```ts
() => TemplateResult;
```

- an optional options object which is shaped as follows:

```ts
{
    open?: boolean; // Whether the Overlay in question should be rendered open.
    triggerInteraction: TriggerInteraction; // 'click' | 'longpress' | 'hover'
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
}
```

`OverlayOptions` are leveraged in the same way as outlined [here](https://opensource.adobe.com/spectrum-web-components/components/imperative-api/#overlayoptions) and `InsertionOptions` are leveraged to outline where in the DOM the Overlay should be inserted:

```ts
type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement); // returning a reference to the element the Overlay should be inserted adjacent to
    where: InsertPosition; // 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend'
};
```

## Lit-specific patterns

### Reactive content updates

The directive automatically re-renders overlay content when your component's state changes:

```typescript
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { trigger } from '@spectrum-web-components/overlay';

class MyComponent extends LitElement {
    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <sp-button
                ${trigger(
                    () => html`
                        <sp-popover>
                            <p>Current count: ${this.count}</p>
                        </sp-popover>
                    `,
                    {
                        triggerInteraction: 'click',
                        overlayOptions: {
                            placement: 'bottom',
                            type: 'auto',
                        },
                    }
                )}
            >
                Show Count
            </sp-button>

            <sp-button @click=${() => this.count++}>Increment</sp-button>
        `;
    }
}
```

### Conditional content

Use Lit's conditional rendering within overlay content:

```typescript
render() {
    return html`
        <sp-button ${trigger(
            () => html`
                <sp-popover>
                    ${this.isLoggedIn
                        ? html`<p>Welcome, ${this.userName}!</p>`
                        : html`<p>Please log in</p>`
                    }
                </sp-popover>
            `,
            {
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom',
                    type: 'auto',
                },
            }
        )}>
            User Menu
        </sp-button>
    `;
}
```

### Lists and iterations

Render lists within overlays:

```typescript
render() {
    return html`
        <sp-button ${trigger(
            () => html`
                <sp-popover>
                    <sp-menu>
                        ${this.items.map(item => html`
                            <sp-menu-item @click=${() => this.selectItem(item)}>
                                ${item.name}
                            </sp-menu-item>
                        `)}
                    </sp-menu>
                </sp-popover>
            `,
            {
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom-start',
                    type: 'auto',
                },
            }
        )}>
            Select Item
        </sp-button>
    `;
}
```

### Event handling

Handle events from overlay content:

```typescript
private handleMenuSelect(event: Event) {
    const item = event.target as SpMenuItem;
    console.log('Selected:', item.value);

    // Close overlay by dispatching close event
    event.target.dispatchEvent(new Event('close', { bubbles: true }));
}

render() {
    return html`
        <sp-button ${trigger(
            () => html`
                <sp-popover>
                    <sp-menu @change=${this.handleMenuSelect}>
                        <sp-menu-item value="1">Option 1</sp-menu-item>
                        <sp-menu-item value="2">Option 2</sp-menu-item>
                        <sp-menu-item value="3">Option 3</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            `,
            {
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom-start',
                    type: 'auto',
                },
            }
        )}>
            Menu
        </sp-button>
    `;
}
```

### Custom insertion position

Control where in the DOM the overlay is inserted:

```typescript
render() {
    return html`
        <div class="container">
            <sp-button ${trigger(
                () => html`
                    <sp-popover>
                        <p>Overlay content</p>
                    </sp-popover>
                `,
                {
                    triggerInteraction: 'click',
                    overlayOptions: {
                        placement: 'bottom',
                        type: 'auto',
                    },
                    insertionOptions: {
                        // Insert after the container div
                        el: () => this.renderRoot.querySelector('.container'),
                        where: 'afterend',
                    },
                }
            )}>
                Open
            </sp-button>
        </div>
    `;
}
```

### Programmatic control

Control overlay state from component methods:

```typescript
@property({ type: Boolean })
private overlayOpen = false;

openOverlay() {
    this.overlayOpen = true;
}

closeOverlay() {
    this.overlayOpen = false;
}

render() {
    return html`
        <sp-button ${trigger(
            () => html`
                <sp-popover>
                    <sp-dialog>
                        <h2 slot="heading">Dialog</h2>
                        <p>Content here</p>
                        <sp-button
                            slot="button"
                            @click=${this.closeOverlay}
                        >
                            Close
                        </sp-button>
                    </sp-dialog>
                </sp-popover>
            `,
            {
                open: this.overlayOpen,
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom',
                    type: 'modal',
                },
            }
        )}>
            Open Dialog
        </sp-button>

        <sp-button @click=${this.openOverlay}>
            Open from elsewhere
        </sp-button>
    `;
}
```

### Reusable overlay templates

Extract overlay content into reusable methods:

```typescript
private renderUserMenu() {
    return html`
        <sp-popover>
            <sp-menu>
                <sp-menu-item>Profile</sp-menu-item>
                <sp-menu-item>Settings</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Logout</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
}

render() {
    return html`
        <sp-button ${trigger(
            () => this.renderUserMenu(),
            {
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom-end',
                    type: 'auto',
                },
            }
        )}>
            User
        </sp-button>
    `;
}
```

## Performance tips

### Lazy data loading

Load expensive data only when overlay opens:

```typescript
private menuData?: MenuItem[];

private async loadMenuData() {
    if (!this.menuData) {
        this.menuData = await fetchMenuItems();
        this.requestUpdate();
    }
}

render() {
    return html`
        <sp-button ${trigger(
            () => {
                // Load data when overlay opens
                this.loadMenuData();

                return html`
                    <sp-popover>
                        ${this.menuData
                            ? html`<sp-menu>...</sp-menu>`
                            : html`<sp-progress-circle indeterminate></sp-progress-circle>`
                        }
                    </sp-popover>
                `;
            },
            {
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom',
                    type: 'auto',
                },
            }
        )}>
            Load Menu
        </sp-button>
    `;
}
```

### Memoization

For expensive computations in overlay content, consider memoization:

```typescript
import { cache } from 'lit/directives/cache.js';

private renderExpensiveContent() {
    return cache(html`
        <!-- Expensive rendering here -->
    `);
}
```
