import { c as c$1 } from './async-directive-cHMFxS7f.js';
import { r as removeSlottableRequest } from './slottable-request-event-SQgFLN7g.js';
import { A, D } from './lit-html-GmIhAbMP.js';
import { e } from './directive-C1gRZbRe.js';

class SlottableRequestDirective extends c$1{render(e){return A}update(e,[t]){this.template=t,this.target!==e.element&&(this.target=e.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init();}handleSlottableRequest(e){if(e.target!==e.currentTarget)return;const t=e.data===removeSlottableRequest;D(t?void 0:this.template(),this.target,{renderBefore:this.renderBefore});}init(){var t;(t=this.listeners)==null||t.abort(),this.listeners=new AbortController;const{signal:e}=this.listeners;this.listenerHost.addEventListener("slottable-request",r=>this.handleSlottableRequest(r),{signal:e});}disconnected(){this.listeners.abort();}reconnected(){this.init();}}const slottableRequest=e(SlottableRequestDirective);

export { SlottableRequestDirective as S, slottableRequest as s };
