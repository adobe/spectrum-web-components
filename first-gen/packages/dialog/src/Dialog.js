"use strict";var a=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var t=(u,i,e,n)=>{for(var r=n>1?void 0:n?c(i,e):i,p=u.length-1,d;p>=0;p--)(d=u[p])&&(r=(n?d(i,e,r):d(r))||r);return n&&r&&a(i,e,r),r};import{html as s,nothing as l}from"@spectrum-web-components/base";import{property as o,query as m}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/button-group/sp-button-group.js";import"@spectrum-web-components/button/sp-close-button.js";import"@spectrum-web-components/divider/sp-divider.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import{ObserveSlotPresence as b}from"@spectrum-web-components/shared";import{AlertDialog as h}from"@spectrum-web-components/alert-dialog/src/AlertDialog.js";import{classMap as f}from"@spectrum-web-components/base/src/directives.js";import v from"./dialog.css.js";export class Dialog extends b(h,['[slot="hero"]','[slot="footer"]','[slot="button"]']){constructor(){super(...arguments);this.error=!1;this.dismissable=!1;this.dismissLabel="Close";this.noDivider=!1}static get styles(){return[v]}get hasFooter(){return this.getSlotContentPresence('[slot="footer"]')}get hasButtons(){return this.getSlotContentPresence('[slot="button"]')}get hasHero(){return this.getSlotContentPresence('[slot="hero"]')}close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))}renderHero(){return s`
            <slot name="hero"></slot>
        `}renderFooter(){return s`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `}renderButtons(){const e={"button-group":!0,"button-group--noFooter":!this.hasFooter};return s`
            <sp-button-group class=${f(e)}>
                <slot name="button"></slot>
            </sp-button-group>
        `}renderDismiss(){return s`
            <sp-close-button
                class="close-button"
                label=${this.dismissLabel}
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `}render(){return s`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error?s`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `:l}
                ${this.noDivider?l:s`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter?this.renderFooter():l}
                ${this.hasButtons?this.renderButtons():l}
                ${this.dismissable?this.renderDismiss():l}
            </div>
        `}shouldUpdate(e){return e.has("mode")&&this.mode&&(this.dismissable=!1),e.has("dismissable")&&this.dismissable&&(this.dismissable=!this.mode),super.shouldUpdate(e)}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","dialog")}updated(e){super.updated(e)}}t([m(".close-button")],Dialog.prototype,"closeButton",2),t([o({type:Boolean,reflect:!0})],Dialog.prototype,"error",2),t([o({type:Boolean,reflect:!0})],Dialog.prototype,"dismissable",2),t([o({type:String,reflect:!0,attribute:"dismiss-label"})],Dialog.prototype,"dismissLabel",2),t([o({type:Boolean,reflect:!0,attribute:"no-divider"})],Dialog.prototype,"noDivider",2),t([o({type:String,reflect:!0})],Dialog.prototype,"mode",2),t([o({type:String,reflect:!0})],Dialog.prototype,"size",2);
//# sourceMappingURL=Dialog.js.map
