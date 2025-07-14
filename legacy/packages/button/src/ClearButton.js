"use strict";var p=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var l=(e,o,c,t)=>{for(var s=t>1?void 0:t?m(o,c):o,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(t?n(o,c,s):n(s))||s);return t&&s&&p(o,c,s),s};import{html as r,SizedMixin as u}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import{StyledButton as d}from"./StyledButton.js";import I from"@spectrum-web-components/clear-button/src/clear-button.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";import S from"@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";const f={s:()=>r`
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
    `};export class ClearButton extends u(d,{noDefaultSize:!0}){constructor(){super(...arguments);this.variant=""}static get styles(){return[...super.styles,I,S]}get buttonContent(){return[f[this.size]()]}render(){return r`
            <div class="fill">${super.render()}</div>
        `}}l([a({reflect:!0})],ClearButton.prototype,"variant",2);
//# sourceMappingURL=ClearButton.js.map
