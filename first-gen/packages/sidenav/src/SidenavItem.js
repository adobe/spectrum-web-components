"use strict";var h=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var n=(c,a,e,t)=>{for(var i=t>1?void 0:t?u(a,e):a,d=c.length-1,l;d>=0;d--)(l=c[d])&&(i=(t?l(a,e,i):l(i))||i);return t&&i&&h(a,e,i),i};import{html as p,nothing as v}from"@spectrum-web-components/base";import{property as o}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as s}from"@spectrum-web-components/base/src/directives.js";import{LikeAnchor as f}from"@spectrum-web-components/shared/src/like-anchor.js";import{Focusable as m}from"@spectrum-web-components/shared/src/focusable.js";import S from"./sidenav-item.css.js";const r=class r extends f(m){constructor(){super(...arguments);this.value=void 0;this.selected=!1;this.expanded=!1}static get styles(){return[S]}get parentSideNav(){return this._parentSidenav||(this._parentSidenav=this.closest("sp-sidenav")),this._parentSidenav}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){let e=0,t=this.parentElement;for(;t instanceof r;)e++,t=t.parentElement;return e}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){!this.href&&e&&e.preventDefault(),!this.disabled&&(!this.href||e!=null&&e.defaultPrevented)&&(this.hasChildren?this.expanded=!this.expanded:this.value&&this.announceSelected(this.value))}announceSelected(e){const t={value:e},i=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(i)}click(){this.handleClick()}get focusElement(){return this.shadowRoot.querySelector("#item-link")}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return p`
            <a
                href=${this.href||"#"}
                target=${s(this.target)}
                download=${s(this.download)}
                rel=${s(this.rel)}
                data-level="${this.depth}"
                @click="${this.handleClick}"
                id="item-link"
                aria-current=${s(this.selected&&this.href?"page":void 0)}
                aria-expanded=${s(this.hasChildren?this.expanded:void 0)}
                aria-controls=${s(this.hasChildren&&this.expanded?"list":void 0)}
            >
                <slot name="icon"></slot>
                <span id="link-text">
                    ${this.label}
                    <slot></slot>
                </span>
            </a>
            ${this.expanded?p`
                      <div id="list" aria-labelledby="item-link" role="list">
                          <slot name="descendant"></slot>
                      </div>
                  `:v}
        `}updated(e){var t;this.hasChildren&&this.expanded&&!this.selected&&((t=this.parentSideNav)!=null&&t.manageTabIndex)?this.focusElement.tabIndex=-1:this.focusElement.removeAttribute("tabindex"),super.updated(e)}connectedCallback(){super.connectedCallback(),this.startTrackingSelection()}disconnectedCallback(){this.stopTrackingSelection(),super.disconnectedCallback()}async startTrackingSelection(){const e=this.parentSideNav;if(e&&(await e.updateComplete,e.startTrackingSelectionForItem(this),this.selected=this.value!=null&&this.value===e.value,this.selected===!0&&e.variant==="multilevel")){let t=this.parentElement;for(;t instanceof r;)t.expanded=!0,t=t.parentElement}}stopTrackingSelection(){const e=this.parentSideNav;e&&e.stopTrackingSelectionForItem(this),this._parentSidenav=void 0}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","listitem")}};n([o()],r.prototype,"value",2),n([o({type:Boolean,reflect:!0})],r.prototype,"selected",2),n([o({type:Boolean,reflect:!0})],r.prototype,"expanded",2);export let SideNavItem=r;
//# sourceMappingURL=SidenavItem.js.map
