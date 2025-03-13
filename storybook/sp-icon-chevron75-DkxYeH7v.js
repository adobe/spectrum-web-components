import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as Chevron75Icon$1 } from './Chevron75-pV8sz8oX.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Chevron75Icon=({width:e=24,height:t=24,hidden:r=!1,title:l="Chevron75"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${e}"
    height="${t}"
  >
    <path
      d="m7.482 4.406-.001-.001L3.86.783a.84.84 0 0 0-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 0 0 3.86 9.216l3.621-3.622h.001a.84.84 0 0 0 0-1.19z"
    />
  </svg>`;

class IconChevron75 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Chevron75Icon({hidden:!this.label,title:this.label}):Chevron75Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron75",IconChevron75);
