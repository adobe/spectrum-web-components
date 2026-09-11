"use strict";var d=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var o=(a,n,t,e)=>{for(var r=e>1?void 0:e?p(n,t):n,l=a.length-1,c;l>=0;l--)(c=a[l])&&(r=(e?c(n,t,r):c(r))||r);return e&&r&&d(n,t,r),r};import{html as i,SizedMixin as h}from"@spectrum-web-components/base";import{property as s}from"@spectrum-web-components/base/src/decorators.js";import{when as u}from"@spectrum-web-components/base/src/directives.js";import m from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import{Focusable as v}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import b from"./accordion-item.css.js";const g={s:()=>i`
    <span class="iconContainer">
      <sp-icon-chevron100
        class="indicator spectrum-UIIcon-ChevronRight75"
        slot="icon"
      ></sp-icon-chevron100>
    </span>
  `,m:()=>i`
    <span class="iconContainer">
      <sp-icon-chevron100
        class="indicator spectrum-UIIcon-ChevronRight100"
        slot="icon"
      ></sp-icon-chevron100>
    </span>
  `,l:()=>i`
    <span class="iconContainer">
      <sp-icon-chevron100
        class="indicator spectrum-UIIcon-ChevronRight200"
        slot="icon"
      ></sp-icon-chevron100>
    </span>
  `,xl:()=>i`
    <span class="iconContainer">
      <sp-icon-chevron100
        class="indicator spectrum-UIIcon-ChevronRight300"
        slot="icon"
      ></sp-icon-chevron100>
    </span>
  `},T="https://opensource.adobe.com/spectrum-web-components/components/accordion/";export class AccordionItem extends h(v,{noDefaultSize:!0}){constructor(){super(...arguments);this.open=!1;this.label="";this.disabled=!1;this.level=3;this.renderChevronIcon=()=>g[this.size||"m"]()}static get styles(){return[b,m]}get focusElement(){return this.shadowRoot.querySelector("#header")}onClick(){this.disabled||this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("sp-accordion-item-toggle",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!this.open)}getHeadingLevel(){var e;const t=(e=this.level)!=null?e:3;return Math.max(2,Math.min(6,t))}renderHeading(){const t=this.getHeadingLevel(),e=i`
      ${u(this.size,this.renderChevronIcon)}
      <button
        id="header"
        @click=${this.onClick}
        aria-expanded=${this.open}
        aria-controls="content"
        ?disabled=${this.disabled}
      >
        ${this.label}
      </button>
    `;switch(t){case 2:return i`
          <h2 id="heading">${e}</h2>
        `;case 4:return i`
          <h4 id="heading">${e}</h4>
        `;case 5:return i`
          <h5 id="heading">${e}</h5>
        `;case 6:return i`
          <h6 id="heading">${e}</h6>
        `;default:return i`
          <h3 id="heading">${e}</h3>
        `}}render(){return i`
      ${this.renderHeading()}
      <div id="content" role="region" aria-labelledby="header">
        <slot></slot>
      </div>
    `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}}o([s({type:Boolean,reflect:!0})],AccordionItem.prototype,"open",2),o([s({type:String,reflect:!0})],AccordionItem.prototype,"label",2),o([s({type:Boolean,reflect:!0})],AccordionItem.prototype,"disabled",2),o([s({type:Number,reflect:!0})],AccordionItem.prototype,"level",2);
//# sourceMappingURL=AccordionItem.js.map
