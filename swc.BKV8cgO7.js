import"./swc.BE0luBHT.js";import"./swc.BrATMKTe.js";import"./swc.DmQm4YXx.js";import{r as t}from"./swc.mUX8iMJZ.js";import{M as e,I as o}from"./swc.fxAipLbG.js";import{i as s}from"./swc.D3j8qku8.js";import{C as i,x as n,B as a}from"./swc.BVPN1U0O.js";import{o as r}from"./swc.L4HxEpHh.js";import{n as l}from"./swc.CPE24tvL.js";const p=s`
    .popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-body-color)));max-inline-size:var(--mod-spectrum-contextual-help-popover-maximum-width);position:relative}.popover .body,.popover ::slotted([slot=heading]){margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-title-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-spacing-300))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var c=Object.defineProperty,h=(t,e,o,s)=>{for(var i,n=void 0,a=t.length-1;a>=0;a--)(i=t[a])&&(n=i(e,o,n)||n);return n&&c(e,o,n),n};const d="Help",m="Information",u=class s extends i{constructor(){super(),this.isMobile=new e(this,o),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1;const t=s.instanceCount++;this.popoverId=`contextual-help-popover-${t}`,this.contentId=`contextual-help-content-${t}`}static get styles(){return[p]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?d:m}renderOverlayContent(){return this.isMobile.matches?(import("./swc.CI_Vt8LP.js").then(function(t){return t.s}),import("./swc.NvGhLQp5.js").then(function(t){return t.s}),n`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s" id=${this.popoverId}>
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.K9atHLxd.js").then(function(t){return t.s}),n`
                <sp-popover
                    class="popover"
                    id=${this.popoverId}
                    role="region"
                    aria-labelledby=${this.contentId}
                >
                    <section id=${this.contentId}>
                        <div>
                            <slot name="heading"></slot>
                        </div>
                        <div class="body">
                            <slot></slot>
                        </div>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===t)return this.open=!1,void a(void 0,e.target);this.open=!0;const o=this.renderOverlayContent();a(o,e.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return n`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                aria-haspopup=${r(this.isMobile.matches?"dialog":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-controls=${this.popoverId}
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
                placement=${r(t)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}};u.instanceCount=0,h([l()],u.prototype,"label"),h([l()],u.prototype,"variant"),h([l({reflect:!0})],u.prototype,"placement"),h([l({type:Number})],u.prototype,"offset"),h([l({type:Boolean})],u.prototype,"open");let v=u;customElements.define("sp-contextual-help",v);
//# sourceMappingURL=swc.7OMZpgdl.js.map
