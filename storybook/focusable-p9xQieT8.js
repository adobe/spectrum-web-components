import { F as FocusVisiblePolyfillMixin } from './focus-visible-68QWcOy-.js';
import { n as n$1, S as SpectrumElement } from './define-element-UHExAFdK.js';

var u=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var n=(s,a,e,t)=>{for(var i=t>1?void 0:t?b(a,e):a,o=s.length-1,r;o>=0;o--)(r=s[o])&&(i=(t?r(a,e,i):r(i))||i);return t&&i&&u(a,e,i),i};function d(){return new Promise(s=>requestAnimationFrame(()=>s()))}class Focusable extends FocusVisiblePolyfillMixin(SpectrumElement){constructor(){super(...arguments);this.disabled=!1;this.autofocus=!1;this._tabIndex=0;this.manipulatingTabindex=!1;this._recentlyConnected=!1;}get tabIndex(){if(this.focusElement===this){const t=this.hasAttribute("tabindex")?Number(this.getAttribute("tabindex")):NaN;return isNaN(t)?-1:t}const e=parseFloat(this.hasAttribute("tabindex")&&this.getAttribute("tabindex")||"0");return this.disabled||e<0?-1:this.focusElement?this.focusElement.tabIndex:e}set tabIndex(e){if(this.manipulatingTabindex){this.manipulatingTabindex=!1;return}if(this.focusElement===this){if(e!==this._tabIndex){this._tabIndex=e;const t=this.disabled?"-1":""+e;this.manipulatingTabindex=!0,this.setAttribute("tabindex",t);}return}if(e===-1?this.addEventListener("pointerdown",this.onPointerdownManagementOfTabIndex):(this.manipulatingTabindex=!0,this.removeEventListener("pointerdown",this.onPointerdownManagementOfTabIndex)),e===-1||this.disabled){this.setAttribute("tabindex","-1"),this.removeAttribute("focusable"),e!==-1&&this.manageFocusElementTabindex(e);return}this.setAttribute("focusable",""),this.hasAttribute("tabindex")?this.removeAttribute("tabindex"):this.manipulatingTabindex=!1,this.manageFocusElementTabindex(e);}onPointerdownManagementOfTabIndex(){this.tabIndex===-1&&setTimeout(()=>{this.tabIndex=0,this.focus({preventScroll:!0}),this.tabIndex=-1;});}async manageFocusElementTabindex(e){this.focusElement||await this.updateComplete,e===null?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=e;}get focusElement(){throw new Error("Must implement focusElement getter!")}focus(e){this.disabled||!this.focusElement||(this.focusElement!==this?this.focusElement.focus(e):HTMLElement.prototype.focus.apply(this,[e]));}blur(){const e=this.focusElement||this;e!==this?e.blur():HTMLElement.prototype.blur.apply(this);}click(){if(this.disabled)return;const e=this.focusElement||this;e!==this?e.click():HTMLElement.prototype.click.apply(this);}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus());}firstUpdated(e){super.firstUpdated(e),(!this.hasAttribute("tabindex")||this.getAttribute("tabindex")!=="-1")&&this.setAttribute("focusable","");}update(e){e.has("disabled")&&this.handleDisabledChanged(this.disabled,e.get("disabled")),super.update(e);}updated(e){super.updated(e),e.has("disabled")&&this.disabled&&this.blur();}async handleDisabledChanged(e,t){const i=()=>this.focusElement!==this&&typeof this.focusElement.disabled!="undefined";e?(this.manipulatingTabindex=!0,this.setAttribute("tabindex","-1"),await this.updateComplete,i()?this.focusElement.disabled=!0:this.setAttribute("aria-disabled","true")):t&&(this.manipulatingTabindex=!0,this.focusElement===this?this.setAttribute("tabindex",""+this._tabIndex):this.removeAttribute("tabindex"),await this.updateComplete,i()?this.focusElement.disabled=!1:this.removeAttribute("aria-disabled"));}async getUpdateComplete(){const e=await super.getUpdateComplete();return this._recentlyConnected&&(this._recentlyConnected=!1,await d(),await d()),e}connectedCallback(){super.connectedCallback(),this._recentlyConnected=!0,this.updateComplete.then(()=>{this.manageAutoFocus();});}}n([n$1({type:Boolean,reflect:!0})],Focusable.prototype,"disabled",2),n([n$1({type:Boolean})],Focusable.prototype,"autofocus",2),n([n$1({type:Number})],Focusable.prototype,"tabIndex",1);

export { Focusable as F };