import{s as t}from"./swc.Df68Cdu0.js";import"./swc.PQ3d747B.js";import"./swc.B9QahPJl.js";import"./swc.Dj6892mD.js";import"./swc.BN9rTYMb.js";import{r as o}from"./swc.mUX8iMJZ.js";import{M as e,I as s}from"./swc.fxAipLbG.js";import{i}from"./swc.Bk_7Sut8.js";import{C as r,x as n,B as p}from"./swc.CPRo5HoP.js";import{o as a}from"./swc.rlzKnk9d.js";import{n as c}from"./swc.BtPhaoGy.js";import"./swc.yEn6CTSp.js";import"./swc.hti82C19.js";import"./swc.CjPt0-_4.js";import"./swc.C0BGAK1o.js";import"./swc.DeJGzahI.js";import"./swc.D3Xn_5N_.js";import"./swc.Cxa0JK8L.js";import"./swc.CSSBViHp.js";import"./swc.CIw_Gjml.js";import"./swc.DhtcN3Mc.js";import"./swc.DTrRBp2w.js";import"./swc.0QsRcSJr.js";import"./swc.DjD-osqg.js";import"./swc.Cj2DIJMh.js";import"./swc.2jb2TuJz.js";import"./swc.DfF9MWIF.js";import"./swc.x86Wm3h_.js";import"./swc.CeWRcydc.js";import"./swc.D0Be8Aa5.js";import"./swc.1CglYmuO.js";import"./swc.f8mN0PVe.js";import"./swc.DTI4n1PL.js";import"./swc.Ds_ROb9a.js";import"./swc.OA-NwBIR.js";import"./swc.B6Ji04pc.js";import"./swc.9slprkso.js";import"./swc.CA-i04Ei.js";import"./swc.Chuw36y7.js";import"./swc.BECgeGB4.js";import"./swc.DTMcg2PZ.js";const l=i`
    .popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-spacing-400));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-body-color)));max-inline-size:var(--mod-spectrum-contextual-help-popover-maximum-width);position:relative}.popover .body,.popover ::slotted([slot=heading]){margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-title-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-spacing-300))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;var m=Object.defineProperty,d=(t,o,e,s)=>{for(var i,r=void 0,n=t.length-1;n>=0;n--)(i=t[n])&&(r=i(o,e,r)||r);return r&&m(o,e,r),r};const h="Help",u="Information",v=class t extends r{constructor(){super(),this.isMobile=new e(this,s),this.variant="info",this.placement="bottom-start",this.offset=0,this.open=!1;const o=t.instanceCount++;this.popoverId=`contextual-help-popover-${o}`,this.contentId=`contextual-help-content-${o}`}static get styles(){return[l]}get buttonAriaLabel(){return this.label?this.label:"help"===this.variant?h:u}renderOverlayContent(){return this.isMobile.matches?(import("./swc.C_iQqEfX.js"),import("./swc.Cit85t6Z.js"),n`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s" id=${this.popoverId}>
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("./swc.D6ft1vnw.js"),n`
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
            `)}handleSlottableRequest(t){if(t.stopPropagation(),t.data===o)return this.open=!1,void p(void 0,t.target);this.open=!0;const e=this.renderOverlayContent();p(e,t.target)}render(){const t=this.isMobile.matches?void 0:this.placement;return n`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                aria-haspopup=${a(this.isMobile.matches?"dialog":void 0)}
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
                placement=${a(t)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}};v.instanceCount=0,d([c()],v.prototype,"label"),d([c()],v.prototype,"variant"),d([c({reflect:!0})],v.prototype,"placement"),d([c({type:Number})],v.prototype,"offset"),d([c({type:Boolean})],v.prototype,"open");let w=v;customElements.define("sp-contextual-help",w);const g=(o={})=>n`<sp-contextual-help ${t(o)} placement="${a(o.placement)}"><h2 slot="heading">Permission required</h2>Your admin must grant you permission before you can create a segment.<sp-link slot="link" href="https://opensource.adobe.com/spectrum-web-components/">Request permission</sp-link></sp-contextual-help>`,j=document.querySelector(".demo-preview"),b=document.querySelector(".demo-config");function f(){const t={};if(!b)return t;return b.querySelectorAll(".demo-control").forEach(o=>{t[o.id]="false"!==o.value&&o.value}),t}const x=(t={})=>{t.componentName="contextual-help",p(g(t),j)};b&&b.addEventListener("change",()=>{x(f())}),customElements.whenDefined("sp-picker").then(()=>{const t=f();console.log(t),x(t)});
//# sourceMappingURL=swc.DRi0a1IC.js.map
