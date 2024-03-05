import { c as c$1 } from './async-directive-cHMFxS7f.js';
import { O as Overlay, s as strategies, r as removeSlottableRequest } from './sp-overlay--D_vkN8z.js';
import { A, D, x } from './lit-html-GmIhAbMP.js';
import { e } from './directive-C1gRZbRe.js';
import { l } from './if-defined-pV6JZKXB.js';

class OverlayTriggerDirective extends c$1{constructor(){super(...arguments);this.overlay=new Overlay;this.defaultOptions={triggerInteraction:"hover",overlayOptions:{placement:"top-start",type:"auto",offset:0}};this.options={...this.defaultOptions.overlayOptions};}render(t,r){return A}update(t,[r,e]){var a,s;this.options={...this.defaultOptions.overlayOptions,...e==null?void 0:e.overlayOptions},this.insertionOptions=e==null?void 0:e.insertionOptions,this.template=r;let i=!1;const o=(e==null?void 0:e.triggerInteraction)||this.defaultOptions.triggerInteraction,n=((a=this.strategy)==null?void 0:a.type)!==o;this.target!==t.element&&(this.target=t.element,i=!0),(i||n)&&((s=this.strategy)==null||s.abort(),this.strategy=new strategies[o](this.overlay,this.target,!0)),this.init();}handleSlottableRequest(t){var e,i;if(t.target!==t.currentTarget)return;const r=t.data===removeSlottableRequest;if(D(r?void 0:this.template(),this.overlay),r)this.overlay.remove();else {Overlay.applyOptions(this.overlay,{...this.options,trigger:this.target});const o=typeof((e=this.insertionOptions)==null?void 0:e.el)=="function"?this.insertionOptions.el():((i=this.insertionOptions)==null?void 0:i.el)||this.target,{where:n="afterend"}=this.insertionOptions||{};o.insertAdjacentElement(n,this.overlay);}}init(){var r;(r=this.abortController)==null||r.abort(),this.abortController=new AbortController;const{signal:t}=this.abortController;this.overlay.addEventListener("slottable-request",e=>this.handleSlottableRequest(e),{signal:t});}disconnected(){this.abortController.abort();}reconnected(){this.init();}}const trigger=e(OverlayTriggerDirective);

const tooltip=function(t,r){return trigger(()=>(import('./sp-tooltip-3RhM_h5g.js'),x`
                <sp-tooltip variant=${l(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};

export { trigger as a, tooltip as t };
