import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as Cross400Icon$1, a as Cross500Icon$1 } from './Cross500-Cv8kebkP.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Cross400Icon=({width:t=24,height:e=24,hidden:r=!1,title:a="Cross400"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m7.398 6 3.932-3.932A.989.989 0 0 0 9.932.67L6 4.602 2.068.67A.989.989 0 0 0 .67 2.068L4.602 6 .67 9.932a.989.989 0 1 0 1.398 1.398L6 7.398l3.932 3.932a.989.989 0 0 0 1.398-1.398z"
    />
  </svg>`;

class IconCross400 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Cross400Icon({hidden:!this.label,title:this.label}):Cross400Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-cross400",IconCross400);

const Cross500Icon=({width:t=24,height:e=24,hidden:a=!1,title:l="Cross500"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m8.457 7 4.54-4.54a1.03 1.03 0 0 0-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 0 0-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 1 0 1.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 0 0 1.456-1.458z"
    />
  </svg>`;

class IconCross500 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Cross500Icon({hidden:!this.label,title:this.label}):Cross500Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-cross500",IconCross500);
