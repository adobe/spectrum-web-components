import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { S as ShareIcon$1 } from './Share-C7ia2FsH.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const ShareIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Share"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m13.52734,5.49023l-3.00244-2.99756c-.29297-.29199-.76709-.29248-1.06006.00049l-2.99756,2.99756c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l1.72217-1.72217v8.18115c0,.41406.33594.75.75.75s.75-.33594.75-.75V4.83667l1.71777,1.71509c.29297.29199.76758.29297,1.06055-.00098.29248-.29297.29248-.76807-.00098-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18.021H4.25c-1.24072,0-2.25-1.00928-2.25-2.25v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,1.24072-1.00928,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`;

class IconShare extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?ShareIcon({hidden:!this.label,title:this.label}):ShareIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-share",IconShare);
