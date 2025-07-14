"use strict";var u=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var t=(o,a,e,s)=>{for(var l=s>1?void 0:s?d(a,e):a,n=o.length-1,p;n>=0;n--)(p=o[n])&&(l=(s?p(a,e,l):p(l))||l);return s&&l&&u(a,e,l),l};import{html as i,nothing as b,SizedMixin as h,SpectrumElement as c}from"@spectrum-web-components/base";import{property as r,query as m}from"@spectrum-web-components/base/src/decorators.js";import{getLabelFromSlot as f}from"@spectrum-web-components/shared/src/get-label-from-slot.js";import{ObserveSlotText as v}from"@spectrum-web-components/shared/src/observe-slot-text.js";import{LanguageResolutionController as y}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import"@spectrum-web-components/field-label/sp-field-label.js";import g from"./progress-bar.css.js";export class ProgressBar extends h(v(c,""),{noDefaultSize:!0}){constructor(){super(...arguments);this.indeterminate=!1;this.label="";this.languageResolver=new y(this);this.overBackground=!1;this.sideLabel=!1;this.progress=0}static get styles(){return[g]}render(){return i`
            ${this.slotHasContent||this.label?i`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent?i``:this.label}

                          <slot @slotchange=${this.handleSlotchange}></slot>
                      </sp-field-label>
                  `:i``}
            ${this.label?i`
                      ${this.indeterminate?b:i`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
                                </sp-field-label>
                            `}
                  `:b}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const e=f(this.label,this.slotEl);e&&(this.label=e)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(e){super.updated(e),e.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax"),this.removeAttribute("aria-valuenow")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):e.get("label")===this.getAttribute("aria-label")&&this.removeAttribute("aria-label"))}}t([r({type:Boolean,reflect:!0})],ProgressBar.prototype,"indeterminate",2),t([r({type:String,reflect:!0})],ProgressBar.prototype,"label",2),t([r({type:Boolean,reflect:!0,attribute:"over-background"})],ProgressBar.prototype,"overBackground",2),t([r({type:Boolean,reflect:!0,attribute:"side-label"})],ProgressBar.prototype,"sideLabel",2),t([r({type:Number})],ProgressBar.prototype,"progress",2),t([r({reflect:!0,attribute:"static-color"})],ProgressBar.prototype,"staticColor",2),t([m("slot")],ProgressBar.prototype,"slotEl",2);
//# sourceMappingURL=ProgressBar.js.map
