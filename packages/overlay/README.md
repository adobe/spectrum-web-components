## Description

An `<sp-overlay>` element is used to decorate content that you would like to present to your visitors as "overlaid" on the rest of the application. This includes dialogs (modal and not), pickers, tooltips, context menus, et al.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```
yarn add @spectrum-web-components/overlay
```

Import the side effectful registration of `<sp-overlay>` as follows:

```
import '@spectrum-web-components/overlay/sp-overlay.js';
```

When looking to leverage the `Overlay` base class as a type and/or for extension purposes, do so via:

```
import {
    Overlay
} from '@spectrum-web-components/overlay';
```

## Example

By leveraging the `trigger` attribute to pass an ID reference to another element with in the same DOM tree, your overlay will be positioned in relation to this element. When the ID reference is followed by an `@` symbol and interaction type, like `click`, `hover`, or `longpress`, the overlay will bind itself to the referenced element via the DOM events associated with that interaction. For example, the `<sp-button>` below has an id of `trigger`, and the `<sp-overlay>` is provided the `trigger` attribute with the value `trigger@click`. This creates an association between the overlay and the `<sp-button>` that opens the overlay when the button is clicked.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>
<sp-overlay trigger="trigger@click">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Clicking opens this popover...</h2>
            <p>But, it really could be anything. Really.</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

### Action bar

```html
<style>
    .overlay-demo-popover sp-action-group {
        padding: var(--spectrum-actiongroup-vertical-spacing-regular);
    }
    #overlay-demo {
        position: static;
    }
    #overlay-demo:not(:defined),
    #overlay-demo *:not(:defined) {
        display: none;
    }
</style>
<sp-popover id="overlay-demo" class="overlay-demo-popover" open>
    <sp-action-group vertical quiet emphasized selects="single">
        <sp-action-button id="trigger-1" hold-affordance>
            <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
        </sp-action-button>
        <sp-action-button id="trigger-2" hold-affordance>
            <sp-icon-polygon-select slot="icon"></sp-icon-polygon-select>
        </sp-action-button>
        <sp-action-button id="trigger-3" hold-affordance>
            <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
        </sp-action-button>
    </sp-action-group>
    <sp-overlay trigger="trigger-1@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-1@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
    <sp-overlay trigger="trigger-2@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-2@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
    <sp-overlay trigger="trigger-3@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-3@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
</sp-popover>
```

## API

```ts
<sp-overlay
    ?open=${boolean}
    ?delayed=${boolean}
    offset=${Number | [Number, Number]}
    placement=${Placement}
    receives-focus=${'true' | 'false' | 'auto' (default)
    trigger=${string | ${string}@${string}}
    .triggerElement=${HTMLElement}
    .triggerInteraction=${'click' | 'longpress' | 'hover'}
    type=${'auto' | 'hint' | 'manual' | 'modal' | 'page'}
></sp-overlay>
```

### API value interactions

When a `triggerElement` is present, either through an ID reference established via the `trigger` attribute or by directly setting the `triggerElement` property, a chain on configuration begins:

-   **if a `triggerInteraction` is available**, either through the `id@interaction` IDL on the `trigger` attribute or directly setting the `triggerInteraction` property, the `<sp-overlay>` will be bound to the resolved `triggerElement` via the `triggerInteraction` provided
-   **if a `placement` is available** when the `<sp-overlay>` is `open` and displaying its contents, those contents will be positioned relative to the `triggerElement` as per that `placement`
    -   **if an `offset` is also available** the `<sp-overlay>` will distance itself from the `triggerElement` in accordance with the value of the `offset`
    -   **if you have a `placement` but not a `triggerElement`** the `<sp-overlay>` will not be positioned due to their being nothing for the `plaement` to reference when so doing
-   **if no `placement` is available** the content will not be placed with the expectation that the content itself or the consuming application will handle placement of the overlaid content. This is commonly what will happen for `type="modal"` and `type="page"` overlays as they are likely meant to cover the entire screen, whether visibly (via an `<sp-underlay>`, an element that includes one, or similar) or figuratively (as when modal content is not delivered with a backdrop or scrim).

### Events

When fully open the `<sp-overlay>` element will dispatch the `sp-opened` event, and when fully closed the `sp-closed` event will be dispatched. "Fully" in this context means that all CSS transitions that have dispatched `transitionrun` events on the direct children of the `<sp-overlay>` element have successfully dispatched their `transitionend` or `transitioncancel` event. Keep in mind the following:

-   `transition*` events bubble; this means that while transition events on light DOM content of those direct children will be heard, those events will not be taken into account
-   `transition*` events are not composed; this means that transition events on shadow DOM content of the direct children will not propagate to a level in the DOM where they can be heard

This means that in both cases, if the transition is meant to be a part of the opening or closing of the overlay in question you will need to redispatch the `transitionrun`, `transitionend`, and `transitioncancel` events from that transition from the closest direct child of the `<sp-overlay>`.

## Styling

`<sp-overlay>` element will use the `<dialog>` element or `popover` attribute to project your content onto the top-layer of the browser, without being moved in the DOM tree. That means that you can style your overlay content with whatever techniques you are already leveraging to style the content that doesn't get overlaid. This means standard CSS selectors, CSS Custom Properties, and CSS Parts applied in your parent context will always apply to your overlaid content.

## Top Layer over Complex CSS

There are some complex CSS values that have not yet been covered by the positioning API that the `<sp-overlay>` element leverages to associate overlaid content with their trigger elements. In specific, properties like `filter`, when applied to a trigger element within which lives the related content to be overlaid, are not currently supported by the relationship created herein. If support for this is something that you and the work you are addressing would require, we'd love to hear from you in [an issue](https://github.com/adobe/spectrum-web-components/issues). We'd be particularly interested in speaking with you if you were interested in contributing support/testing to ensure this capability for all consumers of the library.

## Fallback support

While the [`<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) is widely supported by browsers, the [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) is still quite new. When leveraged in browsers that do not yet support the `popover` attribute, there may be additional intervention required to ensure your content is delivered to your visitors as expected.

### Complex layered

When an overlay is placed within a page with complex layering, the content therein can fall behind other content in the `z-index` stack. The following example is somewhat contrived but, imagine a toolbar next to a properties panel. If the toolbar has a lower `z-index` than the properties panel, any overlaid content (tooltips, etc.) within that toolbar will display underneath any content in the properties panel with which it may share pixels.

```html
<div class="complex-layered-demo">
    <div class="complex-layered-holder">
        <sp-action-button id="complex-layered">Trigger</sp-action-button>
        <sp-overlay
            trigger="complex-layered@hover"
            type="hint"
            placement="bottom-start"
        >
            <sp-tooltip>
                I can be partially blocked when [popover] is not available
            </sp-tooltip>
        </sp-overlay>
    </div>
    <div class="complex-layered-blocker"></div>
</div>
<style>
    .complex-layered-demo {
        position: relative;
    }
    .complex-layered-holder {
        z-index: 1;
        position: relative;
    }
    .complex-layered-blocker {
        position: relative;
        z-index: 10;
        background: white;
        width: 100%;
        height: 40px;
    }
</style>
```

Properly managed `z-index` values will support working around this issue while browsers work to adopt the `popover` attribute. In this demo, you can achieve the same output by sharing one `z-index` between the various pieces of content, removing `z-index` values altogether, or raising the `.complex-layered-holder` element to a higher `z-index` than the `.complex-layered-blocker` element.

### Contained

[CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) gives a developer direct control over how the internals of one element affect the paint and layout of the internals of other elements on the same page. While leveraging some of its values can offer performance gains, they can interrupt the delivery of your overlaid content.

```html
<div class="contained-demo">
    <sp-action-button id="contained">Trigger</sp-action-button>
    <sp-overlay trigger="contained@hover" type="hint" placement="bottom-start">
        <sp-tooltip>
            I can be blocked when [popover] is not available
        </sp-tooltip>
    </sp-overlay>
</div>
<style>
    .contained-demo {
        contain: content;
    }
</style>
```

You could just _remove_ the `contain` rule. But, if you are not OK with simply removing the `contain` value, you still have options. If you would like to continue to leverage `contain`, you can place your "contained" content separately from your overlaid content, like so:

```html
<div class="contained-demo">
    <sp-action-button id="contained-working">Trigger</sp-action-button>
</div>
<sp-overlay
    trigger="contained-working@hover"
    type="hint"
    placement="bottom-start"
>
    <sp-tooltip>I can be blocked when [popover] is not available</sp-tooltip>
</sp-overlay>
<style>
    .contained-demo {
        contain: content;
    }
</style>
```

`<sp-overlay>` accepts an ID reference via the `trigger` attribute to relate it to interactions and positioning in the DOM. To fulfill this reference the two elements need to be in the same DOM tree. However, `<sp-overlay>` alternatively accepts a `triggerElement` _property_ that opens even more flexibility in addressing this situation.

### Clip pathed

`clip-path` can also restrict how content in an element is surfaced at paint time. When overlaid content should display outside of the `clip-path`, without the `popover` attribute, that content could be _clipped_.

```html
<div class="clip-pathed-demo">
    <sp-action-button id="clip-pathed">Trigger</sp-action-button>
    <sp-overlay
        trigger="clip-pathed@hover"
        type="hint"
        placement="bottom-start"
    >
        <sp-tooltip>
            I can be blocked when [popover] is not available
        </sp-tooltip>
    </sp-overlay>
</div>
<style>
    .clip-pathed-demo {
        clip-path: inset(0 0);
    }
</style>
```

Here, again, working with your content needs (whether or not you want to leverage `clip-path`) or DOM structure (not colocating clipped and non-clipped content) will allow you to avoid this issue:

```html
<div class="clip-pathed-demo">
    <sp-action-button id="clip-pathed-working">Trigger</sp-action-button>
</div>
<sp-overlay
    trigger="clip-pathed-working@hover"
    type="hint"
    placement="bottom-start"
>
    <sp-tooltip>I can be blocked when [popover] is not available</sp-tooltip>
</sp-overlay>
<style>
    .clip-pathed-demo {
        clip-path: inset(0 0);
    }
</style>
```
