"use strict";var n=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var r=(a,s,e,i)=>{for(var t=i>1?void 0:i?u(s,e):s,o=a.length-1,p;o>=0;o--)(p=a[o])&&(t=(i?p(s,e,t):p(t))||t);return i&&t&&n(s,e,t),t};import{html as b,nothing as d,SizedMixin as h,SpectrumElement as c}from"@spectrum-web-components/base";import{property as l,query as m}from"@spectrum-web-components/base/src/decorators.js";import{getLabelFromSlot as v}from"@spectrum-web-components/shared/src/get-label-from-slot.js";import{ObserveSlotText as f}from"@spectrum-web-components/shared/src/observe-slot-text.js";import{LanguageResolutionController as g}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import"@spectrum-web-components/field-label/sp-field-label.js";import y from"./meter.css.js";export const meterVariants=["positive","notice","negative"];export class Meter extends h(f(c,""),{noDefaultSize:!0}){constructor(){super(...arguments);this.progress=0;this._variant="";this.label="";this.languageResolver=new g(this);this.sideLabel=!1}static get styles(){return[y]}set variant(e){if(e===this.variant)return;const i=this.variant;meterVariants.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",i)}get variant(){return this._variant}render(){return b`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?d:this.label}
                <slot @slotchange=${this.handleSlotchange}>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const e=v(this.label,this.slotEl);e&&(this.label=e)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","meter progressbar")}updated(e){super.updated(e),e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}r([l({type:Number})],Meter.prototype,"progress",2),r([l({type:String})],Meter.prototype,"variant",1),r([l({type:String,reflect:!0})],Meter.prototype,"label",2),r([m("slot")],Meter.prototype,"slotEl",2),r([l({type:Boolean,reflect:!0,attribute:"side-label"})],Meter.prototype,"sideLabel",2),r([l({reflect:!0,attribute:"static-color"})],Meter.prototype,"staticColor",2);
//# sourceMappingURL=Meter.js.map
