import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as Chevron50Icon$1 } from './Chevron50-tZCv_9-Q.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Chevron50Icon=({width:e=24,height:t=24,hidden:r=!1,title:a="Chevron50"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
  >
    <path
      d="M1.985 5.961a.695.695 0 0 1-.7-.704.7.7 0 0 1 .209-.493L3.279 3 1.51 1.251A.7.7 0 0 1 1.3.757.696.696 0 0 1 2.492.255l2.275 2.247a.7.7 0 0 1 0 .996L2.477 5.76a.7.7 0 0 1-.492.201"
    />
  </svg>`;

class IconChevron50 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Chevron50Icon({hidden:!this.label,title:this.label}):Chevron50Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron50",IconChevron50);
