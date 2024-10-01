import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { I as IconBase } from './IconBase-BIYWpr2G.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-C_3bgzm7.js';

const MagnifyIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Magnify"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    height=${e}
    viewBox="0 0 36 36"
    width=${t}
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label=${l}
  >
    <path
      d="M33.173 30.215 25.4 22.443a12.826 12.826 0 1 0-2.957 2.957l7.772 7.772a2.1 2.1 0 0 0 2.958-2.958ZM6 15a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z"
    />
  </svg>`;

class IconMagnify extends IconBase{render(){return setCustomTemplateLiteralTag(x),MagnifyIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-magnify",IconMagnify);

export { MagnifyIcon as M };
