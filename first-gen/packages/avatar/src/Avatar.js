"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var o=(a,r,t,i)=>{for(var e=i>1?void 0:i?d(r,t):r,s=a.length-1,l;s>=0;s--)(l=a[s])&&(e=(i?l(r,t,e):l(e))||e);return i&&e&&p(r,t,e),e};import{html as h}from"@spectrum-web-components/base";import{property as n,query as m}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as z}from"@spectrum-web-components/base/src/directives.js";import{LikeAnchor as f}from"@spectrum-web-components/shared/src/like-anchor.js";import{Focusable as S}from"@spectrum-web-components/shared/src/focusable.js";import v from"./avatar.css.js";const c=[50,75,100,200,300,400,500,600,700],u=c[2];export class Avatar extends f(S){constructor(){super(...arguments);this.src="";this._size=u}static get styles(){return[v]}get focusElement(){return this.anchorElement||this}get size(){return this._size}set size(t){const i=t,e=c.includes(i)?i:u;if(e&&this.setAttribute("size",`${e}`),this._size===e)return;const s=this._size;this._size=e,this.requestUpdate("size",s)}render(){const t=h`
            <img
                class="image"
                alt=${z(this.label||void 0)}
                src=${this.src}
            />
        `;return this.href?this.renderAnchor({id:"link",className:"link",anchorContent:t}):t}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||this.setAttribute("size",`${this.size}`)}}o([m("#link")],Avatar.prototype,"anchorElement",2),o([n()],Avatar.prototype,"src",2),o([n({type:Number,reflect:!0})],Avatar.prototype,"size",1);
//# sourceMappingURL=Avatar.js.map
