"use strict";var u=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var i=(n,s,e,o)=>{for(var t=o>1?void 0:o?c(s,e):s,a=n.length-1,p;a>=0;a--)(p=n[a])&&(t=(o?p(s,e,t):p(t))||t);return o&&t&&u(s,e,t),t};import{html as r,render as m,SpectrumElement as b}from"@spectrum-web-components/base";import"@spectrum-web-components/action-button/sp-action-button.js";import"@spectrum-web-components/overlay/sp-overlay.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js";import{property as l}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as h}from"@spectrum-web-components/base/src/directives.js";import{removeSlottableRequest as f}from"@spectrum-web-components/overlay/src/slottable-request-event.js";import{IS_MOBILE as d,MatchMediaController as g}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import v from"./contextual-help.css.js";export class ContextualHelp extends b{constructor(){super(...arguments);this.isMobile=new g(this,d);this.variant="info";this.placement="bottom-start";this.offset=0;this.open=!1}static get styles(){return[v]}get buttonAriaLabel(){return this.label?this.label:this.variant==="help"?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import("@spectrum-web-components/dialog/sp-dialog-base.js"),import("@spectrum-web-components/dialog/sp-dialog.js"),r`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import("@spectrum-web-components/popover/sp-popover.js"),r`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===f){this.open=!1,m(void 0,e.target);return}this.open=!0;const o=this.renderOverlayContent();m(o,e.target)}render(){const e=this.isMobile.matches?void 0:this.placement;return r`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                .active=${this.open}
            >
                ${this.variant==="help"?r`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:r`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${h(e)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}}i([l()],ContextualHelp.prototype,"label",2),i([l()],ContextualHelp.prototype,"variant",2),i([l({reflect:!0})],ContextualHelp.prototype,"placement",2),i([l({type:Number})],ContextualHelp.prototype,"offset",2),i([l({type:Boolean})],ContextualHelp.prototype,"open",2);
//# sourceMappingURL=ContextualHelp.js.map
