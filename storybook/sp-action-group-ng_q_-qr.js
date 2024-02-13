import { R as RovingTabindexController } from './RovingTabindex-LnbiEVTh.js';
import { t as t$1 } from './mutation-controller-KeE5MDSl.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-6sBuja8e.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-UHExAFdK.js';
import { x } from './lit-html-GmIhAbMP.js';
import { i as i$1 } from './query-JMOstM_r.js';

const o=i`
:host{--spectrum-actiongroup-button-spacing-reset:0;--spectrum-actiongroup-border-radius-reset:0;--spectrum-actiongroup-border-radius:var(--spectrum-corner-radius-100)}:host([size=s]),:host([size=xs]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-75
);--spectrum-actiongroup-vertical-spacing-regular:var(--spectrum-spacing-75)}:host,:host([size=l]),:host([size=xl]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-100
);--spectrum-actiongroup-vertical-spacing-regular:var(
--spectrum-spacing-100
)}:host{display:flex;flex-wrap:wrap;gap:var(
--mod-actiongroup-horizontal-spacing-regular,var(--spectrum-actiongroup-horizontal-spacing-regular)
)}::slotted(*){flex-shrink:0}::slotted(.focus-visible){z-index:3}::slotted(:focus-visible){z-index:3}:host(:not([vertical]):not([compact])) ::slotted(*){flex-shrink:0}:host([vertical]){display:inline-flex;flex-direction:column;gap:var(
--mod-actiongroup-vertical-spacing-regular,var(--spectrum-actiongroup-vertical-spacing-regular)
)}:host([compact]){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact]:not([quiet])){flex-wrap:nowrap}:host([compact]:not([quiet])) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
);position:relative;z-index:0}:host([compact]:not([quiet])) ::slotted(:first-child){--mod-actionbutton-focus-indicator-border-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px 0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])) ::slotted(:not(:first-child)){--mod-actionbutton-focus-indicator-border-radius:0px;margin-inline-end:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
);margin-inline-start:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
)}:host([compact]:not([quiet])) ::slotted(:last-child){--mod-actionbutton-focus-indicator-border-radius:0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px;border-end-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-inline-end:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
);margin-inline-start:var(
--mod-actiongroup-horizontal-spacing-compact,var(--spectrum-actiongroup-horizontal-spacing-compact)
)}:host([compact]:not([quiet])) ::slotted([selected]){z-index:1}@media (hover:hover){:host([compact]:not([quiet])) ::slotted(:hover){z-index:2}}:host([compact]:not([quiet])) ::slotted(.focus-visible){z-index:3}:host([compact]:not([quiet])) ::slotted(:focus-visible){z-index:3}:host([compact]:not([quiet])[vertical]){gap:var(
--mod-actiongroup-gap-size-compact,var(--spectrum-actiongroup-gap-size-compact)
)}:host([compact]:not([quiet])[vertical]) ::slotted(*){border-radius:var(
--mod-actiongroup-border-radius-reset,var(--spectrum-actiongroup-border-radius-reset)
)}:host([compact]:not([quiet])[vertical]) ::slotted(:first-child){--mod-actionbutton-focus-indicator-border-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) 0px 0px;border-start-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-start-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-block-end:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-block-start:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-inline-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])[vertical]) ::slotted(:not(:first-child)){margin-block-end:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
);margin-block-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-inline-start:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
)}:host([compact]:not([quiet])[vertical]) ::slotted(:last-child){--mod-actionbutton-focus-indicator-border-radius:0px 0px var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
) var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-end-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);border-end-start-radius:var(
--mod-actiongroup-border-radius,var(--spectrum-actiongroup-border-radius)
);margin-block-end:var(
--mod-actiongroup-button-spacing-reset,var(--spectrum-actiongroup-button-spacing-reset)
);margin-block-start:var(
--mod-actiongroup-vertical-spacing-compact,var(--spectrum-actiongroup-vertical-spacing-compact)
)}:host([justified]) ::slotted(*){flex:1}:host{--spectrum-actiongroup-gap-size-compact:var(
--system-spectrum-actiongroup-gap-size-compact
);--spectrum-actiongroup-horizontal-spacing-compact:var(
--system-spectrum-actiongroup-horizontal-spacing-compact
);--spectrum-actiongroup-vertical-spacing-compact:var(
--system-spectrum-actiongroup-vertical-spacing-compact
)}:host([size=xs]){--spectrum-actiongroup-horizontal-spacing-regular:var(
--spectrum-spacing-75
);--spectrum-actiongroup-vertical-spacing-regular:var(--spectrum-spacing-75)}:host([dir][compact][vertical]) ::slotted(:nth-child(n)){margin-left:0;margin-right:0}:host([justified]) ::slotted(:not([role])),:host([vertical]) ::slotted(:not([role])){align-items:stretch;display:flex;flex-direction:column}:host([compact]:not([quiet])) ::slotted(:not([role])){--overriden-border-radius:0;--mod-actionbutton-border-radius:var(--overriden-border-radius)}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):first-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:not([role]):last-child){--overriden-border-radius:var(--spectrum-alias-component-border-radius) 0 0 var(--spectrum-alias-component-border-radius)}:host([compact]:not([quiet])) ::slotted(*){--mod-actionbutton-focus-ring-border-radius:0}:host([compact][vertical]:not([quiet])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) var(--spectrum-alias-component-border-radius) 0 0}:host([compact][vertical]:not([quiet])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius)}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:first-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=ltr][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:0 var(--spectrum-alias-component-border-radius) var(--spectrum-alias-component-border-radius) 0}:host([dir=rtl][compact]:not([quiet],[vertical])) ::slotted(:last-child){--mod-actionbutton-focus-ring-border-radius:var(
--spectrum-alias-component-border-radius
) 0 0 var(--spectrum-alias-component-border-radius)}
`;var S = o;

var h=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(c,u,e,t)=>{for(var s=t>1?void 0:t?p(u,e):u,i=c.length-1,l;i>=0;i--)(l=c[i])&&(s=(t?l(u,e,s):l(s))||s);return t&&s&&h(u,e,s),s};const d=[];class ActionGroup extends SizedMixin(SpectrumElement,{validSizes:["xs","s","m","l","xl"],noDefaultSize:!0}){constructor(){super();this._buttons=[];this._buttonSelector="sp-action-button";this.rovingTabindexController=new RovingTabindexController(this,{focusInIndex:e=>{let t=-1;const s=e.findIndex((i,l)=>(!e[t]&&!i.disabled&&(t=l),i.selected&&!i.disabled));return e[s]?s:t},elements:()=>this.buttons,isFocusableElement:e=>!e.disabled});this.compact=!1;this.emphasized=!1;this.justified=!1;this.label="";this.quiet=!1;this.vertical=!1;this._selected=d;this.hasManaged=!1;this.manageButtons=()=>{const t=this.slotElement.assignedElements({flatten:!0}).reduce((s,i)=>{if(i.matches(this._buttonSelector))s.push(i);else {const l=Array.from(i.querySelectorAll(`:scope > ${this._buttonSelector}`));s.push(...l);}return s},[]);if(this.buttons=t,this.selects||!this.hasManaged){const s=[];this.buttons.forEach(i=>{i.selected&&s.push(i.value);}),this.setSelected(this.selected.concat(s));}this.manageChildren(),this.manageSelects(),this.hasManaged=!0;};new t$1(this,{config:{childList:!0,subtree:!0},callback:()=>{this.manageButtons();},skipInitial:!0});}static get styles(){return [S]}set buttons(e){e!==this.buttons&&(this._buttons=e,this.rovingTabindexController.clearElementCache());}get buttons(){return this._buttons}set selected(e){this.requestUpdate("selected",this._selected),this._selected=e,this.updateComplete.then(()=>{this.applySelects(),this.manageChildren();});}get selected(){return this._selected}dispatchChange(e){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||(this.setSelected(e),this.buttons.map(s=>{s.selected=this.selected.includes(s.value);}));}setSelected(e,t){if(e===this.selected)return;const s=this.selected;this.requestUpdate("selected",s),this._selected=e,t&&this.dispatchChange(s);}focus(e){this.rovingTabindexController.focus(e);}deselectSelectedButtons(){[...this.querySelectorAll("[selected]")].forEach(t=>{t.selected=!1,t.tabIndex=-1,t.setAttribute(this.selects?"aria-checked":"aria-pressed","false");});}handleActionButtonChange(e){e.stopPropagation(),e.preventDefault();}handleClick(e){const t=e.target;if(typeof t.value!="undefined")switch(this.selects){case"single":{this.deselectSelectedButtons(),t.selected=!0,t.tabIndex=0,t.setAttribute("aria-checked","true"),this.setSelected([t.value],!0);break}case"multiple":{const s=[...this.selected];t.selected=!t.selected,t.setAttribute("aria-checked",t.selected?"true":"false"),t.selected?s.push(t.value):s.splice(this.selected.indexOf(t.value),1),this.setSelected(s,!0),this.buttons.forEach(i=>{i.tabIndex=-1;}),t.tabIndex=0;break}}}async applySelects(){await this.manageSelects(!0);}async manageSelects(e){if(!this.buttons.length)return;const t=this.buttons;switch(this.selects){case"single":{this.setAttribute("role","radiogroup");const s=[],i=t.map(async a=>{await a.updateComplete,a.setAttribute("role","radio"),a.setAttribute("aria-checked",a.selected?"true":"false"),a.selected&&s.push(a);});if(e)break;await Promise.all(i);const l=s.map(a=>a.value);this.setSelected(l||d);break}case"multiple":{this.getAttribute("role")==="radiogroup"&&this.removeAttribute("role");const s=[],i=[],l=t.map(async o=>{await o.updateComplete,o.setAttribute("role","checkbox"),o.setAttribute("aria-checked",o.selected?"true":"false"),o.selected&&(s.push(o.value),i.push(o));});if(e)break;await Promise.all(l);const a=s.length?s:d;this.setSelected(a);break}default:if(this.selected.length){const s=[],i=t.map(async l=>{await l.updateComplete,l.setAttribute("role","button"),l.selected?(l.setAttribute("aria-pressed","true"),s.push(l)):l.removeAttribute("aria-pressed");});if(e)break;await Promise.all(i),this.setSelected(s.map(l=>l.value));}else {this.buttons.forEach(s=>{s.setAttribute("role","button");});break}}this.hasAttribute("role")||this.setAttribute("role","toolbar");}render(){return x`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick);}updated(e){super.updated(e),e.has("selects")&&(this.manageSelects(),this.manageChildren(),this.selects?this.shadowRoot.addEventListener("change",this.handleActionButtonChange):this.shadowRoot.removeEventListener("change",this.handleActionButtonChange)),(e.has("quiet")||e.has("emphasized")||e.has("size")||e.has("static"))&&this.manageChildren(e),e.has("label")&&(this.label||typeof e.get("label")!="undefined")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}manageChildren(e){this.buttons.forEach(t=>{(this.quiet||e!=null&&e.get("quiet"))&&(t.quiet=this.quiet),(this.emphasized||e!=null&&e.get("emphasized"))&&(t.emphasized=this.emphasized),(this.static||e!=null&&e.get("static"))&&(t.static=this.static),(this.selects||!this.hasManaged)&&(t.selected=this.selected.includes(t.value)),this.size&&(this.size!=="m"||typeof(e==null?void 0:e.get("size"))!="undefined")&&(t.size=this.size);});}}r([n({type:Boolean,reflect:!0})],ActionGroup.prototype,"compact",2),r([n({type:Boolean,reflect:!0})],ActionGroup.prototype,"emphasized",2),r([n({type:Boolean,reflect:!0})],ActionGroup.prototype,"justified",2),r([n({type:String})],ActionGroup.prototype,"label",2),r([n({type:Boolean,reflect:!0})],ActionGroup.prototype,"quiet",2),r([n({type:String})],ActionGroup.prototype,"selects",2),r([n({reflect:!0})],ActionGroup.prototype,"static",2),r([n({type:Boolean,reflect:!0})],ActionGroup.prototype,"vertical",2),r([n({type:Array})],ActionGroup.prototype,"selected",1),r([i$1("slot")],ActionGroup.prototype,"slotElement",2);

defineElement("sp-action-group",ActionGroup);
