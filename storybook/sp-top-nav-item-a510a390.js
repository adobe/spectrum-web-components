import { s as s$1 } from './resize-controller-55608b66.js';
import { S as ScaledIndicator, g, I, v } from './tab.css-a2c66e69.js';
import { S as SizedMixin } from './sizedMixin-281e4c72.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-43d4edd5.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { i } from './query-d0113d5a.js';
import { i as i$1 } from './lit-element-9354aa77.js';
import { L as LikeAnchor } from './like-anchor-0c856f1c.js';
import { F as Focusable } from './focusable-d03021f6.js';

var u=Object.defineProperty;var p$1=Object.getOwnPropertyDescriptor;var s=(l,r,e,t)=>{for(var i=t>1?void 0:t?p$1(r,e):r,n=l.length-1,d;n>=0;n--)(d=l[n])&&(i=(t?d(r,e,i):d(i))||i);return t&&i&&u(r,e,i),i};const c$2="transform: translateX(0px) scaleX(0) scaleY(0)";class TopNav extends SizedMixin(SpectrumElement){constructor(){super(...arguments);this.label="";this.selectionIndicatorStyle=c$2;this.shouldAnimate=!1;this.quiet=!1;this.onClick=e=>{const t=e.target;this.shouldAnimate=!0,this.selectTarget(t);};this._items=[];this.resizeController=new s$1(this,{callback:()=>{this.updateSelectionIndicator();}});this.updateSelectionIndicator=async()=>{const e=this.items.find(i=>i.value===this.selected||i.value===window.location.href);if(!e){this.selectionIndicatorStyle=c$2;return}await Promise.all([e.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const{width:t}=e.getBoundingClientRect();this.selectionIndicatorStyle=ScaledIndicator.transformX(e.offsetLeft,t);};}static get styles(){return [g,I,ScaledIndicator.baseStyles()]}set selected(e){const t=this.selected;e!==t&&(this.updateCheckedState(e),this._selected=e,this.requestUpdate("selected",t));}get selected(){return this._selected}get items(){return this._items}set items(e){e!==this.items&&(this._items.forEach(t=>{this.resizeController.unobserve(t);}),e.forEach(t=>{this.resizeController.observe(t);}),this._items=e);}manageItems(){this.items=this.slotEl.assignedElements({flatten:!0}).filter(t=>t.localName==="sp-top-nav-item");const e=this.items.find(t=>t.value===window.location.href);e?this.selectTarget(e):this.selected="";}render(){return x`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${l(this.shouldAnimate?void 0:"first-position")}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("direction","horizontal"),this.setAttribute("role","navigation");}updated(e){super.updated(e),e.has("dir")&&this.updateSelectionIndicator(),!this.shouldAnimate&&typeof e.get("shouldAnimate")!="undefined"&&(this.shouldAnimate=!0),e.has("label")&&(this.label||typeof e.get("label")!="undefined")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}selectTarget(e){const{value:t}=e;t&&(this.selected=t);}onSlotChange(){this.manageItems();}updateCheckedState(e){this.items.forEach(t=>{t.selected=!1;}),requestAnimationFrame(()=>{if(e&&e.length){const t=this.items.find(i=>i.value===e||i.value===window.location.href);t?t.selected=!0:this.selected="";}this.updateSelectionIndicator();});}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator);}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback();}}s([n({reflect:!0})],TopNav.prototype,"dir",2),s([n({type:String})],TopNav.prototype,"label",2),s([n()],TopNav.prototype,"selectionIndicatorStyle",2),s([n({attribute:!1})],TopNav.prototype,"shouldAnimate",2),s([n({type:Boolean,reflect:!0})],TopNav.prototype,"quiet",2),s([n({reflect:!0})],TopNav.prototype,"selected",1),s([i("slot")],TopNav.prototype,"slotEl",2);

defineElement("sp-top-nav",TopNav);

const c$1=i$1`
a{color:inherit}a:focus{outline:none}:host(:focus-within){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}:host(:focus-within):before{border-color:var(
--highcontrast-tabs-focus-indicator-color,var(
--mod-tabs-focus-indicator-color,var(--spectrum-tabs-focus-indicator-color)
)
)}:host(:focus-within) ::slotted([slot=icon]){color:var(
--mod-tabs-color-key-focus,var(--spectrum-tabs-color-key-focus)
)}@media (forced-colors:active){:host{--highcontrast-tabs-focus-indicator-color:canvastext}}
`;var y = c$1;

var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var c=(o,t,l,i)=>{for(var e=i>1?void 0:i?d(t,l):t,a=o.length-1,s;a>=0;a--)(s=o[a])&&(e=(i?s(t,l,e):s(e))||e);return i&&e&&p(t,l,e),e};class TopNavItem extends LikeAnchor(Focusable){constructor(){super(...arguments);this.selected=!1;this.value="";}static get styles(){return [v,y]}get focusElement(){return this.anchor}click(){this.anchor.click();}render(){return x`
            <a
                id="item-label"
                href=${l(this.href)}
                download=${l(this.download)}
                target=${l(this.target)}
                aria-label=${l(this.label)}
                aria-current=${l(this.selected&&this.href?"page":void 0)}
                rel=${l(this.rel)}
            >
                <slot></slot>
            </a>
        `}updated(l){super.updated(l),this.value=this.anchor.href;}}c([i("a")],TopNavItem.prototype,"anchor",2),c([n({type:Boolean,reflect:!0})],TopNavItem.prototype,"selected",2);

defineElement("sp-top-nav-item",TopNavItem);
