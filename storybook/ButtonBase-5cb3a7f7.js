import { L as LikeAnchor } from './like-anchor-86192240.js';
import { F as Focusable } from './focusable-f5539e66.js';
import { O as ObserveSlotText } from './observe-slot-text-94a58958.js';
import { i } from './lit-element-9354aa77.js';
import { x } from './lit-html-126adc72.js';
import { n } from './define-element-617dba69.js';
import { i as i$1 } from './query-d0113d5a.js';

const s$1=i`
:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}::slotted(sp-overlay),::slotted(sp-tooltip){position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentcolor;stroke:currentcolor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}[icon-only]+#label{display:contents}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`;var b = s$1;

var d=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=(o,r,e,t)=>{for(var i=t>1?void 0:t?c(r,e):r,a=o.length-1,h;a>=0;a--)(h=o[a])&&(i=(t?h(r,e,i):h(i))||i);return t&&i&&d(r,e,i),i};class ButtonBase extends ObserveSlotText(LikeAnchor(Focusable),"",["sp-overlay,sp-tooltip"]){constructor(){super();this.active=!1;this.type="button";this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0});}static get styles(){return [b]}get focusElement(){return this}get hasLabel(){return this.slotHasContent}get buttonContent(){return [x`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `,x`
                <span id="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `]}click(){this.disabled||this.shouldProxyClick()||super.click();}handleClickCapture(e){if(this.disabled)return e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),!1}proxyFocus(){this.focus();}shouldProxyClick(){let e=!1;if(this.anchorElement)this.anchorElement.click(),e=!0;else if(this.type!=="button"){const t=document.createElement("button");t.type=this.type,this.insertAdjacentElement("afterend",t),t.click(),t.remove(),e=!0;}return e}renderAnchor(){return x`
            ${this.buttonContent}
            ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}
        `}renderButton(){return x`
            ${this.buttonContent}
        `}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(e){const{code:t}=e;switch(t){case"Space":e.preventDefault(),typeof this.href=="undefined"&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0);break;}}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click();break;}}handleKeyup(e){const{code:t}=e;switch(t){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click();break;}}handleRemoveActive(){this.active=!1;}handlePointerdown(){this.active=!0;}manageAnchor(){this.href&&this.href.length>0?((!this.hasAttribute("role")||this.getAttribute("role")==="button")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):((!this.hasAttribute("role")||this.getAttribute("role")==="link")&&this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick));}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown);}updated(e){super.updated(e),e.has("href")&&this.manageAnchor(),e.has("label")&&this.setAttribute("aria-label",this.label||""),e.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1);}}s([n({type:Boolean,reflect:!0})],ButtonBase.prototype,"active",2),s([n({type:String})],ButtonBase.prototype,"type",2),s([i$1(".anchor")],ButtonBase.prototype,"anchorElement",2);

export { ButtonBase as B };
