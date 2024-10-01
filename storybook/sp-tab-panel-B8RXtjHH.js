import { T as Tabs, b as o } from './tab.css-BSoRmvgV.js';
import { d as defineElement, n, S as SpectrumElement } from './define-element-C_3bgzm7.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-D29Av9Xb.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-Ceiwt-jV.js';
import { O as ObserveSlotText } from './observe-slot-text-C6K935AT.js';
import { r as randomID } from './random-id-BST1Puzz.js';
import { x, T } from './lit-html-COgVUehj.js';
import { i } from './lit-element-BulMEkr1.js';

defineElement("sp-tabs",Tabs);

var b=Object.defineProperty;var r=(o,l,e,i)=>{for(var t=void 0,a=o.length-1,d;a>=0;a--)(d=o[a])&&(t=(d(l,e,t))||t);return t&&b(l,e,t),t};class Tab extends FocusVisiblePolyfillMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),"")){constructor(){super(...arguments);this.disabled=!1;this.label="";this.selected=!1;this.vertical=!1;this.value="";}static get styles(){return [o]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return !!this.label||this.slotHasContent}render(){return x`
            ${this.hasIcon?x`
                      <slot name="icon"></slot>
                  `:T}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?T:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id=`sp-tab-${randomID()}`);}updated(e){super.updated(e),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"));}}r([n({type:Boolean,reflect:!0})],Tab.prototype,"disabled"),r([n({reflect:!0})],Tab.prototype,"label"),r([n({type:Boolean,reflect:!0})],Tab.prototype,"selected"),r([n({type:Boolean,reflect:!0})],Tab.prototype,"vertical"),r([n({type:String,reflect:!0})],Tab.prototype,"value");

defineElement("sp-tab",Tab);

const e=i`
    :host{display:inline-flex}:host(:not([selected])){display:none}
`;

var p=Object.defineProperty;var l=(s,t,i,r)=>{for(var e=void 0,o=s.length-1,d;o>=0;o--)(d=s[o])&&(e=(d(t,i,e))||e);return e&&p(t,i,e),e};class TabPanel extends SpectrumElement{constructor(){super(...arguments);this.selected=!1;this.value="";}handleFocusin(){this.removeAttribute("tabindex");}handleFocusout(){this.tabIndex=this.selected?0:-1;}render(){return x`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id=`sp-tab-panel-${randomID()}`);}updated(i){i.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1));}}TabPanel.styles=[e],l([n({type:Boolean,reflect:!0})],TabPanel.prototype,"selected"),l([n({type:String,reflect:!0})],TabPanel.prototype,"value");

defineElement("sp-tab-panel",TabPanel);
