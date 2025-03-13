import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as Chevron200Icon$1 } from './Chevron200-BFofHHDY.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Chevron200Icon=({width:e=24,height:t=24,hidden:r=!1,title:a="Chevron200"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M9.034 5.356 4.343.663a.911.911 0 0 0-1.29 1.289L7.102 6l-4.047 4.047a.911.911 0 1 0 1.289 1.29l4.691-4.692a.91.91 0 0 0 0-1.29z"
    />
  </svg>`;

class IconChevron200 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Chevron200Icon({hidden:!this.label,title:this.label}):Chevron200Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron200",IconChevron200);
