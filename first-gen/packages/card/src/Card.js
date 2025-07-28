"use strict";var E=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var i=(p,n,e,s)=>{for(var a=s>1?void 0:s?k(n,e):n,l=p.length-1,d;l>=0;l--)(d=p[l])&&(a=(s?d(n,e,a):d(a))||a);return s&&a&&E(n,e,a),a};import{html as t,nothing as r,SizedMixin as S,SpectrumElement as $}from"@spectrum-web-components/base";import{ifDefined as u}from"@spectrum-web-components/base/src/directives.js";import{property as o,query as A}from"@spectrum-web-components/base/src/decorators.js";import{FocusVisiblePolyfillMixin as L}from"@spectrum-web-components/shared/src/focus-visible.js";import{ObserveSlotPresence as T}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import{LikeAnchor as R}from"@spectrum-web-components/shared/src/like-anchor.js";import"@spectrum-web-components/asset/sp-asset.js";import"@spectrum-web-components/checkbox/sp-checkbox.js";import"@spectrum-web-components/popover/sp-popover.js";import"@spectrum-web-components/divider/sp-divider.js";import z from"./card.css.js";export class Card extends R(S(T(L($),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"],noDefaultSize:!0})){constructor(){super(...arguments);this.variant="standard";this._selected=!1;this.heading="";this.horizontal=!1;this.focused=!1;this.toggles=!1;this.value="";this.subheading="";this.handleFocusin=e=>{if(this.focused=!0,e.composedPath()[0]!==this){this.removeEventListener("keydown",this.handleKeydown);return}this.addEventListener("keydown",this.handleKeydown)}}static get styles(){return[z]}get selected(){return this._selected}set selected(e){e!==this.selected&&(this._selected=e,this.role==="row"&&this.toggles&&this.setAttribute("aria-selected",String(this.selected)),this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var e;(e=this.likeAnchor)==null||e.click()}handleFocusout(e){this.focused=!1,e.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(e){const{code:s}=e;switch(s){case"Space":if(this.toggleSelected(),this.toggles){e.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(e){e.stopPropagation(),this.selected=e.target.checked,this.announceChange()}toggleSelected(){if(!this.toggles){this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}));return}this.selected=!this.selected,this.announceChange()}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(e){this.href&&e.stopPropagation()}handlePointerdown(e){if(e.composedPath().some(h=>h.localName==="a"))return;const l=e.timeStamp,d=e.clientX,v=e.clientY,c=h=>{const m=h.timeStamp,g=h.clientX,b=h.clientY,f=m-l,y=Math.abs(g-d),w=Math.abs(b-v),P=y>10||w>10;f<200&&!P&&this.click(),this.removeEventListener("pointerup",c),this.removeEventListener("pointercancel",c)};this.addEventListener("pointerup",c),this.addEventListener("pointercancel",c)}get renderHeading(){return t`
            <div class="title" id="heading">
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return t`
            <sp-asset id="preview" variant=${u(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?t`
                      <sp-divider size="s"></sp-divider>
                  `:r}
        `}get renderCoverImage(){return t`
            <sp-asset id="cover-photo" variant=${u(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?t`
                      <sp-divider size="s"></sp-divider>
                  `:r}
        `}get images(){const e=[];return this.hasPreview&&e.push(this.renderPreviewImage),this.hasCoverPhoto&&e.push(this.renderCoverImage),e}renderImage(){return this.horizontal?this.images:this.variant!=="standard"?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return t`
            <div class="subtitle">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){const e=this.role==="row"?"gridcell":void 0;return t`
            <div class="wrapper" role=${u(e)}>
                ${this.renderImage()}
                <div class="body">
                    <div class="header">
                        ${this.renderHeading}
                        ${this.variant==="gallery"?this.renderSubtitleAndDescription:r}
                        ${this.variant!=="quiet"||this.size!=="s"?t`
                                  <div
                                      class="action-button"
                                      @pointerdown=${this.stopPropagationOnHref}
                                  >
                                      <slot name="actions"></slot>
                                  </div>
                              `:r}
                    </div>
                    ${this.variant!=="gallery"?t`
                              <div class="content">
                                  ${this.renderSubtitleAndDescription}
                              </div>
                          `:r}
                </div>
                ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):r}
                ${this.variant==="standard"?t`
                          <slot name="footer"></slot>
                      `:r}
                ${this.toggles?t`
                          <sp-popover
                              class="checkbox-toggle"
                              @pointerdown=${this.stopPropagationOnHref}
                          >
                              <sp-checkbox
                                  class="checkbox"
                                  @change=${this.handleSelectedChange}
                                  .checked=${this.selected}
                              >
                                  <span class="sr-only">
                                      ${this.label||this.heading}
                                  </span>
                              </sp-checkbox>
                          </sp-popover>
                      `:r}
                ${this.variant==="quiet"&&this.size==="s"?t`
                          <div
                              class="spectrum-QuickActions actions"
                              @pointerdown=${this.stopPropagationOnHref}
                          >
                              <slot name="actions"></slot>
                          </div>
                      `:r}
            </div>
        `}firstUpdated(e){super.firstUpdated(e),e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}update(e){super.update(e),e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}}i([o()],Card.prototype,"asset",2),i([o({reflect:!0})],Card.prototype,"variant",2),i([o({type:Boolean,reflect:!0})],Card.prototype,"selected",1),i([o()],Card.prototype,"heading",2),i([o({type:Boolean,reflect:!0})],Card.prototype,"horizontal",2),i([A("#like-anchor")],Card.prototype,"likeAnchor",2),i([o({type:Boolean,reflect:!0})],Card.prototype,"focused",2),i([o({type:Boolean,reflect:!0})],Card.prototype,"toggles",2),i([o()],Card.prototype,"value",2),i([o()],Card.prototype,"subheading",2);
//# sourceMappingURL=Card.js.map
