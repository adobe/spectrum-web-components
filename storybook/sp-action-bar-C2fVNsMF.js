import './sp-popover-BH6yktMg.js';
import './sp-action-group-BuA30sND.js';
import './sp-close-button-lUq7Iv6y.js';
import './sp-field-label-oZHlTsnx.js';
import { i } from './lit-element-BulMEkr1.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-D29Av9Xb.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-C_3bgzm7.js';

const o=i`
    :host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(--spectrum-line-height-100);--spectrum-actionbar-item-counter-color:var(--spectrum-neutral-content-color-default);--spectrum-actionbar-popover-background-color:var(--spectrum-gray-50);--spectrum-actionbar-popover-border-color:var(--spectrum-gray-400);--spectrum-actionbar-emphasized-background-color:var(--spectrum-informative-background-color-default);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(--spectrum-action-bar-top-to-item-counter);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(--spectrum-cjk-line-height-100)}@media (forced-colors:active){:host,:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{padding:0 var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge));z-index:1;box-sizing:border-box;pointer-events:none;block-size:0;opacity:0;inset-block-end:0}:host([open]){block-size:calc(var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)) + var(--mod-actionbar-height,var(--spectrum-actionbar-height)));opacity:1}#popover{block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));box-sizing:border-box;inline-size:100%;border-radius:var(--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius));border-color:var(--highcontrast-actionbar-popover-border-color,var(--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)));background-color:var(--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color));filter:drop-shadow(var(--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal))var(--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical))var(--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur))var(--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)));pointer-events:auto;flex-direction:row;margin:auto;padding-block:0;display:flex;position:relative}.close-button{flex-shrink:0;margin-block-start:var(--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top));margin-inline-start:var(--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start));margin-inline-end:var(--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end))}.field-label{font-size:var(--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size));color:var(--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color));line-height:var(--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height));margin-block-start:var(--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top));margin-inline-end:var(--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end));padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk))}.action-group{margin-block-start:var(--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top));margin-inline-start:auto;margin-inline-end:var(--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end))}:host([emphasized]) #popover{filter:none;background-color:var(--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color));border-color:#0000}:host([emphasized]) .field-label{color:var(--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color))}:host([variant=sticky]){position:sticky;inset-inline:0}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{display:block}:host([flexible]){display:inline-block}
`;

var u=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var l=(o,i,e,s)=>{for(var t=s>1?void 0:s?c(i,e):i,p=o.length-1,a;p>=0;p--)(a=o[p])&&(t=(s?a(i,e,t):a(t))||t);return s&&t&&u(i,e,t),t};const actionBarVariants=["sticky","fixed"];class ActionBar extends FocusVisiblePolyfillMixin(SpectrumElement){constructor(){super(...arguments);this.emphasized=!1;this.flexible=!1;this.open=!1;this._variant="";}static get styles(){return [o]}set variant(e){if(e!==this.variant){if(actionBarVariants.includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant="";}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0);}render(){return x`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static=${o$1(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static=${o$1(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}l([n({type:Boolean,reflect:!0})],ActionBar.prototype,"emphasized",2),l([n({type:Boolean,reflect:!0})],ActionBar.prototype,"flexible",2),l([n({type:Boolean,reflect:!0})],ActionBar.prototype,"open",2),l([n({type:String})],ActionBar.prototype,"variant",1);

defineElement("sp-action-bar",ActionBar);
