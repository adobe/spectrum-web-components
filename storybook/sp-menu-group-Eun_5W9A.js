import { M as Menu } from './sp-menu-rNqdCkwX.js';
import { i } from './lit-element-xBOPiTek.js';
import { x } from './lit-html-GmIhAbMP.js';
import { o } from './query-assigned-nodes-aJM_vOZ4.js';
import { t as t$1 } from './state-fuvayDA0.js';
import { d as defineElement } from './define-element-2O4ZhTAw.js';

const t=i`
.spectrum-Menu-back.focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.spectrum-Menu-back:focus-visible{box-shadow:inset calc(var(
--mod-menu-item-focus-indicator-width,
var(--spectrum-menu-item-focus-indicator-width)
)*var(--spectrum-menu-item-focus-indicator-direction-scalar, 1)) 0 0 0 var(
--highcontrast-menu-item-focus-indicator-color,var(
--mod-menu-item-focus-indicator-color,var(--spectrum-menu-item-focus-indicator-color)
)
)}.header{color:var(
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
)}.spectrum-Menu-back{align-items:center;display:flex;flex-flow:wrap;padding-block:var(--mod-menu-back-padding-block-start,0) var(--mod-menu-back-padding-block-end,0);padding-inline:var(--mod-menu-back-padding-inline-start,0) var(
--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content)
)}.spectrum-Menu-back .header{padding:0}.spectrum-Menu-backButton{background:none;border:0;cursor:pointer;display:inline-flex;margin:0;padding:0}.spectrum-Menu-backButton.focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness) solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(
--highcontrast-menu-item-color-default,var(
--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)
)
);display:block;font-size:var(
--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size)
);font-weight:var(
--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight)
);line-height:var(
--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height)
)}.spectrum-Menu-backIcon{fill:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
);color:var(
--highcontrast-menu-item-color-default,var(--mod-menu-back-icon-color-default)
);margin-block:var(
--mod-menu-back-icon-margin-block,var(--spectrum-menu-back-icon-margin)
);margin-inline:var(
--mod-menu-back-icon-margin-inline,var(--spectrum-menu-back-icon-margin)
)}:host{display:inline-flex;flex-direction:column;margin:0;overflow:visible}[hidden]{display:none!important}
`;var c = t;

var n=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(i,s,e,t)=>{for(var r=t>1?void 0:t?h(s,e):s,d=i.length-1,a;d>=0;d--)(a=i[d])&&(r=(t?a(s,e,r):a(r))||r);return t&&r&&n(s,e,r),r};class MenuGroup extends Menu{constructor(){super(...arguments);this.headerId="";}static get styles(){return [...super.styles,c]}get ownRole(){switch(this.selects){case"multiple":case"single":case"inherit":return "group";default:return "menu"}}updateLabel(){const e=this.headerElements.length?this.headerElements[0]:void 0;if(e!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),e){this.headerId=this.headerId||`sp-menu-group-label-${crypto.randomUUID().slice(0,8)}`;const t=e.id||this.headerId;e.id||(e.id=t),this.setAttribute("aria-labelledby",t);}else this.removeAttribute("aria-labelledby");this.headerElement=e;}render(){return x`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            <sp-menu ignore>${this.renderMenuItemSlot()}</sp-menu>
        `}}l([o({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),l([t$1()],MenuGroup.prototype,"headerElement",2);

defineElement("sp-menu-group",MenuGroup);
