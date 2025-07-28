"use strict";var m=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(c,s,e,o)=>{for(var t=o>1?void 0:o?u(s,e):s,i=c.length-1,n;i>=0;i--)(n=c[i])&&(t=(o?n(s,e,t):n(t))||t);return o&&t&&m(s,e,t),t};import{html as r,SizedMixin as a}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import{StyledButton as S}from"./StyledButton.js";import f from"@spectrum-web-components/close-button/src/close-button.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js";import y from"@spectrum-web-components/icon/src/spectrum-icon-cross.css.js";const C={s:()=>r`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,m:()=>r`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `,l:()=>r`
        <sp-icon-cross400
            slot="icon"
            class="icon spectrum-UIIcon-Cross400"
        ></sp-icon-cross400>
    `,xl:()=>r`
        <sp-icon-cross500
            slot="icon"
            class="icon spectrum-UIIcon-Cross500"
        ></sp-icon-cross500>
    `};export class CloseButton extends a(S,{noDefaultSize:!0}){constructor(){super(...arguments);this.variant=""}static get styles(){return[...super.styles,f,y]}get buttonContent(){return[C[this.size]()]}}l([p({reflect:!0})],CloseButton.prototype,"variant",2),l([p({reflect:!0,attribute:"static-color"})],CloseButton.prototype,"staticColor",2);
//# sourceMappingURL=CloseButton.js.map
