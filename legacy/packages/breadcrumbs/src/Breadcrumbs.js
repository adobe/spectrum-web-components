"use strict";var d=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=(o,a,e,t)=>{for(var i=t>1?void 0:t?c(a,e):a,l=o.length-1,r;l>=0;l--)(r=o[l])&&(i=(t?r(a,e,i):r(i))||i);return t&&i&&d(a,e,i),i};import{html as u,SpectrumElement as p}from"@spectrum-web-components/base";import{property as n,query as v,queryAssignedElements as h,state as b}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js";import"@spectrum-web-components/action-menu/sp-action-menu.js";import"@spectrum-web-components/menu/sp-menu-item.js";import{createRef as f,ref as g}from"@spectrum-web-components/base/src/directives.js";import E from"./breadcrumbs.css.js";import{ifDefined as I}from"@spectrum-web-components/base/src/directives.js";export class Breadcrumbs extends p{constructor(){super(...arguments);this.maxVisibleItems=4;this.label="";this.menuLabel="More items";this.compact=!1;this.items=[];this.visibleItems=0;this.firstRender=!0;this.menuRef=f()}static get styles(){return[E]}get hasMenu(){var e,t;return this.visibleItems<((t=(e=this.breadcrumbsElements)==null?void 0:e.length)!=null?t:0)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","navigation"),this.resizeObserver=new ResizeObserver(()=>{if(this.firstRender){this.firstRender=!1;return}this.adjustOverflow()}),this.resizeObserver.observe(this)}disconnectedCallback(){var e;(e=this.resizeObserver)==null||e.unobserve(this),super.disconnectedCallback()}updated(e){super.updated(e),e.has("label")&&this.setAttribute("aria-label",this.label||"Breadcrumbs"),(e.has("maxVisibleItems")||e.has("compact"))&&(this.calculateBreadcrumbItemsWidth(),this.adjustOverflow()),e.has("visibleItems")&&this.items.forEach((t,i)=>{this.breadcrumbsElements[i].isLastOfType=i===this.breadcrumbsElements.length-1,this.breadcrumbsElements[i].toggleAttribute("hidden",!t.isVisible)})}calculateBreadcrumbItemsWidth(){this.items=this.breadcrumbsElements.map((e,t)=>{let i=e.offsetWidth;return e.hasAttribute("hidden")&&(e.removeAttribute("hidden"),i=e.offsetWidth,e.setAttribute("hidden","")),{label:e.innerText,href:e.href,value:e.value||t.toString(),offsetWidth:i,isVisible:!0}})}adjustOverflow(){let e=0,t=0;const i=this.list.clientWidth;this.hasMenu&&this.menuRef.value&&(e+=this.menuRef.value.offsetWidth||0),this.rootElement.length>0&&(e+=this.rootElement[0].offsetWidth);const l=0;for(let r=this.items.length-1;r>=l;r--)if(e+=this.items[r].offsetWidth,e<i&&t<Math.max(this.maxVisibleItems,1))this.items[r].isVisible=!0,t++;else{for(let m=r;m>=l;m--)this.items[m].isVisible=!1;break}t===0&&(this.items[this.items.length-1].isVisible=!0,t++),t!==this.visibleItems&&(this.visibleItems=t)}announceChange(e){const t={value:e},i=new CustomEvent("change",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(i)}handleSelect(e){e.stopPropagation(),this.announceChange(e.detail.value)}handleMenuChange(e){e.stopPropagation(),this.announceChange(e.target.value)}renderMenu(){return u`
            <sp-breadcrumb-item role="listitem" class="is-menu">
                <sp-action-menu
                    ${g(this.menuRef)}
                    quiet
                    label=${this.menuLabel}
                    selects="single"
                    value=${this.items[this.items.length-1].value}
                    @change=${this.handleMenuChange}
                    slot="menu"
                >
                    <slot slot="icon" name="icon">
                        <sp-icon-folder-open class="icon"></sp-icon-folder-open>
                    </slot>

                    ${this.items.map(e=>u`
                            <sp-menu-item
                                href=${I(e.href)}
                                value=${e.value}
                            >
                                ${e.label}
                            </sp-menu-item>
                        `)}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `}async slotChangeHandler(){if(this.breadcrumbsElements.length===0){this.items=[],this.visibleItems=0;return}await Promise.all(this.breadcrumbsElements.map(e=>e.updateComplete)),this.calculateBreadcrumbItemsWidth(),this.visibleItems=0,this.adjustOverflow()}render(){return u`
            <ul @breadcrumb-select=${this.handleSelect} id="list">
                <slot name="root"></slot>
                ${this.hasMenu?this.renderMenu():""}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `}}s([n({type:Number,attribute:"max-visible-items"})],Breadcrumbs.prototype,"maxVisibleItems",2),s([n({type:String})],Breadcrumbs.prototype,"label",2),s([n({type:String,attribute:"menu-label"})],Breadcrumbs.prototype,"menuLabel",2),s([n({type:Boolean})],Breadcrumbs.prototype,"compact",2),s([h({selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"breadcrumbsElements",2),s([h({slot:"root",selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"rootElement",2),s([v("#list")],Breadcrumbs.prototype,"list",2),s([b()],Breadcrumbs.prototype,"items",2),s([b()],Breadcrumbs.prototype,"visibleItems",2);
//# sourceMappingURL=Breadcrumbs.js.map
