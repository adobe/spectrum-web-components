"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var c=(o,t,l,i)=>{for(var e=i>1?void 0:i?d(t,l):t,a=o.length-1,s;a>=0;a--)(s=o[a])&&(e=(i?s(t,l,e):s(e))||e);return i&&e&&p(t,l,e),e};import{html as u}from"@spectrum-web-components/base";import{ifDefined as r}from"@spectrum-web-components/base/src/directives.js";import{property as h,query as n}from"@spectrum-web-components/base/src/decorators.js";import{Focusable as m,LikeAnchor as f}from"@spectrum-web-components/shared";import v from"@spectrum-web-components/tabs/src/tab.css.js";import y from"./top-nav-item.css.js";export class TopNavItem extends f(m){constructor(){super(...arguments);this.selected=!1;this.value=""}static get styles(){return[v,y]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return u`
            <a
                id="item-label"
                href=${r(this.href)}
                download=${r(this.download)}
                target=${r(this.target)}
                aria-label=${r(this.label)}
                aria-current=${r(this.selected&&this.href?"page":void 0)}
                rel=${r(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(l){super.updated(l),this.value=this.anchor.href}}c([n("a")],TopNavItem.prototype,"anchor",2),c([h({type:Boolean,reflect:!0})],TopNavItem.prototype,"selected",2);
//# sourceMappingURL=TopNavItem.js.map
