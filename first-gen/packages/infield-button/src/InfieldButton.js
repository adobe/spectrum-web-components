"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var o=(l,e,r,s)=>{for(var t=s>1?void 0:s?p(e,r):e,i=l.length-1,n;i>=0;i--)(n=l[i])&&(t=(s?n(e,r,t):n(t))||t);return s&&t&&u(e,r,t),t};import{html as m,SizedMixin as c}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import{ButtonBase as d}from"@spectrum-web-components/button/src/ButtonBase.js";import y from"./infield-button.css.js";export class InfieldButton extends c(d,{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments);this.quiet=!1}static get styles(){return[...super.styles,y]}get buttonContent(){return[m`
            <div class="fill">
                <slot></slot>
            </div>
        `]}}o([a()],InfieldButton.prototype,"block",2),o([a()],InfieldButton.prototype,"inline",2),o([a({type:Boolean,reflect:!0})],InfieldButton.prototype,"quiet",2);
//# sourceMappingURL=InfieldButton.js.map
