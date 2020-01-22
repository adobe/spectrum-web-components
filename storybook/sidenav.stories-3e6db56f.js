import{c as e,p as t,L as i}from"./lit-element-089a5717.js";import{q as a,k as s,x as n,w as r}from"./storybook-preview-9aba481c.js";import{_ as o}from"./tslib.es6-d9c764b6.js";import{i as l}from"./if-defined-f9b5fa5b.js";import{F as d}from"./focusable-f94b9d2d.js";import"./observe-slot-text-5194cee4.js";var v=e`:host{display:block;width:240px;--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-multilevel-main-item-font-weight,700)}ul{list-style-type:none;margin:0;padding:0}`,c=e`#list{margin:0;padding:0}#list,:host{list-style-type:none}:host{margin:var(--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)) 0}#itemLink{position:relative;display:inline-flex;align-items:center;justify-content:left;box-sizing:border-box;width:100%;min-height:var(--spectrum-sidenav-item-height,var(--spectrum-alias-single-line-height));padding:var(--spectrum-global-dimension-size-65) var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular));font-size:var(--spectrum-sidenav-item-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular));font-style:normal;text-decoration:none;word-break:break-word;-webkit-hyphens:auto;hyphens:auto;cursor:pointer;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;background-color:var(--spectrum-sidenav-item-background-color,var(--spectrum-alias-background-color-transparent));color:var(--spectrum-sidenav-item-text-color,var(--spectrum-alias-text-color))}#itemLink:focus{outline:0}#itemLink.focus-visible:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-color:transparent;border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular));border:var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick)) solid var(--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-focus))}#itemLink .spectrum-SideNav-itemIcon{margin-right:var(--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100))}:host([selected])>#itemLink{color:var(--spectrum-sidenav-item-text-color-selected,var(--spectrum-alias-text-color-hover));background-color:var(--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover))}.is-active>#itemLink{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}:host([disabled]) #itemLink{background-color:var(--spectrum-sidenav-item-background-color-disabled,var(--spectrum-alias-background-color-transparent));color:var(--spectrum-sidenav-item-text-color-disabled,var(--spectrum-alias-text-color-disabled));cursor:default;pointer-events:none}#itemLink:hover{background-color:var(--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-hover,var(--spectrum-alias-text-color-hover))}#itemLink:active{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}#itemLink.focus-visible{background-color:var(--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover))}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,700)}::slotted(sp-sidenav-item){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}#itemLink{font-weight:var(--spectrum-web-component-sidenav-font-weight)}#itemLink[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}#itemLink[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}`;class m extends d{constructor(){super(...arguments),this.value=void 0,this.manageTabIndex=!1,this.selected=!1,this.disabled=!1,this.expanded=!1,this.href=void 0,this.label=""}static get styles(){return[c]}get parentSideNav(){return this.closest("sp-sidenav")}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){for(var e=0,t=this.parentElement;t instanceof m;)e++,t=t.parentElement;return e}firstUpdated(e){super.firstUpdated(e);var t=this.parentSideNav;t&&(t.addEventListener("sidenav-select",e=>this.handleSideNavSelect(e)),this.selected=null!=this.value&&this.value===t.value)}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){if(!this.href&&e&&e.preventDefault(),!this.disabled)if(this.hasChildren)this.expanded=!this.expanded;else if(this.value){var t={value:this.value},i=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(i)}}click(){this.handleClick()}get focusElement(){return this.shadowRoot?this.shadowRoot.querySelector("#itemLink"):this}render(){var e=this.selected?"0":"-1";return a` <a tabindex="${this.manageTabIndex?e:"0"}" href="${this.href||"#"}" target="${l(this.target)}" data-level="${this.depth}" @click="${this.handleClick}" id="itemLink"> ${this.label} </a> ${this.expanded?a` <slot></slot> `:void 0} `}updated(e){if(super.updated(e),e.has("selected")||e.has("manageTabIndex")){var t=this.selected?0:-1;this.tabIndex=this.manageTabIndex?t:0}}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new Event("manage-tab-index",{cancelable:!0}))&&(this.manageTabIndex=!0)}}o([t()],m.prototype,"value",void 0),o([t({type:Boolean,attribute:!1})],m.prototype,"manageTabIndex",void 0),o([t({type:Boolean,reflect:!0})],m.prototype,"selected",void 0),o([t({type:Boolean,reflect:!0})],m.prototype,"disabled",void 0),o([t({type:Boolean,reflect:!0})],m.prototype,"expanded",void 0),o([t()],m.prototype,"href",void 0),o([t()],m.prototype,"target",void 0),o([t()],m.prototype,"label",void 0);var p=e`#list{list-style-type:none;margin:0;padding:0}#heading{height:var(--spectrum-sidenav-header-height,var(--spectrum-alias-single-line-height));line-height:var(--spectrum-sidenav-header-height,var(--spectrum-alias-single-line-height));margin:var(--spectrum-sidenav-header-gap-top,var(--spectrum-global-dimension-size-200)) 0 var(--spectrum-sidenav-header-gap-bottom,var(--spectrum-global-dimension-size-50)) 0;padding:0 var(--spectrum-sidenav-header-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-header-border-radius,var(--spectrum-alias-border-radius-regular));font-size:var(--spectrum-sidenav-header-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-sidenav-header-font-weight,var(--spectrum-global-font-weight-medium));font-style:normal;letter-spacing:var(--spectrum-sidenav-header-letter-spacing,var(--spectrum-global-font-letter-spacing-medium));text-transform:uppercase;color:var(--spectrum-sidenav-header-text-color,var(--spectrum-global-color-gray-700))}:host{display:block}`;class u extends i{constructor(){super(...arguments),this.label=""}static get styles(){return[c,p]}render(){return a` <h2 id="heading">${this.label}</h2> <ul id="list" aria-labelledby="heading"> <slot></slot> </ul> `}}o([t({reflect:!0})],u.prototype,"label",void 0);class h extends d{constructor(){super(),this.manageTabIndex=!1,this.value=void 0,this.startListeningToKeyboard=()=>{this.addEventListener("keydown",this.handleKeydown)},this.stopListeningToKeyboard=()=>{this.removeEventListener("keydown",this.handleKeydown)},this.addEventListener("focusin",this.startListeningToKeyboard),this.addEventListener("focusout",this.stopListeningToKeyboard)}static get styles(){return[v]}handleSelect(e){this.value=e.detail.value}focus(){this.disabled||this.focusElement.isSameNode(this)||this.focusElement.focus()}get focusElement(){var e=this.querySelector("[selected]");if(e&&!this.isDisabledChild(e))return e;for(var t=[...this.querySelectorAll("sp-sidenav-item")],i=0;i<t.length&&t[i]&&this.isDisabledChild(t[i]);)i+=1;return t[i]?t[i]:this}handleKeydown(e){var{code:t}=e;if("ArrowDown"===t||"ArrowUp"===t){e.preventDefault();var i="ArrowDown"===t?1:-1;this.focusItemByOffset(i)}}focusItemByOffset(e){var t=[...this.querySelectorAll("sp-sidenav-item")],i=t.indexOf(document.activeElement);for(i=(t.length+i+e)%t.length;this.isDisabledChild(t[i]);)i=(t.length+i+e)%t.length;t[i].focus()}isDisabledChild(e){if(e.disabled)return!0;for(var t=e.parentElement;t instanceof u||!t.disabled&&t instanceof m&&t.expanded;)t=t.parentElement;return t!==this}render(){return a` <nav @sidenav-select="${this.handleSelect}"> <ul> <slot></slot> </ul> </nav> `}firstUpdated(e){super.firstUpdated(e),this.tabIndex=0}updated(e){(super.updated(e),e.has("manageTabIndex"))&&([...this.querySelectorAll("sp-sidenav-item")].map(e=>e.manageTabIndex=this.manageTabIndex),this.manageTabIndex?this.removeEventListener("manage-tab-index",this.handleManageTabIndex,!0):this.addEventListener("manage-tab-index",this.handleManageTabIndex,!0))}manageShiftTab(){this.addEventListener("keydown",e=>{var t=[...this.querySelectorAll("sp-sidenav-item")].find(e=>!this.isDisabledChild(e));!e.defaultPrevented&&e.shiftKey&&"Tab"===e.code&&(this.manageTabIndex||e.composedPath().includes(t))&&(this.isShiftTabbing=!0,HTMLElement.prototype.focus.apply(this),setTimeout(()=>this.isShiftTabbing=!1,0))})}handleManageTabIndex(e){e.preventDefault()}}o([t({type:Boolean,reflect:!0,attribute:"manage-tab-index"})],h.prototype,"manageTabIndex",void 0),o([t({reflect:!0})],h.prototype,"value",void 0),customElements.get("sp-sidenav")||customElements.define("sp-sidenav",h),customElements.get("sp-sidenav-item")||customElements.define("sp-sidenav-item",m),customElements.get("sp-sidenav-heading")||customElements.define("sp-sidenav-heading",u);var b=()=>s`
        <sp-sidenav
            @sidenav-select=${n("select")}
            ?manage-tab-index=${r("Manage Tab Index",!1,"Element")}
        >
            <sp-sidenav-item
                value="Section 1"
                label="Section 1"
            ></sp-sidenav-item>
            <sp-sidenav-item
                selected
                value="Section 2"
                label="Section 2"
            ></sp-sidenav-item>
            <sp-sidenav-heading label="CATEGORY 1">
                <sp-sidenav-item
                    value="Section 3"
                    label="Section 3"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4"
                    label="Section 4"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `,g=()=>s`
        <sp-sidenav
            variant="multilevel"
            value="2.3.1"
            @sidenav-select=${n("select")}
        >
            <sp-sidenav-item value="foo" label="foo"></sp-sidenav-item>
            <sp-sidenav-item value="baz" label="baz">
                <sp-sidenav-item value="2.1" label="2.1"></sp-sidenav-item>
                <sp-sidenav-item value="2.2" label="2.2"></sp-sidenav-item>
                <sp-sidenav-item value="2.3" label="2.3">
                    <sp-sidenav-item
                        value="2.3.1"
                        label="2.3.1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        disabled
                        value="2.3.2"
                        label="2.3.2"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-item>
            <sp-sidenav-item value="test" label="test"></sp-sidenav-item>
            <sp-sidenav-item value="hi" label="hi"></sp-sidenav-item>
        </sp-sidenav>
    `;g.story={name:"Multi-level"};var f=()=>s`
        <sp-sidenav>
            <sp-sidenav-heading label="CATEGORY 1">
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 2"
                    label="Section 2"
                    disabled
                ></sp-sidenav-item>
                <sp-sidenav-item value="Section 3" label="Section 3">
                    <sp-sidenav-item
                        value="Section 3a"
                        label="Section 3a"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `,x=()=>s`
        <sp-sidenav @sidenav-select=${n("select")}>
            <sp-sidenav-heading label="GITHUB">
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components"
                    label="Code"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/issues"
                    label="Issues"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/pulls"
                    label="Pull Requests"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `,y=["Default","Multilevel","levelsAndDisabled","Hrefs"];export default{component:"sp-sidenav",title:"Sidenav"};export{b as Default,x as Hrefs,g as Multilevel,y as __namedExportsOrder,f as levelsAndDisabled};
//# sourceMappingURL=sidenav.stories-3e6db56f.js.map
