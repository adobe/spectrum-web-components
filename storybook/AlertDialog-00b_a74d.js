import './sp-button-W8hFYHyg.js';
import { c as conditionAttributeWithId } from './condition-attribute-with-id-nb2zon-s.js';
import { s as s$1 } from './resize-controller--ByFn5Jx.js';
import { i } from './lit-element-xBOPiTek.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-68QWcOy-.js';
import { i as i$1 } from './query-JMOstM_r.js';
import { n, S as SpectrumElement } from './define-element-s04w2teA.js';
import { x } from './lit-html-GmIhAbMP.js';

const e=i`
:host{--spectrum-alert-dialog-min-width:var(
--spectrum-alert-dialog-minimum-width
);--spectrum-alert-dialog-max-width:var(
--spectrum-alert-dialog-maximum-width
);--spectrum-alert-dialog-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-alert-dialog-warning-icon-color:var(
--spectrum-notice-visual-color
);--spectrum-alert-dialog-error-icon-color:var(
--spectrum-negative-visual-color
);--spectrum-alert-dialog-title-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-alert-dialog-title-font-weight:var(
--spectrum-heading-sans-serif-font-weight
);--spectrum-alert-dialog-title-font-style:var(
--spectrum-heading-sans-serif-font-style
);--spectrum-alert-dialog-title-font-size:var(
--spectrum-alert-dialog-title-size
);--spectrum-alert-dialog-title-line-height:var(
--spectrum-heading-line-height
);--spectrum-alert-dialog-title-color:var(--spectrum-heading-color);--spectrum-alert-dialog-body-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-alert-dialog-body-font-weight:var(
--spectrum-body-sans-serif-font-weight
);--spectrum-alert-dialog-body-font-style:var(
--spectrum-body-sans-serif-font-style
);--spectrum-alert-dialog-body-font-size:var(
--spectrum-alert-dialog-description-size
);--spectrum-alert-dialog-body-line-height:var(--spectrum-line-height-100);--spectrum-alert-dialog-body-color:var(--spectrum-body-color);--spectrum-alert-dialog-title-to-divider:var(--spectrum-spacing-200);--spectrum-alert-dialog-divider-to-description:var(--spectrum-spacing-300);--spectrum-alert-dialog-title-to-icon:var(--spectrum-spacing-300);--mod-buttongroup-justify-content:flex-end}:host{box-sizing:border-box;display:flex;inline-size:-moz-fit-content;inline-size:fit-content;max-block-size:inherit;max-inline-size:var(
--mod-alert-dialog-max-width,var(--spectrum-alert-dialog-max-width)
);min-inline-size:var(
--mod-alert-dialog-min-width,var(--spectrum-alert-dialog-min-width)
);outline:none;padding:var(
--mod-alert-dialog-padding,var(--spectrum-alert-dialog-padding)
)}.icon{block-size:var(
--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size)
);flex-shrink:0;inline-size:var(
--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size)
);margin-inline-start:var(
--mod-alert-dialog-title-to-icon,var(--spectrum-alert-dialog-title-to-icon)
)}:host([variant=warning]){--mod-icon-color:var(
--mod-alert-dialog-warning-icon-color,var(--spectrum-alert-dialog-warning-icon-color)
)}:host([variant=error]){--mod-icon-color:var(
--mod-alert-dialog-error-icon-color,var(--spectrum-alert-dialog-error-icon-color)
)}.grid{display:grid}.header{align-items:baseline;display:flex;justify-content:space-between}::slotted([slot=heading]){color:var(
--mod-alert-dialog-title-color,var(--spectrum-alert-dialog-title-color)
);font-family:var(
--mod-alert-dialog-title-font-family,var(--spectrum-alert-dialog-title-font-family)
);font-size:var(
--mod-alert-dialog-title-font-size,var(--spectrum-alert-dialog-title-font-size)
);font-style:var(
--mod-alert-dialog-title-font-style,var(--spectrum-alert-dialog-title-font-style)
);font-weight:var(
--mod-alert-dialog-title-font-weight,var(--spectrum-alert-dialog-title-font-weight)
);line-height:var(
--mod-alert-dialog-title-line-height,var(--spectrum-alert-dialog-title-line-height)
);margin:0;margin-block-end:var(
--mod-alert-dialog-title-to-divider,var(--spectrum-alert-dialog-title-to-divider)
)}.content{-webkit-overflow-scrolling:touch;color:var(
--mod-alert-dialog-body-color,var(--spectrum-alert-dialog-body-color)
);font-family:var(
--mod-alert-dialog-body-font-family,var(--spectrum-alert-dialog-body-font-family)
);font-size:var(
--mod-alert-dialog-body-font-size,var(--spectrum-alert-dialog-body-font-size)
);font-style:var(
--mod-alert-dialog-body-font-style,var(--spectrum-alert-dialog-body-font-style)
);font-weight:var(
--mod-alert-dialog-body-font-weight,var(--spectrum-alert-dialog-body-font-weight)
);line-height:var(
--mod-alert-dialog-body-line-height,var(--spectrum-alert-dialog-body-line-height)
);margin:0;margin-block-end:var(
--mod-alert-dialog-description-to-buttons,var(--spectrum-alert-dialog-description-to-buttons)
);margin-block-start:var(
--mod-alert-dialog-divider-to-description,var(--spectrum-alert-dialog-divider-to-description)
);overflow-y:auto}@media (forced-colors:active){:host{border:solid}}
`;var f = e;

var b=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var d=(l,r,e,t)=>{for(var i=t>1?void 0:t?p(r,e):r,n=l.length-1,a;n>=0;n--)(a=l[n])&&(i=(t?a(r,e,i):a(i))||i);return t&&i&&b(r,e,i),i};const alertDialogVariants=["confirmation","information","warning","error","destructive","secondary"];let E=0;function h(l,r){const e=l.assignedElements(),t=[];return e.forEach(i=>{if(i.id)t.push(i.id);else {const n=r+`-${E++}`;i.id=n,t.push(n);}}),t}const s=class s extends FocusVisiblePolyfillMixin(SpectrumElement){constructor(){super(...arguments);this.resizeController=new s$1(this,{callback:()=>{this.shouldManageTabOrderForScrolling();}});this._variant="";this.labelledbyId=`sp-dialog-label-${s.instanceCount++}`;this.shouldManageTabOrderForScrolling=()=>{if(!this.contentElement)return;const{offsetHeight:e,scrollHeight:t}=this.contentElement;e<t?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex");};this.describedbyId=`sp-dialog-description-${s.instanceCount++}`;}static get styles(){return [f]}set variant(e){if(e===this.variant)return;const t=this.variant;alertDialogVariants.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",t);}get variant(){return this._variant}renderIcon(){switch(this.variant){case"warning":case"error":return x`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;default:return x``}}renderHeading(){return x`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return x`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}onHeadingSlotchange({target:e}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const t=h(e,this.labelledbyId);t.length&&(this.conditionLabelledby=conditionAttributeWithId(this,"aria-labelledby",t));}onContentSlotChange({target:e}){requestAnimationFrame(()=>{this.resizeController.unobserve(this.contentElement),this.resizeController.observe(this.contentElement);}),this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const t=h(e,this.describedbyId);if(t.length&&t.length<4)this.conditionDescribedby=conditionAttributeWithId(this,"aria-describedby",t);else if(!t.length){const i=!!this.id;i||(this.id=this.describedbyId);const n=conditionAttributeWithId(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{n(),i||this.removeAttribute("id");};}}renderButtons(){return x`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `}render(){return x`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `}};s.instanceCount=0,d([i$1(".content")],s.prototype,"contentElement",2),d([n({type:String,reflect:!0})],s.prototype,"variant",1);let AlertDialog=s;

export { AlertDialog as A };
