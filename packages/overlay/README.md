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

## API

```html
open delayed offset="Number | [Number, Number]" placement=${placement}
received-focus=${‘true’ | ‘false’ | ‘auto’ (default)} trigger=${idOfTrigger AND
${string}@${string}} .triggerElement(s)=${trigger Element by reference} // match
naming to aria element reference spec .triggerInteraction=${ ‘click’ |
‘longpress’ | ‘hover’ } type=${type}
```

## Fallback support

While the [`<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) is widely supported by browsers, the [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) is still quite new. When leveraged in browsers that do not yet support the `popover` attribute, there may be additional intervention required to ensure your content is delivered to your visitors as expected.

### Complex layered

When an overlay is placed within a page with complex layering, the content therein can fall behind other content in the `z-index` stack. The following example is somewhat contrived but, imagine a toolbar next to a properties panel. If the toolbar has a lower `z-index` and the properties panel, any overlaid content (tooltips, etc.) within that toolbar will display underneath any content in the properties panel with which it may share pixels.

```html
<div class="complex-layered-demo">
    <div class="complex-layered-holder">
        <sp-action-button id="complex-layered">Trigger</sp-action-button>
        <sp-overlay trigger="complex-layered@hover" placement="bottom-start">
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

Properly managed `z-index` values will support working around this issue while browsers work to adopt the `popover` attribute. In this demo, you can easily achieve the same output but sharing one `z-index` between the various pieces of content, removing `z-index` values altogether, or raising the `.complex-layered-holder` element to a higher `z-index` than the `.complex-layered-blocker` element.

### Contained

[CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) allows a developer direct control over how the internals of one element affects the paint and layout of the internals of other elements on the same page. While leveraging some of its values can offer performance gains, they can interrupt the delivery of your overlaid content.

```html
<div class="contained-demo">
    <sp-action-button id="contained">Trigger</sp-action-button>
    <sp-overlay trigger="contained@hover" placement="bottom-start">
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

You could just _remove_ the `contain` rule. But, if you are not OK with simply removing the `contain` value, you still have options. In the case that you would like to continue to leverage `contain` is to place "contained" content separately from your overlaid content, like so:

```html
<div class="contained-demo">
    <sp-action-button id="contained-working">Trigger</sp-action-button>
</div>
<sp-overlay trigger="contained-working@hover" placement="bottom-start">
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

While not offering the same performance opportunities as `contain`, `clip-path` can also restrict how content in an element is surfaced at paint time. When overlaid content should display outside of the `clip-path`, without the `popover` attribute that content could be _clipped_.

```html
<div class="clip-pathed-demo">
    <sp-action-button id="clip-pathed">Trigger</sp-action-button>
    <sp-overlay trigger="clip-pathed@hover" placement="bottom-start">
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
<sp-overlay trigger="clip-pathed-working@hover" placement="bottom-start">
    <sp-tooltip>I can be blocked when [popover] is not available</sp-tooltip>
</sp-overlay>
<style>
    .clip-pathed-demo {
        clip-path: inset(0 0);
    }
</style>
```
