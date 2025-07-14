"use strict";var d=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var p=(s,r,e,i)=>{for(var t=i>1?void 0:i?u(r,e):r,o=s.length-1,l;o>=0;o--)(l=s[o])&&(t=(i?l(r,e,t):l(t))||t);return i&&t&&d(r,e,t),t};import{html as c,SizedMixin as n}from"@spectrum-web-components/base";import{property as m}from"@spectrum-web-components/base/src/decorators.js";import{CheckboxBase as h}from"@spectrum-web-components/checkbox/src/CheckboxBase.js";import a from"./switch.css.js";import f from"./switch-legacy.css.js";export class Switch extends n(h){constructor(){super(...arguments);this.emphasized=!1}static get styles(){return window.hasOwnProperty("ShadyDOM")?[a,f]:[a]}render(){return c`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `}firstUpdated(e){super.firstUpdated(e),this.inputElement.setAttribute("role","switch")}updated(e){e.has("checked")&&this.inputElement.setAttribute("aria-checked",this.checked?"true":"false")}}p([m({type:Boolean,reflect:!0})],Switch.prototype,"emphasized",2);
//# sourceMappingURL=Switch.js.map
