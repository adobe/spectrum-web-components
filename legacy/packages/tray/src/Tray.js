"use strict";var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(s,r,e,i)=>{for(var t=i>1?void 0:i?p(r,e):r,o=s.length-1,n;o>=0;o--)(n=s[o])&&(t=(i?n(r,e,t):n(t))||t);return i&&t&&l(r,e,t),t};import{html as d,SpectrumElement as m}from"@spectrum-web-components/base";import{property as c,query as h}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/underlay/sp-underlay.js";import{firstFocusableIn as u}from"@spectrum-web-components/shared/src/first-focusable-in.js";import{MatchMediaController as f}from"@spectrum-web-components/reactive-controllers/src/MatchMedia.js";import v from"@spectrum-web-components/modal/src/modal.css.js";import y from"./tray.css.js";export class Tray extends m{constructor(){super(...arguments);this.open=!1;this.prefersMotion=new f(this,"(prefers-reduced-motion: no-preference)");this.transitionPromise=Promise.resolve();this.resolveTransitionPromise=()=>{};this.animating=!1}static get styles(){return[v,y]}focus(){const e=u(this);e?e.focus():this.children.length===1?this.tray.focus():super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.resolveTransitionPromise(),this.dispatchClosed())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(e){e.has("open")&&e.get("open")!==void 0&&this.prefersMotion.matches&&(this.animating=!0,this.transitionPromise=new Promise(i=>{this.resolveTransitionPromise=()=>{this.animating=!1,i()}})),super.update(e)}render(){return d`
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
                <slot></slot>
            </div>
        `}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.transitionPromise,e}}a([c({type:Boolean,reflect:!0})],Tray.prototype,"open",2),a([h(".tray")],Tray.prototype,"tray",2);
//# sourceMappingURL=Tray.js.map
