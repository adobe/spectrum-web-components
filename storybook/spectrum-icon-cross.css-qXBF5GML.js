import { B as ButtonBase } from './ButtonBase-H8ie1_xx.js';
import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-z2Xx81l9.js';
import { I as IconBase } from './IconBase-TDmbHQaH.js';
import { x } from './lit-html-GmIhAbMP.js';
import { d as defineElement } from './define-element-2O4ZhTAw.js';
import { i as i$1 } from './lit-element-xBOPiTek.js';

class StyledButton extends ButtonBase{}

const Cross200Icon=({width:t=24,height:e=24,title:r="Cross200"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden="true"
    role="img"
    fill="currentColor"
    aria-label=${r}
    width=${t}
    height=${e}
  >
    <path
      d="m6.29 5 2.922-2.922a.911.911 0 0 0-1.29-1.29L5 3.712 2.078.789a.911.911 0 0 0-1.29 1.289L3.712 5 .79 7.922a.911.911 0 1 0 1.289 1.29L5 6.288 7.923 9.21a.911.911 0 0 0 1.289-1.289z"
    />
  </svg>`;

class IconCross200 extends IconBase{render(){return setCustomTemplateLiteralTag(x),Cross200Icon()}}

defineElement("sp-icon-cross200",IconCross200);

const Cross300Icon=({width:t=24,height:e=24,title:r="Cross300"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden="true"
    role="img"
    fill="currentColor"
    aria-label=${r}
    width=${t}
    height=${e}
  >
    <path
      d="m7.344 6 3.395-3.396a.95.95 0 0 0-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 0 0-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 0 0 1.343 1.343L6 7.344l3.395 3.395a.95.95 0 0 0 1.344-1.344z"
    />
  </svg>`;

class IconCross300 extends IconBase{render(){return setCustomTemplateLiteralTag(x),Cross300Icon()}}

defineElement("sp-icon-cross300",IconCross300);

const i=i$1`
.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(--spectrum-alias-ui-icon-cross-size-75)}.spectrum-UIIcon-Cross100{height:var(--spectrum-alias-ui-icon-cross-size-100);width:var(--spectrum-alias-ui-icon-cross-size-100)}.spectrum-UIIcon-Cross200{height:var(--spectrum-alias-ui-icon-cross-size-200);width:var(--spectrum-alias-ui-icon-cross-size-200)}.spectrum-UIIcon-Cross300{height:var(--spectrum-alias-ui-icon-cross-size-300);width:var(--spectrum-alias-ui-icon-cross-size-300)}.spectrum-UIIcon-Cross400{height:var(--spectrum-alias-ui-icon-cross-size-400);width:var(--spectrum-alias-ui-icon-cross-size-400)}.spectrum-UIIcon-Cross500{height:var(--spectrum-alias-ui-icon-cross-size-500);width:var(--spectrum-alias-ui-icon-cross-size-500)}.spectrum-UIIcon-Cross600{height:var(--spectrum-alias-ui-icon-cross-size-600);width:var(--spectrum-alias-ui-icon-cross-size-600)}
`;var S = i;

export { Cross200Icon as C, StyledButton as S, Cross300Icon as a, S as b };
