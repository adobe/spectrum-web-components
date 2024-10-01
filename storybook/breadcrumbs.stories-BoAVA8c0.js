import './sp-icon-settings-1w-tY3q8.js';
import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import { F as Focusable } from './focusable-w-VMKDtH.js';
import { L as LikeAnchor } from './like-anchor-B3Uz3TFY.js';
import { r as r$1 } from './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-BExoFMYC.js';
import { i } from './lit-element-BulMEkr1.js';
import { T, x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import { n as n$1, S as SpectrumElement } from './define-element-C_3bgzm7.js';
import './sp-icon-folder-open-C95BlHRi.js';
import './sp-action-menu-phLWl3Od.js';
import './sp-menu-item-DOkBCZjF.js';
import { f } from './async-directive-DF6rMZJ5.js';
import { e as e$2 } from './directive-Bn5c4u4M.js';
import { o as o$2 } from './query-assigned-elements-C9WOp2R6.js';
import { e as e$3 } from './query-DQF6X5qW.js';
import { r as r$2 } from './state-DrummH0c.js';
import './Settings-yr5sbexZ.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-BIYWpr2G.js';
import './focus-visible-D29Av9Xb.js';
import './Chevron100-2ZEB0c-t.js';
import './custom-tag-B5IH9PTE.js';
import './FolderOpen-prhD_638.js';
import './sp-action-button-BGmiWspi.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './ButtonBase-Euqk2NbC.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './sizedMixin-BzkTbMb8.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-icon-more-DU6G5_Dk.js';
import './More-C2yzfCOG.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-TUMgNVnC.js';
import './sp-icon-alert-Cbypiip7.js';
import './sp-menu-C-dIukbW.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './style-map-DtKTc8KS.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './random-id-BST1Puzz.js';
import './directive-helpers-icdnqxxc.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=()=>new h;class h{}const o=new WeakMap,n=e$2(class extends f{render(i){return T}update(i,[s]){const e=s!==this.Y;return e&&void 0!==this.Y&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),T}rt(t){if("function"==typeof this.Y){const i=this.ht??globalThis;let s=o.get(i);void 0===s&&(s=new WeakMap,o.set(i,s)),void 0!==s.get(this.Y)&&this.Y.call(this.ht,void 0),s.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t);}else this.Y.value=t;}get lt(){return "function"==typeof this.Y?o.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

const e=i`
    #separator{margin-block:var(--mod-breadcrumbs-icon-spacing-block,var(--spectrum-breadcrumbs-icon-spacing-block));margin-inline:var(--mod-breadcrumbs-separator-spacing-inline,var(--spectrum-breadcrumbs-separator-spacing-inline));opacity:1;color:var(--highcontrast-breadcrumbs-separator-color,var(--mod-breadcrumbs-separator-color,var(--spectrum-breadcrumbs-separator-color)));position:relative}#separator:dir(rtl),:host([dir=rtl]) #separator{transform:scaleX(-1)}:host{box-sizing:border-box;white-space:nowrap;font-family:var(--mod-breadcrumbs-font-family,var(--spectrum-breadcrumbs-font-family));font-size:var(--mod-breadcrumbs-font-size,var(--spectrum-breadcrumbs-font-size));font-weight:var(--mod-breadcrumbs-font-weight,var(--spectrum-breadcrumbs-font-weight));line-height:var(--mod-breadcrumbs-line-height,var(--spectrum-breadcrumbs-line-height));align-items:center;display:inline-flex;position:relative}:host(:not(.is-menu):last-of-type){font-family:var(--mod-breadcrumbs-font-family-current,var(--spectrum-breadcrumbs-font-family-current));font-size:var(--mod-breadcrumbs-font-size-current,var(--spectrum-breadcrumbs-font-size-current));font-weight:var(--mod-breadcrumbs-font-weight-current,var(--spectrum-breadcrumbs-font-weight-current))}:host(:not(.is-menu):last-of-type) #separator{display:none}::slotted(sp-action-menu){margin-inline:var(--mod-breadcrumbs-action-button-spacing-inline,var(--spectrum-breadcrumbs-action-button-spacing-inline));margin-block:var(--mod-breadcrumbs-action-button-spacing-block,var(--spectrum-breadcrumbs-action-button-spacing-block));color:var(--highcontrast-breadcrumbs-action-button-color,var(--mod-breadcrumbs-action-button-color,var(--spectrum-breadcrumbs-action-button-color)))}::slotted(sp-action-menu[disabled]){color:var(--highcontrast-breadcrumbs-action-button-color-disabled,var(--mod-breadcrumbs-action-button-color-disabled,var(--spectrum-breadcrumbs-action-button-color-disabled)))}:host(:first-of-type)>::slotted(sp-action-menu){margin-inline-start:var(--mod-breadcrumbs-action-button-spacing-inline-start,var(--spectrum-breadcrumbs-action-button-spacing-inline-start))}#item-link{cursor:default;box-sizing:border-box;border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));color:var(--highcontrast-breadcrumbs-text-color,var(--mod-breadcrumbs-text-color,var(--spectrum-breadcrumbs-text-color)));outline:none;margin-block-start:var(--mod-breadcrumbs-text-spacing-block-start,var(--spectrum-breadcrumbs-text-spacing-block-start));margin-block-end:var(--mod-breadcrumbs-text-spacing-block-end,var(--spectrum-breadcrumbs-text-spacing-block-end));-webkit-text-decoration:none;text-decoration:none;display:block;position:relative}#item-link.is-disabled,:host([aria-disabled=true]) #item-link{color:var(--highcontrast-breadcrumbs-text-color-disabled,var(--mod-breadcrumbs-text-color-disabled,var(--spectrum-breadcrumbs-text-color-disabled)))}:host(:not(.is-menu):last-of-type) #item-link{color:var(--highcontrast-breadcrumbs-text-color-current,var(--mod-breadcrumbs-text-color-current,var(--spectrum-breadcrumbs-text-color-current)))}#item-link[href],#item-link[tabindex]{cursor:pointer}#item-link[href]:focus-visible,#item-link[tabindex]:focus-visible{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}@media (hover:hover){#item-link[href]:hover,#item-link[tabindex]:hover{-webkit-text-decoration:underline;text-decoration:underline;text-decoration-thickness:var(--mod-breadcrumbs-text-decoration-thickness,var(--spectrum-breadcrumbs-text-decoration-thickness));text-underline-offset:var(--mod-breadcrumbs-text-decoration-gap,var(--spectrum-breadcrumbs-text-decoration-gap))}}:host .is-dragged #item-link:before,#item-link:focus-visible:before{box-sizing:border-box;inline-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);block-size:calc(100% + var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap))*2 + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness))*2);border-width:var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness));border-radius:var(--mod-breadcrumbs-item-link-border-radius,var(--spectrum-breadcrumbs-item-link-border-radius));content:"";pointer-events:none;border-style:solid;border-color:var(--highcontrast-breadcrumbs-focus-indicator-color,var(--mod-breadcrumbs-focus-indicator-color,var(--spectrum-breadcrumbs-focus-indicator-color)));margin-block-start:calc(( var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);margin-inline-start:calc(( var(--mod-breadcrumbs-focus-indicator-gap,var(--spectrum-breadcrumbs-focus-indicator-gap)) + var(--mod-breadcrumbs-focus-indicator-thickness,var(--spectrum-breadcrumbs-focus-indicator-thickness)))*-1);display:block;position:absolute}:host([hidden]){display:none}:host([disabled]){pointer-events:none}
`;

var u=Object.defineProperty;var a=(s,i,e,r)=>{for(var t=void 0,o=s.length-1,l;o>=0;o--)(l=s[o])&&(t=(l(i,e,t))||t);return t&&u(i,e,t),t};class BreadcrumbItem extends LikeAnchor(Focusable){constructor(){super(...arguments);this.value=void 0;this.isLastOfType=!1;}static get styles(){return [e,r$1]}get focusElement(){return this.shadowRoot.querySelector("#item-link")}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","listitem");}announceSelected(e){const r={value:e},t=new CustomEvent("breadcrumb-select",{bubbles:!0,composed:!0,detail:r});this.dispatchEvent(t);}handleClick(e){!this.href&&e&&e.preventDefault(),(!this.href||e!=null&&e.defaultPrevented)&&this.value&&!this.isLastOfType&&this.announceSelected(this.value);}handleKeyDown(e){(e.key==="Enter"||e.keyCode===13)&&this.handleClick(e);}renderLink(){return x`
            <a
                id="item-link"
                href=${o$1(this.isLastOfType?void 0:this.href)}
                tabindex=${0}
                aria-current=${o$1(this.isLastOfType?"page":void 0)}
                @keydown=${this.handleKeyDown}
                @click=${this.handleClick}
            >
                <slot></slot>
            </a>
        `}renderSeparator(){return x`
            <sp-icon-chevron100
                id="separator"
                size="xs"
                class="spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `}render(){return x`
            ${this.renderLink()}
            <slot name="menu"></slot>
            ${this.renderSeparator()}
        `}updated(e){e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"));}}a([n$1()],BreadcrumbItem.prototype,"value"),a([n$1({type:Boolean})],BreadcrumbItem.prototype,"isLastOfType");

customElements.define("sp-breadcrumb-item",BreadcrumbItem);

const r=i`
    :host{--spectrum-breadcrumbs-block-size:var(--spectrum-breadcrumbs-height);--spectrum-breadcrumbs-block-size-compact:var(--spectrum-breadcrumbs-height-compact);--spectrum-breadcrumbs-block-size-multiline:var(--spectrum-breadcrumbs-height-multiline);--spectrum-breadcrumbs-line-height:var(--spectrum-line-height-100);--spectrum-breadcrumbs-font-size:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-current:var(--spectrum-font-size-200);--spectrum-breadcrumbs-font-family-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-compact:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-compact-current:var(--spectrum-font-size-100);--spectrum-breadcrumbs-font-family-compact-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-compact-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-font-size-multiline:var(--spectrum-font-size-75);--spectrum-breadcrumbs-font-family-multiline:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline:var(--spectrum-regular-font-weight);--spectrum-breadcrumbs-font-size-multiline-current:var(--spectrum-font-size-300);--spectrum-breadcrumbs-font-family-multiline-current:var(--spectrum-sans-font-family-stack);--spectrum-breadcrumbs-font-weight-multiline-current:var(--spectrum-bold-font-weight);--spectrum-breadcrumbs-text-decoration-thickness:var(--spectrum-text-underline-thickness);--spectrum-breadcrumbs-text-decoration-gap:var(--spectrum-text-underline-gap);--spectrum-breadcrumbs-separator-spacing-inline:var(--spectrum-text-to-visual-100);--spectrum-breadcrumbs-text-spacing-block-start:var(--spectrum-breadcrumbs-top-to-text);--spectrum-breadcrumbs-text-spacing-block-end:var(--spectrum-breadcrumbs-bottom-to-text);--spectrum-breadcrumbs-icon-spacing-block:var(--spectrum-breadcrumbs-top-to-separator-icon);--spectrum-breadcrumbs-text-spacing-block-start-compact:var(--spectrum-breadcrumbs-top-to-text-compact);--spectrum-breadcrumbs-text-spacing-block-end-compact:var(--spectrum-breadcrumbs-bottom-to-text-compact);--spectrum-breadcrumbs-icon-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-separator-icon-compact);--spectrum-breadcrumbs-text-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-end-multiline:var(--spectrum-breadcrumbs-bottom-to-text-multiline);--spectrum-breadcrumbs-text-spacing-block-between-multiline:var(--spectrum-breadcrumbs-top-text-to-bottom-text);--spectrum-breadcrumbs-icon-spacing-block-start-multiline:var(--spectrum-breadcrumbs-top-to-separator-icon-multiline);--spectrum-breadcrumbs-icon-spacing-block-between-multiline:var(--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline);--spectrum-breadcrumbs-inline-start:var(--spectrum-breadcrumbs-start-edge-to-text);--spectrum-breadcrumbs-inline-end:var(--spectrum-breadcrumbs-end-edge-to-text);--spectrum-breadcrumbs-action-button-spacing-inline:var(--spectrum-breadcrumbs-truncated-menu-to-separator-icon);--spectrum-breadcrumbs-action-button-spacing-block:var(--spectrum-breadcrumbs-top-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-compact:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-inline-start:var(--spectrum-breadcrumbs-start-edge-to-truncated-menu);--spectrum-breadcrumbs-action-button-spacing-block-multiline:var(--spectrum-breadcrumbs-top-to-truncated-menu-compact);--spectrum-breadcrumbs-action-button-spacing-block-between-multiline:var(--spectrum-breadcrumbs-truncated-menu-to-bottom-text);--spectrum-breadcrumbs-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-breadcrumbs-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-breadcrumbs-item-link-border-radius:var(--spectrum-corner-radius-100);--spectrum-breadcrumbs-text-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-text-color-current:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-text-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-separator-color:var(--spectrum-neutral-content-color-default);--spectrum-breadcrumbs-action-button-color:var(--spectrum-neutral-subdued-content-color-default);--spectrum-breadcrumbs-action-button-color-disabled:var(--spectrum-disabled-content-color);--spectrum-breadcrumbs-focus-indicator-color:var(--spectrum-focus-indicator-color)}@media (forced-colors:active){:host{--highcontrast-breadcrumbs-text-color:LinkText;--highcontrast-breadcrumbs-text-color-current:CanvasText;--highcontrast-breadcrumbs-text-color-disabled:GrayText;--highcontrast-breadcrumbs-separator-color:CanvasText;--highcontrast-breadcrumbs-action-button-color:LinkText;--highcontrast-breadcrumbs-action-button-color-disabled:GrayText;--highcontrast-breadcrumbs-focus-indicator-color:CanvasText}}#list{block-size:var(--mod-breadcrumbs-block-size,var(--spectrum-breadcrumbs-block-size));flex-flow:row;flex:1 0;justify-content:flex-start;align-items:center;margin:0;padding-inline-start:var(--mod-breadcrumbs-inline-start,var(--spectrum-breadcrumbs-inline-start));padding-inline-end:var(--mod-breadcrumbs-inline-end,var(--spectrum-breadcrumbs-inline-end));list-style-type:none;display:flex}:host([compact]) #list{block-size:var(--mod-breadcrumbs-block-size-compact,var(--spectrum-breadcrumbs-block-size-compact))}.spectrum-Breadcrumbs--multiline{block-size:var(--mod-breadcrumbs-block-size-multiline,var(--spectrum-breadcrumbs-block-size-multiline));flex-wrap:wrap;align-content:center}:host([compact]) ::slotted(sp-breadcrumb-item){font-family:var(--mod-breadcrumbs-font-family-compact,var(--spectrum-breadcrumbs-font-family-compact));font-size:var(--mod-breadcrumbs-font-size-compact,var(--spectrum-breadcrumbs-font-size-compact));font-weight:var(--mod-breadcrumbs-font-weight-compact,var(--spectrum-breadcrumbs-font-weight-compact))}:host([compact]) ::slotted(:last-of-type){font-family:var(--mod-breadcrumbs-font-family-compact-current,var(--spectrum-breadcrumbs-font-family-compact-current));font-size:var(--mod-breadcrumbs-font-size-compact-current,var(--spectrum-breadcrumbs-font-size-compact-current));font-weight:var(--mod-breadcrumbs-font-weight-compact-current,var(--spectrum-breadcrumbs-font-weight-compact-current))}:host{display:block}:host([compact]){--mod-breadcrumbs-icon-spacing-block:var(--mod-breadcrumbs-icon-spacing-block-compact,var(--spectrum-breadcrumbs-icon-spacing-block-compact));--mod-breadcrumbs-text-spacing-block-start:var(--mod-breadcrumbs-text-spacing-block-start-compact,var(--spectrum-breadcrumbs-text-spacing-block-start-compact));--mod-breadcrumbs-text-spacing-block-end:var(--mod-breadcrumbs-text-spacing-block-end-compact,var(--spectrum-breadcrumbs-text-spacing-block-end-compact));--mod-breadcrumbs-action-button-spacing-block:var(--mod-breadcrumbs-action-button-spacing-block-compact,var(--spectrum-breadcrumbs-action-button-spacing-block-compact))}:host([dir]) slot[slot=icon]::slotted([slot=icon]),:host([dir]) slot[slot=icon] .icon{margin-inline:calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)calc(( var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}
`;

var d=Object.defineProperty;var s=(o,a,e,t)=>{for(var i=void 0,l=o.length-1,r;l>=0;l--)(r=o[l])&&(i=(r(a,e,i))||i);return i&&d(a,e,i),i};class Breadcrumbs extends SpectrumElement{constructor(){super(...arguments);this.maxVisibleItems=4;this.label="";this.menuLabel="More items";this.compact=!1;this.items=[];this.visibleItems=0;this.firstRender=!0;this.menuRef=e$1();}static get styles(){return [r]}get hasMenu(){var e,t;return this.visibleItems<((t=(e=this.breadcrumbsElements)==null?void 0:e.length)!=null?t:0)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","navigation"),this.resizeObserver=new ResizeObserver(()=>{if(this.firstRender){this.firstRender=!1;return}this.adjustOverflow();}),this.resizeObserver.observe(this);}disconnectedCallback(){var e;(e=this.resizeObserver)==null||e.unobserve(this),super.disconnectedCallback();}updated(e){super.updated(e),e.has("label")&&this.setAttribute("aria-label",this.label||"Breadcrumbs"),(e.has("maxVisibleItems")||e.has("compact"))&&(this.calculateBreadcrumbItemsWidth(),this.adjustOverflow()),e.has("visibleItems")&&this.items.forEach((t,i)=>{this.breadcrumbsElements[i].isLastOfType=i===this.breadcrumbsElements.length-1,this.breadcrumbsElements[i].toggleAttribute("hidden",!t.isVisible);});}calculateBreadcrumbItemsWidth(){this.items=this.breadcrumbsElements.map((e,t)=>{let i=e.offsetWidth;return e.hasAttribute("hidden")&&(e.removeAttribute("hidden"),i=e.offsetWidth,e.setAttribute("hidden","")),{label:e.innerText,href:e.href,value:e.value||t.toString(),offsetWidth:i,isVisible:!0}});}adjustOverflow(){let e=0,t=0;const i=this.list.clientWidth;this.hasMenu&&this.menuRef.value&&(e+=this.menuRef.value.offsetWidth||0),this.rootElement.length>0&&(e+=this.rootElement[0].offsetWidth);const l=0;for(let r=this.items.length-1;r>=l;r--)if(e+=this.items[r].offsetWidth,e<i&&t<Math.max(this.maxVisibleItems,1))this.items[r].isVisible=!0,t++;else {for(let m=r;m>=l;m--)this.items[m].isVisible=!1;break}t===0&&(this.items[this.items.length-1].isVisible=!0,t++),t!==this.visibleItems&&(this.visibleItems=t);}announceChange(e){const t={value:e},i=new CustomEvent("change",{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(i);}handleSelect(e){e.stopPropagation(),this.announceChange(e.detail.value);}handleMenuChange(e){e.stopPropagation(),this.announceChange(e.target.value);}renderMenu(){return x`
            <sp-breadcrumb-item role="listitem" class="is-menu">
                <sp-action-menu
                    ${n(this.menuRef)}
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

                    ${this.items.map(e=>x`
                            <sp-menu-item
                                href=${o$1(e.href)}
                                value=${e.value}
                            >
                                ${e.label}
                            </sp-menu-item>
                        `)}
                </sp-action-menu>
            </sp-breadcrumb-item>
        `}async slotChangeHandler(){if(this.breadcrumbsElements.length===0){this.items=[],this.visibleItems=0;return}await Promise.all(this.breadcrumbsElements.map(e=>e.updateComplete)),this.calculateBreadcrumbItemsWidth(),this.adjustOverflow();}render(){return x`
            <ul @breadcrumb-select=${this.handleSelect} id="list">
                <slot name="root"></slot>
                ${this.hasMenu?this.renderMenu():""}
                <slot @slotchange=${this.slotChangeHandler}></slot>
            </ul>
        `}}s([n$1({type:Number,attribute:"max-visible-items"})],Breadcrumbs.prototype,"maxVisibleItems"),s([n$1({type:String})],Breadcrumbs.prototype,"label"),s([n$1({type:String,attribute:"menu-label"})],Breadcrumbs.prototype,"menuLabel"),s([n$1({type:Boolean})],Breadcrumbs.prototype,"compact"),s([o$2({selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"breadcrumbsElements"),s([o$2({slot:"root",selector:"sp-breadcrumb-item"})],Breadcrumbs.prototype,"rootElement"),s([e$3("#list")],Breadcrumbs.prototype,"list"),s([r$2()],Breadcrumbs.prototype,"items"),s([r$2()],Breadcrumbs.prototype,"visibleItems");

customElements.define("sp-breadcrumbs",Breadcrumbs);

const dummyOrganizer = [
  "Your stuff",
  "Files",
  "Team",
  "In progress",
  "Trend",
  "Winter",
  "Assets",
  "18x24"
];
const getBreadcrumbsWithLinks = (count) => {
  const breadcrumbs = [];
  for (let i = 0; i < count; i++) {
    breadcrumbs.push(x`
            <sp-breadcrumb-item href=${window.location.href}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
  }
  return breadcrumbs;
};
const getBreadcrumbs = (count) => {
  const breadcrumbs = [];
  for (let i = 0; i < count; i++) {
    breadcrumbs.push(x`
            <sp-breadcrumb-item value=${i}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
  }
  return breadcrumbs;
};
const getResizableStyles = () => {
  return x`
        <style>
            .resizable-container {
                border: 2px solid;
                padding: 20px;
                width: 300px;
                resize: both;
                overflow: auto;
            }
        </style>
    `;
};
const Template = (args) => x`
    <sp-breadcrumbs
        ${spreadProps(args)}
        max-visible-items=${o$1(args["max-visible-items"])}
        @change=${args.onChange}
        ?compact=${args.compact}
    >
        <sp-breadcrumb-item value="0">Your stuff</sp-breadcrumb-item>
        <sp-breadcrumb-item ?disabled=${args.disabled} value="1">
            Files
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="2">Team</sp-breadcrumb-item>
        <sp-breadcrumb-item value="3">In progress</sp-breadcrumb-item>
    </sp-breadcrumbs>
`;

const argTypes = {
  compact: {
    name: "compact",
    type: { name: "boolean", required: false },
    description: "Reduces the size of the Breadcrumbs and the padding around the items.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  label: {
    name: "label",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "Breadcrumbs" }
    },
    control: "text"
  },
  maxVisibleItems: {
    name: "max-visible-items",
    type: { name: "number", required: false },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: "4" }
    },
    control: "number"
  },
  onChange: { action: "change" }
};

var breadcrumbs_stories = {
  title: "Breadcrumbs",
  component: "sp-breadcrumbs",
  args: {
    "max-visible-items": 4
  },
  argTypes
};
const Default = (args) => Template(args);
const Disabled = (args) => Template(args);
Disabled.args = {
  disabled: true
};
const Compact = (args) => Template(args);
Compact.args = {
  compact: true
};
const Links = (args) => {
  return x`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${o$1(args["max-visible-items"])}
            @change=${args.onChange}
        >
            ${getBreadcrumbsWithLinks(4)}
        </sp-breadcrumbs>
    `;
};
const ShowRoot = (args) => {
  return x`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${o$1(args["max-visible-items"])}
            @change=${args.onChange}
        >
            <sp-breadcrumb-item value="Home" slot="root">
                Home
            </sp-breadcrumb-item>
            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};
const resizableBehavior = (args) => {
  return x`
        <div class="resizable-container">
            ${getResizableStyles()}

            <sp-breadcrumbs
                ${spreadProps(args)}
                max-visible-items=${o$1(args["max-visible-items"])}
                @change=${args.onChange}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        </div>
    `;
};
const __namedExportsOrder = ['Default', 'Disabled', 'Compact', 'Links', 'ShowRoot', 'resizableBehavior'];

export { Compact, Default, Disabled, Links, ShowRoot, __namedExportsOrder, breadcrumbs_stories as default, resizableBehavior };
