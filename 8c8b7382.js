import"./68c342a5.js";import{f as a}from"./27e6a3fc.js";import{M as r}from"./63c9e783.js";import{i as t}from"./112b2095.js";import{S as i,x as e,n as o,d as n}from"./bd0a9f1e.js";import{i as s}from"./92bf7466.js";var m=t`
.modal{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0s;--spectrum-dialog-fullscreen-margin:32px;--spectrum-dialog-max-height:90vh}.modal{border-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);max-height:var(--spectrum-dialog-max-height);outline:none;overflow:hidden;pointer-events:auto;transform:translateY(var(
--spectrum-dialog-confirm-entry-animation-distance,var(--spectrum-global-dimension-size-250)
));transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0s),visibility 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay, 0s) + var(
--spectrum-dialog-confirm-exit-animation-duration,
var(--spectrum-global-animation-duration-100)
)),transform 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay, 0s) + var(
--spectrum-dialog-confirm-exit-animation-duration,
var(--spectrum-global-animation-duration-100)
));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}}.fullscreen{bottom:var(--spectrum-dialog-fullscreen-margin);left:var(--spectrum-dialog-fullscreen-margin);right:var(--spectrum-dialog-fullscreen-margin);top:var(--spectrum-dialog-fullscreen-margin)}.fullscreen,.fullscreenTakeover{max-height:none;max-width:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;box-sizing:border-box;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}.modal{background:var(
--spectrum-dialog-confirm-background-color,var(--spectrum-alias-background-color-default)
)}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(
--swc-test-duration
);height:100dvh}.modal{overflow:visible}
`;var d=t`
:host{bottom:0;display:flex;inline-size:100%;inset-inline-start:0;justify-content:center;position:fixed}:host{--spectrum-tray-exit-animation-delay:0s;--spectrum-tray-entry-animation-delay:0.16s;--spectrum-tray-max-inline-size:375px;--spectrum-tray-spacing-edge-to-tray-safe-zone:64px;--spectrum-tray-entry-animation-duration:var(
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
)}@media screen and (orientation:landscape){.tray{border-top-left-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);border-top-right-radius:var(
--mod-tray-corner-radius,var(--spectrum-tray-corner-radius)
);max-inline-size:var(
--mod-tray-max-inline-size,var(--spectrum-tray-max-inline-size)
)}}:host{align-items:flex-end;max-height:100vh;max-height:100dvh;position:fixed!important}sp-underlay{touch-action:none}.tray{display:inline-flex;overscroll-behavior:contain;padding:var(--spectrum-tray-padding-y,0) var(--spectrum-tray-padding-x,0)}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}
`,c=Object.defineProperty,l=Object.getOwnPropertyDescriptor,u=(a,r,t,i)=>{for(var e,o=i>1?void 0:i?l(r,t):r,n=a.length-1;n>=0;n--)(e=a[n])&&(o=(i?e(r,t,o):e(o))||o);return i&&o&&c(r,t,o),o};class p extends i{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new r(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve(),this.animating=!1}static get styles(){return[m,d]}focus(){const r=a(this);r?r.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(a){a.has("open")&&void 0!==a.get("open")&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise((a=>{this.resolveTransitionPromise=()=>{this.animating=!1,a()}}))),super.update(a)}render(){return e`
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
        `}async getUpdateComplete(){const a=await super.getUpdateComplete();return await this.transitionPromise,a}}u([o({type:Boolean,reflect:!0})],p.prototype,"open",2),u([s(".tray")],p.prototype,"tray",2),n("sp-tray",p);var y=Object.freeze({__proto__:null});export{y as s,m as v};
//# sourceMappingURL=8c8b7382.js.map
