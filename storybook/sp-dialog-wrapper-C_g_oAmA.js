import './sp-underlay-BD0tMA8s.js';
import './sp-button-BTMm_ibC.js';
import './sp-dialog-jhL1CbyX.js';
import { D as DialogBase } from './DialogBase-D-UuaMEr.js';
import { x, T } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import { n, d as defineElement } from './define-element-C_3bgzm7.js';

var h=Object.defineProperty;var e=(c,o,r,n)=>{for(var i=void 0,b=c.length-1,d;b>=0;b--)(d=c[b])&&(i=(d(o,r,i))||i);return i&&h(o,r,i),i};class DialogWrapper extends DialogBase{constructor(){super(...arguments);this.error=!1;this.cancelLabel="";this.confirmLabel="";this.dismissLabel="Close";this.footer="";this.hero="";this.heroLabel="";this.noDivider=!1;this.secondaryLabel="";this.headline="";}static get styles(){return [...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}));}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}));}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}));}renderDialog(){const r=this.noDivider||!this.headline||this.headlineVisibility==="none";return x`
            <sp-dialog
                ?dismissable=${this.dismissable}
                dismiss-label=${this.dismissLabel}
                ?no-divider=${r}
                ?error=${this.error}
                mode=${o(this.mode)}
                size=${o(this.size)}
            >
                ${this.hero?x`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${o(this.heroLabel?void 0:"true")}
                              alt=${o(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:T}
                ${this.headline?x`
                          <h2
                              slot="heading"
                              ?hidden=${this.headlineVisibility==="none"}
                          >
                              ${this.headline}
                          </h2>
                      `:T}
                <slot></slot>
                ${this.footer?x`
                          <div slot="footer">${this.footer}</div>
                      `:T}
                ${this.cancelLabel?x`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:T}
                ${this.secondaryLabel?x`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:T}
                ${this.confirmLabel?x`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:T}
            </sp-dialog>
        `}}e([n({type:Boolean,reflect:!0})],DialogWrapper.prototype,"error"),e([n({attribute:"cancel-label"})],DialogWrapper.prototype,"cancelLabel"),e([n({attribute:"confirm-label"})],DialogWrapper.prototype,"confirmLabel"),e([n({attribute:"dismiss-label"})],DialogWrapper.prototype,"dismissLabel"),e([n()],DialogWrapper.prototype,"footer"),e([n()],DialogWrapper.prototype,"hero"),e([n({attribute:"hero-label"})],DialogWrapper.prototype,"heroLabel"),e([n({type:Boolean,reflect:!0,attribute:"no-divider"})],DialogWrapper.prototype,"noDivider"),e([n({type:String,reflect:!0})],DialogWrapper.prototype,"size"),e([n({attribute:"secondary-label"})],DialogWrapper.prototype,"secondaryLabel"),e([n()],DialogWrapper.prototype,"headline"),e([n({type:String,attribute:"headline-visibility"})],DialogWrapper.prototype,"headlineVisibility");

defineElement("sp-dialog-wrapper",DialogWrapper);
