"use strict";var n=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(o,r,e,i)=>{for(var t=i>1?void 0:i?u(r,e):r,s=o.length-1,d;s>=0;s--)(d=o[s])&&(t=(i?d(r,e,t):d(t))||t);return i&&t&&n(r,e,t),t};import{html as p,SizedMixin as b,SpectrumElement as h}from"@spectrum-web-components/base";import{property as a,query as c}from"@spectrum-web-components/base/src/decorators.js";import{getLabelFromSlot as m}from"@spectrum-web-components/shared/src/get-label-from-slot.js";import{ifDefined as f}from"@spectrum-web-components/base/src/directives.js";import v from"./progress-circle.css.js";export class ProgressCircle extends b(h,{validSizes:["s","m","l"]}){constructor(){super(...arguments);this.indeterminate=!1;this.label="";this.progress=0}static get styles(){return[v]}makeRotation(e){return this.indeterminate?void 0:`transform: rotate(${e}deg);`}render(){const e=[this.makeRotation(-180+3.6*Math.min(this.progress,50)),this.makeRotation(-180+3.6*Math.max(this.progress-50,0))],i=["Mask1","Mask2"];return p`
            <slot @slotchange=${this.handleSlotchange}></slot>
            <div class="track"></div>
            <div class="fills">
                ${i.map((t,s)=>p`
                        <div class="fill${t}">
                            <div
                                class="fillSub${t}"
                                style=${f(e[s])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `)}
            </div>
        `}handleSlotchange(){const e=m(this.label,this.slotEl);e&&(this.label=e)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar")}updated(e){super.updated(e),!this.indeterminate&&e.has("progress")?this.setAttribute("aria-valuenow",""+this.progress):this.hasAttribute("aria-valuenow")&&this.removeAttribute("aria-valuenow"),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):e.get("label")===this.getAttribute("aria-label")&&this.removeAttribute("aria-label"))}}l([a({type:Boolean,reflect:!0})],ProgressCircle.prototype,"indeterminate",2),l([a({type:String})],ProgressCircle.prototype,"label",2),l([a({reflect:!0,attribute:"static-color"})],ProgressCircle.prototype,"staticColor",2),l([a({type:Number})],ProgressCircle.prototype,"progress",2),l([c("slot")],ProgressCircle.prototype,"slotEl",2);
//# sourceMappingURL=ProgressCircle.js.map
