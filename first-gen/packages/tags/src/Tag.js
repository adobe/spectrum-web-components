"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(l,i,e,s)=>{for(var t=s>1?void 0:s?p(i,e):i,a=l.length-1,o;a>=0;a--)(o=l[a])&&(t=(s?o(i,e,t):o(t))||t);return s&&t&&u(i,e,t),t};import{html as n,nothing as c,SizedMixin as h,SpectrumElement as b}from"@spectrum-web-components/base";import{property as d}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/button/sp-clear-button.js";import v from"./tag.css.js";export class Tag extends h(b,{validSizes:["s","m","l"],noDefaultSize:!0}){constructor(){super();this.deletable=!1;this.disabled=!1;this.readonly=!1;this.handleFocusin=()=>{this.addEventListener("focusout",this.handleFocusout),this.addEventListener("keydown",this.handleKeydown)};this.handleFocusout=()=>{this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)};this.handleKeydown=e=>{if(!this.deletable||this.disabled)return;const{code:s}=e;switch(s){case"Backspace":case"Space":case"Delete":this.delete();default:return}};this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[v]}delete(){this.readonly||!this.dispatchEvent(new Event("delete",{bubbles:!0,cancelable:!0,composed:!0}))||this.remove()}render(){return n`
            <slot name="avatar"></slot>
            <slot name="icon"></slot>
            <span class="label"><slot></slot></span>
            ${this.deletable?n`
                      <sp-clear-button
                          class="clear-button"
                          ?disabled=${this.disabled}
                          label="Remove"
                          size="s"
                          tabindex="-1"
                          @click=${this.delete}
                      ></sp-clear-button>
                  `:c}
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","listitem"),this.deletable&&this.setAttribute("tabindex","0")}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}r([d({type:Boolean,reflect:!0})],Tag.prototype,"deletable",2),r([d({type:Boolean,reflect:!0})],Tag.prototype,"disabled",2),r([d({type:Boolean,reflect:!0})],Tag.prototype,"readonly",2);
//# sourceMappingURL=Tag.js.map
