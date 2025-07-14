"use strict";var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var i=(h,l,e,s)=>{for(var n=s>1?void 0:s?v(l,e):l,d=h.length-1,a;d>=0;d--)(a=h[d])&&(n=(s?a(l,e,n):a(n))||n);return s&&n&&u(l,e,n),n};import{html as t,nothing as o,SizedMixin as g,SpectrumElement as m}from"@spectrum-web-components/base";import{ifDefined as p}from"@spectrum-web-components/base/src/directives.js";import{property as r,query as f}from"@spectrum-web-components/base/src/decorators.js";import{FocusVisiblePolyfillMixin as b}from"@spectrum-web-components/shared/src/focus-visible.js";import{ObserveSlotPresence as w}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import{LikeAnchor as y}from"@spectrum-web-components/shared/src/like-anchor.js";import"@spectrum-web-components/asset/sp-asset.js";import"@spectrum-web-components/checkbox/sp-checkbox.js";import"@spectrum-web-components/popover/sp-popover.js";import"@spectrum-web-components/divider/sp-divider.js";import E from"./card.css.js";export class Card extends y(g(w(b(m),['[slot="cover-photo"]','[slot="preview"]']),{validSizes:["s","m"],noDefaultSize:!0})){constructor(){super(...arguments);this.variant="standard";this._selected=!1;this.heading="";this.horizontal=!1;this.focused=!1;this.toggles=!1;this.value="";this.subheading="";this.handleFocusin=e=>{if(this.focused=!0,e.composedPath()[0]!==this){this.removeEventListener("keydown",this.handleKeydown);return}this.addEventListener("keydown",this.handleKeydown)}}static get styles(){return[E]}get selected(){return this._selected}set selected(e){e!==this.selected&&(this._selected=e,this.requestUpdate("selected",!this._selected))}get hasCoverPhoto(){return this.getSlotContentPresence('[slot="cover-photo"]')}get hasPreview(){return this.getSlotContentPresence('[slot="preview"]')}click(){var e;(e=this.likeAnchor)==null||e.click()}handleFocusout(e){this.focused=!1,e.composedPath()[0]===this&&this.removeEventListener("keydown",this.handleKeydown)}handleKeydown(e){const{code:s}=e;switch(s){case"Space":if(this.toggleSelected(),this.toggles){e.preventDefault();break}case"Enter":case"NumpadEnter":this.click()}}handleSelectedChange(e){e.stopPropagation(),this.selected=e.target.checked,this.announceChange()}toggleSelected(){if(!this.toggles){this.dispatchEvent(new Event("click",{bubbles:!0,composed:!0}));return}this.selected=!this.selected,this.announceChange()}announceChange(){this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(this.selected=!this.selected)}stopPropagationOnHref(e){this.href&&e.stopPropagation()}handlePointerdown(e){if(e.composedPath().some(c=>c.localName==="a"))return;const d=+new Date,a=()=>{+new Date-d<200&&this.click(),this.removeEventListener("pointerup",a),this.removeEventListener("pointercancel",a)};this.addEventListener("pointerup",a),this.addEventListener("pointercancel",a)}get renderHeading(){return t`
            <div class="title" id="heading">
                <slot name="heading">${this.heading}</slot>
            </div>
        `}get renderPreviewImage(){return t`
            <sp-asset id="preview" variant=${p(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?t`
                      <sp-divider size="s"></sp-divider>
                  `:o}
        `}get renderCoverImage(){return t`
            <sp-asset id="cover-photo" variant=${p(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${this.variant!=="quiet"&&!this.horizontal?t`
                      <sp-divider size="s"></sp-divider>
                  `:o}
        `}get images(){const e=[];return this.hasPreview&&e.push(this.renderPreviewImage),this.hasCoverPhoto&&e.push(this.renderCoverImage),e}renderImage(){return this.horizontal?this.images:this.variant!=="standard"?[this.renderPreviewImage]:this.images}get renderSubtitleAndDescription(){return t`
            <div class="subtitle">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `}render(){return t`
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${this.variant==="gallery"?this.renderSubtitleAndDescription:o}
                    ${this.variant!=="quiet"||this.size!=="s"?t`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `:o}
                </div>
                ${this.variant!=="gallery"?t`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `:o}
            </div>
            ${this.href?this.renderAnchor({id:"like-anchor",labelledby:"heading"}):o}
            ${this.variant==="standard"?t`
                      <slot name="footer"></slot>
                  `:o}
            ${this.toggles?t`
                      <sp-popover
                          class="checkbox-toggle"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <sp-checkbox
                              class="checkbox"
                              @change=${this.handleSelectedChange}
                              ?checked=${this.selected}
                              tabindex="-1"
                          ></sp-checkbox>
                      </sp-popover>
                  `:o}
            ${this.variant==="quiet"&&this.size==="s"?t`
                      <div
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </div>
                  `:o}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("focusin",this.handleFocusin),this.shadowRoot.addEventListener("focusin",this.handleFocusin),this.addEventListener("focusout",this.handleFocusout)}}i([r()],Card.prototype,"asset",2),i([r({reflect:!0})],Card.prototype,"variant",2),i([r({type:Boolean,reflect:!0})],Card.prototype,"selected",1),i([r()],Card.prototype,"heading",2),i([r({type:Boolean,reflect:!0})],Card.prototype,"horizontal",2),i([f("#like-anchor")],Card.prototype,"likeAnchor",2),i([r({type:Boolean,reflect:!0})],Card.prototype,"focused",2),i([r({type:Boolean,reflect:!0})],Card.prototype,"toggles",2),i([r()],Card.prototype,"value",2),i([r()],Card.prototype,"subheading",2);
//# sourceMappingURL=Card.js.map
