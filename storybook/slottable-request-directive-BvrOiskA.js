import { r as removeSlottableRequest } from './slottable-request-event-DXuuyGoq.js';
import { e } from './directive-Bn5c4u4M.js';
import { f } from './async-directive-DF6rMZJ5.js';
import { T, j } from './lit-html-COgVUehj.js';

class SlottableRequestDirective extends f{render(e){return T}update(e,[t]){this.template=t,this.target!==e.element&&(this.target=e.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init();}handleSlottableRequest(e){if(e.target!==e.currentTarget)return;const t=e.data===removeSlottableRequest;j(t?void 0:this.template(),this.target,{renderBefore:this.renderBefore});}init(){var t;(t=this.listeners)==null||t.abort(),this.listeners=new AbortController;const{signal:e}=this.listeners;this.listenerHost.addEventListener("slottable-request",r=>this.handleSlottableRequest(r),{signal:e});}disconnected(){var e;(e=this.listeners)==null||e.abort();}reconnected(){this.init();}}const slottableRequest=e(SlottableRequestDirective);

export { SlottableRequestDirective as S, slottableRequest as s };
