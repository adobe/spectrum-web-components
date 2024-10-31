import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { C as CloseIcon$1, a as ChevronDownIcon } from './ChevronDown-s8uTipb9.js';
import { I as IconBase } from './IconBase-sFh2_uG3.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-BacrH-dd.js';
import { D as DefaultIcon } from './DefaultIcon-BpPg5UB-.js';

const CloseIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Close"}={})=>tag`<svg
    data-name="ICONS"
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
      d="m11.06061,10l5.20648-5.20605c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-5.20654,5.20605L4.79346,3.7334c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l5.20648,5.20605-5.20648,5.20605c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l5.20654-5.20605,5.20654,5.20605c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-5.20648-5.20605Z"
      fill="currentColor"
    />
  </svg>`;

class IconClose extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?CloseIcon({hidden:!this.label,title:this.label}):CloseIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-close",IconClose);

class IconChevronDown extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===1?ChevronDownIcon({hidden:!this.label,title:this.label}):DefaultIcon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-chevron-down",IconChevronDown);
