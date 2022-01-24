import{e,R as t,a as i,b as r,c as o,T as s,x as n,S as a,y as l,_ as d,l as c,f as u,m as p,i as m,t as h,I as v,s as g,L as f}from"./610e82e0.js";import{r as x}from"./1a00b51e.js";function b(t){return e({...t,state:!0})}const{H:y}=t,w=e=>void 0===e.strings,k=()=>document.createComment(""),z=(e,t,i)=>{var r;const o=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(k(),s),r=o.insertBefore(k(),s);i=new y(t,r,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==s||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,s),e=t}}}return i},E=(e,t,i=e)=>(e._$AI(t,i),e),q={},I=(e,t=q)=>e._$AH=t,$=e=>e._$AH,S=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},T=i(class extends r{constructor(e){if(super(e),e.type!==o.PROPERTY&&e.type!==o.ATTRIBUTE&&e.type!==o.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!w(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===s||t===n)return t;const i=e.element,r=e.name;if(e.type===o.PROPERTY){if(t===i[r])return s}else if(e.type===o.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(r))return s}else if(e.type===o.ATTRIBUTE&&i.getAttribute(r)===t+"")return s;return I(e),t}});class A{constructor(e,{direction:t,elementEnterAction:i,elements:r,focusInIndex:o,isFocusableElement:s,listenerScope:n}={elements:()=>[]}){this._currentIndex=-1,this._direction=()=>"both",this.directionLength=5,this.elementEnterAction=e=>{},this.firstUpdated=!0,this._focused=!1,this._focusInIndex=e=>0,this.isFocusableElement=e=>!0,this._listenerScope=()=>this.host,this.managed=!0,this.manageIndexesAnimationFrame=0,this.handleFocusin=e=>{if(!this.isEventWithinListenerScope(e))return;this.isRelatedTargetAnElement(e)&&this.hostContainsFocus();const t=e.composedPath();let i=-1;t.find((e=>(i=this.elements.indexOf(e),-1!==i))),this.currentIndex=i>-1?i:this.currentIndex},this.handleFocusout=e=>{this.isRelatedTargetAnElement(e)&&this.hostNoLongerContainsFocus()},this.handleKeydown=e=>{if(!this.acceptsEventCode(e.code)||e.defaultPrevented)return;let t=0;switch(e.code){case"ArrowRight":t+=1;break;case"ArrowDown":t+="grid"===this.direction?this.directionLength:1;break;case"ArrowLeft":t-=1;break;case"ArrowUp":t-="grid"===this.direction?this.directionLength:1;break;case"End":this.currentIndex=0,t-=1;break;case"Home":this.currentIndex=this.elements.length-1,t+=1}e.preventDefault(),this.setCurrentIndexCircularly(t),this.elementEnterAction(this.elements[this.currentIndex]),this.focus()},this.host=e,this.host.addController(this),this._elements=r,this.isFocusableElement=s||this.isFocusableElement,"string"==typeof t?this._direction=()=>t:"function"==typeof t&&(this._direction=t),this.elementEnterAction=i||this.elementEnterAction,"number"==typeof o?this._focusInIndex=()=>o:"function"==typeof o&&(this._focusInIndex=o),"object"==typeof n?this._listenerScope=()=>n:"function"==typeof n&&(this._listenerScope=n)}get currentIndex(){return-1===this._currentIndex&&(this._currentIndex=this.focusInIndex),this._currentIndex}set currentIndex(e){this._currentIndex=e}get direction(){return this._direction()}get elements(){return this.cachedElements||(this.cachedElements=this._elements()),this.cachedElements}set focused(e){e!==this.focused&&(this._focused=e,this.manageTabindexes())}get focused(){return this._focused}get focusInElement(){return this.elements[this.focusInIndex]}get focusInIndex(){return this._focusInIndex(this.elements)}isEventWithinListenerScope(e){return this._listenerScope()===this.host||e.composedPath().includes(this._listenerScope())}focus(e){var t;null===(t=this.elements[this.currentIndex])||void 0===t||t.focus(e)}clearElementCache(){delete this.cachedElements,cancelAnimationFrame(this.manageIndexesAnimationFrame),this.managed&&(this.manageIndexesAnimationFrame=requestAnimationFrame((()=>this.manageTabindexes())))}setCurrentIndexCircularly(e){const{length:t}=this.elements;let i=t,r=(t+this.currentIndex+e)%t;for(;i&&this.elements[r]&&!this.isFocusableElement(this.elements[r]);)r=(t+r+e)%t,i-=1;this.currentIndex=r}hostContainsFocus(){this.host.addEventListener("focusout",this.handleFocusout),this.host.addEventListener("keydown",this.handleKeydown),this.focused=!0}hostNoLongerContainsFocus(){this.host.addEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout),this.host.removeEventListener("keydown",this.handleKeydown),this.currentIndex=this.focusInIndex,this.focused=!1}isRelatedTargetAnElement(e){const t=e.relatedTarget;return!this.elements.includes(t)}acceptsEventCode(e){if("End"===e||"Home"===e)return!0;switch(this.direction){case"horizontal":return"ArrowLeft"===e||"ArrowRight"===e;case"vertical":return"ArrowUp"===e||"ArrowDown"===e;case"both":case"grid":return e.startsWith("Arrow")}}manageTabindexes(){this.focused?this.updateTabindexes((()=>({tabIndex:-1}))):this.updateTabindexes((e=>({removeTabIndex:e.contains(this.focusInElement)&&e!==this.focusInElement,tabIndex:e===this.focusInElement?0:-1})))}updateTabindexes(e){this.elements.forEach((t=>{const{tabIndex:i,removeTabIndex:r}=e(t);if(!r)return void(t.tabIndex=i);t.removeAttribute("tabindex");const o=t;o.requestUpdate&&o.requestUpdate()}))}manage(){this.managed=!0,this.manageTabindexes(),this.addEventListeners()}unmanage(){this.managed=!1,this.updateTabindexes((()=>({tabIndex:0}))),this.removeEventListeners()}addEventListeners(){this.host.addEventListener("focusin",this.handleFocusin)}removeEventListeners(){this.host.removeEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout),this.host.removeEventListener("keydown",this.handleKeydown)}hostUpdated(){this.firstUpdated&&(this.manageTabindexes(),this.firstUpdated=!1)}hostConnected(){this.addEventListeners()}hostDisconnected(){this.removeEventListeners()}}var _=x`:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0ms;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0s linear calc(var(--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)) + var(--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0ms)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}`;class C extends a{constructor(){super(...arguments),this.open=!1}static get styles(){return[_]}render(){return l``}}d([e({type:Boolean,reflect:!0})],C.prototype,"open",void 0),customElements.define("sp-underlay",C);class L{constructor(e,{mode:t}={mode:"internal"}){this.hadId=!1,this.mode="internal",this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e)},this.host=e,this.instanceCount=L.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=t}get isInternal(){return"internal"===this.mode}render(e){return l`<div id="${c(this.isInternal?this.id:void 0)}"><slot name="${e?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}" @slotchange="${this.handleSlotchange}"><slot name="help-text"></slot></slot></div>`}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id,t=this.host.getAttribute("aria-describedby"),i=t?t.split(/\s+/):[];this.hadId=i.indexOf(e)>-1,this.hadId||(i.push(e),this.host.setAttribute("aria-describedby",i.join(" ")),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0)}removeId(){const e=this.host.getAttribute("aria-describedby");let t=e?e.split(/\s+/):[];if(!this.hadId){const e=this.helpTextElement?this.helpTextElement.id:this.id;t=t.filter((t=>t!==e))}t.length?this.host.setAttribute("aria-describedby",t.join(" ")):this.host.removeAttribute("aria-describedby"),this.helpTextElement||(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId())}handleNegativeHelpText(e){if("negative-help-text"!==e.name)return;e.assignedElements().forEach((e=>e.variant="negative"))}}function F(e,{mode:t}={mode:"internal"}){return class extends e{constructor(){super(...arguments),this.helpTextManager=new L(this,{mode:t})}get helpTextId(){return this.helpTextManager.id}renderHelpText(e){return this.helpTextManager.render(e)}}}L.instanceCount=0;var N=x`:host{--spectrum-textfield-texticon-padding-left:var(
--spectrum-textfield-m-texticon-padding-left
);--spectrum-textfield-quiet-texticon-border-bottom-size:var(
--spectrum-textfield-m-quiet-texticon-border-bottom-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-quiet-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-border-radius:var(
--spectrum-textfield-m-quiet-texticon-border-radius,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-left:var(
--spectrum-textfield-m-quiet-texticon-padding-left,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-right:var(
--spectrum-textfield-m-quiet-texticon-padding-right,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-texticon-border-size:var(
--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-texticon-text-line-height:var(
--spectrum-textfield-m-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-textfield-texticon-text-size:var(
--spectrum-textfield-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-textfield-texticon-placeholder-text-font-style:var(
--spectrum-textfield-m-texticon-placeholder-text-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-textfield-texticon-placeholder-text-font-weight:var(
--spectrum-textfield-m-texticon-placeholder-text-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-textfield-texticon-success-icon-height:var(
--spectrum-textfield-m-texticon-success-icon-height,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-width:var(
--spectrum-textfield-m-texticon-success-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-invalid-icon-height:var(
--spectrum-textfield-m-texticon-invalid-icon-height,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-width:var(
--spectrum-textfield-m-texticon-invalid-icon-width,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-min-width:var(
--spectrum-textfield-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-textfield-texticon-border-radius:var(
--spectrum-textfield-m-texticon-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-textfield-texticon-padding-right:var(
--spectrum-textfield-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-height:var(
--spectrum-textfield-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textarea-text-padding-top:var(
--spectrum-textarea-m-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-textarea-text-padding-bottom:var(
--spectrum-textarea-m-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-textarea-padding-left:var(
--spectrum-textarea-m-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-padding-right:var(
--spectrum-textarea-m-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-height:var(
--spectrum-textarea-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textfield-texticon-padding-top:3px;--spectrum-textfield-texticon-padding-bottom:5px;--spectrum-textfield-texticon-text-font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);--spectrum-textfield-texticon-icon-gap:var(
--spectrum-global-dimension-size-65
);--spectrum-textfield-quiet-texticon-icon-gap:var(
--spectrum-global-dimension-size-75
);--spectrum-textarea-min-height:var(--spectrum-textarea-height);--spectrum-textarea-height-adjusted:auto;--spectrum-textarea-padding-top:var(--spectrum-textarea-text-padding-top);--spectrum-textarea-padding-bottom:var(
--spectrum-textarea-text-padding-bottom
)}#textfield{display:inline-flex;min-width:var(--spectrum-textfield-texticon-min-width);position:relative;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([quiet][multiline]) #textfield .input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:after{border-color:transparent;border-radius:calc(var(--spectrum-textfield-texticon-border-radius) + var(--spectrum-textfield-m-texticon-focus-ring-gap,var(--spectrum-alias-input-focusring-gap)));bottom:0;content:"";left:0;margin:calc(var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
)*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([quiet]) #textfield:after{border-radius:0}.input{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);height:var(--spectrum-textfield-texticon-height);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:0;overflow:visible;padding:var(--spectrum-textfield-texticon-padding-top) var(--spectrum-textfield-texticon-padding-right) var(--spectrum-textfield-texticon-padding-bottom) calc(var(--spectrum-textfield-texticon-padding-left) + 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}.input::placeholder{font-style:var(--spectrum-textfield-texticon-placeholder-text-font-style);font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
);opacity:1;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:hover::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input:disabled{opacity:1;resize:none}.input:disabled::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input::-ms-clear{height:0;width:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}:host([dir=ltr][valid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)))}:host([dir=rtl][valid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)))}:host([dir=ltr][invalid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)))}:host([dir=rtl][invalid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)))}:host([multiline]) .input{height:var(
--spectrum-textarea-height-adjusted
);min-height:var(--spectrum-textarea-min-height);overflow:auto;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px)}:host([dir=ltr][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=rtl][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=ltr][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([dir=rtl][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([quiet]) .input{border-bottom-width:var(
--spectrum-textfield-quiet-texticon-border-bottom-size
);border-left-width:0;border-radius:var(
--spectrum-textfield-quiet-texticon-border-radius
);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}:host([dir=ltr][invalid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=rtl][invalid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=ltr][valid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}:host([dir=rtl][valid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}.icon{pointer-events:all;position:absolute}:host([dir=ltr][quiet]) .icon{padding-right:0}:host([dir=rtl][quiet]) .icon{padding-left:0}:host([dir=ltr][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([dir=rtl][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([invalid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-textfield-texticon-invalid-icon-height)/ 2);height:var(--spectrum-textfield-texticon-invalid-icon-height);width:var(
--spectrum-textfield-texticon-invalid-icon-width
)}:host([dir=ltr][quiet][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([dir=rtl][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([valid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-textfield-texticon-success-icon-height)/ 2);height:var(--spectrum-textfield-texticon-success-icon-height);width:var(
--spectrum-textfield-texticon-success-icon-width
)}:host([dir=ltr][quiet][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr]) .icon-workflow{left:var(
--spectrum-textfield-texticon-padding-left
)}:host([dir=rtl]) .icon-workflow{right:var(
--spectrum-textfield-texticon-padding-left
)}.icon-workflow{display:block;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);position:absolute;top:calc(var(--spectrum-textfield-texticon-height)/ 2 - var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225))/ 2);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr][quiet]) .icon-workflow{left:0}:host([dir=rtl][quiet]) .icon-workflow{right:0}:host([dir=ltr][quiet]) .icon-workflow~.input{padding-left:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=rtl][quiet]) .icon-workflow~.input{padding-right:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=ltr]) .icon-workflow+.input{padding-left:calc(var(--spectrum-textfield-texticon-padding-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-texticon-icon-gap))}:host([dir=rtl]) .icon-workflow+.input{padding-right:calc(var(--spectrum-textfield-texticon-padding-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-texticon-icon-gap))}:host([multiline]) .icon-workflow~.input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
);box-shadow:none}#textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#textfield:hover .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#textfield:active .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}#textfield:active .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host([valid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-valid,var(--spectrum-semantic-positive-icon-color)
)}:host([invalid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-hover,var(--spectrum-alias-input-border-color-invalid-hover)
)}:host([disabled]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid-disabled,var(--spectrum-alias-background-color-transparent)
)}:host([disabled]) #textfield .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}.icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([focused]) #textfield:after{box-shadow:0 0 0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([focused][quiet]) #textfield .input{box-shadow:none}:host([focused][quiet]) #textfield:after{border-bottom:2px solid var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);bottom:calc(var(
--spectrum-alias-input-quiet-focusline-gap,
var(--spectrum-global-dimension-static-size-10)
)*-1);box-shadow:none;margin:0}.input{background-color:var(
--spectrum-textfield-m-texticon-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
);color:var(
--spectrum-textfield-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}.input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color,var(--spectrum-global-color-gray-600)
)}.input:focus,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}.input.focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}.input:focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}.input :disabled,:host([disabled]) #textfield .input,:host([disabled]) #textfield:hover .input{-webkit-text-fill-color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);background-color:var(
--spectrum-textfield-m-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
);color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.input :disabled::placeholder,:host([disabled]) #textfield .input::placeholder,:host([disabled]) #textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([quiet]) .input{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid][quiet]) #textfield .input{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host{display:inline-flex;flex-direction:column;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([multiline]){resize:both}#textfield{width:100%}#textfield,textarea{resize:inherit}:host([grows]) .input{height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0}:host([grows]) #sizer{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:0;overflow:visible;overflow-wrap:break-word;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}:host([grows][quiet]) #sizer{border-bottom-width:var(--spectrum-textfield-quiet-texticon-border-size);border-left-width:0;border-radius:var(--spectrum-textfield-quiet-texticon-border-radius);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}.icon,.icon-workflow{pointer-events:none}`;const B=["text","url","tel","email","password"];class U extends(F(u)){constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[N,p]}get type(){var e;return null!==(e=B.find((e=>e===this._type)))&&void 0!==e?e:"text"}set type(e){const t=this._type;this._type=e,this.requestUpdate("type",t)}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(e,t,i="none"){this.inputElement.setSelectionRange(e,t,i)}select(){this.inputElement.select()}onInput(){if(this.allowedKeys&&this.inputElement.value){if(!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const e=this.inputElement.selectionStart-1;return this.inputElement.value=this.value.toString(),void this.inputElement.setSelectionRange(e,e)}}this.value=this.inputElement.value}onChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!0}onBlur(){this.focused=!1}renderStateIcons(){return this.invalid?l`<sp-icon-alert id="invalid" class="icon"></sp-icon-alert>`:this.valid?l`<sp-icon-checkmark100 id="valid" class="icon spectrum-UIIcon-Checkmark100"></sp-icon-checkmark100>`:n}get displayValue(){return this.value.toString()}get renderMultiline(){return l`${this.grows&&!this.quiet?l`<div id="sizer">${this.value}</div>`:n} <textarea aria-describedby="${this.helpTextId}" aria-label="${this.label||this.placeholder}" aria-invalid="${c(this.invalid||void 0)}" class="input" maxlength="${c(this.maxlength>-1?this.maxlength:void 0)}" minlength="${c(this.minlength>-1?this.minlength:void 0)}" pattern="${c(this.pattern)}" placeholder="${this.placeholder}" .value="${this.displayValue}" @change="${this.onChange}" @input="${this.onInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${c(this.autocomplete)}"></textarea>`}get renderInput(){return l`<input type="${this.type}" aria-describedby="${this.helpTextId}" aria-label="${this.label||this.placeholder}" aria-invalid="${c(this.invalid||void 0)}" class="input" maxlength="${c(this.maxlength>-1?this.maxlength:void 0)}" minlength="${c(this.minlength>-1?this.minlength:void 0)}" pattern="${c(this.pattern)}" placeholder="${this.placeholder}" .value="${T(this.displayValue)}" @change="${this.onChange}" @input="${this.onInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${c(this.autocomplete)}">`}renderField(){return l`${this.renderStateIcons()} ${this.multiline?this.renderMultiline:this.renderInput}`}render(){return l`<div id="textfield">${this.renderField()}</div>${this.renderHelpText(this.invalid)}`}updated(e){(e.has("value")||e.has("required")&&this.required)&&this.checkValidity()}checkValidity(){let e=this.inputElement.checkValidity();if(this.required||this.value&&this.pattern){if((this.disabled||this.multiline)&&this.pattern){e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())}void 0!==this.minlength&&(e=e&&this.value.toString().length>this.minlength),this.valid=e,this.invalid=!e}return e}}d([e({attribute:"allowed-keys"})],U.prototype,"allowedKeys",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"focused",void 0),d([m(".input")],U.prototype,"inputElement",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"invalid",void 0),d([e()],U.prototype,"label",void 0),d([e()],U.prototype,"placeholder",void 0),d([e({attribute:"type",reflect:!0})],U.prototype,"_type",void 0),d([b()],U.prototype,"type",null),d([e()],U.prototype,"pattern",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"grows",void 0),d([e({type:Number})],U.prototype,"maxlength",void 0),d([e({type:Number})],U.prototype,"minlength",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"multiline",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"readonly",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"valid",void 0),d([e({type:String})],U.prototype,"value",null),d([e({type:Boolean,reflect:!0})],U.prototype,"quiet",void 0),d([e({type:Boolean,reflect:!0})],U.prototype,"required",void 0),d([e({type:String,reflect:!0})],U.prototype,"autocomplete",void 0);class R extends U{constructor(){super(...arguments),this._value=""}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}}d([e({type:String})],R.prototype,"value",null);customElements.define("sp-icon-magnify",class extends v{render(){return g(l),(({width:e=24,height:t=24,hidden:i=!1,title:r="Magnify"}={})=>h`<svg xmlns="http://www.w3.org/2000/svg" height="${t}" viewBox="0 0 36 36" width="${e}" aria-hidden="${i?"true":"false"}" role="img" fill="currentColor" aria-label="${r}"><path d="M33.173 30.215L25.4 22.443a12.826 12.826 0 10-2.957 2.957l7.772 7.772a2.1 2.1 0 002.958-2.958zM6 15a9 9 0 119 9 9 9 0 01-9-9z"/></svg>`)({hidden:!this.label,title:this.label})}});var P=x`:host{--spectrum-search-quiet-button-offset:calc(var(
--spectrum-actionbutton-m-texticon-min-width,
var(--spectrum-global-dimension-size-400)
)/2 - var(--spectrum-alias-ui-icon-cross-size-100)/2)}#textfield{display:inline-block;position:relative}:host([dir=ltr]) #button{right:0}:host([dir=rtl]) #button{left:0}#button{position:absolute;top:0}#input{-webkit-appearance:none;border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
);outline-offset:-2px}#input::-webkit-search-cancel-button,#input::-webkit-search-decoration{-webkit-appearance:none}#textfield:after{border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([quiet])) #textfield .icon{left:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=rtl]:not([quiet])) #textfield .icon{right:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=ltr]:not([quiet])) #textfield #input{padding-left:calc(var(--spectrum-alias-search-padding-left-m) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)) - var(--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)))}:host([dir=rtl]:not([quiet])) #textfield #input{padding-right:calc(var(--spectrum-alias-search-padding-left-m) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)) - var(--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)))}:host([quiet]) #button{transform:translateX(var(--spectrum-search-quiet-button-offset))}:host([quiet]) #input{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}:host([quiet]) #textfield:after{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}.icon{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#input:hover~.icon{color:var(
--spectrum-search-m-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#input:active~.icon{color:var(
--spectrum-search-m-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}#input.focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}#input:focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}#input:disabled~.icon{color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}input::-webkit-search-cancel-button{display:none}`;const D=e=>e.stopPropagation();class H extends R{constructor(){super(...arguments),this.action="",this.label="Search",this.placeholder="Search"}static get styles(){return[...super.styles,P]}handleSubmit(e){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||e.preventDefault()}handleKeydown(e){const{code:t}=e;this.value&&"Escape"===t&&this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}renderField(){return l`<form action="${this.action}" id="form" method="${c(this.method)}" @submit="${this.handleSubmit}" @reset="${this.reset}" @keydown="${this.handleKeydown}"><sp-icon-magnify class="icon magnifier icon-workflow"></sp-icon-magnify>${super.renderField()} ${this.value?l`<sp-clear-button id="button" label="Reset" tabindex="-1" type="reset" @keydown="${D}"></sp-clear-button>`:l``}</form>`}firstUpdated(e){super.firstUpdated(e),this.inputElement.setAttribute("type","search")}updated(e){super.updated(e),this.multiline=!1}}d([e()],H.prototype,"action",void 0),d([e()],H.prototype,"label",void 0),d([e()],H.prototype,"method",void 0),d([e()],H.prototype,"placeholder",void 0),d([m("#form")],H.prototype,"form",void 0),customElements.define("sp-search",H);var M=x`:host{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
)}:host{list-style-type:none;margin:0;padding:0}:host{--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular)
);display:block;width:240px}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-multilevel-main-item-font-weight,var(--spectrum-global-font-weight-bold)
)}`;var j=x`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host{list-style-type:none;margin-bottom:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
);margin-left:0;margin-right:0;margin-top:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
)}#item-link{align-items:center;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;cursor:pointer;display:inline-flex;font-size:var(
--spectrum-sidenav-item-text-size,var(--spectrum-alias-font-size-default)
);font-style:normal;font-weight:var(
--spectrum-sidenav-item-text-font-weight,var(--spectrum-global-font-weight-regular)
);-webkit-hyphens:auto;hyphens:auto;justify-content:left;min-height:var(
--spectrum-sidenav-item-height,var(--spectrum-alias-single-line-height)
);padding:var(--spectrum-sidenav-item-padding-y) var(
--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)
);position:relative;text-decoration:none;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;width:100%;word-break:break-word}#item-link:focus{outline:0}#item-link:before{border:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0;transition:border var(--spectrum-global-animation-duration-100,.13s) ease-out}:host([dir=ltr]) #item-link ::slotted([slot=icon]){margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) #item-link ::slotted([slot=icon]){margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}#item-link ::slotted([slot=icon]){flex-shrink:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-right:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-left:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-left:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-right:0}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #item-link{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #item-link{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list #item-link{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list #item-link{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([selected])>#item-link{background-color:var(
--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-selected,var(--spectrum-alias-text-color-hover)
)}.is-active>#item-link{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}:host([disabled]) #item-link{background-color:var(
--spectrum-sidenav-item-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);cursor:default;pointer-events:none}#item-link{background-color:var(
--spectrum-sidenav-item-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color,var(--spectrum-alias-text-color)
)}#item-link:hover{background-color:var(
--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-hover,var(--spectrum-alias-text-color-hover)
)}#item-link:active{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}#item-link.focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#item-link:focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#item-link.focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#item-link:focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{display:block}:host([disabled]){pointer-events:none}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,700
)}::slotted(sp-sidenav-item:not([multiLevel])){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,400
)}#item-link{font-weight:var(--spectrum-web-component-sidenav-font-weight);justify-content:start}:host([dir=ltr]) #item-link[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) #item-link[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="1"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #item-link[data-level="2"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}a ::slotted(sp-sidenav-item){display:none}`;class K extends(f(u)){constructor(){super(...arguments),this.value=void 0,this.selected=!1,this.expanded=!1}static get styles(){return[j]}get parentSideNav(){return this._parentSidenav||(this._parentSidenav=this.closest("sp-sidenav")),this._parentSidenav}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){let e=0,t=this.parentElement;for(;t instanceof K;)e++,t=t.parentElement;return e}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){!this.href&&e&&e.preventDefault(),this.disabled||(this.hasChildren?this.expanded=!this.expanded:this.value&&this.announceSelected(this.value))}announceSelected(e){const t=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}click(){this.handleClick()}get focusElement(){return this.shadowRoot.querySelector("#item-link")}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return l`<a href="${this.href||"#"}" target="${c(this.target)}" download="${c(this.download)}" rel="${c(this.rel)}" data-level="${this.depth}" @click="${this.handleClick}" id="item-link" aria-current="${c(this.selected&&this.href?"page":void 0)}"><slot name="icon"></slot>${this.label}<slot></slot></a>${this.expanded?l`<slot name="descendant"></slot>`:l``}`}updated(e){this.hasChildren&&this.expanded&&!this.selected&&(this.focusElement.tabIndex=-1),super.updated(e)}connectedCallback(){super.connectedCallback(),this.startTrackingSelection()}disconnectedCallback(){this.stopTrackingSelection(),super.disconnectedCallback()}async startTrackingSelection(){const e=this.parentSideNav;e&&(await e.updateComplete,e.startTrackingSelectionForItem(this),this.selected=null!=this.value&&this.value===e.value)}stopTrackingSelection(){const e=this.parentSideNav;e&&e.stopTrackingSelectionForItem(this),this._parentSidenav=void 0}}d([e()],K.prototype,"value",void 0),d([e({type:Boolean,reflect:!0})],K.prototype,"selected",void 0),d([e({type:Boolean,reflect:!0})],K.prototype,"expanded",void 0);var O=x`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host([dir=ltr]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) #heading{margin-right:0}:host([dir=rtl]) #heading{margin-left:0}:host([dir=ltr]) #heading{margin-left:0}:host([dir=rtl]) #heading{margin-right:0}#heading{border-radius:var(
--spectrum-sidenav-heading-border-radius,var(--spectrum-alias-border-radius-regular)
);font-size:var(
--spectrum-sidenav-heading-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:normal;font-weight:var(
--spectrum-sidenav-heading-text-font-weight,var(--spectrum-global-font-weight-medium)
);height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);letter-spacing:var(
--spectrum-sidenav-heading-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);margin-bottom:var(
--spectrum-sidenav-heading-gap-bottom,var(--spectrum-global-dimension-size-50)
);margin-top:var(
--spectrum-sidenav-heading-gap-top,var(--spectrum-global-dimension-size-200)
);padding-bottom:0;padding-left:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-right:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-top:0;text-transform:uppercase}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-margin-left,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}#heading{color:var(
--spectrum-sidenav-heading-text-color,var(--spectrum-global-color-gray-700)
)}:host{display:block}`;class V extends a{constructor(){super(...arguments),this.label=""}static get styles(){return[j,O]}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return l`<h2 id="heading">${this.label}</h2><div id="list" aria-labelledby="heading"><slot name="descendant"></slot></div>`}}d([e({reflect:!0})],V.prototype,"label",void 0);class W extends u{constructor(){super(...arguments),this.items=new Set,this.rovingTabindexController=new A(this,{focusInIndex:e=>e.findIndex((e=>this.value?!e.disabled&&!this.isDisabledChild(e)&&e.value===this.value:!e.disabled&&!this.isDisabledChild(e))),direction:"vertical",elements:()=>[...this.querySelectorAll("sp-sidenav-item")],isFocusableElement:e=>!e.disabled&&!this.isDisabledChild(e)}),this.manageTabIndex=!1,this.value=void 0}static get styles(){return[M]}startTrackingSelectionForItem(e){this.items.add(e),this.rovingTabindexController.clearElementCache()}stopTrackingSelectionForItem(e){this.items.delete(e),this.rovingTabindexController.clearElementCache()}handleSelect(e){if(e.stopPropagation(),this.value===e.detail.value)return;const t=this.value;this.value=e.detail.value;this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))?this.items.forEach((t=>t.handleSideNavSelect(e))):(this.value=t,e.target.selected=!1,e.preventDefault())}focus(){this.rovingTabindexController.focus()}blur(){this.focusElement!==this&&super.blur()}click(){this.focusElement!==this&&super.click()}get focusElement(){return this.rovingTabindexController.focusInElement||this}isDisabledChild(e){if(e.disabled)return!0;let t=e.parentElement;for(;t instanceof V||!t.disabled&&t instanceof K&&t.expanded;)t=t.parentElement;return t!==this}handleSlotchange(){this.manageTabIndex?this.rovingTabindexController.manage():this.rovingTabindexController.unmanage()}render(){return l`<nav @sidenav-select="${this.handleSelect}"><slot name="descendant" @slotchange="${this.handleSlotchange}"></slot></nav>`}firstUpdated(e){super.firstUpdated(e);const t=this.querySelector("[selected]");t&&(this.value=t.value)}updated(e){super.updated(e),e.has("manageTabIndex")&&(this.manageTabIndex?this.rovingTabindexController.manage():this.rovingTabindexController.unmanage())}}d([e({type:Boolean,reflect:!0,attribute:"manage-tab-index"})],W.prototype,"manageTabIndex",void 0),d([e({reflect:!0})],W.prototype,"value",void 0),customElements.define("sp-sidenav",W),customElements.define("sp-sidenav-item",K);export{F as M,A as R,V as S,U as T,$ as a,R as b,E as c,S as m,w as r,I as s,b as t,z as u};
//# sourceMappingURL=71b6d35d.js.map
