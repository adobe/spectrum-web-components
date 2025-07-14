"use strict";var b=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(a,r,e,t)=>{for(var i=t>1?void 0:t?u(r,e):r,n=a.length-1,d;n>=0;n--)(d=a[n])&&(i=(t?d(r,e,i):d(i))||i);return t&&i&&b(r,e,i),i};import{html as s,SpectrumElement as p}from"@spectrum-web-components/base";import{property as m,query as g}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/button/sp-button.js";import{FocusVisiblePolyfillMixin as v}from"@spectrum-web-components/shared/src/focus-visible.js";import{randomID as y}from"@spectrum-web-components/shared/src/random-id.js";import{conditionAttributeWithId as c}from"@spectrum-web-components/base/src/condition-attribute-with-id.js";import{ResizeController as f}from"@lit-labs/observers/resize-controller.js";import E from"./alert-dialog.css.js";export const alertDialogVariants=["confirmation","information","warning","error","destructive","secondary"];function h(a,r){const e=a.assignedElements(),t=[];return e.forEach(i=>{if(i.id)t.push(i.id);else{const n=r+`-${y()}`;i.id=n,t.push(n)}}),t}const o=class o extends v(p){constructor(){super(...arguments);this.resizeController=new f(this,{callback:()=>{this.shouldManageTabOrderForScrolling()}});this._variant="";this.labelledbyId=`sp-dialog-label-${o.instanceCount++}`;this.shouldManageTabOrderForScrolling=()=>{if(!this.contentElement)return;const{offsetHeight:e,scrollHeight:t}=this.contentElement;e<t?this.contentElement.tabIndex=0:this.contentElement.removeAttribute("tabindex")};this.describedbyId=`sp-dialog-description-${o.instanceCount++}`}static get styles(){return[E]}set variant(e){if(e===this.variant)return;const t=this.variant;alertDialogVariants.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",t)}get variant(){return this._variant}renderIcon(){switch(this.variant){case"warning":case"error":return s`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;default:return s``}}renderHeading(){return s`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `}renderContent(){return s`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `}onHeadingSlotchange({target:e}){this.conditionLabelledby&&(this.conditionLabelledby(),delete this.conditionLabelledby);const t=h(e,this.labelledbyId);t.length&&(this.conditionLabelledby=c(this,"aria-labelledby",t))}onContentSlotChange({target:e}){requestAnimationFrame(()=>{this.resizeController.unobserve(this.contentElement),this.resizeController.observe(this.contentElement)}),this.conditionDescribedby&&(this.conditionDescribedby(),delete this.conditionDescribedby);const t=h(e,this.describedbyId);if(t.length&&t.length<4)this.conditionDescribedby=c(this,"aria-describedby",t);else if(!t.length){const i=!!this.id;i||(this.id=this.describedbyId);const n=c(this,"aria-describedby",this.id);this.conditionDescribedby=()=>{n(),i||this.removeAttribute("id")}}}renderButtons(){return s`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `}render(){return s`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `}};o.instanceCount=0,l([g(".content")],o.prototype,"contentElement",2),l([m({type:String,reflect:!0})],o.prototype,"variant",1);export let AlertDialog=o;
//# sourceMappingURL=AlertDialog.js.map
