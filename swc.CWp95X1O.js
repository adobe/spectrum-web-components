import"./swc.DG1fT_fR.js";import"./swc.B3OTxlIz.js";import"./swc.BneICPCt.js";import{r as t}from"./swc.mUX8iMJZ.js";import{M as e,I as o}from"./swc.Dofmtdop.js";import{i as s}from"./swc.Cl2X6-fK.js";import{S as n}from"./swc.4Nhb811A.js";import{x as a,j as r}from"./swc.BkWj9Vim.js";import{o as i}from"./swc.VlRJW7SU.js";import{n as l}from"./swc.Cbbf2bfB.js";const p=s`
    :host{--spectrum-contextual-help-padding:var(--spectrum-spacing-400);--spectrum-contextual-help-content-spacing:var(--spectrum-spacing-100);--spectrum-contextual-help-link-spacing:var(--spectrum-spacing-300);--spectrum-contextual-help-heading-size:var(--spectrum-contextual-help-title-size);--spectrum-contextual-help-heading-color:var(--spectrum-heading-color);--spectrum-contextual-help-body-color:var(--spectrum-body-color)}.popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-contextual-help-body-color)));position:relative}.popover ::slotted([slot=heading]),.popover .body{margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-heading-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-contextual-help-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-contextual-help-link-spacing))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var c=Object.defineProperty,h=(t,e,o,s)=>{for(var n,a=void 0,r=t.length-1;r>=0;r--)(n=t[r])&&(a=n(e,o,a)||a);return a&&c(e,o,a),a};class u extends n{constructor(){super(...arguments),this.isMobile=new e(this,o),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1}static get styles(){return[p]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import("./swc.D_Lm_oFt.js").then((function(t){return t.s})),import("./swc.BN3xN0Em.js").then((function(t){return t.s})),a`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.DojBkldy.js").then((function(t){return t.s})),a`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===t)return this.open=!1,void r(void 0,e.target);this.open=!0;const o=this.renderOverlayContent();r(o,e.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return a`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                .active=${this.open}
            >
                ${"help"===this.variant?a`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:a`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${i(t)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}}h([l()],u.prototype,"label"),h([l()],u.prototype,"variant"),h([l({reflect:!0})],u.prototype,"placement"),h([l({type:Number})],u.prototype,"offset"),h([l({type:Boolean})],u.prototype,"open"),customElements.define("sp-contextual-help",u);
//# sourceMappingURL=swc.BgNp0Ksf.js.map
