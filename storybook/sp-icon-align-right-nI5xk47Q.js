import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { A as AlignLeftIcon$1, a as AlignRightIcon$1 } from './AlignRight-D7JYbhCC.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const AlignLeftIcon=({width:t=24,height:e=24,hidden:l=!1,title:r="Align Left"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m10.75,9h-3.5c-1.24072,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00928-2.25,2.25-2.25h3.5c1.24072,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-3.5-4.5c-.41357,0-.75.33691-.75.75v1.5c0,.41309.33643.75.75.75h3.5c.41357,0,.75-.33691.75-.75v-1.5c0-.41309-.33643-.75-.75-.75h-3.5Z"
      fill="currentColor"
    />
    <path
      d="m14.75,17h-7.5c-1.24072,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00928-2.25,2.25-2.25h7.5c1.24072,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-7.5-4.5c-.41357,0-.75.33691-.75.75v1.5c0,.41309.33643.75.75.75h7.5c.41357,0,.75-.33691.75-.75v-1.5c0-.41309-.33643-.75-.75-.75h-7.5Z"
      fill="currentColor"
    />
    <path
      d="m2.75,19c-.41406,0-.75-.33594-.75-.75V1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v16.5c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconAlignLeft extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?AlignLeftIcon({hidden:!this.label,title:this.label}):AlignLeftIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-align-left",IconAlignLeft);

const AlignRightIcon=({width:t=24,height:l=24,hidden:r=!1,title:c="Align Right"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${c}"
  >
    <path
      d="m12.75,9h-3.5c-1.24072,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00928-2.25,2.25-2.25h3.5c1.24072,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-3.5-4.5c-.41357,0-.75.33691-.75.75v1.5c0,.41309.33643.75.75.75h3.5c.41357,0,.75-.33691.75-.75v-1.5c0-.41309-.33643-.75-.75-.75h-3.5Z"
      fill="currentColor"
    />
    <path
      d="m12.75,17h-7.5c-1.24072,0-2.25-1.00977-2.25-2.25v-1.5c0-1.24023,1.00928-2.25,2.25-2.25h7.5c1.24072,0,2.25,1.00977,2.25,2.25v1.5c0,1.24023-1.00928,2.25-2.25,2.25Zm-7.5-4.5c-.41357,0-.75.33691-.75.75v1.5c0,.41309.33643.75.75.75h7.5c.41357,0,.75-.33691.75-.75v-1.5c0-.41309-.33643-.75-.75-.75h-7.5Z"
      fill="currentColor"
    />
    <path
      d="m17.25,19c-.41406,0-.75-.33594-.75-.75V1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v16.5c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconAlignRight extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?AlignRightIcon({hidden:!this.label,title:this.label}):AlignRightIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-align-right",IconAlignRight);
