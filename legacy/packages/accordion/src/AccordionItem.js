"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var s=(n,o,e,i)=>{for(var t=i>1?void 0:i?d(o,e):o,l=n.length-1,a;l>=0;l--)(a=n[l])&&(t=(i?a(o,e,t):a(t))||t);return i&&t&&p(o,e,t),t};import{html as r,SizedMixin as h}from"@spectrum-web-components/base";import{property as c}from"@spectrum-web-components/base/src/decorators.js";import{Focusable as u}from"@spectrum-web-components/shared/src/focusable.js";import{when as v}from"@spectrum-web-components/base/src/directives.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import m from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import b from"./accordion-item.css.js";const f={s:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,m:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,l:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,xl:()=>r`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `};export class AccordionItem extends h(u,{noDefaultSize:!0}){constructor(){super(...arguments);this.open=!1;this.label="";this.disabled=!1;this.renderChevronIcon=()=>f[this.size||"m"]()}static get styles(){return[b,m]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}render(){return r`
            <h3 id="heading">
                ${v(this.size,this.renderChevronIcon)}
                <button
                    id="header"
                    @click=${this.onClick}
                    aria-expanded=${this.open}
                    aria-controls="content"
                    ?disabled=${this.disabled}
                >
                    ${this.label}
                </button>
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}s([c({type:Boolean,reflect:!0})],AccordionItem.prototype,"open",2),s([c({type:String,reflect:!0})],AccordionItem.prototype,"label",2),s([c({type:Boolean,reflect:!0})],AccordionItem.prototype,"disabled",2);
//# sourceMappingURL=AccordionItem.js.map
