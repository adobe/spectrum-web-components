import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { C as CornerTriangle300Icon$1 } from './CornerTriangle300-B0AKm-jy.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const CornerTriangle300Icon=({width:e=24,height:r=24,hidden:t=!1,title:a="Corner Triangle300"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 7"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${e}"
    height="${r}"
  >
    <path
      d="M6.683.67a.32.32 0 0 0-.223.093l-5.7 5.7a.316.316 0 0 0 .224.54h5.7A.316.316 0 0 0 7 6.687V.986A.316.316 0 0 0 6.684.67z"
    />
  </svg>`;

class IconCornerTriangle300 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?CornerTriangle300Icon({hidden:!this.label,title:this.label}):CornerTriangle300Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-corner-triangle300",IconCornerTriangle300);
