import"./swc.C8M1pSwb.js";import"./swc.B4i46Xi4.js";import"./swc.y-D2rf5t.js";import{r as t}from"./swc.mUX8iMJZ.js";import{M as e,I as o}from"./swc.x8WofHoL.js";import{i as s}from"./swc.DpYYvrpg.js";import{S as n}from"./swc.I1dYlJKr.js";import{x as a,j as l}from"./swc.DAPqj1CM.js";import{o as r}from"./swc.BljSg25L.js";import{n as i}from"./swc.DKGY1963.js";const p=s`
    :host{--spectrum-contextual-help-padding:var(--spectrum-spacing-400);--spectrum-contextual-help-content-spacing:var(--spectrum-spacing-100);--spectrum-contextual-help-link-spacing:var(--spectrum-spacing-300);--spectrum-contextual-help-heading-size:var(--spectrum-contextual-help-title-size);--spectrum-contextual-help-heading-color:var(--spectrum-heading-color);--spectrum-contextual-help-body-color:var(--spectrum-body-color)}.popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-contextual-help-body-color)));position:relative}.popover ::slotted([slot=heading]),.popover .body{margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-heading-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-contextual-help-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-contextual-help-link-spacing))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var c=Object.defineProperty,h=(t,e,o,s)=>{for(var n,a=void 0,l=t.length-1;l>=0;l--)(n=t[l])&&(a=n(e,o,a)||a);return a&&c(e,o,a),a};class u extends n{constructor(){super(...arguments),this.isMobile=new e(this,o),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1}static get styles(){return[p]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import("./swc.6vANdqz0.js").then((function(t){return t.s})),import("./swc.Cv3KvO77.js").then((function(t){return t.s})),a`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.C37mbnNr.js").then((function(t){return t.s})),a`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===t)return this.open=!1,void l(void 0,e.target);this.open=!0;const o=this.renderOverlayContent();l(o,e.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return a`
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
                placement=${r(t)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}}h([i()],u.prototype,"label"),h([i()],u.prototype,"variant"),h([i({reflect:!0})],u.prototype,"placement"),h([i({type:Number})],u.prototype,"offset"),h([i({type:Boolean})],u.prototype,"open"),customElements.define("sp-contextual-help",u);
//# sourceMappingURL=swc.DfhR9gMA.js.map
