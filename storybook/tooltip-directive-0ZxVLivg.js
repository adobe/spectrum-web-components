import { A, D, x } from './lit-html-GmIhAbMP.js';
import { e } from './directive-C1gRZbRe.js';
import { O as Overlay, s as strategies } from './sp-overlay--o1x0r8m.js';
import { r as removeSlottableRequest } from './slottable-request-event-SQgFLN7g.js';
import { S as SlottableRequestDirective } from './slottable-request-directive-Lv19myUx.js';
import { l } from './if-defined-pV6JZKXB.js';

class OverlayTriggerDirective extends SlottableRequestDirective{constructor(){super(...arguments);this.overlay=new Overlay;this.defaultOptions={triggerInteraction:"click",overlayOptions:{placement:"top-start",type:"auto",offset:0}};this.options={...this.defaultOptions.overlayOptions};}render(t,r){return A}update(t,[r,e]){var s,a,l;this.options={...this.defaultOptions.overlayOptions,...e==null?void 0:e.overlayOptions},this.insertionOptions=e==null?void 0:e.insertionOptions,this.template=r;let i=!1;const n=(e==null?void 0:e.triggerInteraction)||this.defaultOptions.triggerInteraction,o=((s=this.strategy)==null?void 0:s.type)!==n;this.target!==t.element&&(this.target=t.element,i=!0),(i||o)&&((a=this.strategy)==null||a.abort(),this.strategy=new strategies[n](this.overlay,this.target,!0)),this.listenerHost=this.overlay,this.init(),this.overlay.open=(l=e==null?void 0:e.open)!=null?l:!1;}handleSlottableRequest(t){var e,i;if(t.target!==t.currentTarget)return;const r=t.data===removeSlottableRequest;if(D(r?void 0:this.template(),this.overlay),r)this.overlay.remove();else {Overlay.applyOptions(this.overlay,{...this.options,trigger:this.target});const n=typeof((e=this.insertionOptions)==null?void 0:e.el)=="function"?this.insertionOptions.el():((i=this.insertionOptions)==null?void 0:i.el)||this.target,{where:o="afterend"}=this.insertionOptions||{};n.insertAdjacentElement(o,this.overlay);}}}const trigger=e(OverlayTriggerDirective);

const tooltip=function(t,r){return trigger(()=>(import('./sp-tooltip-CFA-Rw4-.js'),x`
                <sp-tooltip variant=${l(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,triggerInteraction:"hover",overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};

export { tooltip as a, trigger as t };
