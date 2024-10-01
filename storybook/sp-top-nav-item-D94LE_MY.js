import { s as s$1 } from './resize-controller-BJKfu6ft.js';
import { S as ScaledIndicator, a, o, b as o$2 } from './tab.css-BSoRmvgV.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import { e } from './query-DQF6X5qW.js';
import { i } from './lit-element-BulMEkr1.js';
import { L as LikeAnchor } from './like-anchor-B3Uz3TFY.js';
import { F as Focusable } from './focusable-w-VMKDtH.js';

var u=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var s=(n,l,e,t)=>{for(var i=t>1?void 0:t?h(l,e):l,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(t?a(l,e,i):a(i))||i);return t&&i&&u(l,e,i),i};const c$1="transform: translateX(0px) scaleX(0) scaleY(0)";class TopNav extends SizedMixin(SpectrumElement){constructor(){super(...arguments);this.label="";this.ignoreURLParts="";this.selectionIndicatorStyle=c$1;this.shouldAnimate=!1;this.quiet=!1;this.onClick=e=>{const t=e.target;this.shouldAnimate=!0,this.selectTarget(t);};this._items=[];this.resizeController=new s$1(this,{callback:()=>{this.updateSelectionIndicator();}});this.updateSelectionIndicator=async()=>{const e=this.items.find(i=>i.value===this.selected||i.value===window.location.href);if(!e){this.selectionIndicatorStyle=c$1;return}await Promise.all([e.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:t}=e.getBoundingClientRect();this.selectionIndicatorStyle=ScaledIndicator.transformX(e.offsetLeft,t);};}static get styles(){return [a,o,ScaledIndicator.baseStyles()]}set selected(e){const t=this.selected;e!==t&&(this.updateCheckedState(e),this._selected=e,this.requestUpdate("selected",t));}get selected(){return this._selected}get items(){return this._items}set items(e){e!==this.items&&(this._items.forEach(t=>{this.resizeController.unobserve(t);}),e.forEach(t=>{this.resizeController.observe(t);}),this._items=e);}manageItems(){this.items=this.slotEl.assignedElements({flatten:!0}).filter(r=>r.localName==="sp-top-nav-item");let{href:e}=window.location;const t=this.ignoreURLParts.split(" ");t.includes("hash")&&(e=e.replace(window.location.hash,"")),t.includes("search")&&(e=e.replace(window.location.search,""));const i=this.items.find(r=>r.value===e);i?this.selectTarget(i):this.selected="";}render(){return x`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${o$1(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("direction","horizontal"),this.setAttribute("role","navigation");}updated(e){super.updated(e),e.has("dir")&&this.updateSelectionIndicator(),!this.shouldAnimate&&typeof e.get("shouldAnimate")!="undefined"&&(this.shouldAnimate=!0),e.has("label")&&(this.label||typeof e.get("label")!="undefined")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}selectTarget(e){const{value:t}=e;t&&(this.selected=t);}onSlotChange(){this.manageItems();}updateCheckedState(e){this.items.forEach(t=>{t.selected=!1;}),requestAnimationFrame(()=>{if(e&&e.length){const t=this.items.find(i=>i.value===e||i.value===window.location.href);t?t.selected=!0:this.selected="";}this.updateSelectionIndicator();});}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator);}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback();}}s([n({reflect:!0})],TopNav.prototype,"dir",2),s([n({type:String})],TopNav.prototype,"label",2),s([n({attribute:"ignore-url-parts"})],TopNav.prototype,"ignoreURLParts",2),s([n()],TopNav.prototype,"selectionIndicatorStyle",2),s([n({attribute:!1})],TopNav.prototype,"shouldAnimate",2),s([n({type:Boolean,reflect:!0})],TopNav.prototype,"quiet",2),s([n({reflect:!0})],TopNav.prototype,"selected",1),s([e("slot")],TopNav.prototype,"slotEl",2);

defineElement("sp-top-nav",TopNav);

const t=i`
    a{color:inherit}a:focus,a:focus-visible{outline:none}:host a:before{block-size:calc(100% - var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text)));border:var(--mod-tabs-focus-indicator-width,var(--spectrum-tabs-focus-indicator-width))solid transparent;border-radius:var(--mod-tabs-focus-indicator-border-radius,var(--spectrum-tabs-focus-indicator-border-radius));box-sizing:border-box;content:"";inline-size:calc(100% + var(--mod-tabs-focus-indicator-gap,var(--spectrum-tabs-focus-indicator-gap))*2);inset-block-start:calc(var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text))/2);inset-inline:calc(var(--mod-tabs-focus-indicator-gap,var(--spectrum-tabs-focus-indicator-gap))*-1);pointer-events:none;position:absolute}:host a.focus-visible{color:var(--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)))}:host a:focus-visible{color:var(--highcontrast-tabs-color-key-focus,var(--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)))}:host a.focus-visible:before{border-color:var(--highcontrast-tabs-focus-indicator-color,var(--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)))}:host a:focus-visible:before{border-color:var(--highcontrast-tabs-focus-indicator-color,var(--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)))}#item-label{padding-block:var(--mod-tabs-top-to-text,var(--spectrum-tabs-top-to-text))var(--mod-tabs-bottom-to-text,var(--spectrum-tabs-bottom-to-text));margin-block:0}slot{pointer-events:none}
`;

var p=Object.defineProperty;var c=(o,t,l,i)=>{for(var e=void 0,a=o.length-1,s;a>=0;a--)(s=o[a])&&(e=(s(t,l,e))||e);return e&&p(t,l,e),e};class TopNavItem extends LikeAnchor(Focusable){constructor(){super(...arguments);this.selected=!1;this.value="";}static get styles(){return [o$2,t]}get focusElement(){return this.anchor}click(){this.anchor.click();}render(){return x`
            <a
                id="item-label"
                href=${o$1(this.href)}
                download=${o$1(this.download)}
                target=${o$1(this.target)}
                aria-label=${o$1(this.label)}
                aria-current=${o$1(this.selected&&this.href?"page":void 0)}
                rel=${o$1(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(l){super.updated(l),this.value=this.anchor.href;}}c([e("a")],TopNavItem.prototype,"anchor"),c([n({type:Boolean,reflect:!0})],TopNavItem.prototype,"selected");

defineElement("sp-top-nav-item",TopNavItem);
