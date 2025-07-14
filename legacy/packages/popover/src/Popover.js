"use strict";var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var r=(p,t,i,l)=>{for(var e=l>1?void 0:l?m(t,i):t,s=p.length-1,a;s>=0;s--)(a=p[s])&&(e=(l?a(t,i,e):a(e))||e);return l&&e&&c(t,i,e),e};import{html as o,nothing as u,SpectrumElement as d}from"@spectrum-web-components/base";import{property as n,query as y}from"@spectrum-web-components/base/src/decorators.js";import v from"./popover.css.js";export class Popover extends d{constructor(){super(...arguments);this.open=!1;this.tip=!1}static get styles(){return[v]}renderTip(){return o`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `}render(){return o`
            <slot></slot>
            ${this.tip?this.renderTip():u}
        `}}r([n({type:Boolean,reflect:!0})],Popover.prototype,"open",2),r([n({reflect:!0})],Popover.prototype,"placement",2),r([n({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),r([y("#tip")],Popover.prototype,"tipElement",2);
//# sourceMappingURL=Popover.js.map
