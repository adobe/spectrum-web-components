"use strict";var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var a=(i,e,s,r)=>{for(var t=r>1?void 0:r?m(e,s):e,o=i.length-1,l;o>=0;o--)(l=i[o])&&(t=(r?l(e,s,t):l(t))||t);return r&&t&&d(e,s,t),t};import{html as c}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as S}from"@spectrum-web-components/base/src/directives.js";import n from"./progress-circle.css.js";import{ProgressCircleBase as v}from"./ProgressCircle.base.js";import{PROGRESS_CIRCLE_STATIC_COLORS_S1 as C}from"./ProgressCircle.types.js";export class ProgressCircle extends v{static get styles(){return[n]}render(){const e=[this.makeRotation(-180+3.6*Math.min(this.progress,50)),this.makeRotation(-180+3.6*Math.max(this.progress-50,0))],s=["Mask1","Mask2"];return c`
      <slot @slotchange=${this.handleSlotchange}></slot>
      <div class="track"></div>
      <div class="fills">
        ${s.map((r,t)=>c`
            <div class="fill${r}">
              <div class="fillSub${r}" style=${S(e[t])}>
                <div class="fill"></div>
              </div>
            </div>
          `)}
      </div>
    `}}ProgressCircle.STATIC_COLORS=C,a([p({type:String,reflect:!0,attribute:"static-color"})],ProgressCircle.prototype,"staticColor",2);
//# sourceMappingURL=ProgressCircle.js.map
