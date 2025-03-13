import { i as i$1 } from './lit-element-BulMEkr1.js';
import { r } from './state-ChcedIDn.js';
import { S as SpectrumElement, n } from './define-element-2VgsDjbW.js';
import { x } from './lit-html-COgVUehj.js';

const systemResolverUpdatedSymbol=Symbol("system resolver updated");class SystemResolutionController{constructor(e){this.system="spectrum";this.host=e,this.host.addController(this);}hostConnected(){this.resolveSystem();}hostDisconnected(){var e;(e=this.unsubscribe)==null||e.call(this);}resolveSystem(){const e=new CustomEvent("sp-system-context",{bubbles:!0,composed:!0,detail:{callback:(t,s)=>{const o=this.system;this.system=t,this.unsubscribe=s,this.host.requestUpdate(systemResolverUpdatedSymbol,o);}},cancelable:!0});this.host.dispatchEvent(e);}}

const i=i$1`
    :host{--spectrum-icon-inline-size:var(--mod-icon-inline-size,var(--mod-icon-size,var(--spectrum-icon-size)));--spectrum-icon-block-size:var(--mod-icon-block-size,var(--mod-icon-size,var(--spectrum-icon-size)));inline-size:var(--spectrum-icon-inline-size);block-size:var(--spectrum-icon-block-size);color:inherit;color:var(--mod-icon-color,inherit);fill:currentColor;pointer-events:none;display:inline-block}@media (forced-colors:active){:host{forced-color-adjust:auto}}:host{--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=xxs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxs)}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxl)}#container{height:100%}img,svg,::slotted(*){height:100%;width:100%;vertical-align:top;color:inherit}@media (forced-colors:active){img,svg,::slotted(*){forced-color-adjust:auto}}:host(:not(:root)){overflow:hidden}
`;

var c=Object.defineProperty;var l=(i,r,e,s)=>{for(var t=void 0,o=i.length-1,u;o>=0;o--)(u=i[o])&&(t=(u(r,e,t))||t);return t&&c(r,e,t),t};class IconBase extends SpectrumElement{constructor(){super(...arguments);this.unsubscribeSystemContext=null;this.spectrumVersion=1;this.label="";this.systemResolver=new SystemResolutionController(this);}static get styles(){return [i]}connectedCallback(){super.connectedCallback();}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeSystemContext&&(this.unsubscribeSystemContext(),this.unsubscribeSystemContext=null);}update(e){e.has("label")&&(this.label?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")),e.has(systemResolverUpdatedSymbol)&&(this.spectrumVersion=this.systemResolver.system==="spectrum-two"?2:1),super.update(e);}render(){return x`
            <slot></slot>
        `}}l([r()],IconBase.prototype,"spectrumVersion"),l([n({reflect:!0})],IconBase.prototype,"label"),l([n({reflect:!0})],IconBase.prototype,"size");

export { IconBase as I, SystemResolutionController as S, systemResolverUpdatedSymbol as s };
