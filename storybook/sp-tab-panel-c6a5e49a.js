import { T as Tabs, v } from './tab.css-f448a33f.js';
import { d as defineElement, n, S as SpectrumElement } from './define-element-617dba69.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-03398d98.js';
import { O as ObserveSlotText } from './observe-slot-text-03ae7746.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-ae37a9bc.js';
import { x, A } from './lit-html-126adc72.js';
import { i } from './lit-element-9354aa77.js';

defineElement("sp-tabs",Tabs);

var c$1=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var l$1=(u,r,e,o)=>{for(var s=o>1?void 0:o?b(r,e):r,a=u.length-1,d;a>=0;a--)(d=u[a])&&(s=(o?d(r,e,s):d(s))||s);return o&&s&&c$1(r,e,s),s};const t=class t extends FocusVisiblePolyfillMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),"")){constructor(){super(...arguments);this.disabled=!1;this.label="";this.selected=!1;this.vertical=!1;this.value="";}static get styles(){return [v]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return !!this.label||this.slotHasContent}render(){return x`
            ${this.hasIcon?x`
                      <slot name="icon"></slot>
                  `:A}
            <label id="item-label" ?hidden=${!this.hasLabel}>
                ${this.slotHasContent?A:this.label}
                <slot>${this.label}</slot>
            </label>
        `}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id=`sp-tab-${t.instanceCount++}`);}updated(e){super.updated(e),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"));}};t.instanceCount=0,l$1([n({type:Boolean,reflect:!0})],t.prototype,"disabled",2),l$1([n({reflect:!0})],t.prototype,"label",2),l$1([n({type:Boolean,reflect:!0})],t.prototype,"selected",2),l$1([n({type:Boolean,reflect:!0})],t.prototype,"vertical",2),l$1([n({type:String,reflect:!0})],t.prototype,"value",2);let Tab=t;

defineElement("sp-tab",Tab);

const e$1=i`
:host{display:inline-flex}:host(:not([selected])){display:none}
`;var m = e$1;

var a=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var l=(u,i,s,r)=>{for(var t=r>1?void 0:r?c(i,s):i,o=u.length-1,d;o>=0;o--)(d=u[o])&&(t=(r?d(i,s,t):d(t))||t);return r&&t&&a(i,s,t),t};const e=class e extends SpectrumElement{constructor(){super(...arguments);this.selected=!1;this.value="";}handleFocusin(){this.removeAttribute("tabindex");}handleFocusout(){this.tabIndex=this.selected?0:-1;}render(){return x`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id=`sp-tab-panel-${e.instanceCount++}`);}updated(s){s.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1));}};e.styles=[m],e.instanceCount=0,l([n({type:Boolean,reflect:!0})],e.prototype,"selected",2),l([n({type:String,reflect:!0})],e.prototype,"value",2);let TabPanel=e;

defineElement("sp-tab-panel",TabPanel);
