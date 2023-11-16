import { M as Menu } from './sp-menu-a6b50bf6.js';
import { i } from './lit-element-9354aa77.js';
import { x } from './lit-html-126adc72.js';
import { o } from './query-assigned-nodes-6218f033.js';
import { t as t$1 } from './state-879d3fe4.js';
import { d as defineElement } from './define-element-467f3dc4.js';

const t=i`
.header{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-section-header-color,var(--spectrum-menu-section-header-color)
)
);display:block;font-size:var(
--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size)
);font-weight:var(
--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight)
);grid-area:sectionHeadingArea/1/sectionHeadingArea/-1;line-height:var(
--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height)
);min-inline-size:var(
--mod-menu-section-header-min-width,var(--spectrum-menu-section-header-min-width)
);padding-block-end:var(
--mod-menu-section-header-bottom-edge-to-text,var(
--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)
)
);padding-block-start:var(
--mod-menu-section-header-top-edge-to-text,var(
--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)
)
);padding-inline:var(
--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content)
)}:host{display:inline-flex;flex-direction:column;margin:0;overflow:visible}[hidden]{display:none!important}
`;var c = t;

var n=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(i,s,e,t)=>{for(var r=t>1?void 0:t?h(s,e):s,d=i.length-1,a;d>=0;d--)(a=i[d])&&(r=(t?a(s,e,r):a(r))||r);return t&&r&&n(s,e,r),r};class MenuGroup extends Menu{constructor(){super(...arguments);this.headerId="";}static get styles(){return [...super.styles,c]}get ownRole(){switch(this.selects){case"multiple":case"single":case"inherit":return "group";default:return "menu"}}updateLabel(){const e=this.headerElements.length?this.headerElements[0]:void 0;if(e!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),e){this.headerId=this.headerId||`sp-menu-group-label-${crypto.randomUUID().slice(0,8)}`;const t=e.id||this.headerId;e.id||(e.id=t),this.setAttribute("aria-labelledby",t);}else this.removeAttribute("aria-labelledby");this.headerElement=e;}render(){return x`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            <sp-menu ignore>${this.renderMenuItemSlot()}</sp-menu>
        `}}l([o({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),l([t$1()],MenuGroup.prototype,"headerElement",2);

defineElement("sp-menu-group",MenuGroup);
