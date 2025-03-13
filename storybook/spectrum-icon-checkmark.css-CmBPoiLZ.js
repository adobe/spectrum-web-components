import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';
import { i } from './lit-element-BulMEkr1.js';

const Checkmark100Icon$1=({width:e=24,height:t=24,hidden:a=!1,title:l="Checkmark100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M3.5 9.5a1 1 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"
    />
  </svg>`;

const Checkmark100Icon=({width:e=24,height:t=24,hidden:a=!1,title:l="Checkmark100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M3.5 9.5a1 1 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264l1.657 2.028 4.68-6.01A1 1 0 0 1 9.74 2.114l-5.45 7a1 1 0 0 1-.777.386z"
    />
  </svg>`;

class IconCheckmark100 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Checkmark100Icon$1({hidden:!this.label,title:this.label}):Checkmark100Icon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-checkmark100",IconCheckmark100);

const e=i`
    .spectrum-UIIcon-Checkmark50{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-50)}.spectrum-UIIcon-Checkmark75{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-75)}.spectrum-UIIcon-Checkmark100{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-100)}.spectrum-UIIcon-Checkmark200{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-200)}.spectrum-UIIcon-Checkmark300{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-300)}.spectrum-UIIcon-Checkmark400{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-400)}.spectrum-UIIcon-Checkmark500{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-500)}.spectrum-UIIcon-Checkmark600{--spectrum-icon-size:var(--spectrum-checkmark-icon-size-600)}
`;

export { Checkmark100Icon as C, e };
