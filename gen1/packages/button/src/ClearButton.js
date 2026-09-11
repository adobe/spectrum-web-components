"use strict";var d=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var r=(c,s,t,o)=>{for(var e=o>1?void 0:o?u(s,t):s,a=c.length-1,l;a>=0;a--)(l=c[a])&&(e=(o?l(s,t,e):l(e))||e);return o&&e&&d(s,t,e),e};import{html as i,SizedMixin as p}from"@spectrum-web-components/base";import{property as n}from"@spectrum-web-components/base/src/decorators.js";import m from"@spectrum-web-components/clear-button/src/clear-button.css.js";import b from"@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";import{StyledButton as h}from"./StyledButton.js";const v={s:()=>i`
    <sp-icon-cross75
      slot="icon"
      class="icon spectrum-UIIcon-Cross75"
    ></sp-icon-cross75>
  `,m:()=>i`
    <sp-icon-cross100
      slot="icon"
      class="icon spectrum-UIIcon-Cross100"
    ></sp-icon-cross100>
  `,l:()=>i`
    <sp-icon-cross200
      slot="icon"
      class="icon spectrum-UIIcon-Cross200"
    ></sp-icon-cross200>
  `,xl:()=>i`
    <sp-icon-cross300
      slot="icon"
      class="icon spectrum-UIIcon-Cross300"
    ></sp-icon-cross300>
  `};export class ClearButton extends p(h,{noDefaultSize:!0}){constructor(){super(...arguments);this.quiet=!1}static get styles(){return[...super.styles,m,b]}set variant(t){const o=this._variant,e=this.staticColor;if(t!=="overBackground"){this.removeAttribute("variant"),this._variant=void 0,this.staticColor=void 0;return}this.setAttribute("variant",t),this._variant=t,this.staticColor="white",this.requestUpdate("variant",o),this.requestUpdate("staticColor",e)}get variant(){return this._variant}get buttonContent(){return[v[this.size]()]}render(){return i`
      <div class="fill">${super.render()}</div>
    `}connectedCallback(){super.connectedCallback()}}r([n()],ClearButton.prototype,"label",2),r([n({type:Boolean,reflect:!0})],ClearButton.prototype,"quiet",2),r([n({reflect:!0})],ClearButton.prototype,"variant",1),r([n({reflect:!0,attribute:"static-color"})],ClearButton.prototype,"staticColor",2);
//# sourceMappingURL=ClearButton.js.map
