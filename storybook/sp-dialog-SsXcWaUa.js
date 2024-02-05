import './sp-divider-GAw1eG-h.js';
import './sp-close-button-xmnVNxRt.js';
import './sp-button-group-dfijI00y.js';
import './sp-icon-alert-Bolxr-zN.js';
import { i as i$1 } from './lit-element-xBOPiTek.js';
import { A as AlertDialog } from './AlertDialog-4wUJEG5g.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-tyJ_SCNf.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { o } from './class-map-Q7DIFm9x.js';
import { i as i$2 } from './query-JMOstM_r.js';
import { n, d as defineElement } from './define-element-2O4ZhTAw.js';

const i=i$1`
:host{--spectrum-dialog-fullscreen-header-text-size:28px;--spectrum-dialog-min-inline-size:288px;--spectrum-dialog-confirm-small-width:400px;--spectrum-dialog-confirm-medium-width:480px;--spectrum-dialog-confirm-large-width:640px;--spectrum-dialog-confirm-divider-block-spacing-start:var(
--spectrum-spacing-300
);--spectrum-dialog-confirm-divider-block-spacing-end:var(
--spectrum-spacing-200
);--spectrum-dialog-confirm-description-text-color:var(--spectrum-gray-800);--spectrum-dialog-confirm-title-text-color:var(--spectrum-gray-900);--spectrum-dialog-confirm-description-text-line-height:var(
--spectrum-line-height-100
);--spectrum-dialog-confirm-title-text-line-height:var(
--spectrum-line-height-100
);--spectrum-dialog-heading-font-weight:var(
--spectrum-heading-sans-serif-font-weight
);--spectrum-dialog-confirm-description-padding:var(--spectrum-spacing-50);--spectrum-dialog-confirm-description-margin:calc(var(--spectrum-spacing-50)*-1);--spectrum-dialog-confirm-footer-padding-top:var(--spectrum-spacing-600);--spectrum-dialog-confirm-gap-size:var(
--spectrum-component-pill-edge-to-text-100
);--spectrum-dialog-confirm-buttongroup-padding-top:var(
--spectrum-spacing-600
);--spectrum-dialog-confirm-close-button-size:var(
--spectrum-component-height-100
);--spectrum-dialog-confirm-close-button-padding:calc(26px - var(--spectrum-component-bottom-to-text-300));--spectrum-dialog-confirm-divider-height:var(--spectrum-spacing-50)}:host{box-sizing:border-box;display:flex;inline-size:-moz-fit-content;inline-size:fit-content;max-inline-size:100%;max-height:inherit;min-inline-size:var(
--mod-dialog-min-inline-size,var(--spectrum-dialog-min-inline-size)
);outline:none}:host([size=s]){inline-size:var(
--mod-dialog-confirm-small-width,var(--spectrum-dialog-confirm-small-width)
)}:host([size=m]){inline-size:var(
--mod-dialog-confirm-medium-width,var(--spectrum-dialog-confirm-medium-width)
)}:host([size=l]){inline-size:var(
--mod-dialog-confirm-large-width,var(--spectrum-dialog-confirm-large-width)
)}::slotted([slot=hero]){background-position:50%;background-size:cover;border-top-left-radius:var(
--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius)
);border-top-right-radius:var(
--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius)
);grid-area:hero;height:var(
--mod-dialog-confirm-hero-height,var(--spectrum-dialog-confirm-hero-height)
);overflow:hidden}.grid{display:grid;grid-template-areas:"hero hero hero hero hero hero" ". . . . . ." ". heading header header header ." ". divider divider divider divider ." ". content content content content ." ". footer footer buttonGroup buttonGroup ." ". . . . . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto 1fr auto minmax(0,auto) var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto 1fr auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
);inline-size:100%}::slotted([slot=heading]){color:var(
--mod-dialog-confirm-title-text-color,var(--spectrum-dialog-confirm-title-text-color)
);font-size:var(
--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size)
);font-weight:var(
--mod-dialog-heading-font-weight,var(--spectrum-dialog-heading-font-weight)
);grid-area:heading;line-height:var(
--mod-dialog-confirm-title-text-line-height,var(--spectrum-dialog-confirm-title-text-line-height)
);margin:0;outline:none;padding-inline-end:var(
--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size)
)}.no-header::slotted([slot=heading]){grid-area:heading-start/heading-start/header-end/header-end;padding-inline-end:0}.header{align-items:center;box-sizing:border-box;display:flex;grid-area:header;justify-content:flex-end;outline:none}.divider{grid-area:divider;inline-size:100%;margin-block-end:var(
--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start)
);margin-block-start:var(
--mod-dialog-confirm-divider-block-spacing-end,var(--spectrum-dialog-confirm-divider-block-spacing-end)
)}:host([mode=fullscreen]) [name=heading]+.divider{margin-block-end:calc(var(
--mod-dialog-confirm-divider-block-spacing-start,
var(--spectrum-dialog-confirm-divider-block-spacing-start)
) - var(
--mod-dialog-confirm-description-padding,
var(--spectrum-dialog-confirm-description-padding)
)*2)}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-block-end:calc(var(
--mod-dialog-confirm-divider-block-spacing-end,
var(--spectrum-dialog-confirm-divider-block-spacing-end)
) + var(
--mod-dialog-confirm-divider-block-spacing-start,
var(--spectrum-dialog-confirm-divider-block-spacing-start)
) + var(
--mod-dialog-confirm-divider-height,
var(--spectrum-dialog-confirm-divider-height)
))}.content{-webkit-overflow-scrolling:touch;box-sizing:border-box;color:var(
--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color)
);font-size:var(
--mod-dialog-confirm-description-text-size,var(--spectrum-dialog-confirm-description-text-size)
);font-weight:var(
--mod-dialog-confirm-description-font-weight,var(--spectrum-regular-font-weight)
);grid-area:content;line-height:var(
--mod-dialog-confirm-description-text-line-height,var(--spectrum-dialog-confirm-description-text-line-height)
);margin:0 var(
--mod-dialog-confirm-description-margin,var(--spectrum-dialog-confirm-description-margin)
);outline:none;overflow-y:auto;padding:calc(var(
--mod-dialog-confirm-description-padding,
var(--spectrum-dialog-confirm-description-padding)
)*2)}.footer{display:flex;flex-wrap:wrap;grid-area:footer;outline:none;padding-block-start:var(
--mod-dialog-confirm-footer-padding-top,var(--spectrum-dialog-confirm-footer-padding-top)
)}.footer>*,.footer>.spectrum-Button+.spectrum-Button{margin-bottom:0}.button-group{display:flex;grid-area:buttonGroup;justify-content:flex-end;padding-block-start:var(
--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top)
);padding-inline-start:var(
--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size)
)}.button-group.button-group--noFooter{grid-area:footer-start/footer-start/buttonGroup-end/buttonGroup-end}:host([dismissable]) .grid{grid-template-areas:"hero hero hero hero hero hero hero" ". . . . . closeButton closeButton" ". heading header header typeIcon closeButton closeButton" ". divider divider divider divider divider ." ". content content content content content ." ". footer footer buttonGroup buttonGroup buttonGroup ." ". . . . . . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto 1fr auto minmax(0,auto) minmax(0,var(
--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)
)) var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
);grid-template-rows:auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto 1fr auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
)}:host([dismissable]) .grid .button-group{display:none}:host([dismissable]) .grid .footer{color:var(
--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color)
);grid-area:footer/footer/buttonGroup/buttonGroup}.close-button{grid-area:closeButton;margin-block-start:var(
--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding)
);margin-inline-end:var(
--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding)
);place-self:start end}:host([mode=fullscreen]){inline-size:100%;height:100%}:host([mode=fullscreenTakeover]){border-radius:0;inline-size:100%;height:100%}:host([mode=fullscreenTakeover]),:host([mode=fullscreen]){max-height:none;max-inline-size:none}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:". . . . ." ". heading header buttonGroup ." ". divider divider divider ." ". content content content ." ". . . . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) 1fr auto auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
);grid-template-rows:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto 1fr var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
)}:host([mode=fullscreenTakeover]) ::slotted([slot=heading]),:host([mode=fullscreen]) ::slotted([slot=heading]){font-size:var(
--mod-dialog-fullscreen-header-text-size,var(--spectrum-dialog-fullscreen-header-text-size)
)}:host([mode=fullscreenTakeover]) .content,:host([mode=fullscreen]) .content{max-height:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .button-group,:host([mode=fullscreen]) .footer{padding-block-start:0}:host([mode=fullscreenTakeover]) .footer,:host([mode=fullscreen]) .footer{display:none}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreen]) .button-group{align-self:start;grid-area:buttonGroup}@media screen and (max-width:700px){.grid{grid-template-areas:"hero hero hero hero hero hero" ". . . . . ." ". heading heading heading heading ." ". header header header header ." ". divider divider divider divider ." ". content content content content ." ". footer footer buttonGroup buttonGroup ." ". . . . . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto 1fr auto minmax(0,auto) var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto auto 1fr auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
)}:host([dismissable]) .grid{grid-template-areas:"hero hero hero hero hero hero hero" ". . . . . closeButton closeButton" ". heading heading heading heading closeButton closeButton" ". header header header header header ." ". divider divider divider divider divider ." ". content content content content content ." ". footer footer buttonGroup buttonGroup buttonGroup ." ". . . . . . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto 1fr auto minmax(0,auto) minmax(0,var(
--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)
)) var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
);grid-template-rows:auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto auto 1fr auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
)}.header{justify-content:flex-start}:host([mode=fullscreenTakeover]) .grid,:host([mode=fullscreen]) .grid{display:grid;grid-template-areas:". . ." ". heading ." ". header ." ". divider ." ". content ." ". buttonGroup ." ". . .";grid-template-columns:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) 1fr var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
);grid-template-rows:var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
) auto auto auto 1fr auto var(
--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid)
)}:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreen]) .button-group{padding-block-start:var(
--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top)
)}:host([mode=fullscreenTakeover]) ::slotted([slot=heading]),:host([mode=fullscreen]) ::slotted([slot=heading]){font-size:var(
--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size)
)}}@media (forced-colors:active){:host{border:solid}}:host{--swc-alert-dialog-error-icon-color:var(--spectrum-negative-visual-color)}.content{overflow:hidden}.footer{color:var(
--spectrum-dialog-confirm-description-text-color,var(--spectrum-global-color-gray-800)
)}.type-icon{color:var(
--mod-alert-dialog-error-icon-color,var(--swc-alert-dialog-error-icon-color)
);grid-area:typeIcon}.content[tabindex]{overflow:auto}::slotted(img[slot=hero]){height:auto;width:100%}.grid{grid-template-areas:"hero hero    hero    hero        hero        hero" ".    .       .       .           .           ." ".    heading heading heading     typeIcon    ." ".    divider divider divider     divider     ." ".    content content content     content     ." ".    footer  footer  buttonGroup buttonGroup ." ".    .       .       .           .           ."}
`;var h = i;

var a=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var r=(u,s,e,n)=>{for(var t=n>1?void 0:n?c(s,e):s,p=u.length-1,d;p>=0;p--)(d=u[p])&&(t=(n?d(s,e,t):d(t))||t);return n&&t&&a(s,e,t),t};class Dialog extends ObserveSlotPresence(AlertDialog,['[slot="hero"]','[slot="footer"]','[slot="button"]']){constructor(){super(...arguments);this.error=!1;this.dismissable=!1;this.noDivider=!1;}static get styles(){return [h]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}));}renderHero(){return x`
            <slot name="hero"></slot>
        `}renderFooter(){return x`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const e={"button-group":!0,"button-group--noFooter":!this.hasFooter};return x`
            <sp-button-group class=${o(e)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return x`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return x`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?x`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:A}
                ${this.noDivider?A:x`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():A}
                ${this.hasButtons?this.renderButtons():A}
                ${this.dismissable?this.renderDismiss():A}
            </div>
        `}shouldUpdate(e){return e.has("mode")&&this.mode&&(this.dismissable=!1),e.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(e)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","dialog");}}r([i$2(".close-button")],Dialog.prototype,"closeButton",2),r([n({type:Boolean,reflect:!0})],Dialog.prototype,"error",2),r([n({type:Boolean,reflect:!0})],Dialog.prototype,"dismissable",2),r([n({type:Boolean,reflect:!0,attribute:"no-divider"})],Dialog.prototype,"noDivider",2),r([n({type:String,reflect:!0})],Dialog.prototype,"mode",2),r([n({type:String,reflect:!0})],Dialog.prototype,"size",2);

defineElement("sp-dialog",Dialog);
