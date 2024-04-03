import { T as Tabs, v } from './tab.css-UQG8ZCr6.js';
import { d as defineElement, n as n$1, S as SpectrumElement } from './define-element-2SKaLcgv.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-68QWcOy-.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-tyJ_SCNf.js';
import { O as ObserveSlotText } from './observe-slot-text-mc0YsU0d.js';
import { r as randomID } from './random-id-M2k-wjyE.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { i } from './lit-element-xBOPiTek.js';

defineElement("sp-tabs",Tabs);

var b=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var r=(o,l,e,i)=>{for(var t=i>1?void 0:i?n(l,e):l,a=o.length-1,d;a>=0;a--)(d=o[a])&&(t=(i?d(l,e,t):d(t))||t);return i&&t&&b(l,e,t),t};class Tab extends FocusVisiblePolyfillMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),"")){constructor(){super(...arguments);this.disabled=!1;this.label="";this.selected=!1;this.vertical=!1;this.value="";}static get styles(){return [v]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return !!this.label||this.slotHasContent}render(){return x`
            ${this.hasIcon?x`
                      <slot name="icon"></slot>
                  `:A}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?A:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id=`sp-tab-${randomID()}`);}updated(e){super.updated(e),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"));}}r([n$1({type:Boolean,reflect:!0})],Tab.prototype,"disabled",2),r([n$1({reflect:!0})],Tab.prototype,"label",2),r([n$1({type:Boolean,reflect:!0})],Tab.prototype,"selected",2),r([n$1({type:Boolean,reflect:!0})],Tab.prototype,"vertical",2),r([n$1({type:String,reflect:!0})],Tab.prototype,"value",2);

defineElement("sp-tab",Tab);

const e=i`
    :host{display:inline-flex}:host(:not([selected])){display:none}
`;var m = e;

var p=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(s,t,i,r)=>{for(var e=r>1?void 0:r?u(t,i):t,o=s.length-1,d;o>=0;o--)(d=s[o])&&(e=(r?d(t,i,e):d(e))||e);return r&&e&&p(t,i,e),e};class TabPanel extends SpectrumElement{constructor(){super(...arguments);this.selected=!1;this.value="";}handleFocusin(){this.removeAttribute("tabindex");}handleFocusout(){this.tabIndex=this.selected?0:-1;}render(){return x`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id=`sp-tab-panel-${randomID()}`);}updated(i){i.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1));}}TabPanel.styles=[m],l([n$1({type:Boolean,reflect:!0})],TabPanel.prototype,"selected",2),l([n$1({type:String,reflect:!0})],TabPanel.prototype,"value",2);

defineElement("sp-tab-panel",TabPanel);
