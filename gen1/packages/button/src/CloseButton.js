"use strict";var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var n=(e,t,c,r)=>{for(var s=r>1?void 0:r?m(t,c):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(s=(r?l(t,c,s):l(s))||s);return r&&s&&a(t,c,s),s};import{html as o,SizedMixin as u}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import d from"@spectrum-web-components/close-button/src/close-button.css.js";import S from"@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js";import{StyledButton as y}from"./StyledButton.js";const b={s:()=>o`
    <sp-icon-cross200
      slot="icon"
      class="icon spectrum-UIIcon-Cross200"
    ></sp-icon-cross200>
  `,m:()=>o`
    <sp-icon-cross300
      slot="icon"
      class="icon spectrum-UIIcon-Cross300"
    ></sp-icon-cross300>
  `,l:()=>o`
    <sp-icon-cross400
      slot="icon"
      class="icon spectrum-UIIcon-Cross400"
    ></sp-icon-cross400>
  `,xl:()=>o`
    <sp-icon-cross500
      slot="icon"
      class="icon spectrum-UIIcon-Cross500"
    ></sp-icon-cross500>
  `};export class CloseButton extends u(y,{noDefaultSize:!0}){constructor(){super(...arguments);this.variant=""}static get styles(){return[...super.styles,d,S]}get buttonContent(){return[b[this.size](),o`
        <span id="label" class="visually-hidden">
          <slot @slotchange=${this.manageTextObservedSlot}></slot>
        </span>
      `]}}n([p({reflect:!0})],CloseButton.prototype,"variant",2),n([p({reflect:!0,attribute:"static-color"})],CloseButton.prototype,"staticColor",2);
//# sourceMappingURL=CloseButton.js.map
