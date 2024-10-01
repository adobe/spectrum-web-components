import { I as InteractionTypes, s as strategies } from './strategies-BipNjU_G.js';
import { r as removeSlottableRequest } from './slottable-request-event-DXuuyGoq.js';
import { S as SlottableRequestDirective } from './slottable-request-directive-BvrOiskA.js';
import { A as AbstractOverlay } from './AbstractOverlay-CPSq4yHG.js';
import { e } from './directive-Bn5c4u4M.js';
import { T, j, x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

class OverlayTriggerDirective extends SlottableRequestDirective{constructor(){super(...arguments);this.defaultOptions={triggerInteraction:"click",overlayOptions:{type:"auto",offset:0}};this.options={...this.defaultOptions.overlayOptions};}render(e,r){return T}update(e,[r,t]){var n,l,a,p;this.options={...this.defaultOptions.overlayOptions,...t==null?void 0:t.overlayOptions},this.insertionOptions=t==null?void 0:t.insertionOptions,this.template=r,this.host=(n=e.options)==null?void 0:n.host;let i=!1;const o=(t==null?void 0:t.triggerInteraction)||this.defaultOptions.triggerInteraction,s=InteractionTypes[(l=this.strategy)==null?void 0:l.type]!==o;this.target!==e.element&&(this.target=e.element,i=!0),(i||s)&&((a=this.strategy)==null||a.abort(),this.strategy=new strategies[o](this.target,{isPersistent:!0,handleOverlayReady:g=>{this.listenerHost=this.overlay=g,this.init();}})),this.strategy.open=(p=t==null?void 0:t.open)!=null?p:!1;}handleSlottableRequest(e){var i,o;if(e.target!==e.currentTarget)return;const r=e.data===removeSlottableRequest,t={};if(this.host&&(t.host=this.host),j(r?void 0:this.template(),this.overlay,t),r)this.overlay.remove();else {AbstractOverlay.applyOptions(this.overlay,{...this.options,trigger:this.target});const s=typeof((i=this.insertionOptions)==null?void 0:i.el)=="function"?this.insertionOptions.el():((o=this.insertionOptions)==null?void 0:o.el)||this.target,{where:n="afterend"}=this.insertionOptions||{};s.insertAdjacentElement(n,this.overlay);}}}const trigger=e(OverlayTriggerDirective);

const tooltip=function(t,r){return trigger(()=>(import('./sp-tooltip-BpGkeKe1.js'),x`
                <sp-tooltip variant=${o(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,triggerInteraction:"hover",overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};

export { tooltip as a, trigger as t };
