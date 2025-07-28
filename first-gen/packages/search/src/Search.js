"use strict";var d=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=(r,o,e,t)=>{for(var i=t>1?void 0:t?c(o,e):o,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=(t?n(o,e,i):n(i))||i);return t&&i&&d(o,e,i),i};import{html as p,nothing as h}from"@spectrum-web-components/base";import{property as l,query as m}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as u}from"@spectrum-web-components/base/src/directives.js";import{Textfield as b}from"@spectrum-web-components/textfield";import"@spectrum-web-components/button/sp-clear-button.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-search.js";import f from"./search.css.js";const v=r=>r.stopPropagation();export class Search extends b{constructor(){super(...arguments);this.action="";this.label="Search";this.placeholder="Search"}static get styles(){return[...super.styles,f]}handleSubmit(e){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||e.preventDefault()}handleKeydown(e){const{code:t}=e;t==="Escape"&&this.holdValueOnEscape||!this.value||t!=="Escape"||this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}renderField(){return p`
            <form
                action=${this.action}
                id="form"
                method=${u(this.method)}
                @submit=${this.handleSubmit}
                @reset=${this.reset}
                @keydown=${this.handleKeydown}
            >
                <sp-icon-search
                    size=${this.size}
                    class="icon magnifier icon-workflow icon-search"
                ></sp-icon-search>
                ${super.renderField()}
                ${this.value?p`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              size=${u(this.size)}
                              @keydown=${v}
                          ></sp-clear-button>
                      `:h}
            </form>
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("holdValueOnEscape")||this.inputElement.setAttribute("type","search")}willUpdate(){this.multiline=!1}}s([l()],Search.prototype,"action",2),s([l()],Search.prototype,"label",2),s([l()],Search.prototype,"method",2),s([l()],Search.prototype,"placeholder",2),s([l({type:Boolean})],Search.prototype,"holdValueOnEscape",2),s([m("#form")],Search.prototype,"form",2);
//# sourceMappingURL=Search.js.map
