"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var i=(c,o,e,s)=>{for(var t=s>1?void 0:s?p(o,e):o,n=c.length-1,a;n>=0;n--)(a=c[n])&&(t=(s?a(o,e,t):a(t))||t);return s&&t&&u(o,e,t),t};import{html as r,SizedMixin as d}from"@spectrum-web-components/base";import{property as l}from"@spectrum-web-components/base/src/decorators.js";import{StyledButton as m}from"./StyledButton.js";import v from"@spectrum-web-components/clear-button/src/clear-button.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";import f from"@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";const h={s:()=>r`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>r`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>r`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>r`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};export class ClearButton extends d(m,{noDefaultSize:!0}){constructor(){super(...arguments);this.quiet=!1}static get styles(){return[...super.styles,v,f]}set variant(e){const s=this._variant,t=this.staticColor;if(e!=="overBackground"){this.removeAttribute("variant"),this._variant=void 0,this.staticColor=void 0;return}this.setAttribute("variant",e),this._variant=e,this.staticColor="white",this.requestUpdate("variant",s),this.requestUpdate("staticColor",t)}get variant(){return this._variant}get buttonContent(){return[h[this.size]()]}render(){return r`
            <div class="fill">${super.render()}</div>
        `}}i([l({type:Boolean,reflect:!0})],ClearButton.prototype,"quiet",2),i([l({reflect:!0})],ClearButton.prototype,"variant",1),i([l({reflect:!0,attribute:"static-color"})],ClearButton.prototype,"staticColor",2);
//# sourceMappingURL=ClearButton.js.map
