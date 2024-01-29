import './sp-underlay--W8tWQXm.js';
import './sp-button-W8hFYHyg.js';
import './sp-dialog-Cua0Cown.js';
import { D as DialogBase } from './DialogBase-Xym0ozoD.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { n, d as defineElement } from './define-element-s04w2teA.js';

var h=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var e=(a,l,r,n)=>{for(var i=n>1?void 0:n?u(l,r):l,d=a.length-1,b;d>=0;d--)(b=a[d])&&(i=(n?b(l,r,i):b(i))||i);return n&&i&&h(l,r,i),i};class DialogWrapper extends DialogBase{constructor(){super(...arguments);this.error=!1;this.cancelLabel="";this.confirmLabel="";this.footer="";this.hero="";this.heroLabel="";this.noDivider=!1;this.secondaryLabel="";this.headline="";}static get styles(){return [...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}));}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}));}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}));}renderDialog(){const r=this.noDivider||!this.headline||this.headlineVisibility==="none";return x`
            <sp-dialog
                ?dismissable=${this.dismissable}
                ?no-divider=${r}
                ?error=${this.error}
                mode=${l(this.mode)}
                size=${l(this.size)}
            >
                ${this.hero?x`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${l(this.heroLabel?void 0:"true")}
                              alt=${l(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:A}
                ${this.headline?x`
                          <h2
                              slot="heading"
                              ?hidden=${this.headlineVisibility==="none"}
                          >
                              ${this.headline}
                          </h2>
                      `:A}
                <slot></slot>
                ${this.footer?x`
                          <div slot="footer">${this.footer}</div>
                      `:A}
                ${this.cancelLabel?x`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:A}
                ${this.secondaryLabel?x`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:A}
                ${this.confirmLabel?x`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:A}
            </sp-dialog>
        `}}e([n({type:Boolean,reflect:!0})],DialogWrapper.prototype,"error",2),e([n({attribute:"cancel-label"})],DialogWrapper.prototype,"cancelLabel",2),e([n({attribute:"confirm-label"})],DialogWrapper.prototype,"confirmLabel",2),e([n()],DialogWrapper.prototype,"footer",2),e([n()],DialogWrapper.prototype,"hero",2),e([n({attribute:"hero-label"})],DialogWrapper.prototype,"heroLabel",2),e([n({type:Boolean,reflect:!0,attribute:"no-divider"})],DialogWrapper.prototype,"noDivider",2),e([n({type:String,reflect:!0})],DialogWrapper.prototype,"size",2),e([n({attribute:"secondary-label"})],DialogWrapper.prototype,"secondaryLabel",2),e([n()],DialogWrapper.prototype,"headline",2),e([n({type:String,attribute:"headline-visibility"})],DialogWrapper.prototype,"headlineVisibility",2);

defineElement("sp-dialog-wrapper",DialogWrapper);
