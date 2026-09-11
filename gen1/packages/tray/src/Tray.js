"use strict";var h=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var i=(n,r,e,s)=>{for(var t=s>1?void 0:s?m(r,e):r,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(r,e,t):a(t))||t);return s&&t&&h(r,e,t),t};import{html as l,nothing as d,SpectrumElement as c}from"@spectrum-web-components/base";import{property as p,query as u,state as f}from"@spectrum-web-components/base/src/decorators.js";import v from"@spectrum-web-components/modal/src/modal.css.js";import{MatchMediaController as b}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import{firstFocusableIn as y}from"@spectrum-web-components/shared/src/first-focusable-in.js";import"@spectrum-web-components/underlay/sp-underlay.js";import g from"./tray.css.js";export class Tray extends c{constructor(){super(...arguments);this.open=!1;this.prefersMotion=new b(this,"(prefers-reduced-motion: no-preference)");this.transitionPromise=Promise.resolve();this.resolveTransitionPromise=()=>{};this.animating=!1;this.hasKeyboardDismissButton=!1;this.needsDismissHelper=!0}static get styles(){return[v,g]}focus(){const e=y(this);e?e.focus():this.children.length===1?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}get dismissHelper(){return l`
      <div class="visually-hidden">
        <button aria-label="Dismiss" @click=${this.close}></button>
      </div>
    `}checkForDismissButtons(){if(!this.contentSlot){this.needsDismissHelper=!0;return}const e=this.contentSlot.assignedElements({flatten:!0});if(e.length===0){this.needsDismissHelper=!0;return}const s=e.some(t=>!!(t.tagName==="SP-BUTTON"||t.tagName==="SP-CLOSE-BUTTON"||t.tagName==="BUTTON"||t.tagName==="SP-DIALOG"&&t.hasAttribute("dismissable")||t.tagName==="SP-DIALOG-WRAPPER"&&t.hasAttribute("dismissable")||t.querySelectorAll("sp-button, sp-close-button, button").length>0));this.needsDismissHelper=!s}handleSlotChange(){this.checkForDismissButtons()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}firstUpdated(e){super.firstUpdated(e),this.checkForDismissButtons()}update(e){e.has("open")&&e.get("open")!==void 0&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise(s=>{this.resolveTransitionPromise=()=>{this.animating=!1,s()}})),super.update(e)}render(){return l`
      <sp-underlay
        ?open=${this.open}
        @close=${this.close}
        @transitionend=${this.handleUnderlayTransitionend}
      ></sp-underlay>
      <div
        class="tray modal"
        tabindex="-1"
        @transitionend=${this.handleTrayTransitionend}
      >
        ${!this.hasKeyboardDismissButton&&this.needsDismissHelper?this.dismissHelper:d}
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${!this.hasKeyboardDismissButton&&this.needsDismissHelper?this.dismissHelper:d}
      </div>
    `}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}i([p({type:Boolean,reflect:!0})],Tray.prototype,"open",2),i([u(".tray")],Tray.prototype,"tray",2),i([u("slot")],Tray.prototype,"contentSlot",2),i([p({type:Boolean,attribute:"has-keyboard-dismiss"})],Tray.prototype,"hasKeyboardDismissButton",2),i([f()],Tray.prototype,"needsDismissHelper",2);
//# sourceMappingURL=Tray.js.map
