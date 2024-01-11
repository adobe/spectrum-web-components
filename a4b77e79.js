import"./1278593d.js";import{f as a}from"./27e6a3fc.js";import{M as r}from"./675a36c1.js";import{i as t}from"./112b2095.js";import{S as i,x as n,n as o,d as e}from"./dd8018c7.js";import{i as m}from"./41f420ad.js";var s=t`
.modal{--spectrum-overlay-animation-distance:6px;--spectrum-overlay-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-overlay-animation-duration-opened:var(
--spectrum-animation-duration-0
);opacity:0;pointer-events:none;transition:transform var(--spectrum-overlay-animation-duration) ease-in-out,opacity var(--spectrum-overlay-animation-duration) ease-in-out,visibility 0s linear var(--spectrum-overlay-animation-duration);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:var(
--mod-overlay-animation-duration-opened,var(--spectrum-overlay-animation-duration-opened)
);visibility:visible}:host{--spectrum-modal-confirm-exit-animation-delay:var(
--spectrum-animation-duration-0
);--spectrum-modal-fullscreen-margin:32px;--spectrum-modal-max-height:90vh;--spectrum-modal-max-width:90%;--spectrum-modal-background-color:var(--spectrum-gray-100);--spectrum-modal-confirm-border-radius:var(--spectrum-corner-radius-100);--spectrum-modal-confirm-exit-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-modal-confirm-entry-animation-duration:var(
--spectrum-animation-duration-500
);--spectrum-modal-confirm-entry-animation-delay:var(
--spectrum-animation-duration-200
);--spectrum-modal-transition-animation-duration:var(
--spectrum-animation-duration-100
)}.modal{background:var(
--mod-modal-background-color,var(--spectrum-modal-background-color)
);border-radius:var(
--mod-modal-confirm-border-radius,var(--spectrum-modal-confirm-border-radius)
);max-block-size:var(
--mod-modal-max-height,var(--spectrum-modal-max-height)
);max-inline-size:var(
--mod-modal-max-width,var(--spectrum-modal-max-width)
);outline:none;overflow:hidden;pointer-events:auto;transform:translateY(var(
--mod-modal-confirm-entry-animation-distance,var(--spectrum-modal-confirm-entry-animation-distance)
));transition:opacity var(
--mod-modal-confirm-exit-animation-duration,var(--spectrum-modal-confirm-exit-animation-duration)
) var(--spectrum-animation-ease-in) var(
--mod-modal-confirm-exit-animation-delay,var(--spectrum-modal-confirm-exit-animation-delay)
),visibility 0s linear calc(var(
--mod-modal-confirm-exit-animation-delay,
var(--spectrum-modal-confirm-exit-animation-delay)
) + var(
--mod-modal-confirm-exit-animation-duration,
var(--spectrum-modal-confirm-exit-animation-duration)
)),transform 0s linear calc(var(
--mod-modal-confirm-exit-animation-delay,
var(--spectrum-modal-confirm-exit-animation-delay)
) + var(
--mod-modal-confirm-exit-animation-duration,
var(--spectrum-modal-confirm-exit-animation-duration)
));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration)
) var(--spectrum-animation-ease-out) var(
--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay)
),opacity var(
--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration)
) var(--spectrum-animation-ease-out) var(
--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;inline-size:100%;height:100%;max-inline-size:100%;max-height:100%}}.fullscreen{inset-block-end:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-block-start:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-inline-end:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
);inset-inline-start:var(
--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin)
)}.fullscreen,.fullscreenTakeover{max-inline-size:none;max-height:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;box-sizing:border-box;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(
--swc-test-duration
);height:100dvh}.modal{overflow:visible}
`;var d=t`
:host{display:flex;inline-size:100%;inset-block-end:0;inset-inline-start:0;justify-content:center;position:fixed}:host{--spectrum-tray-exit-animation-delay:0s;--spectrum-tray-entry-animation-delay:0.16s;--spectrum-tray-max-inline-size:375px;--spectrum-tray-spacing-edge-to-tray-safe-zone:64px;--spectrum-tray-entry-animation-duration:var(
--spectrum-animation-duration-500
);--spectrum-tray-exit-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-tray-corner-radius:var(--spectrum-corner-radius-100);--spectrum-tray-background-color:var(--spectrum-background-layer-2-color)}@media (forced-colors:active){:host{--highcontrast-tray-background-color:Background}}.tray{background-color:var(
--highcontrast-tray-background-color,var(--mod-tray-background-color,var(--spectrum-tray-background-color))
);border-radius:unset;box-sizing:border-box;inline-size:100%;margin-block-start:var(
--mod-tray-spacing-edge-to-tray-safe-zone,var(--spectrum-tray-spacing-edge-to-tray-safe-zone)
);max-block-size:calc(100vh - var(
--mod-tray-spacing-edge-to-tray-safe-zone,
var(--spectrum-tray-spacing-edge-to-tray-safe-zone)
));outline:none;overflow:auto;padding-block-end:var(
--mod-tray-bottom-to-content-area,var(--spectrum-tray-top-to-content-area)
);padding-block-start:var(
--mod-tray-top-to-content-area,var(--spectrum-tray-top-to-content-area)
);transform:translateY(100%);transition:opacity var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) cubic-bezier(.5,0,1,1) var(
--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)
),visibility var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) linear calc(var(
--mod-tray-exit-animation-delay,
var(--spectrum-tray-exit-animation-delay)
) + var(
--mod-tray-exit-animation-duration,
var(--spectrum-tray-exit-animation-duration)
)),transform var(
--mod-tray-exit-animation-duration,var(--spectrum-tray-exit-animation-duration)
) cubic-bezier(.5,0,1,1) var(
--mod-tray-exit-animation-delay,var(--spectrum-tray-exit-animation-delay)
)}:host([open]) .tray{transform:translateY(0);transition:transform var(
--mod-tray-entry-animation-duration,var(--spectrum-tray-entry-animation-duration)
) cubic-bezier(0,0,.4,1) var(
--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)
),opacity var(
--spectrum-tray-entry-animation-duration,var(--mod-tray-entry-animation-duration)
) cubic-bezier(0,0,.4,1) var(
--mod-tray-entry-animation-delay,var(--spectrum-tray-entry-animation-delay)
)}@media screen and (orientation:landscape){.tray{border-start-end-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);border-start-start-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);max-inline-size:var(
--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size)
)}}:host{align-items:flex-end;max-height:100vh;max-height:100dvh;position:fixed!important}sp-underlay{touch-action:none}.tray{display:inline-flex;overscroll-behavior:contain}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,c=Object.defineProperty,l=Object.getOwnPropertyDescriptor,u=(a,r,t,i)=>{for(var n,o=i>1?void 0:i?l(r,t):r,e=a.length-1;e>=0;e--)(n=a[e])&&(o=(i?n(r,t,o):n(o))||o);return i&&o&&c(r,t,o),o};class p extends i{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new r(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve(),this.animating=!1}static get styles(){return[s,d]}focus(){const r=a(this);r?r.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(a){a.has("open")&&void 0!==a.get("open")&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise((a=>{this.resolveTransitionPromise=()=>{this.animating=!1,a()}}))),super.update(a)}render(){return n`
            <sp-underlay
                ?open=${this.open}
                @click=${this.close}
                @transitionend=${this.handleUnderlayTransitionend}
            ></sp-underlay>
            <div
                class="tray modal"
                tabindex="-1"
                @transitionend=${this.handleTrayTransitionend}
            >
                <slot></slot>
            </div>
        `}async getUpdateComplete(){const a=await super.getUpdateComplete();return await this.transitionPromise,a}}u([o({type:Boolean,reflect:!0})],p.prototype,"open",2),u([m(".tray")],p.prototype,"tray",2),e("sp-tray",p);var v=Object.freeze({__proto__:null});export{v as s,s as v};
//# sourceMappingURL=a4b77e79.js.map
