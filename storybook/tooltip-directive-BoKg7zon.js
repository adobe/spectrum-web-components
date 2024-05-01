import { T, j, x } from './lit-html-COgVUehj.js';
import { e } from './directive-Bn5c4u4M.js';
import { s as strategies } from './strategies-BF0j3L01.js';
import { r as removeSlottableRequest } from './slottable-request-event-DXuuyGoq.js';
import { S as SlottableRequestDirective } from './slottable-request-directive-BLJyk_Ve.js';
import { A as AbstractOverlay } from './AbstractOverlay-C3os01oV.js';
import { o } from './if-defined-DDJGFaN4.js';

class OverlayTriggerDirective extends SlottableRequestDirective{constructor(){super(...arguments);this.defaultOptions={triggerInteraction:"click",overlayOptions:{type:"auto",offset:0}};this.options={...this.defaultOptions.overlayOptions};}render(t,r){return T}update(t,[r,e]){var s,l,a;this.options={...this.defaultOptions.overlayOptions,...e==null?void 0:e.overlayOptions},this.insertionOptions=e==null?void 0:e.insertionOptions,this.template=r;let i=!1;const n=(e==null?void 0:e.triggerInteraction)||this.defaultOptions.triggerInteraction,o=((s=this.strategy)==null?void 0:s.type)!==n;this.target!==t.element&&(this.target=t.element,i=!0),(i||o)&&((l=this.strategy)==null||l.abort(),this.strategy=new strategies[n](this.target,{isPersistent:!0,handleOverlayReady:p=>{this.listenerHost=this.overlay=p,this.init();}})),this.strategy.open=(a=e==null?void 0:e.open)!=null?a:!1;}handleSlottableRequest(t){var e,i;if(t.target!==t.currentTarget)return;const r=t.data===removeSlottableRequest;if(j(r?void 0:this.template(),this.overlay),r)this.overlay.remove();else {AbstractOverlay.applyOptions(this.overlay,{...this.options,trigger:this.target});const n=typeof((e=this.insertionOptions)==null?void 0:e.el)=="function"?this.insertionOptions.el():((i=this.insertionOptions)==null?void 0:i.el)||this.target,{where:o="afterend"}=this.insertionOptions||{};n.insertAdjacentElement(o,this.overlay);}}}const trigger=e(OverlayTriggerDirective);

const tooltip=function(t,r){return trigger(()=>(import('./sp-tooltip-B_mXL8hM.js'),x`
                <sp-tooltip variant=${o(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,triggerInteraction:"hover",overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};

export { tooltip as a, trigger as t };
