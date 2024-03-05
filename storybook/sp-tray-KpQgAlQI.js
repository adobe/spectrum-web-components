import './sp-underlay-LbN_7iY5.js';
import { f as firstFocusableIn } from './first-focusable-in-LZ7hcu4z.js';
import { M as MatchMediaController } from './MatchMedia-SMh19R1m.js';
import { v } from './modal.css-JF8KQ-ZN.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-z6bXN_P5.js';
import { x } from './lit-html-GmIhAbMP.js';
import { i as i$1 } from './query-JMOstM_r.js';
import './focusable-selectors-VCrFWGqo.js';
import './base-STdhtiz1.js';

const r=i`
    :host{--spectrum-tray-exit-animation-delay:0s;--spectrum-tray-entry-animation-delay:.16s;--spectrum-tray-max-inline-size:375px;--spectrum-tray-spacing-edge-to-tray-safe-zone:64px;--spectrum-tray-entry-animation-duration:var(--spectrum-animation-duration-500);--spectrum-tray-exit-animation-duration:var(--spectrum-animation-duration-100);--spectrum-tray-corner-radius:var(--spectrum-corner-radius-100);--spectrum-tray-background-color:var(--spectrum-background-layer-2-color);justify-content:center;inline-size:100%;display:flex;position:fixed;inset-block-end:0;inset-inline-start:0}.tray{--mod-modal-max-width:100%;max-block-size:calc(100vh - var(--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone)));box-sizing:border-box;border-radius:var(--mod-tray-corner-radius-portrait,0)var(--mod-tray-corner-radius-portrait,0)0 0;transition:opacity var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))cubic-bezier(.5,0,1,1)var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)),visibility var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))linear calc(var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)) + var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))),transform var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))cubic-bezier(.5,0,1,1)var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay));background-color:var(--highcontrast-tray-background-color,var(--mod-tray-background-color,var(--spectrum-tray-background-color)));outline:none;inline-size:100%;max-inline-size:100%;margin-block-start:var(--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone));padding-block-start:var(--mod-tray-top-to-content-area,var(--spectrum-tray-top-to-content-area));padding-block-end:var(--mod-tray-bottom-to-content-area,var(--spectrum-tray-top-to-content-area));overflow:auto;transform:translateY(100%)}:host([open]) .tray{transition:transform var(--mod-tray-entry-animation-duration,var(--spectrum-tray-entry-animation-duration))cubic-bezier(0,0,.4,1)var(--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)),opacity var(--spectrum-tray-entry-animation-duration,var(--mod-tray-entry-animation-duration))cubic-bezier(0,0,.4,1)var(--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay));transform:translateY(0)}@media screen and (orientation:landscape){.tray{max-inline-size:var(--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size));border-start-start-radius:var(--mod-tray-corner-radius,var(--spectrum-tray-corner-radius));border-start-end-radius:var(--mod-tray-corner-radius,var(--spectrum-tray-corner-radius))}}@media (forced-colors:active){.tray{--highcontrast-tray-background-color:Canvas;border:solid}.tray ::slotted(*){border:none}}:host{align-items:flex-end;max-height:100dvh;position:fixed!important}sp-underlay{touch-action:none}.tray{overscroll-behavior:contain;display:inline-flex}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}
`;var y = r;

var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(o,r,e,i)=>{for(var t=i>1?void 0:i?p(r,e):r,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=(i?n(r,e,t):n(t))||t);return i&&t&&l(r,e,t),t};class Tray extends SpectrumElement{constructor(){super(...arguments);this.open=!1;this.prefersMotion=new MatchMediaController(this,"(prefers-reduced-motion: no-preference)");this.transitionPromise=Promise.resolve();this.animating=!1;}static get styles(){return [v,y]}focus(){const e=firstFocusableIn(this);e?e.focus():this.children.length===1?this.tray.focus():super.focus();}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed();}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}));}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed());}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise();}update(e){e.has("open")&&e.get("open")!==void 0&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise(i=>{this.resolveTransitionPromise=()=>{this.animating=!1,i();};})),super.update(e);}render(){return x`
            <sp-underlay
                ?open=${this.open}
                @close=${this.close}
                @transitionend=${this.handleUnderlayTransitionend}
            ></sp-underlay>
            <div
                class="tray modal"
                tabindex="-1"
                @transitionend=${this.handleTrayTransitionend}
            >
                <slot></slot>
            </div>
        `}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}a([n({type:Boolean,reflect:!0})],Tray.prototype,"open",2),a([i$1(".tray")],Tray.prototype,"tray",2);

defineElement("sp-tray",Tray);
