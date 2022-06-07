import{$ as e,_ as t,e as i,S as a}from"./972cd366.js";import{R as r}from"./2aee6762.js";import{r as s}from"./e50c5e8d.js";import{L as n,a as o,l}from"./513cc7fb.js";var d=s`:host{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
)}:host{list-style-type:none;margin:0;padding:0}:host{--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular)
);display:block;width:240px}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-multilevel-main-item-font-weight,var(--spectrum-global-font-weight-bold)
)}`;var c=s`#list{--spectrum-sidenav-item-padding-y:var(
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
);position:relative;text-decoration:none;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;width:100%;word-break:break-word}#item-link:focus{outline:0}#item-link:before{border:var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0;transition:border var(--spectrum-global-animation-duration-100,.13s) ease-out}:host([dir=ltr]) #item-link ::slotted([slot=icon]){margin-right:var(
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
)}@media (forced-colors:active){:host{--spectrum-sidenav-item-text-color-selected:HighlightText;--spectrum-sidenav-item-background-color-selected:Highlight;--spectrum-sidenav-item-background-color-disabled:ButtonFace;--spectrum-sidenav-item-text-color-disabled:GrayText;--spectrum-sidenav-item-background-color:ButtonFace;--spectrum-sidenav-item-text-color:ButtonText;--spectrum-sidenav-item-background-color-hover:ButtonFace;--spectrum-sidenav-item-text-color-hover:ButtonText;--spectrum-sidenav-item-background-color-down:ButtonFace;--spectrum-sidenav-item-background-color-key-focus:ButtonFace;--spectrum-sidenav-item-text-color-key-focus:ButtonText;--spectrum-sidenav-item-border-color-key-focus:ButtonText;forced-color-adjust:none}}:host{display:block}:host([disabled]){pointer-events:none}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,700
)}::slotted(sp-sidenav-item:not([multiLevel])){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,400
)}#item-link{font-weight:var(--spectrum-web-component-sidenav-font-weight);justify-content:start}:host([dir=ltr]) #item-link[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) #item-link[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="1"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="2"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}a ::slotted(sp-sidenav-item){display:none}`;class m extends(n(o)){constructor(){super(...arguments),this.value=void 0,this.selected=!1,this.expanded=!1}static get styles(){return[c]}get parentSideNav(){return this._parentSidenav||(this._parentSidenav=this.closest("sp-sidenav")),this._parentSidenav}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){let e=0,t=this.parentElement;for(;t instanceof m;)e++,t=t.parentElement;return e}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){!this.href&&e&&e.preventDefault(),this.disabled||(this.hasChildren?this.expanded=!this.expanded:this.value&&this.announceSelected(this.value))}announceSelected(e){const t=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}click(){this.handleClick()}get focusElement(){return this.shadowRoot.querySelector("#item-link")}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return e`<a href="${this.href||"#"}" target="${l(this.target)}" download="${l(this.download)}" rel="${l(this.rel)}" data-level="${this.depth}" @click="${this.handleClick}" id="item-link" aria-current="${l(this.selected&&this.href?"page":void 0)}"><slot name="icon"></slot>${this.label}<slot></slot></a>${this.expanded?e`<slot name="descendant"></slot>`:e``}`}updated(e){this.hasChildren&&this.expanded&&!this.selected&&(this.focusElement.tabIndex=-1),super.updated(e)}connectedCallback(){super.connectedCallback(),this.startTrackingSelection()}disconnectedCallback(){this.stopTrackingSelection(),super.disconnectedCallback()}async startTrackingSelection(){const e=this.parentSideNav;e&&(await e.updateComplete,e.startTrackingSelectionForItem(this),this.selected=null!=this.value&&this.value===e.value)}stopTrackingSelection(){const e=this.parentSideNav;e&&e.stopTrackingSelectionForItem(this),this._parentSidenav=void 0}}t([i()],m.prototype,"value",void 0),t([i({type:Boolean,reflect:!0})],m.prototype,"selected",void 0),t([i({type:Boolean,reflect:!0})],m.prototype,"expanded",void 0);var u=s`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host([dir=ltr]) #heading{margin-right:0}:host([dir=rtl]) #heading{margin-left:0}:host([dir=ltr]) #heading{margin-left:0}:host([dir=rtl]) #heading{margin-right:0}#heading{border-radius:var(
--spectrum-sidenav-heading-border-radius,var(--spectrum-alias-border-radius-regular)
);color:var(
--spectrum-sidenav-heading-text-color,var(--spectrum-global-color-gray-700)
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
);padding-top:0;text-transform:uppercase}:host{display:block}`;class v extends a{constructor(){super(...arguments),this.label=""}static get styles(){return[c,u]}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return e`<h2 id="heading">${this.label}</h2><div id="list" aria-labelledby="heading"><slot name="descendant"></slot></div>`}}t([i({reflect:!0})],v.prototype,"label",void 0);class p extends o{constructor(){super(...arguments),this.items=new Set,this.rovingTabindexController=new r(this,{focusInIndex:e=>e.findIndex((e=>this.value?!e.disabled&&!this.isDisabledChild(e)&&e.value===this.value:!e.disabled&&!this.isDisabledChild(e))),direction:"vertical",elements:()=>[...this.querySelectorAll("sp-sidenav-item")],isFocusableElement:e=>!e.disabled&&!this.isDisabledChild(e)}),this.manageTabIndex=!1,this.value=void 0}static get styles(){return[d]}startTrackingSelectionForItem(e){this.items.add(e),this.rovingTabindexController.clearElementCache()}stopTrackingSelectionForItem(e){this.items.delete(e),this.rovingTabindexController.clearElementCache()}handleSelect(e){if(e.stopPropagation(),this.value===e.detail.value)return;const t=this.value;this.value=e.detail.value;this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))?this.items.forEach((t=>t.handleSideNavSelect(e))):(this.value=t,e.target.selected=!1,e.preventDefault())}focus(){this.rovingTabindexController.focus()}blur(){this.focusElement!==this&&super.blur()}click(){this.focusElement!==this&&super.click()}get focusElement(){return this.rovingTabindexController.focusInElement||this}isDisabledChild(e){if(e.disabled)return!0;let t=e.parentElement;for(;t instanceof v||!t.disabled&&t instanceof m&&t.expanded;)t=t.parentElement;return t!==this}handleSlotchange(){this.manageTabIndex?this.rovingTabindexController.manage():this.rovingTabindexController.unmanage()}render(){return e`<nav @sidenav-select="${this.handleSelect}"><slot name="descendant" @slotchange="${this.handleSlotchange}"></slot></nav>`}firstUpdated(e){super.firstUpdated(e);const t=this.querySelector("[selected]");t&&(this.value=t.value)}updated(e){super.updated(e),e.has("manageTabIndex")&&(this.manageTabIndex?this.rovingTabindexController.manage():this.rovingTabindexController.unmanage())}}t([i({type:Boolean,reflect:!0,attribute:"manage-tab-index"})],p.prototype,"manageTabIndex",void 0),t([i({reflect:!0})],p.prototype,"value",void 0),customElements.define("sp-sidenav",p),customElements.define("sp-sidenav-item",m);export{v as S};
//# sourceMappingURL=03b17537.js.map
