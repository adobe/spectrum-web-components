import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-Diwq7nXX.js';
import { A as AddIcon$1 } from './Add-BU-Fkq1o.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement } from './define-element-2VgsDjbW.js';

const AddIcon=({width:t=24,height:e=24,hidden:r=!1,title:l="Add"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m16.25,9.25h-5.5V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v5.5H3.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h5.5v5.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-5.5h5.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`;

class IconAdd extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?AddIcon({hidden:!this.label,title:this.label}):AddIcon$1({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-add",IconAdd);
