import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as Chevron100Icon$1 } from './Chevron100-OyV1wQMZ.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Chevron100Icon=({width:e=24,height:t=24,hidden:r=!1,title:a="Chevron100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M3 9.95a.875.875 0 0 1-.615-1.498L5.88 5 2.385 1.547A.875.875 0 0 1 3.615.302L7.74 4.377a.876.876 0 0 1 0 1.246L3.615 9.698A.87.87 0 0 1 3 9.95"
    />
  </svg>`;

class IconChevron100 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Chevron100Icon({hidden:!this.label,title:this.label}):Chevron100Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron100",IconChevron100);
