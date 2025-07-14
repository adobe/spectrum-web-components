"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(s,i,e,r)=>{for(var t=r>1?void 0:r?p(i,e):i,o=s.length-1,l;o>=0;o--)(l=s[o])&&(t=(r?l(i,e,t):l(t))||t);return r&&t&&u(i,e,t),t};import{html as n}from"@spectrum-web-components/base";import{ifDefined as d}from"@spectrum-web-components/base/src/directives.js";import{property as c}from"@spectrum-web-components/base/src/decorators.js";import{Focusable as h}from"@spectrum-web-components/shared/src/focusable.js";import{LikeAnchor as f}from"@spectrum-web-components/shared/src/like-anchor.js";import m from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import b from"./breadcrumb-item.css.js";export class BreadcrumbItem extends f(h){constructor(){super(...arguments);this.value=void 0;this.isLastOfType=!1}static get styles(){return[b,m]}get focusElement(){return this.shadowRoot.querySelector("#item-link")}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","listitem")}announceSelected(e){const r={value:e},t=new CustomEvent("breadcrumb-select",{bubbles:!0,composed:!0,detail:r});this.dispatchEvent(t)}handleClick(e){!this.href&&e&&e.preventDefault(),(!this.href||e!=null&&e.defaultPrevented)&&this.value&&!this.isLastOfType&&this.announceSelected(this.value)}handleKeyDown(e){(e.key==="Enter"||e.keyCode===13)&&this.handleClick(e)}renderLink(){return n`
            <a
                id="item-link"
                href=${d(this.isLastOfType?void 0:this.href)}
                tabindex=${0}
                aria-current=${d(this.isLastOfType?"page":void 0)}
                @keydown=${this.handleKeyDown}
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `}renderSeparator(){return n`
            <sp-icon-chevron100
                id="separator"
                size="xs"
                class="spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `}render(){return n`
            ${this.renderLink()}
            <slot name="menu"></slot>
            ${this.renderSeparator()}
        `}updated(e){e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}a([c()],BreadcrumbItem.prototype,"value",2),a([c({type:Boolean})],BreadcrumbItem.prototype,"isLastOfType",2);
//# sourceMappingURL=BreadcrumbItem.js.map
