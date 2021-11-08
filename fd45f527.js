import{S as e,h as t,_ as i,p as a}from"./a8af26b8.js";import{c as r}from"./406723e1.js";import{L as s,a as n,i as o}from"./394c1523.js";const l=e=>e.getRootNode().activeElement;var d=r`:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0ms;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0s linear calc(var(--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)) + var(--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0ms)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}`;class c extends e{constructor(){super(...arguments),this.open=!1}static get styles(){return[d]}render(){return t``}}i([a({type:Boolean,reflect:!0})],c.prototype,"open",void 0),customElements.define("sp-underlay",c);var m=r`:host{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
)}:host{list-style-type:none;margin:0;padding:0}:host{--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular)
);display:block;width:240px}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-multilevel-main-item-font-weight,var(--spectrum-global-font-weight-bold)
)}`;var u=r`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host{list-style-type:none;margin-bottom:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
);margin-left:0;margin-right:0;margin-top:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
)}#item-link{align-items:center;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;cursor:pointer;display:inline-flex;font-size:var(
--spectrum-sidenav-item-text-size,var(--spectrum-alias-font-size-default)
);font-style:normal;font-weight:var(
--spectrum-sidenav-item-text-font-weight,var(--spectrum-global-font-weight-regular)
);-webkit-hyphens:auto;hyphens:auto;justify-content:left;min-height:var(
--spectrum-sidenav-item-height,var(--spectrum-alias-single-line-height)
);padding:var(--spectrum-sidenav-item-padding-y) var(
--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)
);position:relative;text-decoration:none;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;width:100%;word-break:break-word}#item-link:focus{outline:0}:host([dir=ltr]) #item-link.focus-visible:before{left:0}:host([dir=ltr]) #item-link:focus-visible:before{left:0}:host([dir=rtl]) #item-link.focus-visible:before{right:0}:host([dir=rtl]) #item-link:focus-visible:before{right:0}:host([dir=ltr]) #item-link.focus-visible:before{right:0}:host([dir=ltr]) #item-link:focus-visible:before{right:0}:host([dir=rtl]) #item-link.focus-visible:before{left:0}:host([dir=rtl]) #item-link:focus-visible:before{left:0}#item-link.focus-visible:before{border-bottom:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);border-top:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;bottom:0;content:"";position:absolute;top:0}#item-link:focus-visible:before{border-bottom:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);border-top:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;bottom:0;content:"";position:absolute;top:0}:host([dir=ltr]) #item-link ::slotted([slot=icon]){margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) #item-link ::slotted([slot=icon]){margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}#item-link ::slotted([slot=icon]){flex-shrink:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-right:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-left:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-left:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-right:0}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #item-link{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #item-link{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list #item-link{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list #item-link{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([selected])>#item-link{background-color:var(
--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-selected,var(--spectrum-alias-text-color-hover)
)}.is-active>#item-link{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}:host([disabled]) #item-link{background-color:var(
--spectrum-sidenav-item-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);cursor:default;pointer-events:none}#item-link{background-color:var(
--spectrum-sidenav-item-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color,var(--spectrum-alias-text-color)
)}#item-link:hover{background-color:var(
--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-hover,var(--spectrum-alias-text-color-hover)
)}#item-link:active{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}#item-link.focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#item-link:focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#item-link.focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#item-link:focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{display:block}:host([disabled]){pointer-events:none}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,700
)}::slotted(sp-sidenav-item:not([multiLevel])){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,400
)}#item-link{font-weight:var(--spectrum-web-component-sidenav-font-weight);justify-content:start}:host([dir=ltr]) #item-link[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) #item-link[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="1"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="2"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}a ::slotted(sp-sidenav-item){display:none}`;class v extends(s(n)){constructor(){super(...arguments),this.value=void 0,this.manageTabIndex=!1,this.selected=!1,this.expanded=!1}static get styles(){return[u]}get parentSideNav(){return this._parentSidenav||(this._parentSidenav=this.closest("sp-sidenav")),this._parentSidenav}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){let e=0,t=this.parentElement;for(;t instanceof v;)e++,t=t.parentElement;return e}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){!this.href&&e&&e.preventDefault(),this.disabled||(this.hasChildren?this.expanded=!this.expanded:this.value&&this.announceSelected(this.value))}announceSelected(e){const t=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}click(){this.handleClick()}get focusElement(){return this.shadowRoot.querySelector("#item-link")}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return t`<a href="${this.href||"#"}" target="${o(this.target)}" download="${o(this.download)}" rel="${o(this.rel)}" data-level="${this.depth}" @click="${this.handleClick}" id="item-link" aria-current="${o(this.selected&&this.href?"page":void 0)}"><slot name="icon"></slot>${this.label}<slot></slot></a>${this.expanded?t`<slot name="descendant"></slot>`:t``}`}updated(e){if(e.has("selected")||e.has("manageTabIndex")){const e=this.selected?0:-1;this.tabIndex=this.manageTabIndex?e:0}super.updated(e)}connectedCallback(){super.connectedCallback(),this.startTrackingSelection()}disconnectedCallback(){this.stopTrackingSelection(),super.disconnectedCallback()}async startTrackingSelection(){const e=this.parentSideNav;e&&(await e.updateComplete,this.manageTabIndex=e.manageTabIndex,e.startTrackingSelectionForItem(this),this.selected=null!=this.value&&this.value===e.value)}stopTrackingSelection(){const e=this.parentSideNav;e&&e.stopTrackingSelectionForItem(this),this._parentSidenav=void 0}}i([a()],v.prototype,"value",void 0),i([a({type:Boolean,attribute:!1})],v.prototype,"manageTabIndex",void 0),i([a({type:Boolean,reflect:!0})],v.prototype,"selected",void 0),i([a({type:Boolean,reflect:!0})],v.prototype,"expanded",void 0);var p=r`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host([dir=ltr]) .spectrum-SideNav-itemLink.focus-visible:before{left:0}:host([dir=ltr]) .spectrum-SideNav-itemLink:focus-visible:before{left:0}:host([dir=rtl]) .spectrum-SideNav-itemLink.focus-visible:before{right:0}:host([dir=rtl]) .spectrum-SideNav-itemLink:focus-visible:before{right:0}:host([dir=ltr]) .spectrum-SideNav-itemLink.focus-visible:before{right:0}:host([dir=ltr]) .spectrum-SideNav-itemLink:focus-visible:before{right:0}:host([dir=rtl]) .spectrum-SideNav-itemLink.focus-visible:before{left:0}:host([dir=rtl]) .spectrum-SideNav-itemLink:focus-visible:before{left:0}:host([dir=ltr]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) #heading{margin-right:0}:host([dir=rtl]) #heading{margin-left:0}:host([dir=ltr]) #heading{margin-left:0}:host([dir=rtl]) #heading{margin-right:0}#heading{border-radius:var(
--spectrum-sidenav-heading-border-radius,var(--spectrum-alias-border-radius-regular)
);font-size:var(
--spectrum-sidenav-heading-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:normal;font-weight:var(
--spectrum-sidenav-heading-text-font-weight,var(--spectrum-global-font-weight-medium)
);height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);letter-spacing:var(
--spectrum-sidenav-heading-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);margin-bottom:var(
--spectrum-sidenav-heading-gap-bottom,var(--spectrum-global-dimension-size-50)
);margin-top:var(
--spectrum-sidenav-heading-gap-top,var(--spectrum-global-dimension-size-200)
);padding-bottom:0;padding-left:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-right:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-top:0;text-transform:uppercase}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}#heading{color:var(
--spectrum-sidenav-heading-text-color,var(--spectrum-global-color-gray-700)
)}:host{display:block}`;class h extends e{constructor(){super(...arguments),this.label=""}static get styles(){return[u,p]}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return t`<h2 id="heading">${this.label}</h2><div id="list" aria-labelledby="heading"><slot name="descendant"></slot></div>`}}i([a({reflect:!0})],h.prototype,"label",void 0);class g extends n{constructor(){super(),this.items=new Set,this.manageTabIndex=!1,this.value=void 0,this.addEventListener("focusin",this.startListeningToKeyboard)}static get styles(){return[m]}startTrackingSelectionForItem(e){this.items.add(e)}stopTrackingSelectionForItem(e){this.items.delete(e)}handleSelect(e){if(e.stopPropagation(),this.value===e.detail.value)return;const t=this.value;this.value=e.detail.value;this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))?this.items.forEach((t=>t.handleSideNavSelect(e))):(this.value=t,e.target.selected=!1,e.preventDefault())}focus(){this.focusElement!==this&&super.focus()}blur(){this.focusElement!==this&&super.blur()}click(){this.focusElement!==this&&super.click()}get focusElement(){const e=this.querySelector("[selected]");if(e&&!this.isDisabledChild(e))return e;const t=[...this.querySelectorAll("sp-sidenav-item")];let i=0;for(;i<t.length&&t[i]&&this.isDisabledChild(t[i]);)i+=1;return t[i]?t[i]:this}startListeningToKeyboard(){if(this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.stopListeningToKeyboard),this.value&&this.manageTabIndex){const e=this.querySelector(`[value="${this.value}"]`);e&&(e.tabIndex=-1)}}stopListeningToKeyboard(){if(this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.stopListeningToKeyboard),this.value&&this.manageTabIndex){const e=this.querySelector(`[value="${this.value}"]`);e&&(e.tabIndex=0)}}handleKeydown(e){const{code:t}=e;if("ArrowDown"!==t&&"ArrowUp"!==t)return;e.preventDefault();const i="ArrowDown"===t?1:-1;this.focusItemByOffset(i)}focusItemByOffset(e){const t=[...this.querySelectorAll("sp-sidenav-item")];let i=t.indexOf(l(this));i=(t.length+i+e)%t.length;let a=t[i];for(;a&&this.isDisabledChild(a);)i=(t.length+i+e)%t.length,a=t[i];a&&!this.isDisabledChild(a)&&a.focus()}isDisabledChild(e){if(e.disabled)return!0;let t=e.parentElement;for(;t instanceof h||!t.disabled&&t instanceof v&&t.expanded;)t=t.parentElement;return t!==this}handleSlotchange(){this.manageTabIndexes()}async manageTabIndexes(){if(!this.value&&this.manageTabIndex){const e=this.querySelector("sp-sidenav-item:not([tabindex])");e&&(e.tabIndex=-1);const t=this.querySelector("sp-sidenav-item");t&&(await t.updateComplete,t.tabIndex=0)}}render(){return t`<nav @sidenav-select="${this.handleSelect}"><slot name="descendant" @slotchange="${this.handleSlotchange}"></slot></nav>`}firstUpdated(e){super.firstUpdated(e);const t=this.querySelector("[selected]");t?this.value=t.value:this.manageTabIndexes()}updated(e){if(super.updated(e),e.has("manageTabIndex")){[...this.querySelectorAll("sp-sidenav-item")].map((e=>e.manageTabIndex=this.manageTabIndex))}}}i([a({type:Boolean,reflect:!0,attribute:"manage-tab-index"})],g.prototype,"manageTabIndex",void 0),i([a({reflect:!0})],g.prototype,"value",void 0),customElements.define("sp-sidenav",g),customElements.define("sp-sidenav-item",v);export{h as S,l as g};
//# sourceMappingURL=fd45f527.js.map
