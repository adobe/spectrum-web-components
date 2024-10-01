import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { I as IconBase } from './IconBase-BIYWpr2G.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-C_3bgzm7.js';
import { i } from './lit-element-BulMEkr1.js';

const Checkmark100Icon=({width:t=24,height:e=24,title:r="Checkmark100"}={})=>tag`<svg
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
      d="M3.5 9.5a1 1 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"
    />
  </svg>`;

class IconCheckmark100 extends IconBase{render(){return setCustomTemplateLiteralTag(x),Checkmark100Icon()}}

defineElement("sp-icon-checkmark100",IconCheckmark100);

const e=i`
    .spectrum-UIIcon-Checkmark50{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-50)}.spectrum-UIIcon-Checkmark75{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-75)}.spectrum-UIIcon-Checkmark100{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-100)}.spectrum-UIIcon-Checkmark200{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-200)}.spectrum-UIIcon-Checkmark300{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-300)}.spectrum-UIIcon-Checkmark400{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-400)}.spectrum-UIIcon-Checkmark500{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-500)}.spectrum-UIIcon-Checkmark600{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-600)}
`;

export { Checkmark100Icon as C, e };
