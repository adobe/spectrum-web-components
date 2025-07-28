"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var i=(d,a,e,t)=>{for(var r=t>1?void 0:t?p(a,e):a,o=d.length-1,n;o>=0;o--)(n=d[o])&&(r=(t?n(a,e,r):n(r))||r);return t&&r&&u(a,e,r),r};import{html as l,SizedMixin as h}from"@spectrum-web-components/base";import{property as s}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as b,when as c}from"@spectrum-web-components/base/src/directives.js";import{Focusable as m}from"@spectrum-web-components/shared/src/focusable.js";import v from"@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js";import f from"./swatch.css.js";import y from"@spectrum-web-components/icon/src/spectrum-icon-dash.css.js";const C={xs:()=>l`
        <sp-icon-dash75
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,s:()=>l`
        <sp-icon-dash100
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,m:()=>l`
        <sp-icon-dash200
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,l:()=>l`
        <sp-icon-dash300
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};export class Swatch extends h(m,{validSizes:["xs","s","m","l"],noDefaultSize:!0}){constructor(){super(...arguments);this.color="";this.label="";this.mixedValue=!1;this.nothing=!1;this.role="button";this.selected=!1;this.renderDisabled=()=>l`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="disabledIcon"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.889,1a8.889,8.889,0,1,0,8.889,8.889A8.889,8.889,0,0,0,9.889,1Zm6.667,8.889a6.635,6.635,0,0,1-1.233,3.863l-9.3-9.3A6.667,6.667,0,0,1,16.556,9.889Zm-13.333,0A6.636,6.636,0,0,1,4.455,6.026l9.3,9.3A6.667,6.667,0,0,1,3.222,9.889Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-color)"
                />
                <path
                    d="M 9.888889312744141 1 C 4.979689598083496 1 1 4.979689598083496 1 9.888889312744141 C 1 14.7980899810791 4.979689598083496 18.77777862548828 9.888889312744141 18.77777862548828 C 14.7980899810791 18.77777862548828 18.77777862548828 14.7980899810791 18.77777862548828 9.888889312744141 C 18.77777862548828 4.979689598083496 14.7980899810791 1 9.888889312744141 1 M 15.32277870178223 13.75166893005371 L 6.02610969543457 4.454998970031738 C 8.059318542480469 3.009572982788086 10.72937774658203 2.820217132568359 12.9462194442749 3.964249610900879 C 15.16304969787598 5.10828971862793 16.55568885803223 7.394259452819824 16.5555591583252 9.888889312744141 C 16.55776977539062 11.27357959747314 16.126708984375 12.62425994873047 15.32277870178223 13.75166893005371 M 9.888258934020996 16.55648612976074 C 8.843273162841797 16.55648612976074 7.794573783874512 16.31111145019531 6.831318855285645 15.8139591217041 C 4.614439010620117 14.66977882385254 3.221879959106445 12.38361930847168 3.222219467163086 9.888889312744141 C 3.220088958740234 8.504219055175781 3.651140213012695 7.153559684753418 4.454998970031738 6.02610969543457 L 13.75166893005371 15.32333946228027 C 12.60186290740967 16.14075088500977 11.24825286865234 16.55648612976074 9.888258934020996 16.55648612976074 M 9.888889312744141 0 C 15.34163951873779 0 19.77777862548828 4.436139106750488 19.77777862548828 9.888889312744141 C 19.77777862548828 15.34163951873779 15.34163951873779 19.77777862548828 9.888889312744141 19.77777862548828 C 4.436139106750488 19.77777862548828 0 15.34163951873779 0 9.888889312744141 C 0 4.436139106750488 4.436139106750488 0 9.888889312744141 0 Z M 15.10232830047607 12.11699867248535 C 15.40205764770508 11.41858959197998 15.55679702758789 10.66494941711426 15.5555591583252 9.89048957824707 C 15.5556697845459 7.759209632873535 14.38009929656982 5.829549789428711 12.48761940002441 4.852889060974121 C 11.68764972686768 4.440059661865234 10.78924942016602 4.22184944152832 9.889529228210449 4.22184944152832 C 9.114802360534668 4.22184944152832 8.360831260681152 4.377038955688477 7.661839485168457 4.676509857177734 L 15.10232830047607 12.11699867248535 Z M 12.11597919464111 15.10181331634521 L 4.675475120544434 7.660861015319824 C 4.375750541687012 8.359296798706055 4.221027374267578 9.112875938415527 4.222219467163086 9.887349128723145 C 4.221929550170898 12.01874923706055 5.397418975830078 13.94855880737305 7.289958953857422 14.92533874511719 C 8.08997917175293 15.3382396697998 8.988459587097168 15.55648994445801 9.888258934020996 15.55648994445801 C 10.66298007965088 15.55648994445801 11.41698551177979 15.40128421783447 12.11597919464111 15.10181331634521 Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-stroke-color)"
                />
            </svg>
        `;this.renderMixedValue=()=>C[this.size]()}static get styles(){return[v,f,y]}get value(){return this._value||this.color||this.label}set value(e){if(e===this._value)return;const t=this.value;this._value=e,this.requestUpdate("value",t)}get focusElement(){return this}toggle(e){this.selected=e!=null?e:!this.selected}handleClick(){if(this.disabled||this.mixedValue)return;this.toggle(),this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||this.toggle()}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),this.addEventListener("keyup",this.handleKeyup);break;default:break}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click();break;default:break}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.click();break;default:break}}render(){return l`
            <div
                class="opacity-checkerboard fill"
                style=${b(this.color?`--spectrum-picked-color: ${this.color}`:void 0)}
            >
                <slot name="image"></slot>
                ${c(this.disabled,this.renderDisabled)}
                ${c(this.mixedValue,this.renderMixedValue)}
            </div>
        `}willUpdate(e){var t;if(this.getAttribute("role")||this.setAttribute("role","button"),e.has("selected")||e.has("role")){const r=this.role==="button"?"aria-pressed":"aria-checked",o=this.role==="button"?"aria-checked":"aria-pressed";e.has("role")&&this.removeAttribute(o),this.setAttribute(r,this.selected?"true":"false")}(e.has("label")||e.has("color")||e.has("mixedValue"))&&(this.label!==this.color&&((t=this.label)!=null&&t.length)?this.setAttribute("aria-label",this.label):this.color?this.setAttribute("aria-label",this.color):this.mixedValue?this.setAttribute("aria-label","Mixed"):this.removeAttribute("aria-label"))}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}}i([s({reflect:!0})],Swatch.prototype,"border",2),i([s()],Swatch.prototype,"color",2),i([s()],Swatch.prototype,"label",2),i([s({type:Boolean,reflect:!0,attribute:"mixed-value"})],Swatch.prototype,"mixedValue",2),i([s({type:Boolean,reflect:!0})],Swatch.prototype,"nothing",2),i([s({reflect:!0})],Swatch.prototype,"role",2),i([s({reflect:!0})],Swatch.prototype,"rounding",2),i([s({type:Boolean,reflect:!0})],Swatch.prototype,"selected",2),i([s({reflect:!0})],Swatch.prototype,"shape",2),i([s()],Swatch.prototype,"value",1);
//# sourceMappingURL=Swatch.js.map
