import './sp-underlay-BD0tMA8s.js';
import { f as firstFocusableIn } from './first-focusable-in-BK_DAWOm.js';
import { M as MatchMediaController } from './MatchMedia-SZ42m4IA.js';
import { i as i$1 } from './modal.css-SkAvNHaG.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { e } from './query-DQF6X5qW.js';
import './focusable-selectors-CUZEb4r9.js';
import './base-u8Z1Hrsd.js';

const r=i`
    :host{inline-size:100%;justify-content:center;display:flex;position:fixed;inset-block-end:0;inset-inline-start:0}:host{--spectrum-tray-exit-animation-delay:0s;--spectrum-tray-entry-animation-delay:.16s;--spectrum-tray-max-inline-size:375px;--spectrum-tray-spacing-edge-to-tray-safe-zone:64px;--spectrum-tray-entry-animation-duration:var(--spectrum-animation-duration-500);--spectrum-tray-exit-animation-duration:var(--spectrum-animation-duration-100);--spectrum-tray-corner-radius:var(--spectrum-corner-radius-100);--spectrum-tray-background-color:var(--spectrum-background-layer-2-color)}.tray{inline-size:100%;--mod-modal-max-width:100%;max-inline-size:100%;max-block-size:calc(100vh - var(--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone)));box-sizing:border-box;border-radius:var(--mod-tray-corner-radius-portrait,0)var(--mod-tray-corner-radius-portrait,0)0 0;transition:opacity var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))cubic-bezier(.5,0,1,1)var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)),visibility var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))linear calc(var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)) + var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))),transform var(--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration))cubic-bezier(.5,0,1,1)var(--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay));background-color:var(--highcontrast-tray-background-color,var(--mod-tray-background-color,var(--spectrum-tray-background-color)));outline:none;margin-block-start:var(--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone));padding-block-start:var(--mod-tray-top-to-content-area,var(--spectrum-tray-top-to-content-area));padding-block-end:var(--mod-tray-bottom-to-content-area,var(--spectrum-tray-top-to-content-area));overflow:auto;transform:translateY(100%)}:host([open]) .tray{transition:transform var(--mod-tray-entry-animation-duration,var(--spectrum-tray-entry-animation-duration))cubic-bezier(0,0,.4,1)var(--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)),opacity var(--spectrum-tray-entry-animation-duration,var(--mod-tray-entry-animation-duration))cubic-bezier(0,0,.4,1)var(--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay));transform:translateY(0)}@media screen and (orientation:landscape){.tray{max-inline-size:var(--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size));border-start-start-radius:var(--mod-tray-corner-radius,var(--spectrum-tray-corner-radius));border-start-end-radius:var(--mod-tray-corner-radius,var(--spectrum-tray-corner-radius))}}@media (forced-colors:active){.tray{--highcontrast-tray-background-color:Canvas;border:solid}.tray ::slotted(*){border:none}}:host{max-height:100vh;max-height:100dvh;align-items:flex-end;position:fixed!important}sp-underlay{touch-action:none}.tray{overscroll-behavior:contain;display:inline-flex}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);height:1px;width:1px;white-space:nowrap;border:0;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}
`;

var l=Object.defineProperty;var a=(s,r,e,i)=>{for(var t=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(t=(n(r,e,t))||t);return t&&l(r,e,t),t};class Tray extends SpectrumElement{constructor(){super(...arguments);this.open=!1;this.prefersMotion=new MatchMediaController(this,"(prefers-reduced-motion: no-preference)");this.transitionPromise=Promise.resolve();this.resolveTransitionPromise=()=>{};this.animating=!1;}static get styles(){return [i$1,r]}focus(){const e=firstFocusableIn(this);e?e.focus():this.children.length===1?this.tray.focus():super.focus();}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed();}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}));}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed());}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise();}update(e){e.has("open")&&e.get("open")!==void 0&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise(i=>{this.resolveTransitionPromise=()=>{this.animating=!1,i();};})),super.update(e);}render(){return x`
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
        `}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}a([n({type:Boolean,reflect:!0})],Tray.prototype,"open"),a([e(".tray")],Tray.prototype,"tray");

defineElement("sp-tray",Tray);
