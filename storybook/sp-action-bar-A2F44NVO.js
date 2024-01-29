import './sp-popover-jafHnpZt.js';
import './sp-action-group-7kE1EGOH.js';
import './sp-close-button-__rs1xx6.js';
import './sp-field-label-MGGfIObj.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-s04w2teA.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

const o=i`
:host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(
--spectrum-line-height-100
);--spectrum-actionbar-item-counter-color:var(
--spectrum-neutral-content-color-default
);--spectrum-actionbar-popover-background-color:var(--spectrum-gray-50);--spectrum-actionbar-popover-border-color:var(--spectrum-gray-400);--spectrum-actionbar-emphasized-background-color:var(
--spectrum-informative-background-color-default
);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(
--spectrum-spacing-100
);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(
--spectrum-action-bar-top-to-item-counter
);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(
--spectrum-cjk-line-height-100
)}@media (forced-colors:active){:host{--highcontrast-actionbar-popover-border-color:CanvasText}:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{block-size:0;box-sizing:border-box;inset-block-end:0;opacity:0;padding:0 var(
--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)
);pointer-events:none;z-index:1}:host([open]){block-size:calc(var(
--mod-actionbar-spacing-outer-edge,
var(--spectrum-actionbar-spacing-outer-edge)
) + var(--mod-actionbar-height, var(--spectrum-actionbar-height)));opacity:1}#popover{background-color:var(
--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color)
);block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));border-color:var(
--highcontrast-actionbar-popover-border-color,var(
--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)
)
);border-radius:var(
--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius)
);box-sizing:border-box;display:flex;filter:drop-shadow(var(
--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal)
) var(
--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical)
) var(
--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur)
) var(
--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)
));flex-direction:row;inline-size:100%;margin:auto;padding-block:0;pointer-events:auto;position:relative}.close-button{flex-shrink:0;margin-block-start:var(
--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top)
);margin-inline-end:var(
--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end)
);margin-inline-start:var(
--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start)
)}.field-label{color:var(
--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color)
);font-size:var(
--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size)
);line-height:var(
--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height)
);margin-block-start:var(
--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top)
);margin-inline-end:var(
--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end)
);padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(
--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk)
)}.action-group{margin-block-start:var(
--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top)
);margin-inline-end:var(
--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end)
);margin-inline-start:auto}:host([emphasized]) #popover{background-color:var(
--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color)
);border-color:#0000;filter:none}:host([emphasized]) .field-label{color:var(
--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color)
)}:host([variant=sticky]){inset-inline:0;position:sticky}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{display:block}:host([flexible]){display:inline-block}
`;var m = o;

var u=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=(o,i,e,r)=>{for(var t=r>1?void 0:r?c(i,e):i,p=o.length-1,a;p>=0;p--)(a=o[p])&&(t=(r?a(i,e,t):a(t))||t);return r&&t&&u(i,e,t),t};const actionBarVariants=["sticky","fixed"];class ActionBar extends SpectrumElement{constructor(){super(...arguments);this.emphasized=!1;this.flexible=!1;this.open=!1;this._variant="";}static get styles(){return [m]}set variant(e){if(e!==this.variant){if(actionBarVariants.includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant="";}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0);}render(){return x`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static=${l(this.emphasized?"white":void 0)}
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
                        static=${l(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}s([n({type:Boolean,reflect:!0})],ActionBar.prototype,"emphasized",2),s([n({type:Boolean,reflect:!0})],ActionBar.prototype,"flexible",2),s([n({type:Boolean,reflect:!0})],ActionBar.prototype,"open",2),s([n({type:String})],ActionBar.prototype,"variant",1);

defineElement("sp-action-bar",ActionBar);
