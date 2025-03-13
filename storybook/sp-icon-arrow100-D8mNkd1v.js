import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { A as Arrow100Icon$1 } from './Arrow100-DyiZcXy_.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const Arrow100Icon=({width:t=24,height:e=24,hidden:r=!1,title:a="Arrow100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${t}"
    height="${e}"
  >
    <path
      d="M9.7 4.387 6.623 1.262a.875.875 0 1 0-1.247 1.226l1.61 1.637H.925a.875.875 0 0 0 0 1.75h6.062l-1.61 1.637a.875.875 0 1 0 1.247 1.226l3.075-3.125a.874.874 0 0 0 0-1.226z"
    />
  </svg>`;

class IconArrow100 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Arrow100Icon({hidden:!this.label,title:this.label}):Arrow100Icon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-arrow100",IconArrow100);
