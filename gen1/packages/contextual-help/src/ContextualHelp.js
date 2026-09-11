"use strict";var u=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var s=(c,r,e,i)=>{for(var o=i>1?void 0:i?h(r,e):r,a=c.length-1,p;a>=0;a--)(p=c[a])&&(o=(i?p(r,e,o):p(o))||o);return i&&o&&u(r,e,o),o};import{html as n,render as m,SpectrumElement as b}from"@spectrum-web-components/base";import{property as l}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as d}from"@spectrum-web-components/base/src/directives.js";import{removeSlottableRequest as f}from"@spectrum-web-components/overlay/src/slottable-request-event.js";import{IS_MOBILE as v,MatchMediaController as g}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import"@spectrum-web-components/action-button/sp-action-button.js";import"@spectrum-web-components/overlay/sp-overlay.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js";import y from"./contextual-help.css.js";export const DEFAULT_ARIA_LABELS={help:"Help",info:"Information"};const t=class t extends b{constructor(){super();this.isMobile=new g(this,v);this.variant="info";this.placement="bottom-start";this.offset=0;this.open=!1;const e=t.instanceCount++;this.popoverId=`contextual-help-popover-${e}`,this.contentId=`contextual-help-content-${e}`}static get styles(){return[y]}get buttonAriaLabel(){return this.label?this.label:this.variant==="help"?DEFAULT_ARIA_LABELS.help:DEFAULT_ARIA_LABELS.info}renderOverlayContent(){return this.isMobile.matches?(import("@spectrum-web-components/dialog/sp-dialog-base.js"),import("@spectrum-web-components/dialog/sp-dialog.js"),n`
        <sp-dialog-base underlay>
          <sp-dialog dismissable size="s" id=${this.popoverId}>
            <slot name="heading" slot="heading"></slot>
            <slot></slot>
            <slot name="link"></slot>
          </sp-dialog>
        </sp-dialog-base>
      `):(import("@spectrum-web-components/popover/sp-popover.js"),n`
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
      `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===f){this.open=!1,m(void 0,e.target);return}this.open=!0;const i=this.renderOverlayContent();m(i,e.target)}render(){const e=this.isMobile.matches?void 0:this.placement;return n`
      <sp-action-button
        quiet
        size="s"
        id="trigger"
        aria-label=${this.buttonAriaLabel}
        aria-haspopup=${d(this.isMobile.matches?"dialog":void 0)}
        aria-expanded=${this.open?"true":"false"}
        aria-controls=${this.popoverId}
        .active=${this.open}
      >
        ${this.variant==="help"?n`
              <sp-icon-help-outline slot="icon"></sp-icon-help-outline>
            `:n`
              <sp-icon-info-outline slot="icon"></sp-icon-info-outline>
            `}
      </sp-action-button>
      <sp-overlay
        trigger="trigger@click"
        placement=${d(e)}
        type=${this.isMobile.matches?"modal":"auto"}
        receives-focus="true"
        .offset=${this.offset}
        @slottable-request=${this.handleSlottableRequest}
        ?open=${this.open}
      ></sp-overlay>
    `}};t.instanceCount=0,s([l()],t.prototype,"label",2),s([l()],t.prototype,"variant",2),s([l({reflect:!0})],t.prototype,"placement",2),s([l({type:Number})],t.prototype,"offset",2),s([l({type:Boolean})],t.prototype,"open",2);export let ContextualHelp=t;
//# sourceMappingURL=ContextualHelp.js.map
