import"./swc.DxH6B6t8.js";import"./swc.BFbioy-n.js";import"./swc.NYiDqq-x.js";import{r as t}from"./swc.mUX8iMJZ.js";import{M as e,I as o}from"./swc.Dofmtdop.js";import{i as s}from"./swc.Cl2X6-fK.js";import{S as i}from"./swc.eJQEZSgS.js";import{x as n,j as r}from"./swc.CfKxAKYm.js";import{o as a}from"./swc.Cd7tce6S.js";import{n as l}from"./swc.DGYjDgvc.js";const p=s`
    .popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-body-color)));max-inline-size:var(--mod-spectrum-contextual-help-popover-maximum-width);position:relative}.popover .body,.popover ::slotted([slot=heading]){margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-title-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-spacing-300))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var c=Object.defineProperty,m=(t,e,o,s)=>{for(var i,n=void 0,r=t.length-1;r>=0;r--)(i=t[r])&&(n=i(e,o,n)||n);return n&&c(e,o,n),n};class h extends i{constructor(){super(...arguments),this.isMobile=new e(this,o),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1}static get styles(){return[p]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import("./swc.DJtezq9C.js").then((function(t){return t.s})),import("./swc.B-dHp86U.js").then((function(t){return t.s})),n`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.DtFy9KZc.js").then((function(t){return t.s})),n`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===t)return this.open=!1,void r(void 0,e.target);this.open=!0;const o=this.renderOverlayContent();r(o,e.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return n`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                .active=${this.open}
            >
                ${"help"===this.variant?n`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:n`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${a(t)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}}m([l()],h.prototype,"label"),m([l()],h.prototype,"variant"),m([l({reflect:!0})],h.prototype,"placement"),m([l({type:Number})],h.prototype,"offset"),m([l({type:Boolean})],h.prototype,"open"),customElements.define("sp-contextual-help",h);
//# sourceMappingURL=swc.de-xEfip.js.map
