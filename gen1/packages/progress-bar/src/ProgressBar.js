"use strict";var u=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var t=(n,a,e,s)=>{for(var r=s>1?void 0:s?d(a,e):a,b=n.length-1,p;b>=0;b--)(p=n[b])&&(r=(s?p(a,e,r):p(r))||r);return s&&r&&u(a,e,r),r};import{html as l,nothing as o,SizedMixin as h,SpectrumElement as c}from"@spectrum-web-components/base";import{property as i,query as m}from"@spectrum-web-components/base/src/decorators.js";import{LanguageResolutionController as v,languageResolverUpdatedSymbol as w}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import{getLabelFromSlot as f}from"@spectrum-web-components/shared/src/get-label-from-slot.js";import{ObserveSlotText as g}from"@spectrum-web-components/shared/src/observe-slot-text.js";import"@spectrum-web-components/field-label/sp-field-label.js";import y from"./progress-bar.css.js";export class ProgressBar extends h(g(c,""),{noDefaultSize:!0}){constructor(){super(...arguments);this.indeterminate=!1;this.label="";this.languageResolver=new v(this);this._overBackground=!1;this.sideLabel=!1;this.progress=0}static get styles(){return[y]}get overBackground(){return!!this._overBackground}set overBackground(e){e===!0&&(this.removeAttribute("over-background"),this.staticColor="white")}render(){return l`
      ${this.slotHasContent||this.label?l`
            <sp-field-label size=${this.size} class="label">
              ${this.slotHasContent?o:this.label}
              <slot @slotchange=${this.handleSlotchange}></slot>
            </sp-field-label>
          `:o}
      ${this.label?l`
            ${this.indeterminate?o:l`
                  <sp-field-label size=${this.size} class="percentage">
                    ${this.formatProgress()}
                  </sp-field-label>
                `}
          `:o}
      <div class="track">
        <div
          class="fill"
          style="transform: scaleX(calc(${this.progress} / 100));"
        ></div>
      </div>
    `}handleSlotchange(){const e=f(this.label,this.slotEl);e&&(this.label=e)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}formatProgress(){return new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}updated(e){super.updated(e),e.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax"),this.removeAttribute("aria-valuenow"),this.removeAttribute("aria-valuetext")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"),this.setAttribute("aria-valuenow",""+this.progress),this.setAttribute("aria-valuetext",this.formatProgress()))),!this.indeterminate&&e.has("progress")&&(this.setAttribute("aria-valuenow",""+this.progress),this.setAttribute("aria-valuetext",this.formatProgress())),!this.indeterminate&&e.has(w)&&this.setAttribute("aria-valuetext",this.formatProgress()),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):e.get("label")===this.getAttribute("aria-label")&&this.removeAttribute("aria-label"))}}t([i({type:Boolean,reflect:!0})],ProgressBar.prototype,"indeterminate",2),t([i({type:String,reflect:!0})],ProgressBar.prototype,"label",2),t([i({type:Boolean,attribute:"over-background"})],ProgressBar.prototype,"overBackground",1),t([i({type:Boolean,reflect:!0,attribute:"side-label"})],ProgressBar.prototype,"sideLabel",2),t([i({type:Number})],ProgressBar.prototype,"progress",2),t([i({reflect:!0,attribute:"static-color"})],ProgressBar.prototype,"staticColor",2),t([m("slot")],ProgressBar.prototype,"slotEl",2);
//# sourceMappingURL=ProgressBar.js.map
