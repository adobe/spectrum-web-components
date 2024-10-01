import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { I as IconBase } from './IconBase-BIYWpr2G.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-C_3bgzm7.js';

const AlertIcon=({width:a=24,height:t=24,hidden:e=!1,title:r="Alert"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    height=${t}
    viewBox="0 0 36 36"
    width=${a}
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label=${r}
  >
    <path
      d="M17.127 2.579.4 32.512A1 1 0 0 0 1.272 34h33.456a1 1 0 0 0 .872-1.488L18.873 2.579a1 1 0 0 0-1.746 0ZM20 29.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Z"
    />
  </svg>`;

class IconAlert extends IconBase{render(){return setCustomTemplateLiteralTag(x),AlertIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-alert",IconAlert);

export { AlertIcon as A };
