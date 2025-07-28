"use strict";var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var o=(s,r,e,i)=>{for(var t=i>1?void 0:i?p(r,e):r,l=s.length-1,d;l>=0;l--)(d=s[l])&&(t=(i?d(r,e,t):d(t))||t);return i&&t&&a(r,e,t),t};import{html as u,SpectrumElement as m}from"@spectrum-web-components/base";import{property as n}from"@spectrum-web-components/base/src/decorators.js";import c from"./sidenav-item.css.js";import h from"./sidenav-heading.css.js";export class SideNavHeading extends m{constructor(){super(...arguments);this.label=""}static get styles(){return[c,h]}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return u`
            <h2 id="heading">${this.label}</h2>
            <div id="list" aria-labelledby="heading" role="list">
                <slot name="descendant"></slot>
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","listitem")}}o([n({reflect:!0})],SideNavHeading.prototype,"label",2);
//# sourceMappingURL=SidenavHeading.js.map
