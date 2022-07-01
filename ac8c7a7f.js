import{S as t,$ as e,_ as i,e as a}from"./31a32b8d.js";import{r as o}from"./e50c5e8d.js";import{F as r,O as s,b as c,S as l,a as n,l as d,i as m,L as b}from"./36b2618c.js";import{R as u}from"./2aee6762.js";import"./21d6199b.js";import"./238879af.js";import"./d02421e0.js";import"./def45cc3.js";import{Overlay as p}from"./c41ad5d3.js";import"./26e95c7a.js";document.querySelector("sp-tabs").addEventListener("change",(t=>{const e=t.target,{selected:i}=e,{pathname:a}=location,o=a.search("api")>-1;switch(i){case"api":{if(o)return;const t=(a+"/api/").replace("//a","/a");history.pushState({},document.title,t);break}case"examples":{if(!o)return;const t=a.split("/api")[0]+"/";history.pushState({},document.title,t);break}}}));var v=o`:host{display:inline-flex}:host(:not([selected])){display:none}`;class h extends t{constructor(){super(...arguments),this.selected=!1,this.value=""}render(){return e`<slot></slot>`}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id="sp-tab-panel-"+h.instanceCount++)}updated(t){t.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}}h.styles=[v],h.instanceCount=0,i([a({type:Boolean,reflect:!0})],h.prototype,"selected",void 0),i([a({type:String,reflect:!0})],h.prototype,"value",void 0),customElements.define("sp-tab-panel",h);var x=o`:host{box-sizing:border-box;cursor:pointer;height:var(--spectrum-tabs-quiet-textonly-tabitem-height);line-height:var(--spectrum-tabs-quiet-textonly-tabitem-height);outline:0;position:relative;text-decoration:none;transition:color var(
--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration
) ease-out;white-space:nowrap;z-index:1}:host([disabled]){cursor:default}:host([disabled]) #item-label{cursor:default}::slotted([slot=icon]){height:var(
--spectrum-tabs-quiet-textonly-tabitem-height
)}:host([dir=ltr]) slot[name=icon]+#item-label{margin-left:calc(var(--spectrum-tabs-quiet-textonly-tabitem-icon-gap) - var(--spectrum-global-dimension-size-40))}:host([dir=rtl]) slot[name=icon]+#item-label{margin-right:calc(var(--spectrum-tabs-quiet-textonly-tabitem-icon-gap) - var(--spectrum-global-dimension-size-40))}:host([dir=ltr]):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=rtl]):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=ltr]):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=rtl]):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host:before{border:var(--spectrum-tabs-textonly-tabitem-focus-ring-size) solid transparent;border-radius:var(
--spectrum-tabs-textonly-tabitem-focus-ring-border-radius
);box-sizing:border-box;content:"";height:var(--spectrum-tabs-textonly-tabitem-focus-ring-height);margin-top:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-height)/-2);pointer-events:none;position:absolute;top:50%}#item-label{cursor:pointer;display:inline-block;font-size:var(--spectrum-tabs-texticon-tabitem-text-size);font-weight:var(--spectrum-tabs-textonly-tabitem-text-font-weight);text-decoration:none;vertical-align:top}#item-label:empty{display:none}:host{color:var(
--spectrum-tabs-textonly-tabitem-text-color
)}::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color
)}:host(:hover){color:var(
--spectrum-tabs-textonly-tabitem-text-color-hover
)}:host(:hover) ::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color-hover
)}:host([selected]){color:var(
--spectrum-tabs-textonly-tabitem-text-color-selected
)}:host([selected]) ::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color-selected
)}:host(.focus-visible){color:var(
--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus
)}:host(:focus-visible){color:var(
--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus
)}:host(.focus-visible):before{border-color:var(
--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus
)}:host(:focus-visible):before{border-color:var(
--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus
)}:host(.focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus
)}:host(:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus
)}:host([disabled]){color:var(
--spectrum-tabs-textonly-tabitem-text-color-disabled
)}:host([disabled]) ::slotted([slot=icon]){color:var(
--spectrum-tabs-textonly-tabitem-icon-color-disabled
)}:host([disabled]){pointer-events:none}:host([vertical]){--sp-tab-vertial-margin-y:calc((var(
--spectrum-tabs-vertical-item-height,
var(--spectrum-global-dimension-size-550)
) - var(
--spectrum-tabs-focus-ring-height,
var(--spectrum-alias-single-line-height)
))/2);align-items:center;display:flex;flex-direction:column;height:auto!important;justify-content:center}:host([vertical]):before{bottom:0;height:auto;left:calc(var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick))*-1);margin-top:0!important;right:calc(var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick))*-1);top:0}:host([vertical]) ::slotted([slot=icon]){flex-shrink:0;height:var(
--spectrum-icon-tshirt-size-height,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
);margin-top:var(--sp-tab-vertial-margin-y)}:host(:not([vertical])) ::slotted([slot=icon]){height:100%}:host([dir][vertical]) slot[name=icon]+#item-label{font-size:var(
--spectrum-tabs-text-size,var(--spectrum-alias-font-size-default)
);font-weight:var(
--spectrum-tabs-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);line-height:1;margin:var(--sp-tab-vertial-margin-y) 0}#item-label[hidden]{display:none}@media (forced-colors:active){:host:before{background-color:ButtonFace}:host ::slotted([slot=icon]){color:inherit;position:relative;z-index:1}#item-label{position:relative;z-index:1}:host([selected]){color:HighlightText}:host([selected]) ::slotted([slot=icon]){color:HighlightText}:host([selected]):before{background-color:Highlight;color:HighlightText}:host([selected]) #item-label{color:HighlightText}}`;class g extends(r(s(c(t,'[slot="icon"]'),""))){constructor(){super(...arguments),this.disabled=!1,this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[x]}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return!!this.label||this.slotHasContent}handleContentChange(){this.dispatchEvent(new Event("sp-tab-contentchange",{bubbles:!0,composed:!0}))}render(){return e`${this.hasIcon?e`<slot name="icon"></slot>`:e``} <label id="item-label" ?hidden="${!this.hasLabel}">${this.slotHasContent?e``:this.label}<slot>${this.label}</slot></label>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","tab"),this.hasAttribute("id")||(this.id="sp-tab-"+g.instanceCount++),this.shadowRoot.addEventListener("slotchange",this.handleContentChange)}updated(t){super.updated(t),t.has("label")&&void 0!==t.get("label")&&this.handleContentChange(),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1")),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}g.instanceCount=0,i([a({type:Boolean,reflect:!0})],g.prototype,"disabled",void 0),i([a({reflect:!0})],g.prototype,"label",void 0),i([a({type:Boolean,reflect:!0})],g.prototype,"selected",void 0),i([a({type:Boolean,reflect:!0})],g.prototype,"vertical",void 0),i([a({type:String,reflect:!0})],g.prototype,"value",void 0),customElements.define("sp-tab",g);var y=o`:host([size=s]){--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-s-quiet-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-quiet-textonly-divider-background-color:var(
--spectrum-tabs-s-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-quiet-textonly-tabitem-icon-gap:var(
--spectrum-tabs-s-quiet-textonly-tabitem-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-s-quiet-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-85)
);--spectrum-tabs-quiet-textonly-tabitem-height:var(
--spectrum-tabs-s-quiet-textonly-tabitem-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-quiet-textonly-divider-size:var(
--spectrum-tabs-s-quiet-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected:var(
--spectrum-tabs-s-emphasized-texticon-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected:var(
--spectrum-tabs-s-emphasized-texticon-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-s-emphasized-texticon-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-selection-indicator-color-emphasized)
);--spectrum-tabs-emphasized-textonly-divider-background-color:var(
--spectrum-tabs-s-emphasized-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-texticon-tabitem-text-size:var(
--spectrum-tabs-s-texticon-tabitem-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration:var(
--spectrum-tabs-s-texticon-tabitem-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-ease:var(
--spectrum-tabs-s-texticon-tabitem-selection-indicator-animation-ease,var(--spectrum-global-animation-ease-in-out)
);--spectrum-tabs-textonly-tabitem-icon-color-selected:var(
--spectrum-tabs-s-textonly-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected:var(
--spectrum-tabs-s-textonly-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-s-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus:var(
--spectrum-tabs-s-textonly-tabitem-icon-color-selected-key-focus,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus:var(
--spectrum-tabs-s-textonly-tabitem-text-color-selected-key-focus,var(--spectrum-alias-tabitem-text-color-selected-key-focus)
);--spectrum-tabs-textonly-tabitem-icon-color-disabled:var(
--spectrum-tabs-s-textonly-tabitem-icon-color-disabled,var(--spectrum-alias-tabitem-icon-color-disabled)
);--spectrum-tabs-textonly-tabitem-text-color-disabled:var(
--spectrum-tabs-s-textonly-tabitem-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);--spectrum-tabs-textonly-tabitem-icon-color:var(
--spectrum-tabs-s-textonly-tabitem-icon-color,var(--spectrum-alias-tabitem-icon-color-default)
);--spectrum-tabs-textonly-tabitem-text-color:var(
--spectrum-tabs-s-textonly-tabitem-text-color,var(--spectrum-alias-tabitem-text-color-default)
);--spectrum-tabs-textonly-tabitem-icon-color-hover:var(
--spectrum-tabs-s-textonly-tabitem-icon-color-hover,var(--spectrum-alias-tabitem-icon-color-hover)
);--spectrum-tabs-textonly-tabitem-text-color-hover:var(
--spectrum-tabs-s-textonly-tabitem-text-color-hover,var(--spectrum-alias-tabitem-text-color-hover)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus:var(
--spectrum-tabs-s-textonly-tabitem-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);--spectrum-tabs-textonly-divider-background-color:var(
--spectrum-tabs-s-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-textonly-tabitem-text-font-weight:var(
--spectrum-tabs-s-textonly-tabitem-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-textonly-tabitem-focus-ring-size:var(
--spectrum-tabs-s-textonly-tabitem-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tabs-textonly-tabitem-focus-ring-height:var(
--spectrum-tabs-s-textonly-tabitem-focus-ring-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-s-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-85)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-radius:var(
--spectrum-tabs-s-textonly-tabitem-focus-ring-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-tabs-textonly-tabitem-margin-right:var(
--spectrum-tabs-s-textonly-tabitem-margin-right,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-textonly-divider-border-radius:var(
--spectrum-tabs-s-textonly-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-vertical-quiet-textonly-divider-background-color:var(
--spectrum-tabs-s-vertical-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-s-vertical-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-vertical-textonly-divider-background-color:var(
--spectrum-tabs-s-vertical-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-vertical-textonly-tabitem-height:var(
--spectrum-tabs-s-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-450)
);--spectrum-tabs-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-s-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-tabs-compact-textonly-divider-size:var(
--spectrum-tabs-s-compact-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-textonly-height:var(
--spectrum-tabs-s-compact-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-compact-vertical-textonly-tabitem-height:var(
--spectrum-tabs-s-compact-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-compact-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-s-compact-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-85)
)}:host([size=m]){--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-m-quiet-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-quiet-textonly-divider-background-color:var(
--spectrum-tabs-m-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-quiet-textonly-tabitem-icon-gap:var(
--spectrum-tabs-m-quiet-textonly-tabitem-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-m-quiet-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-100)
);--spectrum-tabs-quiet-textonly-tabitem-height:var(
--spectrum-tabs-m-quiet-textonly-tabitem-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-quiet-textonly-divider-size:var(
--spectrum-tabs-m-quiet-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected:var(
--spectrum-tabs-m-emphasized-texticon-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected:var(
--spectrum-tabs-m-emphasized-texticon-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-m-emphasized-texticon-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-selection-indicator-color-emphasized)
);--spectrum-tabs-emphasized-textonly-divider-background-color:var(
--spectrum-tabs-m-emphasized-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-texticon-tabitem-text-size:var(
--spectrum-tabs-m-texticon-tabitem-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration:var(
--spectrum-tabs-m-texticon-tabitem-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-ease:var(
--spectrum-tabs-m-texticon-tabitem-selection-indicator-animation-ease,var(--spectrum-global-animation-ease-in-out)
);--spectrum-tabs-textonly-tabitem-icon-color-selected:var(
--spectrum-tabs-m-textonly-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected:var(
--spectrum-tabs-m-textonly-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-m-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus:var(
--spectrum-tabs-m-textonly-tabitem-icon-color-selected-key-focus,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus:var(
--spectrum-tabs-m-textonly-tabitem-text-color-selected-key-focus,var(--spectrum-alias-tabitem-text-color-selected-key-focus)
);--spectrum-tabs-textonly-tabitem-icon-color-disabled:var(
--spectrum-tabs-m-textonly-tabitem-icon-color-disabled,var(--spectrum-alias-tabitem-icon-color-disabled)
);--spectrum-tabs-textonly-tabitem-text-color-disabled:var(
--spectrum-tabs-m-textonly-tabitem-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);--spectrum-tabs-textonly-tabitem-icon-color:var(
--spectrum-tabs-m-textonly-tabitem-icon-color,var(--spectrum-alias-tabitem-icon-color-default)
);--spectrum-tabs-textonly-tabitem-text-color:var(
--spectrum-tabs-m-textonly-tabitem-text-color,var(--spectrum-alias-tabitem-text-color-default)
);--spectrum-tabs-textonly-tabitem-icon-color-hover:var(
--spectrum-tabs-m-textonly-tabitem-icon-color-hover,var(--spectrum-alias-tabitem-icon-color-hover)
);--spectrum-tabs-textonly-tabitem-text-color-hover:var(
--spectrum-tabs-m-textonly-tabitem-text-color-hover,var(--spectrum-alias-tabitem-text-color-hover)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus:var(
--spectrum-tabs-m-textonly-tabitem-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);--spectrum-tabs-textonly-divider-background-color:var(
--spectrum-tabs-m-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-textonly-tabitem-text-font-weight:var(
--spectrum-tabs-m-textonly-tabitem-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-textonly-tabitem-focus-ring-size:var(
--spectrum-tabs-m-textonly-tabitem-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tabs-textonly-tabitem-focus-ring-height:var(
--spectrum-tabs-m-textonly-tabitem-focus-ring-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-m-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-100)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-radius:var(
--spectrum-tabs-m-textonly-tabitem-focus-ring-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-tabs-textonly-tabitem-margin-right:var(
--spectrum-tabs-m-textonly-tabitem-margin-right,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-textonly-divider-border-radius:var(
--spectrum-tabs-m-textonly-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-vertical-quiet-textonly-divider-background-color:var(
--spectrum-tabs-m-vertical-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-m-vertical-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-vertical-textonly-divider-background-color:var(
--spectrum-tabs-m-vertical-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-vertical-textonly-tabitem-height:var(
--spectrum-tabs-m-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-550)
);--spectrum-tabs-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-m-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-tabs-compact-textonly-divider-size:var(
--spectrum-tabs-m-compact-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-textonly-height:var(
--spectrum-tabs-m-compact-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-compact-vertical-textonly-tabitem-height:var(
--spectrum-tabs-m-compact-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-400)
);--spectrum-tabs-compact-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-m-compact-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-100)
)}:host([size=l]){--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-l-quiet-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-quiet-textonly-divider-background-color:var(
--spectrum-tabs-l-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-quiet-textonly-tabitem-icon-gap:var(
--spectrum-tabs-l-quiet-textonly-tabitem-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-l-quiet-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-quiet-textonly-tabitem-height:var(
--spectrum-tabs-l-quiet-textonly-tabitem-height,var(--spectrum-global-dimension-size-700)
);--spectrum-tabs-quiet-textonly-divider-size:var(
--spectrum-tabs-l-quiet-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected:var(
--spectrum-tabs-l-emphasized-texticon-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected:var(
--spectrum-tabs-l-emphasized-texticon-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-l-emphasized-texticon-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-selection-indicator-color-emphasized)
);--spectrum-tabs-emphasized-textonly-divider-background-color:var(
--spectrum-tabs-l-emphasized-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-texticon-tabitem-text-size:var(
--spectrum-tabs-l-texticon-tabitem-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration:var(
--spectrum-tabs-l-texticon-tabitem-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-ease:var(
--spectrum-tabs-l-texticon-tabitem-selection-indicator-animation-ease,var(--spectrum-global-animation-ease-in-out)
);--spectrum-tabs-textonly-tabitem-icon-color-selected:var(
--spectrum-tabs-l-textonly-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected:var(
--spectrum-tabs-l-textonly-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-l-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus:var(
--spectrum-tabs-l-textonly-tabitem-icon-color-selected-key-focus,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus:var(
--spectrum-tabs-l-textonly-tabitem-text-color-selected-key-focus,var(--spectrum-alias-tabitem-text-color-selected-key-focus)
);--spectrum-tabs-textonly-tabitem-icon-color-disabled:var(
--spectrum-tabs-l-textonly-tabitem-icon-color-disabled,var(--spectrum-alias-tabitem-icon-color-disabled)
);--spectrum-tabs-textonly-tabitem-text-color-disabled:var(
--spectrum-tabs-l-textonly-tabitem-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);--spectrum-tabs-textonly-tabitem-icon-color:var(
--spectrum-tabs-l-textonly-tabitem-icon-color,var(--spectrum-alias-tabitem-icon-color-default)
);--spectrum-tabs-textonly-tabitem-text-color:var(
--spectrum-tabs-l-textonly-tabitem-text-color,var(--spectrum-alias-tabitem-text-color-default)
);--spectrum-tabs-textonly-tabitem-icon-color-hover:var(
--spectrum-tabs-l-textonly-tabitem-icon-color-hover,var(--spectrum-alias-tabitem-icon-color-hover)
);--spectrum-tabs-textonly-tabitem-text-color-hover:var(
--spectrum-tabs-l-textonly-tabitem-text-color-hover,var(--spectrum-alias-tabitem-text-color-hover)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus:var(
--spectrum-tabs-l-textonly-tabitem-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);--spectrum-tabs-textonly-divider-background-color:var(
--spectrum-tabs-l-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-textonly-tabitem-text-font-weight:var(
--spectrum-tabs-l-textonly-tabitem-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-textonly-tabitem-focus-ring-size:var(
--spectrum-tabs-l-textonly-tabitem-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tabs-textonly-tabitem-focus-ring-height:var(
--spectrum-tabs-l-textonly-tabitem-focus-ring-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-l-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-radius:var(
--spectrum-tabs-l-textonly-tabitem-focus-ring-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-tabs-textonly-tabitem-margin-right:var(
--spectrum-tabs-l-textonly-tabitem-margin-right,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-textonly-divider-border-radius:var(
--spectrum-tabs-l-textonly-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-vertical-quiet-textonly-divider-background-color:var(
--spectrum-tabs-l-vertical-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-l-vertical-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-vertical-textonly-divider-background-color:var(
--spectrum-tabs-l-vertical-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-vertical-textonly-tabitem-height:var(
--spectrum-tabs-l-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-650)
);--spectrum-tabs-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-l-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-tabs-compact-textonly-divider-size:var(
--spectrum-tabs-l-compact-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-textonly-height:var(
--spectrum-tabs-l-compact-textonly-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-compact-vertical-textonly-tabitem-height:var(
--spectrum-tabs-l-compact-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-500)
);--spectrum-tabs-compact-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-l-compact-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-115)
)}:host([size=xl]){--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-xl-quiet-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-quiet-textonly-divider-background-color:var(
--spectrum-tabs-xl-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-quiet-textonly-tabitem-icon-gap:var(
--spectrum-tabs-xl-quiet-textonly-tabitem-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-xl-quiet-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-125)
);--spectrum-tabs-quiet-textonly-tabitem-height:var(
--spectrum-tabs-xl-quiet-textonly-tabitem-height,var(--spectrum-global-dimension-size-800)
);--spectrum-tabs-quiet-textonly-divider-size:var(
--spectrum-tabs-xl-quiet-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected:var(
--spectrum-tabs-xl-emphasized-texticon-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected:var(
--spectrum-tabs-xl-emphasized-texticon-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-emphasized-selected-default)
);--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-xl-emphasized-texticon-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-selection-indicator-color-emphasized)
);--spectrum-tabs-emphasized-textonly-divider-background-color:var(
--spectrum-tabs-xl-emphasized-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-texticon-tabitem-text-size:var(
--spectrum-tabs-xl-texticon-tabitem-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration:var(
--spectrum-tabs-xl-texticon-tabitem-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)
);--spectrum-tabs-texticon-tabitem-selection-indicator-animation-ease:var(
--spectrum-tabs-xl-texticon-tabitem-selection-indicator-animation-ease,var(--spectrum-global-animation-ease-in-out)
);--spectrum-tabs-textonly-tabitem-icon-color-selected:var(
--spectrum-tabs-xl-textonly-tabitem-icon-color-selected,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected:var(
--spectrum-tabs-xl-textonly-tabitem-text-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-xl-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus:var(
--spectrum-tabs-xl-textonly-tabitem-icon-color-selected-key-focus,var(--spectrum-alias-tabitem-icon-color-selected)
);--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus:var(
--spectrum-tabs-xl-textonly-tabitem-text-color-selected-key-focus,var(--spectrum-alias-tabitem-text-color-selected-key-focus)
);--spectrum-tabs-textonly-tabitem-icon-color-disabled:var(
--spectrum-tabs-xl-textonly-tabitem-icon-color-disabled,var(--spectrum-alias-tabitem-icon-color-disabled)
);--spectrum-tabs-textonly-tabitem-text-color-disabled:var(
--spectrum-tabs-xl-textonly-tabitem-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);--spectrum-tabs-textonly-tabitem-icon-color:var(
--spectrum-tabs-xl-textonly-tabitem-icon-color,var(--spectrum-alias-tabitem-icon-color-default)
);--spectrum-tabs-textonly-tabitem-text-color:var(
--spectrum-tabs-xl-textonly-tabitem-text-color,var(--spectrum-alias-tabitem-text-color-default)
);--spectrum-tabs-textonly-tabitem-icon-color-hover:var(
--spectrum-tabs-xl-textonly-tabitem-icon-color-hover,var(--spectrum-alias-tabitem-icon-color-hover)
);--spectrum-tabs-textonly-tabitem-text-color-hover:var(
--spectrum-tabs-xl-textonly-tabitem-text-color-hover,var(--spectrum-alias-tabitem-text-color-hover)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus:var(
--spectrum-tabs-xl-textonly-tabitem-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);--spectrum-tabs-textonly-divider-background-color:var(
--spectrum-tabs-xl-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-textonly-tabitem-text-font-weight:var(
--spectrum-tabs-xl-textonly-tabitem-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-tabs-textonly-tabitem-focus-ring-size:var(
--spectrum-tabs-xl-textonly-tabitem-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-tabs-textonly-tabitem-focus-ring-height:var(
--spectrum-tabs-xl-textonly-tabitem-focus-ring-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-textonly-tabitem-focus-ring-padding-x:var(
--spectrum-tabs-xl-textonly-tabitem-focus-ring-padding-x,var(--spectrum-global-dimension-size-125)
);--spectrum-tabs-textonly-tabitem-focus-ring-border-radius:var(
--spectrum-tabs-xl-textonly-tabitem-focus-ring-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-tabs-textonly-tabitem-margin-right:var(
--spectrum-tabs-xl-textonly-tabitem-margin-right,var(--spectrum-global-dimension-size-300)
);--spectrum-tabs-textonly-divider-border-radius:var(
--spectrum-tabs-xl-textonly-divider-border-radius,var(--spectrum-global-dimension-static-size-10)
);--spectrum-tabs-vertical-quiet-textonly-divider-background-color:var(
--spectrum-tabs-xl-vertical-quiet-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-quiet)
);--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected:var(
--spectrum-tabs-xl-vertical-textonly-tabitem-selection-indicator-background-color-selected,var(--spectrum-alias-tabitem-text-color-selected-default)
);--spectrum-tabs-vertical-textonly-divider-background-color:var(
--spectrum-tabs-xl-vertical-textonly-divider-background-color,var(--spectrum-alias-tabs-divider-background-color-default)
);--spectrum-tabs-vertical-textonly-tabitem-height:var(
--spectrum-tabs-xl-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-750)
);--spectrum-tabs-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-xl-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-tabs-compact-textonly-divider-size:var(
--spectrum-tabs-xl-compact-textonly-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-tabs-compact-textonly-height:var(
--spectrum-tabs-xl-compact-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-compact-vertical-textonly-tabitem-height:var(
--spectrum-tabs-xl-compact-vertical-textonly-tabitem-height,var(--spectrum-global-dimension-size-600)
);--spectrum-tabs-compact-vertical-textonly-tabitem-gap:var(
--spectrum-tabs-xl-compact-vertical-textonly-tabitem-gap,var(--spectrum-global-dimension-size-125)
)}:host{--spectrum-tabs-compact-item-height:calc(var(--spectrum-tabs-compact-textonly-height) - var(--spectrum-tabs-compact-textonly-divider-size))}#list{display:flex;margin:0;padding-bottom:0;padding-top:0;position:relative;vertical-align:top;z-index:0}:host([dir=ltr]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=rtl]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=ltr]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=rtl]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-padding-x)*-1)}:host([dir=ltr]) #selection-indicator{left:0}:host([dir=rtl]) #selection-indicator{right:0}#selection-indicator{border-radius:var(--spectrum-tabs-textonly-divider-border-radius);position:absolute;transform-origin:top left;transition:transform var(
--spectrum-tabs-texticon-tabitem-selection-indicator-animation-duration
) var(--spectrum-tabs-texticon-tabitem-selection-indicator-animation-ease);z-index:0}:host([compact]) ::slotted(:not([slot])){height:var(
--spectrum-tabs-compact-item-height
);line-height:var(--spectrum-tabs-compact-item-height)}:host([direction^=horizontal]) #list{align-items:center;border-bottom:var(--spectrum-tabs-quiet-textonly-divider-size) solid}:host([direction^=horizontal]) ::slotted(:not([slot])){vertical-align:top}:host([dir=ltr][direction^=horizontal]) ::slotted(:not([slot]):not(:first-child)){margin-left:var(
--spectrum-tabs-textonly-tabitem-margin-right
)}:host([dir=rtl][direction^=horizontal]) ::slotted(:not([slot]):not(:first-child)){margin-right:var(
--spectrum-tabs-textonly-tabitem-margin-right
)}:host([direction^=horizontal]) #selection-indicator{bottom:0;bottom:calc(var(--spectrum-tabs-quiet-textonly-divider-size)*-1);height:var(--spectrum-tabs-quiet-textonly-divider-size);position:absolute}:host([direction^=horizontal][compact]) #list{align-items:end;box-sizing:content-box;height:var(--spectrum-tabs-compact-item-height)}:host([quiet]) #list{display:inline-flex}:host([dir=ltr][direction^=vertical]) #list{border-left:var(--spectrum-tabs-quiet-textonly-divider-size) solid}:host([dir=rtl][direction^=vertical]) #list{border-right:var(--spectrum-tabs-quiet-textonly-divider-size) solid}:host([direction^=vertical]) #list{display:inline-flex;flex-direction:column;padding:0}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])){margin-left:calc(var(--spectrum-tabs-vertical-textonly-tabitem-gap)/2)}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])){margin-right:calc(var(--spectrum-tabs-vertical-textonly-tabitem-gap)/2)}:host([direction^=vertical]) ::slotted(:not([slot])){height:var(
--spectrum-tabs-vertical-textonly-tabitem-height
);line-height:var(--spectrum-tabs-vertical-textonly-tabitem-height);margin-bottom:var(--spectrum-tabs-vertical-textonly-tabitem-gap);padding-bottom:0;padding-left:var(
--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x
);padding-right:var(
--spectrum-tabs-quiet-textonly-tabitem-focus-ring-padding-x
);padding-top:0}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-size)*-1)}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-size)*-1)}:host([dir=ltr][direction^=vertical]) ::slotted(:not([slot])):before{right:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-size)*-1)}:host([dir=rtl][direction^=vertical]) ::slotted(:not([slot])):before{left:calc(var(--spectrum-tabs-textonly-tabitem-focus-ring-size)*-1)}:host([direction^=vertical]) .spectrum-Icon{height:var(
--spectrum-tabs-vertical-textonly-tabitem-height
);line-height:var(--spectrum-tabs-vertical-textonly-tabitem-height)}:host([direction^=vertical][compact]) #list ::slotted(:not([slot])){height:var(
--spectrum-tabs-compact-vertical-textonly-tabitem-height
);line-height:var(--spectrum-tabs-compact-vertical-textonly-tabitem-height);margin-bottom:var(--spectrum-tabs-compact-vertical-textonly-tabitem-gap)}:host([dir=ltr][direction^=vertical]) #selection-indicator{left:0}:host([dir=rtl][direction^=vertical]) #selection-indicator{right:0}:host([dir=ltr][direction^=vertical]) #selection-indicator{left:calc(var(--spectrum-tabs-quiet-textonly-divider-size)*-1)}:host([dir=rtl][direction^=vertical]) #selection-indicator{right:calc(var(--spectrum-tabs-quiet-textonly-divider-size)*-1)}:host([direction^=vertical]) #selection-indicator{position:absolute;width:var(--spectrum-tabs-quiet-textonly-divider-size)}#list{border-bottom-color:var(
--spectrum-tabs-textonly-divider-background-color
)}:host([dir=ltr][direction^=vertical]) #list{border-left-color:var(
--spectrum-tabs-vertical-textonly-divider-background-color
)}:host([dir=rtl][direction^=vertical]) #list{border-right-color:var(
--spectrum-tabs-vertical-textonly-divider-background-color
)}#selection-indicator{background-color:var(
--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected
)}:host([emphasized]) #selection-indicator{background-color:var(
--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected
)}:host([emphasized]) ::slotted([selected]:not([slot])){color:var(
--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected
)}:host([emphasized]) ::slotted([selected]:not([slot])) .spectrum-Icon{color:var(
--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected
)}:host([quiet]) #list{border-bottom-color:var(
--spectrum-tabs-quiet-textonly-divider-background-color
)}:host([quiet]) #selection-indicator{background-color:var(
--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected
)}:host([quiet][emphasized]) #list #selection-indicator{background-color:var(
--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected
)}:host([dir=ltr][direction^=vertical][compact]) #list,:host([dir=ltr][direction^=vertical][quiet]) #list{border-left-color:var(
--spectrum-tabs-vertical-quiet-textonly-divider-background-color
)}:host([dir=rtl][direction^=vertical][compact]) #list,:host([dir=rtl][direction^=vertical][quiet]) #list{border-right-color:var(
--spectrum-tabs-vertical-quiet-textonly-divider-background-color
)}:host([direction^=vertical][compact]) #list #selection-indicator,:host([direction^=vertical][quiet]) #list #selection-indicator{background-color:var(
--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected
)}:host([dir=ltr][direction^=vertical][emphasized]) #list{border-left-color:var(
--spectrum-tabs-emphasized-textonly-divider-background-color
)}:host([dir=rtl][direction^=vertical][emphasized]) #list{border-right-color:var(
--spectrum-tabs-emphasized-textonly-divider-background-color
)}:host([direction^=vertical][emphasized]) #list #selection-indicator{background-color:var(
--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected
)}@media (forced-colors:active){#list{--spectrum-tabs-emphasized-texticon-tabitem-icon-color-selected:HighlightText;--spectrum-tabs-emphasized-texticon-tabitem-selection-indicator-background-color-selected:Highlight;--spectrum-tabs-emphasized-texticon-tabitem-text-color-selected:HighlightText;--spectrum-tabs-emphasized-textonly-divider-background-color:transparent;--spectrum-tabs-quiet-textonly-divider-background-color:transparent;--spectrum-tabs-quiet-textonly-tabitem-selection-indicator-background-color-selected:Highlight;--spectrum-tabs-textonly-divider-background-color:transparent;--spectrum-tabs-textonly-tabitem-focus-ring-border-color-key-focus:ButtonText;--spectrum-tabs-textonly-tabitem-icon-color-disabled:GrayText;--spectrum-tabs-textonly-tabitem-icon-color-hover:ButtonText;--spectrum-tabs-textonly-tabitem-icon-color-selected-key-focus:ButtonText;--spectrum-tabs-textonly-tabitem-icon-color-selected:HighlightText;--spectrum-tabs-textonly-tabitem-selection-indicator-background-color-selected:Highlight;--spectrum-tabs-textonly-tabitem-text-color-disabled:GrayText;--spectrum-tabs-textonly-tabitem-text-color-hover:ButtonText;--spectrum-tabs-textonly-tabitem-text-color-selected-key-focus:ButtonText;--spectrum-tabs-textonly-tabitem-text-color-selected:HighlightText;--spectrum-tabs-textonly-tabitem-text-color:ButtonText;--spectrum-tabs-vertical-quiet-textonly-divider-background-color:transparent;--spectrum-tabs-vertical-textonly-divider-background-color:transparent;--spectrum-tabs-vertical-textonly-tabitem-selection-indicator-background-color-selected:Highlight;forced-color-adjust:none}::slotted(:not([slot])):before{background-color:ButtonFace}::slotted([selected]:not([slot])){color:HighlightText}::slotted([selected]:not([slot])):before{background-color:Highlight;color:HighlightText}:host([emphasized]) #list ::slotted(:not([slot])):before{background-color:ButtonFace}:host([emphasized]) #list ::slotted([selected]:not([slot])){color:HighlightText}:host([emphasized]) #list ::slotted([selected]:not([slot])):before{background-color:Highlight;color:HighlightText}}:host{--spectrum-tabs-emphasized-textonly-divider-background-color:transparent;--spectrum-tabs-quiet-textonly-divider-background-color:transparent;--spectrum-tabs-textonly-divider-background-color:transparent;--spectrum-tabs-vertical-quiet-textonly-divider-background-color:transparent;--spectrum-tabs-vertical-textonly-divider-background-color:transparent;display:grid}:host([direction^=vertical]){grid-template-columns:auto 1fr}:host([direction=vertical]){gap:var(--spectrum-tabs-textonly-tabitem-focus-ring-size)}#selection-indicator{border-radius:0}:host([disabled]) #selection-indicator{background-color:var(
--spectrum-tabs-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) ::slotted(sp-tab){color:var(
--spectrum-tabs-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}#list{justify-content:var(--swc-tabs-list-justify-content)}:host([disabled]) #list{pointer-events:none}:host([direction=vertical-right]) #selection-indicator,:host([direction=vertical]) #selection-indicator{height:1px;top:0}:host([compact]){--spectrum-tabs-height:var(--spectrum-tabs-quiet-compact-height)}:host([direction=horizontal]:not([quiet])) #list{border-bottom-color:var(
--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200)
)}:host([dir][direction=horizontal]) #selection-indicator{width:1px}:host([dir=ltr][direction=vertical-right]) #list{border-left:0;border-right:var(
--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)
) solid;border-right-color:var(
--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200)
)}:host([dir=rtl][direction=vertical-right]) #list{border-left:var(
--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)
) solid;border-left-color:var(
--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200)
);border-right:0}:host([dir=ltr][direction=vertical-right]) #selection-indicator{left:auto;right:calc(var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick))*-1)}:host([dir=rtl][direction=vertical-right]) #selection-indicator{left:calc(var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick))*-1);right:auto}#selection-indicator.first-position{transition:none}`;class f extends(l(n)){constructor(){super(...arguments),this.auto=!1,this.direction="horizontal",this.emphasized=!1,this.label="",this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)",this.shouldAnimate=!1,this._selected="",this._tabs=[],this.rovingTabindexController=new u(this,{focusInIndex:t=>{let e=0;return t.find(((t,i)=>{const a=this.selected?!t.disabled&&t.value===this.selected:!t.disabled;return e=i,a}))?e:-1},direction:()=>"horizontal"===this.direction?"horizontal":"vertical",elementEnterAction:t=>{this.auto&&(this.shouldAnimate=!0,this.selectTarget(t))},elements:()=>this.tabs,isFocusableElement:t=>!t.disabled,listenerScope:()=>this.tabList}),this.onClick=t=>{if(this.disabled)return;const e=t.composedPath().find((t=>t.parentElement===this));e&&!e.disabled&&(this.shouldAnimate=!0,this.selectTarget(e))},this.onKeyDown=t=>{if("Enter"===t.code||"Space"===t.code){t.preventDefault();const e=t.target;e&&this.selectTarget(e)}},this.updateCheckedState=()=>{if(this.tabs.length||(this.tabs=[...this.querySelectorAll('[role="tab"]')]),this.tabs.forEach((t=>{t.removeAttribute("selected")})),this.selected){const t=this.tabs.find((t=>t.value===this.selected));t?t.selected=!0:this.selected=""}else{const t=this.tabs[0];t&&t.setAttribute("tabindex","0")}this.updateSelectionIndicator(),this.tabChangeResolver()},this.updateSelectionIndicator=async()=>{const t=this.tabs.find((t=>t.selected));if(!t)return void(this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)");await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const e=t.getBoundingClientRect(),i=this.getBoundingClientRect();if("horizontal"===this.direction){const t=e.width,a="ltr"===this.dir?e.left-i.left:e.right-i.right;this.selectionIndicatorStyle=`transform: translateX(${a}px) scaleX(${"ltr"===this.dir?t:-1*t});`}else{const t=e.height,a=e.top-i.top;this.selectionIndicatorStyle=`transform: translateY(${a}px) scaleY(${t});`}},this.tabChangePromise=Promise.resolve(),this.tabChangeResolver=function(){}}static get styles(){return[y]}get selected(){return this._selected}set selected(t){const e=this.selected;t!==e&&(this._selected=t,this.shouldUpdateCheckedState(),this.requestUpdate("selected",e))}set tabs(t){t!==this.tabs&&(this._tabs=t,this.rovingTabindexController.clearElementCache())}get tabs(){return this._tabs}get focusElement(){return this.rovingTabindexController.focusInElement||this}manageAutoFocus(){const t=[...this.children].map((t=>void 0!==t.updateComplete?t.updateComplete:Promise.resolve(!0)));Promise.all(t).then((()=>super.manageAutoFocus()))}managePanels({target:t}){t.assignedElements().map((t=>{const{value:e,id:i}=t,a=this.querySelector(`[role="tab"][value="${e}"]`);a&&(a.setAttribute("aria-controls",i),t.setAttribute("aria-labelledby",a.id)),t.selected=e===this.selected}))}render(){return e`<div aria-label="${d(this.label?this.label:void 0)}" @click="${this.onClick}" @keydown="${this.onKeyDown}" @sp-tab-contentchange="${this.updateSelectionIndicator}" id="list" role="tablist"><slot @slotchange="${this.onSlotChange}"></slot><div id="selection-indicator" class="${d(this.shouldAnimate?void 0:"first-position")}" style="${this.selectionIndicatorStyle}" role="presentation"></div></div><slot name="tab-panel" @slotchange="${this.managePanels}"></slot>`}willUpdate(t){if(!this.hasUpdated){const t=this.querySelector(":scope > [selected]");t&&this.selectTarget(t)}if(super.updated(t),t.has("selected")){if(t.get("selected")){const e=this.querySelector(`[role="tabpanel"][value="${t.get("selected")}"]`);e&&(e.selected=!1)}const e=this.querySelector(`[role="tabpanel"][value="${this.selected}"]`);e&&(e.selected=!0)}t.has("direction")&&("horizontal"===this.direction?this.removeAttribute("aria-orientation"):this.setAttribute("aria-orientation","vertical")),t.has("dir")&&this.updateSelectionIndicator(),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")),this.shouldAnimate||void 0===t.get("shouldAnimate")||(this.shouldAnimate=!0)}selectTarget(t){const e=t.getAttribute("value");if(e){const t=this.selected;this.selected=e;this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=t)}}onSlotChange(){this.tabs=[...this.querySelectorAll('[role="tab"]')],this.shouldUpdateCheckedState()}shouldUpdateCheckedState(){this.tabChangeResolver(),this.tabChangePromise=new Promise((t=>this.tabChangeResolver=t)),setTimeout(this.updateCheckedState)}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.tabChangePromise,t}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}i([a({type:Boolean})],f.prototype,"auto",void 0),i([a({reflect:!0})],f.prototype,"direction",void 0),i([a({type:Boolean,reflect:!0})],f.prototype,"emphasized",void 0),i([a()],f.prototype,"label",void 0),i([a({attribute:!1})],f.prototype,"selectionIndicatorStyle",void 0),i([a({attribute:!1})],f.prototype,"shouldAnimate",void 0),i([m("#list")],f.prototype,"tabList",void 0),i([a({reflect:!0})],f.prototype,"selected",null),customElements.define("sp-tabs",f);class z extends(l(t)){constructor(){super(...arguments),this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)",this.shouldAnimate=!1,this.onClick=t=>{const e=t.target;this.shouldAnimate=!0,this.selectTarget(e)},this.items=[],this.updateSelectionIndicator=async()=>{const t=this.items.find((t=>t.value===this.selected||t.value===window.location.href));if(!t)return void(this.selectionIndicatorStyle="transform: translateX(0px) scaleX(0) scaleY(0)");await Promise.all([t.updateComplete,document.fonts?document.fonts.ready:Promise.resolve()]);const e=t.getBoundingClientRect(),i=this.getBoundingClientRect(),a=e.width,o="ltr"===this.dir?e.left-i.left:e.right-i.right;this.selectionIndicatorStyle=`transform: translateX(${o}px) scaleX(${"ltr"===this.dir?a:-1*a});`}}static get styles(){return[y]}set selected(t){const e=this.selected;t!==e&&(this.updateCheckedState(t),this._selected=t,this.requestUpdate("selected",e))}get selected(){return this._selected}manageItems(){this.items=[...this.querySelectorAll("sp-top-nav-item")];const t=this.items.find((t=>t.value===window.location.href));t&&this.selectTarget(t)}render(){return e`<div @click="${this.onClick}" id="list"><slot @slotchange="${this.onSlotChange}"></slot><div id="selection-indicator" class="${d(this.shouldAnimate?void 0:"first-position")}" style="${this.selectionIndicatorStyle}"></div></div>`}firstUpdated(t){super.firstUpdated(t),this.setAttribute("direction","horizontal"),this.manageItems()}updated(t){super.updated(t),t.has("dir")&&this.updateSelectionIndicator(),this.shouldAnimate||void 0===t.get("shouldAnimate")||(this.shouldAnimate=!0)}selectTarget(t){const{value:e}=t;e&&(this.selected=e)}onSlotChange(){this.manageItems()}updateCheckedState(t){this.items.forEach((t=>{t.selected=!1})),requestAnimationFrame((()=>{if(t&&t.length){const e=this.items.find((e=>e.value===t||e.value===window.location.href));e?e.selected=!0:this.selected=""}this.updateSelectionIndicator()}))}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.addEventListener("loadingdone",this.updateSelectionIndicator)}disconnectedCallback(){window.removeEventListener("resize",this.updateSelectionIndicator),"fonts"in document&&document.fonts.removeEventListener("loadingdone",this.updateSelectionIndicator),super.disconnectedCallback()}}i([a()],z.prototype,"selectionIndicatorStyle",void 0),i([a({attribute:!1})],z.prototype,"shouldAnimate",void 0),i([a({reflect:!0})],z.prototype,"selected",null),customElements.define("sp-top-nav",z);var k,q=o`a{color:inherit}a:focus{outline:0}:host(:focus-within){color:var(
--spectrum-tabs-m-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host(:focus-within):before{border-color:var(
--spectrum-tabs-m-focus-ring-color,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-within) ::slotted([slot=icon]){color:var(
--spectrum-tabs-m-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}`;class w extends(b(n)){constructor(){super(...arguments),this.selected=!1,this.value=""}static get styles(){return[x,q]}get focusElement(){return this.anchor}click(){this.anchor.click()}render(){return e`<a id="item-label" href="${d(this.href)}" download="${d(this.download)}" target="${d(this.target)}" aria-label="${d(this.label)}" aria-current="${d(this.selected&&this.href?"page":void 0)}" rel="${d(this.rel)}"><slot></slot></a>`}firstUpdated(t){super.firstUpdated(t)}updated(t){super.updated(t),this.value=this.anchor.href}}i([m("a")],w.prototype,"anchor",void 0),i([a({type:Boolean,reflect:!0})],w.prototype,"selected",void 0),customElements.define("sp-top-nav-item",w),"requestIdleCallback"in window?requestIdleCallback((()=>import("./67b1a308.js"))):requestAnimationFrame((()=>import("./67b1a308.js"))),window.Overlay=p;class C extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n            <style>\n                :host {\n                    display: block;\n                    background-color: var(--spectrum-global-color-gray-50);\n                    color: var(--spectrum-global-color-gray-800);\n                    border: 1px solid;\n                    padding: 2em;\n                }\n            </style>\n            <slot></slot>\n        "}}customElements.define("styled-element",C),null===(k=document.querySelector('sp-tab-panel[value="api"]'))||void 0===k||k.addEventListener("click",(t=>{const e=t.composedPath().find((t=>"tr"===t.localName&&t.id));e&&(location.hash=e.id,t.target.dispatchEvent(new CustomEvent("copy-text",{bubbles:!0,composed:!0,detail:{text:e.dataset.value,message:`${e.dataset.name} copied to clipboard!`}})))}));
//# sourceMappingURL=ac8c7a7f.js.map
