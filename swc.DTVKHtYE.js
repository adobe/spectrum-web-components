import"./swc.YHkvpSCo.js";import"./swc.BYs1K3mL.js";import"./swc.DRnGqisN.js";import{r as t}from"./swc.mUX8iMJZ.js";import{M as e,I as o}from"./swc.Dofmtdop.js";import{i as s}from"./swc.Cl2X6-fK.js";import{S as n}from"./swc.BLfCo0Z1.js";import{x as l,j as a}from"./swc.BkWj9Vim.js";import{o as i}from"./swc.CF8fRO5N.js";import{n as r}from"./swc.Cbbf2bfB.js";const p=s`
    .popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-contextual-help-body-color)));position:relative}.popover .body,.popover ::slotted([slot=heading]){margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-heading-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-contextual-help-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-contextual-help-link-spacing))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{--spectrum-contextual-help-padding:var(--system-contextual-help-padding);--spectrum-contextual-help-content-spacing:var(--system-contextual-help-content-spacing);--spectrum-contextual-help-link-spacing:var(--system-contextual-help-link-spacing);--spectrum-contextual-help-heading-size:var(--system-contextual-help-heading-size);--spectrum-contextual-help-heading-color:var(--system-contextual-help-heading-color);--spectrum-contextual-help-body-color:var(--system-contextual-help-body-color)}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var c=Object.defineProperty,h=(t,e,o,s)=>{for(var n,l=void 0,a=t.length-1;a>=0;a--)(n=t[a])&&(l=n(e,o,l)||l);return l&&c(e,o,l),l};class u extends n{constructor(){super(...arguments),this.isMobile=new e(this,o),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1}static get styles(){return[p]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import("./swc.B7A7liB8.js").then((function(t){return t.s})),import("./swc.BJjBRqZq.js").then((function(t){return t.s})),l`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.Cr1dGwud.js").then((function(t){return t.s})),l`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===t)return this.open=!1,void a(void 0,e.target);this.open=!0;const o=this.renderOverlayContent();a(o,e.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return l`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                .active=${this.open}
            >
                ${"help"===this.variant?l`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:l`
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
        `}}h([r()],u.prototype,"label"),h([r()],u.prototype,"variant"),h([r({reflect:!0})],u.prototype,"placement"),h([r({type:Number})],u.prototype,"offset"),h([r({type:Boolean})],u.prototype,"open"),customElements.define("sp-contextual-help",u);
//# sourceMappingURL=swc.BZkNOSsA.js.map
