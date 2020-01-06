import{h as e}from"./lit-html-6898710b.js";import{e as t,j as i}from"./index-2626287a.js";import{c as s,p as a,L as r}from"./lit-element-81619d09.js";import{_ as n}from"./tslib.es6-d9c764b6.js";import{i as o}from"./if-defined-a4bc040d.js";var l=s`:host{display:block;width:240px;--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-multilevel-main-item-font-weight,700)}ul{list-style-type:none;margin:0;padding:0}`;class d extends r{constructor(){super(...arguments),this.value=void 0}static get styles(){return[l]}handleSelect(e){this.value=e.detail.value}render(){return e` <nav @sidenav-select="${this.handleSelect}"> <ul> <slot></slot> </ul> </nav> `}}n([a({reflect:!0})],d.prototype,"value",void 0);var v=s`#list{margin:0;padding:0}#list,:host{list-style-type:none}:host{margin:var(--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)) 0}#itemLink{position:relative;display:inline-flex;align-items:center;justify-content:left;box-sizing:border-box;width:100%;min-height:var(--spectrum-sidenav-item-height,var(--spectrum-alias-single-line-height));padding:var(--spectrum-global-dimension-size-65) var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular));font-size:var(--spectrum-sidenav-item-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular));font-style:normal;text-decoration:none;word-break:break-word;-webkit-hyphens:auto;hyphens:auto;cursor:pointer;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;background-color:var(--spectrum-sidenav-item-background-color,var(--spectrum-alias-background-color-transparent));color:var(--spectrum-sidenav-item-text-color,var(--spectrum-alias-text-color))}#itemLink:focus{outline:0}#itemLink.focus-visible:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-color:transparent;border-radius:var(--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular));border:var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick)) solid var(--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-focus))}#itemLink .spectrum-SideNav-itemIcon{margin-right:var(--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100))}:host([selected])>#itemLink{color:var(--spectrum-sidenav-item-text-color-selected,var(--spectrum-alias-text-color-hover));background-color:var(--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover))}.is-active>#itemLink{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}:host([disabled]) #itemLink{background-color:var(--spectrum-sidenav-item-background-color-disabled,var(--spectrum-alias-background-color-transparent));color:var(--spectrum-sidenav-item-text-color-disabled,var(--spectrum-alias-text-color-disabled));cursor:default;pointer-events:none}#itemLink:hover{background-color:var(--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-hover,var(--spectrum-alias-text-color-hover))}#itemLink:active{background-color:var(--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover))}#itemLink.focus-visible{background-color:var(--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover));color:var(--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover))}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,700)}::slotted(sp-sidenav-item){--spectrum-web-component-sidenav-font-weight:var(--spectrum-sidenav-item-font-weight,400)}#itemLink{font-weight:var(--spectrum-web-component-sidenav-font-weight)}#itemLink[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}#itemLink[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}`;class c extends r{constructor(){super(...arguments),this.value=void 0,this.selected=!1,this.disabled=!1,this.expanded=!0,this.href=void 0,this.label=""}static get styles(){return[v]}get parentSideNav(){return this.closest("sp-sidenav")}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){for(var e=0,t=this.parentElement;t instanceof c;)e++,t=t.parentElement;return e}firstUpdated(){var e=this.parentSideNav;e&&(e.addEventListener("sidenav-select",e=>this.handleSideNavSelect(e)),this.selected=null!=this.value&&this.value===e.value)}handleSideNavSelect(e){this.selected=e.target===this}handleClick(){if(this.value&&!this.disabled)if(this.hasChildren)this.expanded=!this.expanded;else{var e={value:this.value},t=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:e});this.dispatchEvent(t)}}click(){this.handleClick()}render(){return e` <a href="${o(this.href)}" target="${o(this.target)}" data-level="${this.depth}" @click="${this.handleClick}" id="itemLink"> ${this.label} </a> ${this.expanded?e` <slot></slot> `:void 0} `}}n([a()],c.prototype,"value",void 0),n([a({type:Boolean,reflect:!0})],c.prototype,"selected",void 0),n([a({type:Boolean,reflect:!0})],c.prototype,"disabled",void 0),n([a({type:Boolean,reflect:!0})],c.prototype,"expanded",void 0),n([a()],c.prototype,"href",void 0),n([a()],c.prototype,"target",void 0),n([a()],c.prototype,"label",void 0);var m=s`#list{list-style-type:none;margin:0;padding:0}#heading{height:var(--spectrum-sidenav-header-height,var(--spectrum-alias-single-line-height));line-height:var(--spectrum-sidenav-header-height,var(--spectrum-alias-single-line-height));margin:var(--spectrum-sidenav-header-gap-top,var(--spectrum-global-dimension-size-200)) 0 var(--spectrum-sidenav-header-gap-bottom,var(--spectrum-global-dimension-size-50)) 0;padding:0 var(--spectrum-sidenav-header-padding-x,var(--spectrum-global-dimension-size-150));border-radius:var(--spectrum-sidenav-header-border-radius,var(--spectrum-alias-border-radius-regular));font-size:var(--spectrum-sidenav-header-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-sidenav-header-font-weight,var(--spectrum-global-font-weight-medium));font-style:normal;letter-spacing:var(--spectrum-sidenav-header-letter-spacing,var(--spectrum-global-font-letter-spacing-medium));text-transform:uppercase;color:var(--spectrum-sidenav-header-text-color,var(--spectrum-global-color-gray-700))}:host{display:block}`;class p extends r{constructor(){super(...arguments),this.label=""}static get styles(){return[v,m]}render(){return e` <h2 id="heading">${this.label}</h2> <ul id="list" aria-labelledby="heading"> <slot></slot> </ul> `}}n([a({reflect:!0})],p.prototype,"label",void 0),customElements.get("sp-sidenav")||customElements.define("sp-sidenav",d),customElements.get("sp-sidenav-item")||customElements.define("sp-sidenav-item",c),customElements.get("sp-sidenav-heading")||customElements.define("sp-sidenav-heading",p);var u=()=>t`
        <sp-sidenav @sidenav-select=${i("select")}>
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
    `,h=()=>t`
        <sp-sidenav
            variant="multilevel"
            value="2.3.1"
            @sidenav-select=${i("select")}
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
                        value="2.3.2"
                        label="2.3.2"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-item>
            <sp-sidenav-item value="test" label="test"></sp-sidenav-item>
            <sp-sidenav-item value="hi" label="hi"></sp-sidenav-item>
        </sp-sidenav>
    `;h.story={name:"Multi-level"};var g=()=>t`
        <sp-sidenav @sidenav-select=${i("select")}>
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
    `;export default{component:"sp-sidenav",title:"Sidenav"};export{u as Default,g as Hrefs,h as Multilevel};
//# sourceMappingURL=sidenav.stories-be5bd1cc.js.map
